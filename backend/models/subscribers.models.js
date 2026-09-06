import mongoose from "mongoose";

const subscribersSchema = new mongoose.Schema(
  {
    subscriber: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    duration: {
      type: Number,
      required: true,
    },
    expiration: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Subscriber = mongoose.model("Subscriber", subscribersSchema);

export default Subscriber;
