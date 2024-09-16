"use client";
import { cartOpenState, cartState } from "@/atoms/cart.atom";
import React from "react";
import { useRecoilState } from "recoil";

const AddToCartButton = ({ data, varient }) => {
    const [cart, setCart] = useRecoilState(cartState);
    const [, setOpen] = useRecoilState(cartOpenState);

    const handleAddToCart = () => {
        const exist = cart.find((item) => item._id === data._id);
        if (exist) {
            setCart(
                cart.map((item) =>
                    item._id === data._id
                        ? { ...exist, quantity: exist.quantity + 1 }
                        : item
                )
            );
        } else {
            setCart([...cart, { ...data, quantity: 1 }]);
        }
    };

    const handleBuyNow = () => {
        const exist = cart.find((item) => item._id === data._id);
        if (exist) {
            setCart(
                cart.map((item) =>
                    item._id === data._id
                        ? { ...exist, quantity: exist.quantity + 1 }
                        : item
                )
            );
        } else {
            setCart([...cart, { ...data, quantity: 1 }]);
        }
        setOpen(true);
    };

    if (varient === "buy-now") {
        return (
            <button
                className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                onClick={handleBuyNow}
            >
                Buy Now
            </button>
        );
    } else
        return (
            <button
                onClick={handleAddToCart}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Add to cart
            </button>
        );
};

export default AddToCartButton;
