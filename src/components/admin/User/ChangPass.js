import { Input, Modal, Button, notification } from "antd";
import { useState } from "react";
import { GetOTP, ResetPass } from "../../../services/UsersService";

function ChangePass(props) {
    const { isChangePassOpen, setChangePassOpen } = props;
    const [email, setEmail] = useState("");
    const [OTP, setOTP] = useState("");
    const [loading, setLoading] = useState(false);
    const [sendingOTP, setSendingOTP] = useState(false);

    const handleSendOTP = async () => {
        if (!email) {
            notification.error({
                message: "Lỗi",
                description: "Vui lòng nhập email trước khi gửi OTP.",
            });
            return;
        }

        try {
            setSendingOTP(true);
            await GetOTP(email); // Gọi API để gửi OTP
            notification.success({
                message: "Thành công",
                description: "OTP đã được gửi đến email của bạn.",
            });
        } catch (error) {
            notification.error({
                message: "Lỗi",
                description: error.response?.data?.message || "Không thể gửi OTP.",
            });
        } finally {
            setSendingOTP(false);
        }
    };

    const handleResetPass = async () => {
        if (!email || !OTP) {
            notification.error({
                message: "Lỗi",
                description: "Email và OTP không được để trống!",
            });
            return;
        }

        try {
            setLoading(true);
            await ResetPass(email, OTP); // Gọi API ResetPass
            notification.success({
                message: "Thành công",
                description: "Mật khẩu mới đã được gửi đến email của bạn.",
            });
            resetAndCloseModal();
        } catch (error) {
            notification.error({
                message: "Lỗi",
                description: error.response?.data?.message || "This OTP code was used",
            });
        } finally {
            setLoading(false);
        }
    };

    const resetAndCloseModal = () => {
        setEmail("");
        setOTP("");
        setChangePassOpen(false);
    };

    const handleChange = (field, value) => {
        if (field === "email") {
            setEmail(value);
        } else if (field === "OTP") {
            setOTP(value);
        }
    };

    return (
        <Modal
            title={
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingBottom: "10px",
                    }}
                >
                    <span style={{ fontWeight: "bold", fontSize: "16px" }}>
                        Đổi mật khẩu
                    </span>
                </div>
            }
            open={isChangePassOpen}
            onOk={handleResetPass}
            onCancel={resetAndCloseModal}
            okText="Xác nhận"
            cancelText="Hủy"
            confirmLoading={loading}
            maskClosable={false}
        >
            <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                <Input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => handleChange("email", e.target.value)}
                />
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <Input
                        placeholder="OTP"
                        value={OTP}
                        onChange={(e) => handleChange("OTP", e.target.value)}
                    />
                    <Button
                        type="primary"
                        loading={sendingOTP}
                        onClick={handleSendOTP}
                    >
                        Gửi OTP
                    </Button>
                </div>
            </div>
        </Modal>
    );
}

export default ChangePass;
