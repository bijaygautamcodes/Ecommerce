import dotenv from "dotenv";
import { readFile } from "fs/promises";
import nodemailer from "nodemailer";

dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    tls: { rejectUnauthorized: false },
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.APP_SPECIFIC_PASSWORD,
    },
});

export const send2FAWithTemplate = async (user) => {
    const { email, fullname } = user;
    const [fname] = fullname.split(" ");
    const code = Math.random().toString(36).slice(-6);

    let template;
    console.log("Reading email template");
    try {
        template = await readFile("./src/utils/email-template.html", "utf8");
        console.log("Template read successfully");
    } catch (error) {
        console.error(error);
        return null;
    }
    if (!template) return null;
    const html = template
        .replace(/{{name}}/g, fname)
        .replace(/{{code}}/g, code);

    const mailerOptions = {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: "Your Login OTP",
        html: html,
    };

    const isSent = await sendMail(mailerOptions);
    if (!isSent) return null;
    return code;
};

const sendMail = async (options) => {
    try {
        const info = await transporter.sendMail(options);
        console.log("Message sent: %s", info.messageId);
        return true;
    } catch (error) {
        console.error("Error sending email:", error);
        return false;
    }
};
