import { create } from "zustand";
import axios from "axios";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/backend/v1/product"
    : "/backend/v1/product";

axios.defaults.withCredentials = true;

export const useProductStore = create((set) => ({
  products: null,
  error: null,
  isLoading: false,
  message: null,

  // add new product
  addProduct: async ({
    product_name,
    category_name,
    sub_category,
    description,
    addedBy,
  }) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/add-product`, {
        product_name,
        category_name,
        sub_category,
        description,
        addedBy,
      });
      set({
        product: response.data.product,
        isLoading: false,
      });
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          error.message ||
          "Error adding product!",
        isLoading: false,
      });
      throw error;
    }
  },

  // 1. get all reports
  getProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/get-products`);
      set({
        products: response.data.products,
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      set({
        error: error.response.data.message || "Error getting products",
        isLoading: false,
      });
      throw error;
    }
  },

  //   send comment
  commentReport: async ({ comment, reportId, commentBy }) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.put(`${API_URL}/send-comment`, {
        comment,
        reportId,
        commentBy,
      });
      set({
        comment: response.data.comment,
        isLoading: false,
      });
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          error.message ||
          "Error sending comment",
        isLoading: false,
      });
      throw error;
    }
  },

  // get weekly report
  generateWeeklyReports: async ({ startDate, endDate }) => {
    set({
      loading: true,
      error: null,
    });

    try {
      const response = await axios.get(`${API_URL}/summary`, {
        params: {
          startDate,
          endDate,
        },
      });

      const { data, files } = response.data;

      set({
        summary: data,
        // excelFile: `${process.env.SERVER_URL}/exports/${files.excel}`,
        // wordFile: `${process.env.SERVER_URL}/exports/${files.word}`,

        excelFile: `${DOC_URL}/${files.excel}`,
        wordFile: `http://localhost:5000/${files.word}`,

        loading: false,
      });
    } catch (error) {
      set({
        loading: false,

        error: error.response?.data?.message || error.message,
      });
    }
  },

  // get report fields
  getReportFields: async ({ startDate, endDate, fields }) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/report-fields`, {
        params: {
          startDate,
          endDate,
          fields: fields.join(","), // ["interventions","remarks"]
        },
      });

      set({ isLoading: false });
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error fetching fields",
        isLoading: false,
      });
      throw error;
    }
  },
}));
