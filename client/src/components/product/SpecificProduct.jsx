"use client";

import React from "react";
import CreateReviewForm from "./CreateReviewForm";
import Reviews from "./Reviews";
import { useRecoilState, useRecoilValue } from "recoil";
import { cartOpenState, cartState } from "@/atoms/cart.atom";
import { useRouter } from "next/navigation";
import { userState } from "@/atoms/user.atom";
import AddToCartButton from "./AddToCartButton";

const SpecificProduct = ({ product }) => {
    const user = useRecoilValue(userState);
    const router = useRouter();
    const [cart, setCart] = useRecoilState(cartState);
    const [cartOpen, setCartOpen] = useRecoilState(cartOpenState);
    const handleAddToCart = () => {
        setCart([...cart, { ...product, quantity: 1 }]);
    };
    const handleBuyNow = () => {
        if (!user || !user.token)
            return router.push(`/auth?callback=/product/${product._id}`);
        setCart([{ ...product, quantity: 1 }]);
        setCartOpen(true);
    };
    return (
        <div className="max-w-6xl mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:order-1 bg-zinc-100 w-full h-full max-h-[400px]">
                    <img
                        src={product?.image}
                        alt={product?.name}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="md:order-1 flex flex-col justify-evenly">
                    <h1 className="text-3xl font-semibold mb-2">
                        {product?.name}
                    </h1>
                    <p className="text-gray-600 mb-2">By {product?.brand}</p>
                    <p className="text-gray-800 mb-4">{product?.description}</p>
                    <p className="text-gray-600 mb-2">
                        Category: {product?.category}
                    </p>
                    <p className="text-green-600 font-semibold mb-2 text-2xl italic">
                        ${product?.price}
                    </p>
                    <p className="text-gray-600 mb-2">
                        In Stock: {product?.countInStock}
                    </p>
                    <div className="flex items-center mb-2">
                        <span className="text-yellow-400">
                            {product?.rating}
                        </span>
                        <span className="ml-1 text-gray-600">
                            ({product?.reviews} reviews)
                        </span>
                    </div>
                    <div className="flex space-x-4">
                        <AddToCartButton data={product} />
                        <AddToCartButton data={product} varient="buy-now" />
                    </div>
                </div>
            </div>
            <CreateReviewForm
                onReviewSubmit={() => null}
                productId={product._id}
            />
            <Reviews reviews={product?.reviews} />
        </div>
    );
};

export default SpecificProduct;
