"use client";

import Link from "next/link";
import { BiCartDownload, BiMenu } from "react-icons/bi";

import dynamic from "next/dynamic";
import InfiniteCircularProgressBar from "./InfiniteCircularProgressBar";

const UserOptionsBar = dynamic(() => import("./UserOptionsBar"), {
    ssr: false,
    loading: () => (
        <div className="relative h-8 w-8 rounded-full">
            <InfiniteCircularProgressBar />
        </div>
    ),
});

const CartButton = dynamic(() => import("./CartButton"), {
    ssr: false,
    loading: () => (
        <div className="relative p-2 cursor-pointer no-select">
            <BiCartDownload className="inline-block text-3xl text-black animate-pulse" />
        </div>
    ),
});

const Cart = dynamic(() => import("./Cart"), {
    ssr: false,
});

const Header = () => {
    return (
        <div>
            <nav className=" fixed w-full bg-white border-gray-200 dark:bg-white z-50 border-b ">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link
                        passHref={true}
                        href="/"
                        className="flex items-center h-10"
                    >
                        {/* <Image
                            src="/assets/svgs/logo/logo.svg"
                            height={40}
                            width={40}
                            className="mr-3"
                            alt="Logo of the website"
                        /> */}
                        <span className="self-center text-xl uppercase font-semibold whitespace-nowrap hidden md:inline-block">
                            NiceShop
                        </span>
                    </Link>
                    <div className="flex md:order-2 gap-4 justify-center items-center">
                        <CartButton />
                        <UserOptionsBar />
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
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
                        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border md:flex-row md:space-x-8 md:mt-0 md:border-0 text-md">
                            <li>
                                <a
                                    href="#"
                                    className="block py-2 pl-3 pr-4 text-gray-900 rounded  md:p-0 hover:text-[#94d82d]"
                                >
                                    Home
                                </a>
                            </li>

                            <li>
                                <Link
                                    scroll={true}
                                    passHref={true}
                                    href="/#top-products"
                                    className="block py-2 pl-3 pr-4 text-gray-900 rounded  md:p-0 hover:text-[#94d82d]"
                                >
                                    Featured
                                </Link>
                            </li>

                            <li>
                                <Link
                                    scroll={true}
                                    passHref={true}
                                    href="/#products"
                                    className="block py-2 pl-3 pr-4 text-gray-900 rounded  md:p-0 hover:text-[#94d82d]"
                                >
                                    Products
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="pb-[78px]"></div>
            {/* Cart  */}
            <Cart />
        </div>
    );
};

export default Header;
