import AdminHeader from "@/components/Admin/AdminHeader";
import React from "react";

export default function AdminLayout({ children }) {
    return (
        <main>
            <AdminHeader />
            {children}
        </main>
    );
}
