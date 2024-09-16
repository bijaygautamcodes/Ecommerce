"use client";

import { userState } from "@/atoms/user.atom";
import { deleteProduct } from "@/services/product.service";
import React from "react";
import { useRecoilValue } from "recoil";

const RemoveProductButton = ({ id, callback }) => {
    const user = useRecoilValue(userState);
    const handleRemove = () => {
        if (!user?.isAdmin) return;
        deleteProduct(id, user.token).then((res) => {
            if (res.status === 200) callback();
        });
    };
    return (
        <button
            className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            onClick={handleRemove}
        >
            Remove
        </button>
    );
};

export default RemoveProductButton;
