import React, { useContext, useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import {
  FaStar,
  FaStarHalf,
  FaSquareWhatsapp,
  FaRegFaceSadTear,
} from "react-icons/fa6";
import { MdAddIcCall, MdCall } from "react-icons/md";
import { AiOutlineProduct } from "react-icons/ai";
import MainLayout from "../layout/MainLayout";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ShopContext } from "../context/shopContext";
import RelatedProducts from "../Components/RelatedProducts";
import {
  GetAllBids,
  GetAllReviews,
  GetProductById,
  GetProducts,
} from "../apiCalls/products";
import moment from "moment";
import { Button, message } from "antd";
import BidsModal from "./sellerProfile/BidsModal";
import ProductReviewRating from "../Components/ProductReviewRating";
import ReviewDisplayComponent from "../Components/ReviewDisplayComponent";
import RatingComponent from "../Components/RatingComponent";

export default function ProductPage() {
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showAddBidsModal, setShowAddBidsModal] = useState(false);

  const { productId } = useParams();
  const { currency } = useContext(ShopContext);

  // console.log(product.reviews);

  const getData = async () => {
    try {
      const response = await GetProductById(productId);

      if (response.success) {
        const bidsResponse = await GetAllBids({ product: productId });
        const reviewsResponse = await GetAllReviews({ product: productId });
        setProduct({
          ...response.data,
          bids: bidsResponse.data,
          reviews: reviewsResponse.data,
        });
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <MainLayout>
      {product ? (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
            {/* product images */}
            <div className="flex flex-col gap-2">
              <img
                src={product.images[selectedImageIndex]}
                alt=""
                className="w-full h-96 object-cover rounded-md border border-solid border-gray-300"
              />

              <div className="flex gap-2 p-2 bg-black bg-opacity-20 mt-2 rounded">
                {product.images.map((image, index) => {
                  return (
                    <img
                      // onClick={() => setImage(image)}
                      src={image}
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`w-20 h-20 object-cover cursor-pointer rounded-md border border-solid border-gray-300
                        ${
                          selectedImageIndex === index
                            ? "border-4 border-red-700 border-solid p-1 bg-white"
                            : ""
                        }
                    `}
                    />
                  );
                })}
              </div>
              <div className="flex items-center gap-1">
                <h1 className="text-sm text-gray-900">Added on</h1>
                <span className="text-xs text-gray-700">
                  {moment(product.createdAt).format("MMM DD, YYYY")} at{" "}
                  {moment(product.createdAt).format("hh:mm A")}
                </span>
              </div>

              {/* product reviews and rating input */}
              <ProductReviewRating getData={getData} product={product} />
            </div>

            {/* product information */}
            <div className="flex-1">
              <div className="flex flex-col gap-1">
                <h1 className="font-medium text-2xl text-blue-950">
                  {product.product_name}
                </h1>
                <hr className="h-[1.5px] flex-1 my-1" />
                <p className="text-gray-500 text-sm">
                  {product.product_description}
                </p>
              </div>

              {/* product details */}
              <hr className="my-3" />
              <h1 className="text-xl text-blue-950">Product Details</h1>
              <div className="flex items-center gap-1 mt-5 text-xl text-orange-500">
                {product?.reviews?.length > 0 ? (
                  <>
                    <RatingComponent rating={Math.round(product.ratings)} />

                    <p className="text-sm text-gray-400 ml-2">
                      From {product.reviews.length}{" "}
                      {product.reviews.length > 1 ? "Reviewers" : "Reviewer"}
                    </p>
                  </>
                ) : (
                  <div>No Product Reviews</div>
                )}
              </div>
              <p className="flex items-center gap-5 mt-5">
                <div className="flex flex-col">
                  <span className="text-sm -mb-1">Asking Price:</span>
                  <div className="flex items-center  text-xl font-medium">
                    {currency}
                    {product.asking_price.toLocaleString()}
                  </div>
                </div>

                <span className="p-2 rounded bg-green-500 text-white text-xs font-medium">
                  {product.deliveryincluded
                    ? "Shipping Included"
                    : "Shipping Not Included"}
                </span>
              </p>

              <div className="flex flex-col text-gray-700 mt-3 text-sm">
                <div className="grid grid-cols-2">
                  <p>Category:</p>
                  <p className="capitalize">
                    {product.category.split("_").join(" & ")}
                  </p>
                </div>
                <div className="grid grid-cols-2">
                  <p>Sub Category:</p>
                  <p className="capitalize">{product.sub_category}</p>
                </div>
                <div className="grid grid-cols-2">
                  <p>Pay on Delivery:</p>
                  <p className="capitalize">
                    {product.payondelivery ? "Yes" : "No"}
                  </p>
                </div>
              </div>

              {/* seller details */}
              <hr className="my-3" />
              <div className="text-sm text-gray-500 flex flex-col gap-1">
                <h1 className="text-xl text-blue-950">Seller Details</h1>
                <div className="grid grid-cols-2">
                  <p>Name of Seller:</p>
                  <p className="capitalize">{product.seller.fullname}</p>
                </div>
                <div className="grid grid-cols-2">
                  <p>Seller's Email:</p>
                  <Link to={`mailto:${product.seller.email}`} className="">
                    {product.seller.email}
                  </Link>
                </div>
                <div className="grid grid-cols-2">
                  <p>Seller's Phone:</p>
                  <div className="flex gap-2">
                    <Link
                      to={`tel:+${product.seller.phone}`}
                      className="flex items-center p-1 text-blue-500 hover:bg-blue-100 gap-1 rounded"
                    >
                      <MdCall className="w-4 h-4" />
                      Call
                    </Link>
                    <Link
                      to={`https://wa.me/${product.seller.phone}`}
                      className="flex items-center p-1 text-green-500 hover:bg-green-50 gap-1 rounded"
                    >
                      <FaSquareWhatsapp className="w-4 h-4" />
                      WhatsApp
                    </Link>
                  </div>
                </div>
              </div>

              {/* bids placement */}
              <hr className="my-3" />
              <div className="flex flex-col">
                <div className="flex justify-between items-center mb-5">
                  <h1 className="text-xl text-blue-950">BIDS PLACEMENT</h1>
                  <Button
                    type="default"
                    onClick={() => setShowAddBidsModal(true)}
                    disabled={!user || user._id === product.seller._id}
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="Login to Bid!"
                  >
                    PLACE BID
                  </Button>
                  {!user ? <Tooltip id="my-tooltip" /> : ""}
                </div>

                {/* show bids on product page */}
                <div className="flex items-center flex-col lg:flex-row gap-2 w-full">
                  {product?.showBidsOnProductsPage &&
                    product?.bids?.map((bid, index) => {
                      return (
                        <div
                          key={index}
                          className="border border-gray-300 border-solid p-2 rounded bg-gray-50 mt-1 flex-1 w-full"
                        >
                          <div className="grid grid-cols-[0.5fr_1fr] text-gray-700 text-xs">
                            <span>Bidder's Name:</span>
                            <span className="font-bold">
                              {bid?.buyer?.fullname}
                            </span>
                          </div>
                          <div className="grid grid-cols-[0.5fr_1fr] text-gray-600 text-xs">
                            <span>Bid Amount:</span>
                            <span className="font-bold flex items-center">
                              {currency}
                              {bid?.bidAmount?.toLocaleString()}
                            </span>
                          </div>
                          <div className="grid grid-cols-[0.5fr_1fr] text-gray-600 text-xs">
                            <span>Date Bidded:</span>
                            <span className="font-bold flex items-center">
                              {moment(bid?.createdAt).format(
                                "MMM DD, YYYY, h:mm A",
                              )}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                </div>

                {showAddBidsModal && (
                  <BidsModal
                    product={product}
                    reloadData={getData}
                    showBidsModal={showAddBidsModal}
                    setShowBidsModal={setShowAddBidsModal}
                  />
                )}
              </div>
            </div>
          </div>

          {/* description and product review section */}
          <div className="mt-10">
            <div className="flex">
              <p className="border border-solid border-b-transparent border-gray-300 px-4 py-3 text-sm rounded-tl-md rounded-tr-md">
                {product?.reviews?.length > 0 ? product?.reviews?.length : ""}{" "}
                {product?.reviews?.length === 0
                  ? "No User Reviews"
                  : product?.reviews?.length > 1
                    ? "User Reviews"
                    : "User Review"}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 border border-l-transparent border-r-transparent border-b-transparent border-solid border-gray-300 text-sm text-gray-500 px-2 py-2">
              {product?.reviews?.length > 0 ? (
                product?.reviews?.slice(0, 6).map((review, index) => {
                  return (
                    <ReviewDisplayComponent
                      key={index}
                      avatar={review.buyer.avatar}
                      name={review.buyer.fullname}
                      stars={review.rating}
                      comment={review.comment}
                      createdAt={review.createdAt}
                    />
                  );
                })
              ) : (
                <div className="w-full p-4 text-center">
                  <p>
                    <span className="font-bold">{product.product_name}</span>{" "}
                    has not been reviewed yet.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* display related products */}
          <RelatedProducts
            category={product.category}
            seller={product.seller}
            currentProduct={product._id}
          />
        </div>
      ) : (
        <div className="flex justify-center text-center min-h-screen mt-8">
          <div className="flex flex-col items-center">
            <FaRegFaceSadTear className="w-10 h-10" />
            <p className="text-2xl text-orange-900 mt-4">No Match Found!</p>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
