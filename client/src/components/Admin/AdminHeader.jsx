"use client";

import Link from "next/link";
import { BiMenu } from "react-icons/bi";
import dynamic from "next/dynamic";
import InfiniteCircularProgressBar from "../InfiniteCircularProgressBar";
import useAdmin from "@/hooks/useAdmin";

const UserOptionsBar = dynamic(() => import("../UserOptionsBar"), {
    ssr: false,
    loading: () => (
        <div className="relative h-8 w-8 rounded-full">
            <InfiniteCircularProgressBar />
        </div>
    ),
});

const AdminHeader = () => {
    useAdmin();
    return (
        <div>
            <nav className="fixed w-full bg-white border-gray-200 dark:bg-white z-50 border-b">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 py-6">
                    <Link passHref href="/">
                        <span className="self-center text-xl uppercase font-semibold whitespace-nowrap hidden md:inline-block">
                            NiceShop ADMIN
                        </span>
                    </Link>

                    <div className="items-center justify-between hidden w-full md:flex md:w-auto ">
                        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border md:flex-row md:space-x-8 md:mt-0 md:border-0 text-md">
                            <li>
                                <Link
                                    href="/admin"
                                    className="block py-2 pl-3 pr-4 text-gray-900 rounded  md:p-0 hover:text-[#94d82d]"
                                >
                                    Dashboard
                                </Link>
                            </li>

                            <li>
                                <Link
                                    scroll={true}
                                    passHref={true}
                                    href="/admin/products"
                                    className="block py-2 pl-3 pr-4 text-gray-900 rounded  md:p-0 hover:text-[#94d82d]"
                                >
                                    Products
                                </Link>
                            </li>

                            <li>
                                <Link
                                    scroll={true}
                                    passHref={true}
                                    href="/admin/users"
                                    className="block py-2 pl-3 pr-4 text-gray-900 rounded  md:p-0 hover:text-[#94d82d]"
                                >
                                    Users
                                </Link>
                            </li>
                        </ul>
                        <div
                            className="relative rounded-full h-8 w-8 ml-6"
                            aria-label="Login/Sign-up"
                        >
                            <UserOptionsBar />
                        </div>
                        <button
                            data-collapse-toggle="navbar-cta"
                            type="button"
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 "
                            aria-controls="navbar-cta"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            <BiMenu className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </nav>
            <div className="pb-[90px]"></div>
        </div>
    );
};
export default AdminHeader;
