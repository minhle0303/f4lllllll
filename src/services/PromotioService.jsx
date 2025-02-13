import axios from "axios";
import { smartAPI } from "../components/helpers/constants";

export const getAllPromotions = async () => {
    try {
        const response = await axios.get(`${smartAPI}/promotions`)
        return response.data;
    } catch (error) {
        if (error.response) {
            return error.response.data || 'An error occurred'
        } else {
            return error.message || 'An unexpected error occurred'
        }
    }
};

export const createPromotions = async (newPromotion) => {
    try {
        const response = await axios.post(`${smartAPI}/promotions/create`, newPromotion)
        return response;
    } catch (error) {
        if (error.response) {
            return error.response.data || 'An error occurred'
        } else {
            return error.message || 'An unexpected error occurred'
        }
    }
};

export const changestatus = async (id, isActive) => {
    try {
        const response = await axios.put(`${smartAPI}/promotions/changePublished/${id}`, {
            isActive: isActive,
        });
        return response;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to change status');
    }
};

export const sendPromotionOfUser = async (code) => {
    try {
        const response = await axios.post(`${smartAPI}/promotions/send-code-to-all?code=${code}`);
        return response;
    } catch (error) {
        if (error.response) {
            return error.response.data || 'An error occurred';
        } else {
            return error.message || 'An unexpected error occurred';
        }
    }
};
export const sendPromotionOneUser = async (code, userId) => {
    try {
        const response = await axios.post(`${smartAPI}/promotions/send-code-to-user?code=${code}&userId=${userId}`);
        return response;
    } catch (error) {
        if (error.response) {
            return error.response.data || 'An error occurred';
        } else {
            return error.message || 'An unexpected error occurred';
        }
    }
};
export const verifyCode = async (code) => {
    console.log("Data code đúng ko ta service: ", code);
    try {
        const response = await axios.post(`${smartAPI}/promotions/verify?code=${code}`);
        return response;
    } catch (error) {
        if (error.response) {
            return error.response.data || 'An error occurred';
        } else {
            return error.message || 'An unexpected error occurred';
        }
    }
};



