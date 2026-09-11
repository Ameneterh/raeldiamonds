import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    postTitle: {
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

    category: {
      type: String,
      required: true,
      enum: ["editorial", "features", "news", "opinions"],
      index: true,
    },

    image: {
      type: String,
      required: true,
      default:
        "https://firebasestorage.googleapis.com/v0/b/invoice-gen-v2.firebasestorage.app/o/1787518146324-logo_name.jpeg?alt=media&token=1b51bccf-4b68-4f45-b018-2fa3bb0e09c0",
    },

    content: {
      type: String,
      required: true,
    },

    comments: [
      {
        commentBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
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

    readCount: {
      type: Number,
      default: () => Math.floor(Math.random() * (100 - 50 + 1)) + 50,
    },

    writer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

const Post = mongoose.model("Post", postSchema);

export default Post;
