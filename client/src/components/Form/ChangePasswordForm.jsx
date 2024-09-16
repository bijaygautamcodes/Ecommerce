import { useState } from "react";

const ChangePasswordForm = ({ onSubmit }) => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newPassword === confirmPassword) {
            onSubmit(currentPassword, newPassword);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-1">
            <label htmlFor="currentPassword">Current Password</label>
            <input
                type="password"
                id="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="border p-2 rounded-md w-full mb-2"
            />

            <label htmlFor="newPassword">New Password</label>
            <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="border p-2 rounded-md w-full mb-2"
            />

            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border p-2 rounded-md w-full mb-4"
            />

            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
                Change Password
            </button>
        </form>
    );
};

export default ChangePasswordForm;
