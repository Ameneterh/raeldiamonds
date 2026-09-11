import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      required: true,
    },
    product_description: {
      type: String,
      required: true,
    },
    asking_price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    sub_category: {
      type: String,
      required: true,
    },
    deliveryincluded: {
      type: Boolean,
      default: false,
      required: true,
    },
    payondelivery: {
      type: Boolean,
      default: false,
      required: true,
    },
    showBidsOnProductsPage: {
      type: Boolean,
      default: false,
    },
    images: {
      type: Array,
      default: [],
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    ratings: {
      type: Number,
      default: 0,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      default: "pending",
      required: true,
    },
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", productSchema);

export default Product;
