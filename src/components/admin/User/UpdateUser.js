import { Input, notification, Modal, Select, Space, Switch } from "antd";
import { useEffect, useState } from "react";
import { updateUserAPI } from "../../../services/UsersService";

const UpdateUser = (props) => {
    const { isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate, setDataUpdate, loadUsers } = props;
    const [fullName, setFullName] = useState("");
    const [role, setRole] = useState("");
    const [gender, setGender] = useState("");
    const [status, setStatus] = useState(false);
    const [phone, setPhone] = useState("");
    const [hobbies, setHobbies] = useState("");
    const [address, setAddress] = useState("");
    const [age, setAge] = useState("");
    const [maritalStatus, setMaritalStatus] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);

    const [error, setErrors] = useState({});

    const validateField = (field, value) => {
        const newErrors = { ...error };
        switch (field) {
            case "fullName":
                newErrors.fullName = value.trim() ? "" : "Full name is required.";
                break;
            case "phone":
                newErrors.phone = value.trim() ? "" : "Phone number is required.";
                break;
            case "age":
                newErrors.age = value && Number(value) > 0 ? "" : "Valid age is required.";
                break;
            case "file":
                if (value && !/\.(jpg|jpeg|png)$/i.test(value.name)) {
                    newErrors.file = "File must be a .jpg, .jpeg, or .png image.";
                } else {
                    newErrors.file = "";
                }
                break;
            default:
                break;
        }
        setErrors(newErrors);
    };

    const validateAllFields = () => {
        const newErrors = {
            fullName: fullName.trim() ? "" : "Full name is required.",
            phone: phone.trim() ? "" : "Phone number is required.",
            age: age && Number(age) > 0 ? "" : "Valid age is required.",
            role: role ? "" : "Role is required.",
            gender: gender ? "" : "Gender is required.",
            maritalStatus: maritalStatus ? "" : "Marital status is required.",
        };

        if (file && !/\.(jpg|jpeg|png)$/i.test(file.name)) {
            newErrors.file = "File must be a .jpg, .jpeg, or .png image.";
        }

        setErrors(newErrors);
        return Object.values(newErrors).some((err) => err);
    };

    const handleChange = (field, value) => {
        const setters = {
            fullName: setFullName,
            role: setRole,
            gender: setGender,
            status: setStatus,
            phone: setPhone,
            hobbies: setHobbies,
            address: setAddress,
            age: setAge,
            maritalStatus: setMaritalStatus,
            description: setDescription,
            file: setFile,
        };

        setters[field]?.(value);
        validateField(field, value);
    };

   useEffect(() => {
    if (dataUpdate) {
        setFullName(dataUpdate.fullName || "");
        setRole(dataUpdate.role || "");
        setGender(dataUpdate.gender || "");
        setStatus(dataUpdate.active || false); // Lấy từ `active` trong `dataUpdate`
        setPhone(dataUpdate.phone || "");

        // Lấy giá trị từ profileDTO
        const profile = dataUpdate.profileDTO || {};
        setHobbies(profile.hobbies || "");
        setAddress(profile.address || "");
        setAge(profile.age || "");
        setMaritalStatus(profile.maritalStatus || "");
        setDescription(profile.description || "");
    }
}, [dataUpdate]);
    console.log(">>> CHeck>>>>", dataUpdate);
    

    const handleSubmitBtn = async () => {
        const hasErrors = validateAllFields();
        if (hasErrors) {
            notification.error({
                message: "Validation Error",
                description: "Please fix the errors in the form before submitting.",
            });
            return;
        }

        try {
            const res = await updateUserAPI(
                dataUpdate.id,
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
            );

            notification.success({
                message: "Update User",
                description: "User updated successfully.",
            });
            resetAndCloseModal();
            await loadUsers();
        } catch (error) {
            console.error("Error:", error.response || error.message);
            notification.error({
                message: "Error Updating User",
                description: error.response?.data?.message || "An unexpected error occurred.",
            });
        }
    };

    const resetAndCloseModal = () => {
        setIsModalUpdateOpen(false);
        setFullName("");
        setRole("");
        setGender("");
        setStatus(false);
        setPhone("");
        setHobbies("");
        setAddress("");
        setAge("");
        setMaritalStatus("");
        setDescription("");
        setFile(null);
        setDataUpdate(null);
    };

    return (
        <Modal
            title={
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "10px" }}>
                    <span style={{ fontWeight: "bold", fontSize: "16px" }}>Edit User</span>
                </div>
            }
            open={isModalUpdateOpen}
            onOk={handleSubmitBtn}
            onCancel={resetAndCloseModal}
            okText="Update"
            cancelText="Cancel"
            maskClosable={false}
        >
            <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                <Space>
                    <span>Account Status:</span>
                    <Switch
                        checked={status}
                        onChange={(checked) => handleChange("status", checked)}
                        checkedChildren="Unlock"
                        unCheckedChildren="Lock"
                    />
                </Space>
                <Input
                    value={fullName}
                    placeholder="Full Name"
                    onChange={(e) => handleChange("fullName", e.target.value)}
                />
                <Select
                    value={role}
                    placeholder="Role"
                    onChange={(value) => handleChange("role", value)}
                >
                    <Select.Option value="ADMIN">Admin</Select.Option>
                    <Select.Option value="USER">User</Select.Option>
                    <Select.Option value="MANAGER">Manager</Select.Option>
                    <Select.Option value="TRAINER">Trainer</Select.Option>
                </Select>
                <Select
                    value={gender}
                    placeholder="Gender"
                    onChange={(value) => handleChange("gender", value)}
                >
                    <Select.Option value="MALE">Male</Select.Option>
                    <Select.Option value="FEMALE">Female</Select.Option>
                    <Select.Option value="OTHER">Other</Select.Option>
                </Select>
                <Input
                    value={phone}
                    placeholder="Phone"
                    onChange={(e) => handleChange("phone", e.target.value)}
                />
                <Input
                    value={hobbies}
                    placeholder="Hobbies"
                    onChange={(e) => handleChange("hobbies", e.target.value)}
                />
                <Input
                    value={address}
                    placeholder="Address"
                    onChange={(e) => handleChange("address", e.target.value)}
                />
                <Input
                    value={age}
                    type="number"
                    placeholder="Age"
                    onChange={(e) => handleChange("age", e.target.value)}
                />
                <Input
                    value={description}
                    placeholder="Description"
                    onChange={(e) => handleChange("description", e.target.value)}
                />
                <Select
                    value={maritalStatus}
                    placeholder="Marital Status"
                    onChange={(value) => handleChange("maritalStatus", value)}
                >
                    <Select.Option value="SINGLE">Single</Select.Option>
                    <Select.Option value="MARRIED">Married</Select.Option>
                    <Select.Option value="FA">Forever Alone</Select.Option>
                </Select>
                <Input
                    type="file"
                    onChange={(e) => handleChange("file", e.target.files[0])}
                />
                {error.file && <span style={{ color: "red" }}>{error.file}</span>}
            </div>
        </Modal>
    );


};

export default UpdateUser;
