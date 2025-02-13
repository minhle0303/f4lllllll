import axios from "axios";


const URL_USER = "http://localhost:8080/api/users";


const fetchAllUsers = () => {
    const URL_BACKEND = `${URL_USER}/manager/all`;
    return axios.get(URL_BACKEND);
}


const createUser = (fullName, email, password, confirmPassword, role, gender) => {
    const URL_BACKEND = `${URL_USER}/register`;
    const data = {
        fullName: fullName,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        role: role,
        gender: gender
    }
    return axios.post(URL_BACKEND, data);
}
const updateUserAPI = (
    id,
    fullName,
    role,
    gender,
    status,
    phone,
    hobbies,
    address,
    age,
    description,
    maritalStatus,
    file
) => {
    const URL_BACKEND = `${URL_USER}/update/${id}`;
    const formData = new FormData();

    // Append các trường được định nghĩa trong DTO
    formData.append("fullName", fullName);
    formData.append("role", role); // Assuming role is a string (e.g., "ADMIN")
    formData.append("gender", gender); // Assuming gender is a string (e.g., "MALE")
    formData.append("status", status); // Assuming status is a boolean
    formData.append("phone", phone);
    formData.append("hobbies", hobbies);
    formData.append("address", address);
    formData.append("age", age); // Assuming age is an integer
    formData.append("description", description);
    formData.append("maritalStatus", maritalStatus); // Assuming maritalStatus is a string (e.g., "SINGLE")

    // Append file nếu tồn tại
    if (file) {
        formData.append("file", file);
    }

    console.log("FormData being sent:");
    for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value instanceof File ? value.name : value);
    }

    // Gửi yêu cầu PUT đến server
    return axios.put(URL_BACKEND, formData, {
        headers: {
            "Content-Type": "multipart/form-data", // Cần thiết khi gửi FormData
        },
        timeout: 60000, // Thời gian chờ tối đa 60 giây
    });
};

const GetOTP = (email) => {
    const URL_BACKEND = `${URL_USER}/send-otp`;
    const data = { email };
    return axios.post(URL_BACKEND, data);
};


const ResetPass = async (email, otpCode) => {
    const URL_BACKEND = `${URL_USER}/reset-password`;

    try {
        const data = {
            email: email,
            otpCode: otpCode,
        };

        const response = await axios.post(URL_BACKEND, data);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Lỗi khi đặt lại mật khẩu.");
    }
};



export {
    fetchAllUsers,
    createUser,
    updateUserAPI,
    GetOTP,
    ResetPass
}