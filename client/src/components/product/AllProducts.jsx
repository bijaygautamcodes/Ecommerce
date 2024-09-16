"use client";

import { useRouter } from "next/navigation";
import ProductCard from "./ProductCard";
import { useState } from "react";
import { BiSearch, BiX } from "react-icons/bi";

const AllProducts = ({ data, compact = false, callback = null }) => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const handleSearchChange = (event) => setSearchQuery(event.target.value);
    const handleClearSearch = () => setSearchQuery("");
    const filteredProducts = data.filter((product) =>
        product?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase())
    );

    return (
        <section
            className={`w-full scroll-m-24 ${compact ? "mt-0" : "mt-10"}`}
            id="products"
        >
            <div className="flex justify-between w-full">
                <h2
                    className={`mb-4   ${
                        compact
                            ? "text-2xl font-semibold"
                            : "text-4xl tracking-tight font-bold"
                    }`}
                >
                    Products
                </h2>
                <form className="flex-2 sm:flex-none z-10">
                    <div className="relative">
                        <input
                            className="block w-full px-3 py-2 pr-6 border border-gray-300 rounded-lg"
                            placeholder="Product Name"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            required
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 ">
                            {searchQuery !== "" ? (
                                <BiX
                                    className="text-xl text-zinc-400 cursor-pointer z10"
                                    onClick={handleClearSearch}
                                />
                            ) : (
                                <BiSearch className="text-xl text-zinc-400" />
                            )}
                        </div>
                    </div>
                </form>
            </div>

            <div
                className={`hidden mt-4 md:grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch flex-wrap w-full ${
                    compact
                        ? ""
                        : " md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-4"
                }`}
            >
                {filteredProducts.length === 0 && (
                    <div className="flex justify-center items-center w-full">
                        <h1 className="text-2xl text-gray-400 text-center">
                            No Products Found
                        </h1>
                    </div>
                )}
                {filteredProducts.map((data, index) => (
                    <ProductCard
                        data={data}
                        key={index}
                        compact={compact}
                        callback={callback}
                    />
                ))}
            </div>
        </section>
    );
};

export default AllProducts;
