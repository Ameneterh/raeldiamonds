import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image: {
      type: String,
      default:
        "https://www.shutterstock.com/image-photo/young-woman-working-on-computer-600nw-1711024264.jpg",
    },
    likes: {
      type: Number,
      unique: 0,
    },
    comments: {
      type: Array,
      default: [],
    },
    numberOfComments: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
