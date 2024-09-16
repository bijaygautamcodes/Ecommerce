import { cartOpenState, cartState } from "@/atoms/cart.atom";
import React from "react";
import { BiCart } from "react-icons/bi";
import { useRecoilState, useRecoilValue } from "recoil";

const CartButton = () => {
    const [isCartOpen, setIsCartOpen] = useRecoilState(cartOpenState);
    const toggleCart = () => setIsCartOpen(!isCartOpen);
    const cart = useRecoilValue(cartState);
    return (
        <div
            className="relative p-2 cursor-pointer no-select"
            onClick={toggleCart}
        >
            {cart.length > 0 && (
                <span className="animate-pulse absolute px-1.5 font-bold text-sm bg-red-500  text-white right-0 top-0 rounded-full">
                    {cart.length}
                </span>
            )}
            <BiCart className="inline-block text-3xl text-black" />
        </div>
    );
};

export default CartButton;
