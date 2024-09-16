"use client";
import ChangePasswordForm from "@/components/Form/ChangePasswordForm";

const ChangePasswordPage = () => {
    const handleChangePassword = (currentPassword, newPassword) => {
        console.log("Current Password:", currentPassword);
        console.log("New Password:", newPassword);
    };

    return (
        <section className="relative isolate overflow-hidden p-4 h-[calc(100vh-80px)] mx-auto md:px-10 max-w-md lg:px-8 scroll-mt-32 flex flex-col justify-center items-center">
            <div className="p-8 border-2  rounded-xl">
                <h1 className="text-2xl font-bold mb-4 ">Change Password</h1>
                <p className="text-gray-600 mb-8 ">
                    Your password has expired. <br />
                    Please change your password to continue.
                </p>
                <ChangePasswordForm onSubmit={handleChangePassword} />
            </div>
        </section>
    );
};

export default ChangePasswordPage;
