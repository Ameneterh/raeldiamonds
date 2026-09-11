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
    address: {
      type: String,
      sparse: true,
    },
    role: {
      type: String,
      enum: ["client", "staff"],
      default: "client",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["active", "pending", "blocked", "suspended", "deleted"],
      default: "active",
    },
    image: {
      type: String,
      default:
        "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png",
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
