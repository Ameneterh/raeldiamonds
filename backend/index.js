import authRouter from "./routes/auth.routes.js";
import contactRouter from "./routes/contact.routes.js ";
import subscriptionRouter from "./routes/subscription.routes.js";
import productRouter from "./routes/product.routes.js";
import categoryRouter from "./routes/category.routes.js";
import updateRouter from "./routes/update.routes.js";
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";

dotenv.config();

// deployment config
const __dirname = path.resolve();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log(`Connected to MongoDb Database!`))
  .catch((error) => console.log(error));

app.use("/backend/v1/auth", authRouter);
app.use("/backend/v1/subscription", subscriptionRouter);
app.use("/backend/v1/product", productRouter);

app.use("/backend/v1/contact", contactRouter);
app.use("/backend/v1/category", categoryRouter);
app.use("/backend/v1/update", updateRouter);
app.use(
  "/backend/v1/exports",
  express.static(path.join(process.cwd(), "backend/v1/exports")),
);

// render deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () =>
  console.log(`Node/Express Server is running on Port ${PORT}`),
);
