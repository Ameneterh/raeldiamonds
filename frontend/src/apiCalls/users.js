import { axiosInstance } from "./axiosInstance.js";

// register user
export const RegisterUser = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/backend/users/register",
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// login user
export const LoginUser = async (payload) => {
  try {
    const response = await axiosInstance.post("/backend/users/login", payload);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// get current user
export const GetCurrentUser = async () => {
  try {
    const response = await axiosInstance.get("/backend/users/get-current-user");
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// get all users
export const GetAllUsers = async () => {
  try {
    const response = await axiosInstance.get("/backend/users/get-users");
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// update user status
export const UpdateUserStatus = async (status, id) => {
  try {
    const response = await axiosInstance.put(
      `/backend/users/update-user-status/${id}`,
      { status }
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// update a user
export const EditUser = async (id, payload) => {
  try {
    const response = await axiosInstance.put(
      `/backend/users/edit-user/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// upload user image
export const UploadUserImage = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/backend/users//upload-user-image",
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};
