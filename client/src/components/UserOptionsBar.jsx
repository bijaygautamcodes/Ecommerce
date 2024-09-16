"use client";

import { FaUserCircle } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import { useRecoilState } from "recoil";
import { userState } from "@/atoms/user.atom";
import Link from "next/link";

const UserOptionsBar = () => {
    const [user, setUser] = useRecoilState(userState);
    const handleLogout = () => setUser(null);
    return (
        <div
            className="relative rounded-full h-8 w-8"
            aria-label="Login/Sign-up"
        >
            {!user ? (
                <Link
                    href="/auth"
                    title="SignIn/SignUp"
                    className=" w-full h-full inline-flex justify-center items-center cursor-pointer z-10  border-2 border-white rounded-full"
                >
                    <FaUserCircle className="w-full h-full fill-gray-400 hover:fill-gray-200" />
                </Link>
            ) : (
                <button
                    className=" w-full h-full inline-flex justify-center items-center cursor-pointer z-10  border-2 border-white rounded-full"
                    onClick={handleLogout}
                >
                    <BiLogOutCircle className="w-full h-full fill-gray-400 hover:fill-gray-200" />
                </button>
            )}
        </div>
    );
};

export default UserOptionsBar;
