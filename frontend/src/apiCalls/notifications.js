import { axiosInstance } from "./axiosInstance";

// add new notification
export const AddNotification = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/backend/notifications/notify-user",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// get all notifications by user
export const GetAllNotifications = async () => {
  try {
    const response = await axiosInstance.get(
      "/backend/notifications/get-all-notifications"
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// delete notification
export const DeleteNotification = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `/backend/notifications/delete-notification/${id}`
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// read all notifications by user
export const ReadAllNotifications = async () => {
  try {
    const response = await axiosInstance.put(
      "/backend/notifications/read-all-notifications"
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
