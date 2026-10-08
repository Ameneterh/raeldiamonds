import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    category_name: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      // type: String,
      required: true,
      index: true,
    },

    sub_category: {
      type: String,
    },

    images: [],

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      trim: true,
    },

    logistics_included: { type: Boolean, required: true, default: false },

    payondelivery: { type: Boolean, default: false },

    freeGift: { type: Boolean, default: false },

    freebies: {
      // gift_name: String,
      number_of_freebies: { type: Number, default: 0 },
      total_value: { type: Number, default: 0 },
    },

    reviews: [
      {
        buyer: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        rating: { type: Number },
        comment: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", productSchema);

export default Product;
