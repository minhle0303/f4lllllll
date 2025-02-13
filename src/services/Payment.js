import axios from "axios";


export const getMembershipByPamentId = async (paymentId) => {
    const URL_BACKEND = `http://localhost:8082/api/paypal/getMembershipByPamentId/${paymentId}`;
    try {
        const response = await axios.get(URL_BACKEND);
        if (response.status === 200 && response.data) {
            return response.data;
        } else {
            throw new Error('Failed to fetch rooms for the package.');
        }
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error fetching rooms.');
    }
};

