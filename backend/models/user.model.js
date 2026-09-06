import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    status: {
      type: String,
      enum: ["active", "pending", "blocked", "suspended", "deleted"],
      default: "active",
    },
    // premium: {
    //   type: Boolean,
    //   default: false,
    // },
    avatar: {
      type: String,
      default:
        "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png",
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
