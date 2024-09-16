"use client";

import { updateOrderStatus } from "@/services/order.service";
import DataTable from "react-data-table-component";
import { getTokenFromStorage } from "@/utils/utils";

const customStyles = {
    rows: {
        style: {
            minHeight: "72px",
            fontSize: "14px",
            padding: "8px",
        },
    },
    pagination: {
        style: {
            borderTop: "none",
        },
    },
    headCells: {
        style: {
            fontWeight: "bold",
            fontSize: "16px",
        },
    },
};

const columns = (callback) => [
    {
        name: "SN",
        selector: "sn",
        sortable: true,
        width: "80px",
    },

    {
        name: "Orders",
        cell: (row) => (
            <div className="flex flex-wrap gap-1  items-center">
                {row?.orderItems?.map((o) => (
                    <div
                        key={o?._id}
                        className="bg-gray-200 rounded-md px-1 py-0.5"
                    >
                        {o?.quantity} x {o?.product?.name}
                    </div>
                ))}
            </div>
        ),
        width: "340px",
    },
    {
        name: "User",
        selector: "user",
        sortable: true,
        width: "180px",
        cell: (row) => (
            <div className="flex flex-col gap-1">
                <span className="text-gray-700">{row?.user?.fullname}</span>
            </div>
        ),
    },
    {
        name: "Date ",
        selector: "createdAt",
        sortable: true,
        cell: (row) =>
            new Date(row.createdAt).toDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            }),
    },
    {
        name: "Time",
        selector: "createdAt",
        sortable: true,
        cell: (row) =>
            new Date(row.createdAt).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            }),
    },
    {
        name: "Status",
        selector: "status",
        sortable: true,
        width: "120px",
    },
    {
        name: "Mark Order As",
        width: "220px",
        cell: (row) => (
            <div className=" flex gap-2">
                {row.status === "pending" && (
                    <button
                        onClick={() =>
                            updateOrderStatus(
                                row._id,
                                "processing",
                                getTokenFromStorage()
                            ).finally(() => callback())
                        }
                        className=" bg-cyan-500 text-white px-2 py-1 rounded-md"
                    >
                        Processing
                    </button>
                )}
                {row.status === "processing" && (
                    <button
                        onClick={() =>
                            updateOrderStatus(
                                row._id,
                                "completed",
                                getTokenFromStorage()
                            ).finally(() => callback())
                        }
                        className=" bg-green-500 text-white px-2 py-1 rounded-md"
                    >
                        Completed
                    </button>
                )}
                {row.status === "pending" && (
                    <button
                        onClick={() =>
                            updateOrderStatus(
                                row._id,
                                "rejected",
                                getTokenFromStorage()
                            ).finally(() => callback())
                        }
                        className=" bg-red-500 text-white px-2 py-1 rounded-md"
                    >
                        Rejected
                    </button>
                )}
            </div>
        ),
    },
];

const OrderDataTable = ({ data, callback }) => {
    data = data?.map((o, i) => ({ ...o, sn: i + 1 }));
    return (
        <div className="flex flex-col gap-4 w-full">
            <p className="text-2xl font-semibold text-gray-700">
                Pending Orders
            </p>
            <div>
                <DataTable
                    columns={columns(callback)}
                    data={data?.filter(
                        (o) =>
                            o.status === "pending" || o.status === "processing"
                    )}
                    customStyles={customStyles}
                    pagination
                    paginationPerPage={8}
                    paginationRowsPerPageOptions={[8, 16, 32, 64]}
                />
            </div>
            <p className="text-2xl font-semibold text-gray-700">
                Resolved Orders
            </p>
            <div>
                <DataTable
                    columns={[...columns(callback)].slice(0, -1)}
                    data={data?.filter(
                        (o) =>
                            o.status === "completed" || o.status === "rejected"
                    )}
                    customStyles={customStyles}
                    pagination
                    paginationPerPage={8} // Adjust the number of rows per page
                    paginationRowsPerPageOptions={[8, 16, 32, 64]}
                />
            </div>
        </div>
    );
};

export default OrderDataTable;
