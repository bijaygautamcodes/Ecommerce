import { userState } from "@/atoms/user.atom";
import { loginUser } from "@/services/user.service";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { BiLoader, BiLogInCircle } from "react-icons/bi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRecoilState } from "recoil";

const LoginForm = ({ formRef }) => {
    const params = useSearchParams();
    const callback = params.get("callback");
    const router = useRouter();
    const [user, setUser] = useRecoilState(userState);
    const [state, setState] = useState({ loading: false, error: null });

    const [showPass, setShowPass] = useState(false);
    const toggleShowPass = () => setShowPass(!showPass);

    const handleSignIn = async (e) => {
        e.preventDefault();
        setState({ loading: true, error: null });
        let { email, password } = document.forms[0];
        const res = await loginUser({
            email: email.value,
            password: password.value,
        });
        console.log("RES", res);
        if (res.status === 200) {
            setState({ loading: false, error: null });
            if (res.data.is2FAEnabled) {
                return router.replace(
                    `/auth/verify?id=${res.data._id}${
                        callback ? `&callback=${callback}` : ""
                    }`
                );
            }
            setUser(res.data);
            if (res.data.passwordExpired)
                router.replace("/auth/change-password");
            if (callback) router.replace(callback);
            else if (res.data.isAdmin) router.replace("/admin");
            else router.replace("/");
        } else setState({ loading: false, error: res.message });
    };

    return (
        <form
            className="sm:min-w-[270px]"
            onSubmit={handleSignIn}
            ref={formRef}
            id="signin"
        >
            <div className="mb-4">
                <label htmlFor="email" />
                <input
                    className="block w-full p-4 pl-6 pr-6 bg-[#eee] rounded-xl text-[#111] placeholder:text-[#111] truncate"
                    placeholder="Email"
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                />
            </div>
            <div className="relative mb-4">
                <label htmlFor="password" />
                <input
                    className="block w-full p-4 pl-6 pr-6 bg-[#eee] rounded-xl text-[#111] placeholder:text-[#111] truncate"
                    placeholder="Password"
                    id="password"
                    type={showPass ? "text" : "password"}
                    minLength="6"
                    required
                    autoComplete="current-password"
                />
                <span
                    className="absolute right-4 top-5 cursor-pointer"
                    onClick={toggleShowPass}
                >
                    {showPass ? <FaEyeSlash /> : <FaEye />}
                </span>
            </div>
            <div className="flex items-center justify-between mb-6 mx-1">
                <div className="flex items-start mr-4">
                    <div className="flex items-center h-5">
                        <input
                            id="remember"
                            aria-describedby="remember"
                            type="checkbox"
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                            required=""
                        />
                    </div>
                    <div className="ml-3 text-sm">
                        <label htmlFor="remember" className="text-gray-800 ">
                            Remember me
                        </label>
                    </div>
                </div>
                <a
                    href="#"
                    className="text-sm font-medium  hover:underline dark:text-primary-500"
                >
                    Forgot password?
                </a>
            </div>

            <div className="mb-4">
                <button
                    type="submit"
                    className="text-white text-md bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-cyan-300  rounded-lg  w-full px-5 py-4 text-center dark:bg-cyan-400 dark:hover:bg-cyan-500 dark:focus:ring-cyan-800 font-semibold flex gap-2 items-center justify-center"
                >
                    {state.loading ? (
                        <BiLoader className="animate-spin text-xl" />
                    ) : (
                        <BiLogInCircle className=" text-xl" />
                    )}
                    Login
                </button>
            </div>
            <div className="flex items-center justify-center">
                {state.error && (
                    <p className="text-red-500 text-sm">{state.error}</p>
                )}
            </div>
        </form>
    );
};

export default LoginForm;
