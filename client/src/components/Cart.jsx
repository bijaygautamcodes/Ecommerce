import { cartOpenState, cartState } from "@/atoms/cart.atom";
import { userState } from "@/atoms/user.atom";
import { createOrder } from "@/services/order.service";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BiX } from "react-icons/bi";

import { useRecoilState, useRecoilValue } from "recoil";

const Cart = () => {
    const router = useRouter();
    const pathname = usePathname();
    const user = useRecoilValue(userState);
    const [isCartOpen, setIsCartOpen] = useRecoilState(cartOpenState);
    const toggleCart = () => setIsCartOpen(!isCartOpen);
    const [cart, setCart] = useRecoilState(cartState);
    const [initiateCheckout, setInitiateCheckout] = useState(false);
    const [total, setTotal] = useState(0);

    const handleCheckout = async () => {
        if (!user) {
            setIsCartOpen(false);
            router.push(`/auth?callback=${pathname}`);
        }
        setInitiateCheckout(true);
        const orders = cart.map((item) => ({
            product: item._id,
            quantity: item.quantity,
        }));
        const res = await createOrder(orders, user?.token);
        console.log(res.status);
        if (res?.status === 201) {
            setTimeout(() => {
                setInitiateCheckout(false);
                setCart([]);
            }, 3000);
        }
    };

    useEffect(() => {
        setTotal(
            cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
        );
    }, [cart]);

    const handleRemoveFromCart = (e) => {
        const id = e.target.dataset.id;
        console.log(id);
        console.log(cart.length);
        const newCart = cart.filter((item) => item._id !== id);
        console.log(newCart.length);
        setCart(newCart);
    };
    return (
        <div
            className={`fixed inset-0 z-50 transition-all ${
                isCartOpen ? "opacity-100 " : "opacity-0  pointer-events-none"
            }`}
        >
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div
                className={`absolute inset-y-0  max-w-full flex ${
                    isCartOpen ? "right-0" : "-right-full"
                } transition-all duration-300 ease-in-out`}
            >
                <div className="relative w-screen max-w-md">
                    <div className="h-full flex flex-col py-6 bg-white shadow-xl ">
                        <div className="px-4 sm:px-6 ">
                            <div className="flex items-start justify-between">
                                <h2 className="text-lg font-medium text-gray-900">
                                    Your cart
                                </h2>
                                <div className="ml-3 h-7 flex items-center">
                                    <button
                                        type="button"
                                        className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                                        onClick={toggleCart}
                                    >
                                        <span className="sr-only">
                                            Close panel
                                        </span>
                                        <BiX className="h-6 w-6" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 relative flex-1 px-4 sm:px-6 ">
                            {cart.length === 0 && (
                                <div className="h-full border-2 border-dashed border-gray-200 ">
                                    <div className="flex flex-col justify-center items-center h-full">
                                        <h1 className="text-2xl font-bold text-gray-400">
                                            Your cart is empty
                                        </h1>
                                        <p className="text-gray-400">
                                            Add items to your cart to continue
                                        </p>
                                    </div>
                                </div>
                            )}

                            {cart.length > 0 && (
                                <div
                                    className={`relative h-[calc(100vh-220px)] border-2  border-gray-200 flex flex-col p-4 gap-4  nice-scroll-bar overflow-x-hidden ${
                                        initiateCheckout
                                            ? "overflow-hidden"
                                            : "overflow-y-auto"
                                    }`}
                                >
                                    <div>
                                        <div
                                            className={`absolute left-0 right-0 h-full flex flex-col justify-center  transition duration-500 delay-700 items-center ${
                                                initiateCheckout
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                            }`}
                                        >
                                            <h1 className="text-2xl font-bold text-[#94d82d] animate-bounce">
                                                Order has been placed!
                                            </h1>
                                            <p className="text-gray-400">
                                                Payment: Cash-On-Grab
                                            </p>
                                        </div>
                                        {cart.map((item, index) => (
                                            <div
                                                className="flex item-center gap-4 transition-all ease-in-out duration-1000"
                                                style={{
                                                    transform: `translateX(${
                                                        initiateCheckout
                                                            ? `${
                                                                  index % 2 ===
                                                                  0
                                                                      ? ""
                                                                      : "-"
                                                              }100%`
                                                            : "0"
                                                    }) scale(${
                                                        initiateCheckout
                                                            ? "0"
                                                            : "1"
                                                    })`,
                                                    opacity: `${
                                                        initiateCheckout
                                                            ? "0"
                                                            : "1"
                                                    }`,
                                                    animationDelay: `${
                                                        index * 0.2
                                                    }s`,
                                                }}
                                                key={index}
                                            >
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-16 h-16 rounded-md object-cover opacity-80 hidden sm:block"
                                                />
                                                <div
                                                    className="flex flex-col gap-1 w-full"
                                                    key={index}
                                                >
                                                    <h4 className="whitespace-nowrap  text-[#372b22] text-xl font-medium border-b-2 border-b-[#11111188] border-dashed pb-2 w-full flex justify-between">
                                                        <span className="flex ">
                                                            <div className="max-w-[180px] truncate">
                                                                {item.name}
                                                            </div>{" "}
                                                            x {item.quantity}
                                                        </span>
                                                        <span className="text-xl italic font-black float-right">
                                                            ${item.price}
                                                        </span>
                                                    </h4>
                                                    <div className="flex justify-between  items-center gap-2">
                                                        <button
                                                            className="text-[#372b22]  rounded-full   text-xl"
                                                            onClick={
                                                                handleRemoveFromCart
                                                            }
                                                            data-id={item._id}
                                                        >
                                                            remove
                                                        </button>
                                                        <p className="text-[#372b22]  text-xl">
                                                            subtotal: $
                                                            {(
                                                                item.price *
                                                                item.quantity
                                                            ).toFixed(2)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <div className="p-4 flex flex-col gap-4">
                                <div className="flex justify-between items-center">
                                    <h4 className="text-[#372b22] text-xl font-medium">
                                        Total
                                    </h4>
                                    <h4 className="text-[#372b22] text-xl font-medium">
                                        ${total.toFixed(2)}
                                    </h4>
                                </div>
                                <button
                                    className="bg-[#372b22] text-white px-4 py-2 rounded-full uppercase font-bold text-xl"
                                    onClick={handleCheckout}
                                >
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
