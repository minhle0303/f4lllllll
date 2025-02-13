import axios from 'axios';

import { userAPI } from "../components/helpers/constants";

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${userAPI}/users/login`, { email, password });
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    if (error.response) {
      // Trường hợp API trả về lỗi (4xx, 5xx)
      throw new Error(error.response.data.message || 'An error occurred while logging in.');
    } else if (error.request) {
      // Không nhận được phản hồi từ API
      throw new Error('No response from server. Please try again later.');
    } else {
      // Lỗi không xác định
      throw new Error('An unexpected error occurred.');
    }
  }
};