import axios from 'axios';
import { smartAPI } from '../components/helpers/constants';


const BASE_URL = "http://localhost:9000/api/deal/blogs";

export const getAllBlogs = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};
  