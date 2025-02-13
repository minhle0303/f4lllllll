import axios from "axios";

const URL_PACK = "http://localhost:8082/api/booking";

const URL_PAY = "http://localhost:8082/api";
const fetchAllPackage = () => {
    const URL_BACKEND = `${URL_PACK}/packages`;
    return axios.get(URL_BACKEND);
}
export const submitBookingRoom = async (bookingData) => {
    try {
        const response = await axios.post(`${URL_PACK}/bookingRoom/add`, bookingData, {
            headers: {
                'Content-Type': 'application/json', // Đảm bảo gửi dữ liệu dạng JSON
            },
        });
        return response;
    } catch (error) {
        console.error('Error booking room:', error);
        throw error.response?.data || { message: 'Unknown error occurred' };
    }
};
const createPackageAPI = (packageName, description, durationMonth, price) => {
    const URL_BACKEND = `${URL_PACK}/package/add`;
    const data = {
        packageName: packageName,
        description: description,
        durationMonth: durationMonth,
        price: price
    };
    return axios.post(URL_BACKEND, data);
};

const updatePackage = (id, packageName, description, durationMonth, price) => {
    const URL_BACKEND = `${URL_PACK}/package/update/${id}`;
    const data = {
        packageName: packageName,
        description: description,
        durationMonth: durationMonth,
        price: price
    };
    return axios.put(URL_BACKEND, data);
};

const deletePackage = (id) => {
    const URL_BACKEND = `${URL_PACK}/package/delete/${id}`;
    return axios.delete(URL_BACKEND);
}

const GetRoomsByPackage = async (packageId) => {
    const URL_BACKEND = `http://localhost:8081/api/dashboard/packages/${packageId}/rooms`;
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


export {
    fetchAllPackage,
    createPackageAPI,
    updatePackage,
    deletePackage,
    GetRoomsByPackage,
}