"use client";

import { userState } from "@/atoms/user.atom";
import { getOrders } from "@/services/order.service";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import OrderDataTable from "./OrderDataTable";

const AdminDashboard = () => {
    const user = useRecoilValue(userState);
    const [orders, setOrders] = useState([]);
    const fetchOrders = async () => {
        if (!user?.isAdmin) return;
        const res = await getOrders(user.token);
        if (res.status === 200) setOrders(res.data);
        console.log(res.data);
    };
    useEffect(() => {
        if (!user?.isAdmin) return;
        fetchOrders();
    }, [user?.isAdmin]);

    return (
        <div className="py-6 px-4  mx-auto flex gap-20 w-full max-w-6xl">
            <OrderDataTable data={orders} callback={fetchOrders} />
        </div>
    );
};

export default AdminDashboard;
