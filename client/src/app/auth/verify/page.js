"use client";

import { useState } from "react";
import OTPForm from "@/components/Form/OTPForm";
import { useSearchParams, useRouter } from "next/navigation";
import { verifyOTP } from "@/services/user.service";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { userState } from "@/atoms/user.atom";

const VerificationPage = () => {
    const router = useRouter();
    const params = useSearchParams();

    const id = params.get("id");
    const callback = params.get("callback");

    if (!id) {
        return (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-180px)]">
                <h1 className="text-2xl font-bold mb-4">Invalid URL</h1>
                <p className="text-gray-600 mb-8">
                    The URL is invalid. Please check your email for the correct
                    link.
                </p>
                <Link
                    href="/"
                    className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Go to home page
                </Link>
            </div>
        );
    }
    const [state, setState] = useState({ loading: false, error: null });
    const [user, setUser] = useRecoilState(userState);

    const handleOTPSubmit = async (otp) => {
        const res = await verifyOTP(id?.trim(), otp);
        if (res.status === 200) {
            setUser(res.data);
            setState({ loading: false, error: null });
            if (res.data.passwordExpired)
                router.replace("/auth/change-password");
            if (callback) router.replace(callback);
            else if (res.data.isAdmin) router.replace("/admin");
            else router.replace("/");
        } else setState({ loading: false, error: res.message });
    };

    return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-180px)]">
            <h1 className="text-2xl font-bold mb-4">OTP Verification</h1>
            <p className="text-gray-600 mb-8">
                Enter the OTP sent to your email.
            </p>
            {state.error && state.error !== "" && (
                <p className="mb-4 text-center">{state.error}</p>
            )}
            <OTPForm onSubmit={handleOTPSubmit} />
        </div>
    );
};

export default VerificationPage;
