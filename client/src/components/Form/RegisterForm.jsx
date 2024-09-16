import React, { useState } from "react";
import { FaCheck, FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";
import FullnameAndEmailVerification from "./FullnameAndEmailVerification";
import { useRecoilState } from "recoil";
import { isLoginFormActive, signUpFormDataState } from "@/atoms/user.atom";
import PasswordVerification from "./PasswordVerification";
import { validateForm } from "@/utils/utils";
import { registerUser } from "@/services/user.service";

const RegisterForm = ({ formRef }) => {
    const [state, setState] = useState({
        loading: false,
        error: null,
        highlight: {
            fullname: false,
            email: false,
            password: false,
        },
    });

    const [, setLoginFormActive] = useRecoilState(isLoginFormActive);

    const [showPass, setShowPass] = useState(false);
    const [passErrors, setPassErrors] = useState([]);
    const [fullNameAndEmailErrors, setFullnameAndEmailErrors] = useState({
        nameErrors: [],
        emailErrors: [],
    });

    const [{ fullname, email, password }, setFormData] =
        useRecoilState(signUpFormDataState);

    const toggleShowPass = () => setShowPass(!showPass);

    const handleEmailSignUp = async (e) => {
        e.preventDefault();
        setState((prev) => ({ ...prev, loading: true }));
        const isValid = validateForm(
            passErrors,
            fullNameAndEmailErrors,
            state,
            setState
        );

        if (isValid) {
            const res = await registerUser({ fullname, email, password });
            console.log("res", res);
            if (res.status === 201) setLoginFormActive(true);
            else {
                setState((prev) => ({
                    ...prev,
                    error: res.message,
                }));
            }
        }

        setState((prev) => ({ ...prev, loading: false }));
    };

    return (
        <form
            className="sm:min-w-[300px] flex gap-4"
            onSubmit={handleEmailSignUp}
            ref={formRef}
            id="signup"
        >
            <div className="flex flex-col">
                <FullnameAndEmailVerification
                    setFullnameAndEmailErrors={setFullnameAndEmailErrors}
                    highlights={{
                        fullname: state.highlight.fullname,
                        email: state.highlight.email,
                    }}
                />
                <div className="relative mb-4">
                    <label htmlFor="password" />
                    <PasswordVerification
                        showPass={showPass}
                        setPassErrors={setPassErrors}
                        highlight={state.highlight.password}
                    />
                    <span
                        className="absolute right-4 top-5 cursor-pointer"
                        onClick={toggleShowPass}
                    >
                        {showPass ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
                <button
                    type="submit"
                    className="text-white text-md bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-cyan-300  rounded-lg  w-full px-5 py-4 text-center dark:bg-cyan-400 dark:hover:bg-cyan-500 dark:focus:ring-cyan-800 font-semibold"
                >
                    {state.loading ? "Loading..." : "Register"}
                </button>
                <div className="flex items-center justify-center py-2">
                    <span className="text-sm animate-pulse">
                        {state.error && (
                            <span className="text-red-500">{state.error}</span>
                        )}
                    </span>
                </div>
            </div>
            <div className="flex flex-col">
                <ul className="min-h-[293px]  w-[305px] text-left mb-4  p-2 bg-gray-100 rounded-xl pointer-events-none select-none">
                    <div className="my-1 pl-2">Fullname must:</div>
                    {fullNameAndEmailErrors?.nameErrors?.length === 0 && (
                        <div className="flex flex-col gap-2 px-2 text-sm  text-red-500 items-center">
                            <span className=" text-xs mt-0.5 h-[15px] shimmer w-full rounded-sm"></span>
                            <span className=" text-xs h-[15px] shimmer w-full rounded-sm"></span>
                        </div>
                    )}
                    {fullNameAndEmailErrors.nameErrors?.map((error) => (
                        <div className="flex gap-1 pl-2 text-sm  text-red-500 items-center">
                            {error.status ? (
                                <FaTimes />
                            ) : (
                                <FaCheck className="text-green-400" />
                            )}
                            <li className={!error.status && "text-green-500"}>
                                {error.check}
                            </li>
                        </div>
                    ))}
                    <div className="my-1 pl-2">Email must be:</div>
                    {fullNameAndEmailErrors?.emailErrors?.length === 0 && (
                        <div className="flex flex-col gap-2 px-2 text-sm  text-red-500 items-center">
                            <span className=" text-xs mt-0.5 h-[15px] shimmer w-full rounded-sm"></span>
                        </div>
                    )}
                    {fullNameAndEmailErrors.emailErrors?.map((error) => (
                        <div className="flex gap-1 pl-2 text-sm  text-red-500 items-center">
                            {error.status ? (
                                <FaTimes />
                            ) : (
                                <FaCheck className="text-green-400" />
                            )}
                            <li
                                className={
                                    !error.status ? "text-green-500" : ""
                                }
                            >
                                {error.check}
                            </li>
                        </div>
                    ))}
                    <div className="my-1 pl-2">Password must contain:</div>
                    {passErrors?.length === 0 && (
                        <div className="flex flex-col gap-2 px-2 text-sm  text-red-500 items-center">
                            <span className=" mt-0.5 text-xs h-[15px] shimmer w-full rounded-sm"></span>
                            <span className=" text-xs h-[15px] shimmer w-full rounded-sm"></span>
                            <span className=" text-xs h-[15px] shimmer w-full rounded-sm"></span>
                            <span className=" text-xs h-[15px] shimmer w-full rounded-sm"></span>
                            <span className=" text-xs h-[15px] shimmer w-full rounded-sm"></span>
                        </div>
                    )}
                    {passErrors?.length > 0 &&
                        passErrors?.map((error) => (
                            <div className="flex gap-1 pl-2 text-sm  text-red-500 items-center">
                                {error.status ? (
                                    <FaTimes />
                                ) : (
                                    <FaCheck className="text-green-400" />
                                )}
                                <li
                                    className={
                                        !error.status && "text-green-500"
                                    }
                                >
                                    {error.check}
                                </li>
                            </div>
                        ))}
                </ul>
            </div>
        </form>
    );
};

export default RegisterForm;
