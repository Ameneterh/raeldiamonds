import User from "../models/user.model.js";
import Category from "../models/category.model.js";

// save category
export const addCategory = async (req, res) => {
  try {
    const { category_name, image, category_description, addedBy } = req.body;

    // Validate required fields
    if (!category_name || !image || !category_description || !addedBy) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing!",
      });
    }

    // create slug
    const slug = category_name
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[()?!;.,]/g, "")
      .replace(/[^a-zA-Z0-9-]/g, "-");

    const category = await Category.create({
      category_name,
      slug,
      image,
      category_description,
      addedBy,
    });

    res.status(201).json({
      success: true,
      category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find()
      .populate("addedBy")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// edit post
export const editPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const postExist = await Post.findById(postId);

    if (!postExist) {
      return res.status(404).json({
        success: false,
        message: "Post not found!",
      });
    }

    const updates = {};

    // Only update fields that were actually sent
    const allowedFields = ["postTitle", "postContent"];

    for (const field of allowedFields) {
      if (
        req.body[field] !== undefined &&
        String(req.body[field]) !== String(postExist[field] ?? "")
      ) {
        updates[field] = req.body[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No changes detected",
      });
    }

    const editedPost = await Post.findByIdAndUpdate(
      postId,
      { $set: updates },
      {
        new: true,
        // runValidators: true,
      },
    );

    return res.status(200).json({
      success: true,
      message: "Post successfully edited",
      post: editedPost,
    });
  } catch (error) {
    console.error("Post Edit Error:", error);
    console.error(error.stack);

    return res.status(500).json({
      success: false,
      message: "Failed to edit post",
    });
  }
};
