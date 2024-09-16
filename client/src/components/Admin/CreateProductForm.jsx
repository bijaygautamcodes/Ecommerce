import React, { useRef, useState } from "react";
import Image from "next/image";
import { BiImageAdd } from "react-icons/bi";
import { userState } from "@/atoms/user.atom";
import { useRecoilValue } from "recoil";
import { createProduct } from "@/services/product.service";

const CreateProductForm = ({ callback }) => {
    const user = useRecoilValue(userState);
    const [image, setImage] = useState(null);
    const [imageData, setImageData] = useState(null);
    const filePickerRef = useRef(null);
    const formRef = useRef(null);

    const addImage = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
            setImageData(e.target.files[0]);
        }
        reader.onload = (readerEvent) => {
            setImage(readerEvent.target.result);
        };
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const formData = new FormData(formRef.current);
        formData.append("image", imageData);

        // Upload form data to server or perform other actions
        const data = {
            name: formData.get("name"),
            category: formData.get("category"),
            brand: formData.get("brand"),
            price: parseFloat(formData.get("price")),
            countInStock: parseInt(formData.get("countInStock")),
            description: formData.get("description"),
        };

        const res = await createProduct(data, user.token);
        if (res.status === 201) {
            clearImage();
            formRef.current.reset();
            callback();
        }
    };

    const clearImage = () => {
        setImage(null);
        setImageData(null);
    };

    return (
        <div className="relative flex flex-col gap-1 bg-zinc-100 px-5 py-3">
            <div className="relative h-48 w-full overflow-hidden mb-2">
                {image ? (
                    <>
                        <span
                            className="absolute text-white  bg-red-500 text-sm rounded-md px-1 py-0 bottom-0 right-0 m-3 cursor-pointer "
                            onClick={clearImage}
                        >
                            clear
                        </span>
                        <Image
                            height={192}
                            width={250}
                            src={image}
                            alt="Food Image"
                            className="w-full h-full object-cover"
                            fallback={<div />}
                        />
                    </>
                ) : (
                    <div className=" h-full w-full p-7">
                        <div className="relative border-2  h-full w-full border-zinc-400 rounded-xl border-dashed flex">
                            <input
                                type="file"
                                className=" absolute h-full w-full opacity-0  cursor-pointer"
                                ref={filePickerRef}
                                onChange={addImage}
                            />
                            <BiImageAdd className="w-8 h-8 text-zinc-400 m-auto" />
                        </div>
                    </div>
                )}
            </div>
            <form onSubmit={handleSave} className="space-y-4" ref={formRef}>
                <div className="flex flex-col flex-1">
                    <label htmlFor="name" className="text-sm font-medium mb-1">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="border rounded py-2 px-3"
                        required
                    />
                </div>
                <div className="flex flex-col flex-1">
                    <label
                        htmlFor="category"
                        className="text-sm font-medium mb-1"
                    >
                        Category
                    </label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        className="border rounded py-2 px-3"
                        required
                    />
                </div>
                <div className="flex flex-col flex-1">
                    <label htmlFor="brand" className="text-sm font-medium mb-1">
                        Brand
                    </label>
                    <input
                        type="text"
                        id="brand"
                        name="brand"
                        className="border rounded py-2 px-3"
                        required
                    />
                </div>
                <div className="flex flex-col flex-1">
                    <label htmlFor="price" className="text-sm font-medium mb-1">
                        Price
                    </label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        className="border rounded py-2 px-3 mb-2"
                        min={0}
                        required
                    />
                </div>
                <div className="flex flex-col flex-1">
                    <label
                        htmlFor="countInStock"
                        className="text-sm font-medium mb-1"
                    >
                        Initial Stock
                    </label>
                    <input
                        type="number"
                        id="countInStock"
                        name="countInStock"
                        className="border rounded py-2 px-3"
                        min={0}
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label
                        htmlFor="description"
                        className="text-sm font-medium mb-1"
                    >
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        rows="4"
                        className="border rounded py-2 px-3"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                >
                    Create Product
                </button>
            </form>
        </div>
    );
};

export default CreateProductForm;
