import { axiosInstance } from "./axiosInstance";

// add a new product
export const AddProduct = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/backend/products/add-product",
      payload,
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// get all products
export const GetProducts = async (filters) => {
  try {
    const response = await axiosInstance.post(
      "/backend/v1/products/get-products",
      filters,
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// delete a product
export const DeleteProduct = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `/backend/products/delete-product/${id}`,
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// upload product image
export const UploadProductImage = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/backend/products//upload-image-to-product",
      payload,
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// update product status
export const UpdateProductStatus = async (status, id) => {
  try {
    const response = await axiosInstance.put(
      `/backend/products/update-product-status/${id}`,
      { status },
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// get product by id
export const GetProductById = async (id) => {
  try {
    const response = await axiosInstance.get(
      `/backend/products/get-product-by-id/${id}`,
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// update a product
export const EditProduct = async (id, payload) => {
  try {
    const response = await axiosInstance.put(
      `/backend/products/edit-product/${id}`,
      payload,
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// --------------------------------- for bids -----------------------------------------------

// place a new bid
export const PlaceNewBid = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/backend/bids/place-new-bid",
      payload,
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// get all bids
export const GetAllBids = async (filters) => {
  try {
    const response = await axiosInstance.post(
      "/backend/bids/get-all-bids",
      filters,
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// ------------------------------- product reviews -------------------------
// add review
export const AddReview = async (payload) => {
  try {
    const response = await axiosInstance.post(
      `/backend/reviews/new-review/`,
      payload,
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// get all bids
export const GetAllReviews = async (filters) => {
  try {
    const response = await axiosInstance.post(
      "/backend/reviews/get-all-reviews",
      filters,
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};
