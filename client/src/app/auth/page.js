"use client";
import { useEffect, useRef } from "react";
import RegisterForm from "@/components/Form/RegisterForm";
import LoginForm from "@/components/Form/LoginForm";
import { useRecoilState } from "recoil";
import { isLoginFormActive, signUpFormDataState } from "@/atoms/user.atom";

const AuthPage = () => {
    const [registerForm, setRegisterForm] = useRecoilState(signUpFormDataState);
    const loginFormRef = useRef(null);
    const registerFormRef = useRef(null);
    const [isLogin, setIsLogin] = useRecoilState(isLoginFormActive);

    useEffect(() => {
        if (!isLogin) {
            registerFormRef.current.reset();
            setRegisterForm({
                fullname: "",
                email: "",
                password: "",
            });
        } else loginFormRef.current.reset();
    }, [isLogin]);

    return (
        <>
            <section className="relative isolate overflow-hidden p-4 h-[calc(100vh-80px)] mx-auto md:px-10 max-w-7xl lg:px-8 scroll-mt-32 flex flex-col justify-center items-center">
                {/* Wrapper */}
                <div className="relative flex w-full h-full justify-evenly items-center">
                    <div className="">
                        <div className=" relative w-fit border-2 flex flex-col rounded-2xl p-8 pb-6 mx-auto">
                            <div className="mb-6">
                                <h1 className="mb-2 sm:mb-4 text-xl sm:text-2xl tracking-tight">
                                    {isLogin
                                        ? "Sign in to your account"
                                        : "Get started for free"}
                                </h1>
                                {isLogin ? (
                                    <p className="text-sm">
                                        Don&apos;t have an account?{" "}
                                        <a
                                            className="text-cyan-400"
                                            href="#"
                                            onClick={() => setIsLogin(false)}
                                        >
                                            Sign Up
                                        </a>
                                    </p>
                                ) : (
                                    <p className="text-sm">
                                        Already have an account?{" "}
                                        <a
                                            className="text-cyan-400"
                                            href="#"
                                            onClick={() => setIsLogin(true)}
                                        >
                                            Login
                                        </a>
                                    </p>
                                )}
                            </div>
                            {isLogin ? (
                                <LoginForm formRef={loginFormRef} />
                            ) : (
                                <RegisterForm formRef={registerFormRef} />
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AuthPage;
