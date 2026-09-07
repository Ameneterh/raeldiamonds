import React, { useEffect, useState } from "react";
import TitleText from "./TitleText";
import { FaStar } from "react-icons/fa";
import { Button, Form, Input, message } from "antd";
import RatingComponent from "./RatingComponent";
import { AddReview, EditProduct } from "../apiCalls/products.js";
import { AddNotification } from "../apiCalls/notifications.js";

export default function ProductReviewRating({ getData, product }) {
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState(null);

  const handleSubmitRate = async () => {
    if (comment.length > 100) {
      return;
    }

    const formData = {
      rating: rating,
      comment: comment,
    };
    try {
      const isReviewed = product.reviews.find(
        (review) => review.buyer._id.toString() === user._id.toString(),
      );

      if (isReviewed) {
        // product.reviews.forEach((review) => {
        //   if (review.buyer._id.toString() === user._id.toString()) {
        //     response = AddReview({
        //       ...formData,
        //       product: product._id,
        //       seller: product.seller._id,
        //       buyer: user._id,
        //     });
        //   }
        // });
        message.error("You have already reviewed this product!");
        return;
      }
      const response = await AddReview({
        ...formData,
        product: product._id,
        seller: product.seller._id,
        buyer: user._id,
      });

      //   dispatch(setLoader(false));
      if (response.success) {
        setRating(null);
        setComment(" ");
        message.success("New Review Added Successfully");

        // send notification to seller
        await AddNotification({
          title: "A New Review has been placed",
          message: `"${user.name}" has added a review on your product, "${product.name}"`,
          user: product.seller._id,
          onClick: "/seller-profile",
          read: false,
        });
        getData();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      //   dispatch(setLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    const updateData = {
      ratings:
        product?.reviews?.reduce((acc, item) => item?.rating + acc, 0) /
        product?.reviews?.length,
      numOfReviews: product?.reviews?.length,
    };

    const updateProduct = async () => {
      await EditProduct(product._id, updateData);
    };
    updateProduct();
    getData();
  }, [product?.reviews?.length]);

  return (
    <div className="mt-4">
      <div className="text-xl">
        <TitleText text1={"review this"} text2={"product"} />
      </div>
      <p className="text-sm">
        Please, take a few minutes to give us a feedback on this product.
      </p>
      <div className="flex items-center gap-4 mt-3">
        <p>Give us some stars</p>
        <RatingComponent
          rating={rating}
          setRating={setRating}
          getData={getData}
        />
      </div>
      <div className="flex justify-between items-end gap-3">
        <div className="flex flex-col mt-3 flex-1">
          <p className="mb-1 text-xs flex justify-between">
            Your Comment:{" "}
            <span>
              {comment ? comment.length : 0} of {100}
            </span>
          </p>
          <textarea
            className="p-1"
            type="text"
            id="message"
            value={comment}
            maxLength={100}
            rows={4}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <Button type="primary" onClick={() => handleSubmitRate()}>
          Submit Review
        </Button>
      </div>
    </div>
  );
}
