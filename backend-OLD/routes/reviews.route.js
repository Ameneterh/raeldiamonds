import express from "express";
import Review from "../models/reviews.models.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// add new review
router.post("/new-review", authMiddleware, async (req, res) => {
  try {
    const newReview = new Review(req.body);
    await newReview.save();
    res.send({
      success: true,
      message: "New Review Added Successfully!",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// ----------------------------- product review routes
// router.post("/add-review/:id", authMiddleware, async (req, res) => {
//   try {
//     const { rating, comment, productId } = req.body;
//     const reviewedProduct = await Product.findByIdAndUpdate(req.params.id, {});

//     const review = {
//       user: req.user._id,
//       name: req.user.fullname,
//       rating: Number(rating),
//       comment,
//     };

//     const product = await Product.findById(productId);

//     const isReviewed = product.reviews.find(
//       (review) => review.user.tostring() === req.user._id.tostring()
//     );

//     if (isReviewed) {
//       product.reviews.forEach((review) => {
//         if (review.user.tostring() === req.user._id.tostring()) {
//           review.comment = comment;
//           review.rating = rating;
//         }
//       });
//     } else {
//       product.reviews.push(review);
//       product.numOfReviews = product.reviews.length;
//     }

//     product.ratings =
//       product.reviews.reduce((acc, item) => item.rating + acc, 0) /
//       product.reviews.length;

//     await product.save();

//     res.send({
//       success: true,
//       message: "Produce review successfully added",
//     });
//   } catch (error) {
//     res.send({
//       success: false,
//       message: error.message,
//     });
//   }
// });

// get all reviews
router.post("/get-all-reviews", authMiddleware, async (req, res) => {
  try {
    const { product, seller, buyer } = req.body;
    let filters = {};
    if (product) {
      filters.product = product;
    }
    if (seller) {
      filters.seller = seller;
    }
    if (buyer) {
      filters.buyer = buyer;
    }

    const bids = await Review.find(filters)
      .populate("product")
      .populate("buyer")
      .populate("seller")
      .sort({ createdAt: -1 });
    res.send({
      success: true,
      data: bids,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

export default router;
