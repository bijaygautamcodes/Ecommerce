import Header from "@/components/Header";
import SpecificProduct from "@/components/product/SpecificProduct";
import { getProductByID } from "@/services/product.service";
import React from "react";

export default async function ProductPage({ params }) {
    const { id } = params;
    const product = await getProductByID(id);
    return (
        <>
            <Header />

            <div className="p-16 w-full flex flex-col justify-center items-center">
                <SpecificProduct product={product} />
            </div>
        </>
    );
}
