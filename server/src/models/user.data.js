import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserSession from "./user.sessions.js";

const MAX_LOGIN_ATTEMPTS = 5; // Maximum allowed consecutive failed login attempts
const LOCK_TIME = 24 * 60 * 60 * 1000; // Lock duration in milliseconds (24 hours)
const PASSWORD_EXPIRATION = 10; // Password expiration in days

const userSchema = mongoose.Schema(
    {
        fullname: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, trim: true },
        password: {
            type: String,
            required: true,
            required: [true, "Please enter a password."],
            minlength: [8, "Password must be at least 8 characters."],
        },
        is2FAEnabled: { type: Boolean, required: true, default: false },
        isAdmin: { type: Boolean, required: true, default: false },
        passwordLastChanged: { type: Date, default: Date.now },
        loginAttempts: { type: Number, default: 0 },
        lockedUntil: { type: Date, default: null },
        emailVerified: { type: Boolean, default: false },
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    this.passwordLastChanged = Date.now();
});

userSchema.methods.matchPassword = async function (password) {
    const isMatch = await bcrypt.compare(password, this.password);
    if (!isMatch) {
        this.loginAttempts += 1;
        if (this.loginAttempts >= MAX_LOGIN_ATTEMPTS) {
            this.lockedUntil = new Date(Date.now() + LOCK_TIME);
            this.loginAttempts = 0; // Reset attempts after locking
        }
        await this.save();
    }
    if (isMatch && this.loginAttempts > 0) {
        this.loginAttempts = 0; // Reset attempts after successful login
        await this.save();
    }
    return isMatch;
};

userSchema.methods.isPasswordExpired = function () {
    const now = Date.now();
    const passwordLastChanged = this.passwordLastChanged?.getTime();

    if (!passwordLastChanged) {
        this.passwordLastChanged = this.updatedAt;
        this.save();
        return false;
    }
    const passwordAge = now - passwordLastChanged;
    const passwordAgeInDays = Math.floor(passwordAge / (1000 * 60 * 60 * 24));
    return passwordAgeInDays >= PASSWORD_EXPIRATION;
};

userSchema.methods.generateSession = async function () {
    const token = jwt.sign(
        { _id: this._id, email: this.email, isAdmin: this.isAdmin },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_LIFE }
    );
    const decodedData = jwt.decode(token);
    const sessionToken = await UserSession.create({
        token: token,
        user: this._id,
        issuedAt: decodedData.iat,
        expiresAt: decodedData.exp,
    });

    return sessionToken;
};

userSchema.methods.isAccountLocked = function () {
    return this.lockedUntil > Date.now();
};

const User = mongoose.model("User", userSchema);

export default User;
