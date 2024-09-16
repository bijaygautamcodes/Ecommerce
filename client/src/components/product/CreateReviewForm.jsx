"use client";

import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const CreateReviewForm = ({ productId, onReviewSubmit }) => {
    const [name, setName] = useState("");
    const [rating, setRating] = useState(4);
    const [comment, setComment] = useState("");

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const newReview = {
            name,
            rating,
            comment,
            productId,
        };

        console.log(newReview);
    };

    const handleRatingClick = (selectedRating) => {
        setRating(selectedRating);
    };

    return (
        <div className="mt-12 bg-zinc-100 px-8 py-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-4">Write a Review</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                    <label
                        htmlFor="comment"
                        className="block text-gray-700 font-semibold pb-4"
                    >
                        Your Comment
                    </label>
                    <textarea
                        type="text"
                        id="comment"
                        className="w-full border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-500"
                        value={name}
                        rows="5"
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="flex items-center justify-between">
                    <div className="mb-4">
                        <label
                            htmlFor="rating"
                            className="block text-gray-700 font-semibold pb-2"
                        >
                            Rating
                        </label>
                        <div className="flex text-4xl text-yellow-400 ">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <FaStar
                                    key={star}
                                    className={`cursor-pointer  ${
                                        star <= rating
                                            ? "fill-current"
                                            : "fill-current text-gray-300"
                                    }`}
                                    onClick={() => handleRatingClick(star)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateReviewForm;
