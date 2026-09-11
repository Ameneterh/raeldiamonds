import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["architect", "client", "staff", "owner"],
      required: true,
    },

    fullname: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },

    phone: {
      type: String,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
    },

    image: {
      type: String,
      default:
        "https://img.freepik.com/premium-vector/black-white-handshake-symbol-with-starburst-background_1294240-23568.jpg",
    },

    status: {
      type: String,
      enum: ["pending", "active", "banned", "suspended"],
      default: "pending",
    },

    lastLogin: {
      type: Date,
      default: Date.now,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
