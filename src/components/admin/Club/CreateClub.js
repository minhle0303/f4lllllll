import { useState } from "react";
import { addClubImageApi, createClubApi } from "../../../services/ClubService";
import Input from "antd/es/input/Input";
import { Button, notification, Modal } from "antd";

function CreateClub(props) {
    const { loadClubs, isModalOpen,setIsModelOpen } = props;

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [contactPhone, setContactPhone] = useState("");
    const [description, setDescription] = useState("");
    const [openHour, setOpenHour] = useState("");
    const [closeHour, setCloseHour] = useState("");
  
    const [file, setFile] = useState(null);

    const [error, setErrors] = useState({});

    const validateField = (field, value) => {
        const newErrors = { ...error };
        switch (field) {
            case "name":
                newErrors.name = value.trim() ? "" : "Club name is required.";
                break;
            case "address":
                newErrors.address = value.trim() ? "" : "Address is required.";
                break;
            case "contactPhone":
                newErrors.contactPhone = value.trim() ? "" : "Contact phone is required.";
                break;
            case "description":
                newErrors.description = value.trim() ? "" : "Description is required.";
                break;
            case "openHour":
                newErrors.openHour = value ? "" : "Open hour is required.";
                if (closeHour && value >= closeHour) {
                    newErrors.hours = "Close hour must be after open hour.";
                } else {
                    newErrors.hours = "";
                }
                break;
            case "closeHour":
                newErrors.closeHour = value ? "" : "Close hour is required.";
                if (openHour && openHour >= value) {
                    newErrors.hours = "Close hour must be after open hour.";
                } else {
                    newErrors.hours = "";
                }
                break;
            case "file":
                if (!value) {
                    newErrors.file = "Image file is required.";
                } else if (!/\.(jpg|jpeg|png)$/i.test(value.name)) {
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
            name: name.trim() ? "" : "Club name is required.",
            address: address.trim() ? "" : "Address is required.",
            contactPhone: contactPhone.trim() ? "" : "Contact phone is required.",
            description: description.trim() ? "" : "Description is required.",
            openHour: openHour ? "" : "Open hour is required.",
            closeHour: closeHour ? "" : "Close hour is required.",
            hours: (openHour && closeHour && openHour >= closeHour)
                ? "Close hour must be after open hour."
                : ""
        };

        setErrors(newErrors);

        // Kiểm tra xem có bất kỳ lỗi nào không
        return Object.values(newErrors).some((err) => err);
    };


    const handleChange = (field, value) => {
        const setters = {
            name: setName,
            address: setAddress,
            contactPhone: setContactPhone,
            description: setDescription,
            openHour: setOpenHour,
            closeHour: setCloseHour,
            file: setFile,
        };

        setters[field]?.(value); // Gọi hàm set tương ứng nếu tồn tại
        validateField(field, value); // Gọi validate cho trường đó
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

        const res = await createClubApi(name, address, contactPhone, description, openHour, closeHour);

        if (res.data.data) {
            notification.success({
                message: "Create Club",
                description: "Club created successfully."
            });
            console.log("hihihihi");

            const clubId = res.data.data.id; // Assuming the response contains the club ID
            console.log("12", clubId);


            const imageFormData = new FormData();
            imageFormData.append("clubId", clubId);
            imageFormData.append("file", file);


            // Upload image for the created club
            const imageRes = await addClubImageApi(imageFormData);
            console.log("Image API Response:", imageRes.data);
            if (imageRes.data) {
                notification.success({
                    message: "Image Upload",
                    description: "Club image uploaded successfully."
                });

            } else {
                notification.error({
                    message: "Error Uploading Image",
                    description: "Image upload failed."
                });
            }
            resetAndCloseModal();
            await loadClubs();
        } else {
            notification.error({
                message: "Error Creating Club",
                description: JSON.stringify(res.message)
            });
        }
    };

    const resetAndCloseModal = () => {
        setIsModelOpen(false);
        setName("");
        setAddress("");
        setContactPhone("");
        setDescription("");
        setOpenHour("");
        setCloseHour("");
        setFile(null);
        setErrors({});

    };

    return (
        <>
            {/* <div className="user-form" style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                    <Button
                        name='plus-circle'
                        onClick={() => { setIsModelOpen(true); }}
                    > +</Button>
                    <box-icon  ></box-icon>
                </div>
            </div> */}
            <Modal
                title="Create A New Club"
                open={isModalOpen}
                onOk={() => { handleSubmitBtn(); }}
                onCancel={() => { resetAndCloseModal(); }}
                okText={"Create"}
                cancelText={"No"}
                maskClosable={false}
            >
                <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                    <div>
                        <span>Club Name</span>
                        <Input
                            value={name}
                            onChange={(event) => { handleChange("name", event.target.value); }}
                        />
                        {error.name && <span style={{ color: "red" }}>{error.name}</span>}
                    </div>
                    <div>
                        <span>Address</span>
                        <Input
                            value={address}
                            onChange={(event) => { handleChange("address", event.target.value); }}
                        />
                        {error.address && <span style={{ color: "red" }}>{error.address}</span>}
                    </div>
                    <div>
                        <span>Contact Phone</span>
                        <Input
                            value={contactPhone}
                            onChange={(event) => { handleChange("contactPhone", event.target.value); }}
                        />
                        {error.contactPhone && <span style={{ color: "red" }}>{error.contactPhone}</span>}
                    </div>
                    <div>
                        <span>Description</span>
                        <Input
                            value={description}
                            onChange={(event) => { handleChange("description", event.target.value); }}
                        />
                        {error.description && <span style={{ color: "red" }}>{error.description}</span>}
                    </div>
                    <div>
                        <span>Open Hour</span>
                        <Input
                            type="time"
                            value={openHour}
                            onChange={(event) => { handleChange("openHour", event.target.value); }}
                        />
                        {error.openHour && <span style={{ color: "red" }}>{error.openHour}</span>}
                    </div>
                    <div>
                        <span>Close Hour</span>
                        <Input
                            type="time"
                            value={closeHour}
                            onChange={(event) => { handleChange("closeHour", event.target.value); }}
                        />
                        {error.closeHour && <span style={{ color: "red" }}>{error.closeHour}</span>}
                        {error.hours && <span style={{ color: "red" }}>{error.hours}</span>}
                    </div>
                    <div>
                        <span>Upload Image</span>
                        <Input
                            type="file"

                            onChange={(event) => { handleChange("file", event.target.files[0]); }}
                        />
                        {error.file && <span style={{ color: "red" }}>{error.file}</span>}
                    </div>

                </div>
            </Modal>
        </>
    );
}

export default CreateClub;
