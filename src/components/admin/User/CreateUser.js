import { Input, Modal, notification, Select } from "antd";
import { useState } from "react";
import { createUser } from "../../../services/UsersService";

const { Option } = Select;

function CreateUser(props) {
    const { loadUsers, isModalOpen, setIsModelOpen } = props;

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("");
    const [gender, setGender] = useState("");

    const [error, setErrors] = useState({});

    const validateField = (field, value) => {
        const newErrors = { ...error };
        switch (field) {
            case "fullName":
                newErrors.fullName = value.trim() ? "" : "Full name is required.";
                break;
            case "email":
                newErrors.email = value.trim() ? "" : "Email is required.";
                break;
            case "password":
                newErrors.password = value ? "" : "Password is required.";
                break;
            case "confirmPassword":
                newErrors.confirmPassword = value ? "" : "Confirm Password is required.";
                if (password && value !== password) {
                    newErrors.confirmPassword = "Passwords do not match.";
                }
                break;

            case "role":
                newErrors.role = value ? "" : "Role is required.";
                break;
            case "gender":
                newErrors.gender = value ? "" : "Gender is required.";
                break;
            default:
                break;
        }
        setErrors(newErrors);
    };

    const validateAllFields = () => {
        const newErrors = {
            fullName: fullName.trim() ? "" : "Full name is required.",
            email: email.trim() ? "" : "Email is required.",
            password: password ? "" : "Password is required.",
            confirmPassword: confirmPassword ? "" : "Confirm Password is required.",
            role: role ? "" : "Role is required.",
            gender: gender ? "" : "Gender is required."
        };

        if (password && confirmPassword && password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
        }

        setErrors(newErrors);

        // Check if there are any errors
        return Object.values(newErrors).some((err) => err);
    };

    const handleChange = (field, value) => {
        const setters = {
            fullName: setFullName,
            email: setEmail,
            password: setPassword,
            confirmPassword: setConfirmPassword,
            role: setRole,
            gender: setGender,
        };

        setters[field]?.(value); // Call the corresponding setter function if it exists
        validateField(field, value); // Validate the field
    };

    const handleSubmitBtn = async () => {
        const hasErrors = validateAllFields();
        if (hasErrors) {
            notification.error({
                message: "Validation Error",
                description: "Please fix the errors in the form before submitting."
            });
            return;
        }

        const res = await createUser(fullName, email, password, confirmPassword, role, gender);

        if (res.data) {
            notification.success({
                message: "Create User",
                description: "User created successfully."
            });
            resetAndCloseModal();
            await loadUsers();
        } else {
            notification.error({
                message: "Error Creating User",
                description: JSON.stringify(res.message)
            });
        }
    };

    const resetAndCloseModal = () => {
        setIsModelOpen(false);
        setFullName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setRole("");
        setGender("");
        setErrors({});
    };

    return (
        <>
            <Modal
                title="Create A New User"
                open={isModalOpen}
                onOk={() => { handleSubmitBtn(); }}
                onCancel={() => { resetAndCloseModal(); }}
                okText={"Create"}
                cancelText={"Cancel"}
                maskClosable={false}
            >
                <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                    <div>
                        <span>Full Name</span>
                        <Input
                            value={fullName}
                            onChange={(event) => { handleChange("fullName", event.target.value); }}
                        />
                        {error.fullName && <span style={{ color: "red" }}>{error.fullName}</span>}
                    </div>
                    <div>
                        <span>Email</span>
                        <Input
                            value={email}
                            onChange={(event) => { handleChange("email", event.target.value); }}
                        />
                        {error.email && <span style={{ color: "red" }}>{error.email}</span>}
                    </div>
                    <div>
                        <span>Password</span>
                        <Input.Password
                            value={password}
                            onChange={(event) => { handleChange("password", event.target.value); }}
                        />
                        {error.password && <span style={{ color: "red" }}>{error.password}</span>}
                    </div>
                    <div>
                        <span>Confirm Password</span>
                        <Input.Password
                            value={confirmPassword}
                            onChange={(event) => { handleChange("confirmPassword", event.target.value); }}
                        />
                        {error.confirmPassword && <span style={{ color: "red" }}>{error.confirmPassword}</span>}
                    </div>
                    <div>
                        <span>Role</span>
                        <Select
                            value={role}
                            onChange={(value) => { handleChange("role", value); }}
                            style={{ width: "100%" }}
                        >
                            <Option value="USER">USER</Option>
                            <Option value="MANAGER">MANAGER</Option>
                            <Option value="ADMIN">ADMIN</Option>
                            <Option value="TRAINER">TRAINER</Option>
                        </Select>
                        {error.role && <span style={{ color: "red" }}>{error.role}</span>}
                    </div>
                    <div>
                        <span>Gender</span>
                        <Select
                            value={gender}
                            onChange={(value) => { handleChange("gender", value); }}
                            style={{ width: "100%" }}
                        >
                            <Option value="MALE">MALE</Option>
                            <Option value="FEMALE">FEMALE</Option>
                            <Option value="OTHER">OTHER</Option>
                        </Select>
                        {error.gender && <span style={{ color: "red" }}>{error.gender}</span>}
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default CreateUser;
