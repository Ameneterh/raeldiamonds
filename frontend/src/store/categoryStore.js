import { create } from "zustand";
import axios from "axios";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/backend/v1/category"
    : "/backend/v1/category";

axios.defaults.withCredentials = true;

export const useCategoryStore = create((set) => ({
  category: null,
  error: null,
  isLoading: false,
  message: null,

  //   send new message
  addCategory: async ({
    category_name,
    image,
    category_description,
    addedBy,
  }) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/add-category`, {
        category_name,
        image,
        category_description,
        addedBy,
      });
      set({
        category: response.data.category,
        isLoading: false,
      });
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          error.message ||
          "Error adding category",
        isLoading: false,
      });
      throw error;
    }
  },

  // 1. get all reports
  getCategories: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/get-categories`);
      set({
        categories: response.data.categories,
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      set({
        error: error.response.data.message || "Error getting Categories",
        isLoading: false,
      });
      throw error;
    }
  },
}));
