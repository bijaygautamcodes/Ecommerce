import asyncHandler from "express-async-handler";
import User from "../models/user.data.js";
import commonPwds from "../config/common.pwd.js";
import { levenshteinDistance } from "../utils/helper.js";
import { send2FAWithTemplate } from "../utils/email.service.js";

const otpBucket = new Map();

const loginHandler = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        res.status(400);
        throw new Error("Invalid email or password");
    }
    if (user.isAccountLocked()) {
        res.status(403); // Forbidden
        throw new Error("Account is locked for 24 hrs");
    }
    if (!user) {
        res.status(401);
        throw new Error("Invalid email or password");
    }
    const passMatched = await user.matchPassword(password);
    if (!passMatched) {
        res.status(401);
        const loginAttempts = (5 - user.loginAttempts) % 5;
        if (loginAttempts === 0) {
            res.status(403); // Forbidden
            throw new Error("Account is locked for 24 hrs");
        }
        if (loginAttempts >= 3) {
            res.status(401);
            throw new Error("Invalid email or password");
        }
        throw new Error(
            `Invalid email or password \n${loginAttempts} attempts left`
        );
    }

    if (user.is2FAEnabled) {
        const otp = await send2FAWithTemplate(user);
        otpBucket.set(user._id.toString(), {
            otp,
            expires: Date.now() + 1000 * 60 * 5, // 5 minutes
        });
        return res.json({
            _id: user._id,
            is2FAEnabled: true,
        });
    }
    return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: (await user.generateSession()).token,
        passwordExpired: await user.isPasswordExpired(),
    });
});

const verify2FA = asyncHandler(async (req, res) => {
    const { otp, id } = req.body;
    const otpObject = otpBucket.get(id);
    if (!otpObject) {
        res.status(401);
        throw new Error("OTP not generated");
    }
    if (otpObject.expires < Date.now()) {
        res.status(401);
        throw new Error("OTP expired");
    }
    if (otpObject.otp !== otp) {
        res.status(401);
        throw new Error("Invalid OTP");
    }
    otpBucket.delete(id);
    const user = await User.findOne({ _id: id });
    if (user) {
        return res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: (await user.generateSession()).token,
            passwordExpired: await user.isPasswordExpired(),
        });
    }
    res.status(401);
    throw new Error("Something went wrong");
});

const registerHandler = asyncHandler(async (req, res) => {
    const { fullname, email, password } = req.body;

    // Check if user with the same email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    // Extract email name and domain
    const [emailName, emailDomain] = email
        .split("@")
        .map((part) => part.toLowerCase());
    const nameSegments = fullname.toLowerCase().split(" ");

    // Check if name, email name, or email domain are part of the password
    const nameOrEmailInPwd =
        nameSegments.some((segment) =>
            password.toLowerCase().includes(segment)
        ) ||
        password.toLowerCase().includes(emailName) ||
        password.toLowerCase().includes(emailDomain);
    if (nameOrEmailInPwd) {
        res.status(400);
        throw new Error("Password cannot contain name or email");
    }

    // check if password is too long
    if (password.length > 128) {
        res.status(400);
        throw new Error("Password is too long");
    }

    // Check if password is too common (based on Levenshtein distance)
    const isSimilarToCommonPassword = commonPwds.some((pwd) => {
        const similarityThreshold = Math.min(pwd.length / 3, 4);
        const distance = levenshteinDistance(
            pwd.toLowerCase(),
            password.toLowerCase()
        );
        return distance <= similarityThreshold;
    });

    if (isSimilarToCommonPassword) {
        res.status(400);
        throw new Error("Password is too common");
    }

    // Create user
    const user = await User.create({
        fullname,
        email,
        password,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: user.generateSession(),
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

const verifyPass = asyncHandler(async (req, res) => {
    const { password } = req.body;
    const errors = [];
    errors.push({
        check: "at least 8 characters",
        status: password?.length < 8,
    });
    errors.push({
        check: "at least one uppercase letter",
        status: !/[A-Z]/.test(password),
    });
    errors.push({
        check: "at least one lowercase letter",
        status: !/[a-z]/.test(password),
    });
    errors.push({
        check: "at least one number",
        status: !/[0-9]/.test(password),
    });
    errors.push({
        check: "at least one special character",
        status: !/[!@#$%^&*]/.test(password),
    });
    res.json(errors);
});

const verifyUsernameAndEmail = asyncHandler(async (req, res) => {
    const { fullname, email } = req.body;
    const emailErrors = [];
    const nameErrors = [];

    nameErrors.push({
        check: "be at least 6 characters",
        status: fullname.length < 6,
    });
    nameErrors.push({
        check: "have  first and last name",
        status: !/^[a-zA-Z]+\s[a-zA-Z]+$/.test(fullname),
    });

    emailErrors.push({
        check: "a valid email",
        status: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    });

    res.json({ nameErrors, emailErrors });
});

const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id),
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        await user.remove();
        res.json({ message: "User removed" });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");

    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = req.body.isAdmin;

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

const updatePassword = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    user.password = req.body.newPassword;
    user.passwordLastChanged = new Date();
    await user.save();
    res.json({ message: "Password changed successfully." });
    res.status(500).json({ message: "An error occurred." });
});

export {
    verify2FA,
    updatePassword,
    loginHandler,
    registerHandler,
    verifyUsernameAndEmail,
    verifyPass,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
};
