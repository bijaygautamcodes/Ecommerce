import React, { useState, useEffect } from "react";
import Moment from "react-moment";

const Reviews = ({ productId }) => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        // Fetch reviews for the given productId
    }, [productId]);

    return (
        <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Product Reviews</h2>
            {reviews.length === 0 ? (
                <p>No reviews yet.</p>
            ) : (
                <ul>
                    {reviews.map((review) => (
                        <li key={review._id} className="mb-4">
                            <div className="flex items-center">
                                <span className="text-yellow-400">
                                    {review.rating}
                                </span>
                                <span className="ml-1 text-gray-600">
                                    stars
                                </span>
                            </div>
                            <p className="text-gray-800">{review.comment}</p>
                            <p className="text-gray-600">
                                by {review.name} -{" "}
                                <Moment fromNow>{review.createdAt}</Moment>
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Reviews;
