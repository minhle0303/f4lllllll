import React, { useState } from 'react';
import { Modal, Input, Button, notification } from 'antd';
import { sendPromotionOneUser } from '../../../services/PromotioService';


const SendPromotionToUserModal = ({ visible, onClose }) => {
    const [code, setCode] = useState('');
    const [userId, setUserId] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSendCode = async () => {
        // Kiểm tra dữ liệu đầu vào
        if (!code || !code.trim() || !userId || !userId.trim()) {
            notification.error({
                message: 'Error',
                description: 'Please enter a valid promotion code and user ID.',
            });
            return;
        }

        if (isNaN(userId)) {
            notification.error({
                message: 'Error',
                description: 'User ID must be a valid number.',
            });
            return;
        }

        setLoading(true);
        try {
            const response = await sendPromotionOneUser(code, userId);

            if (response.status === 200 || response.status === 201) {
                notification.success({
                    message: 'Success',
                    description: 'Promotion code sent to the user successfully!',
                });
                onClose(); // Đóng modal
                setCode(''); // Reset mã khuyến mãi
                setUserId(''); // Reset ID người dùng
            } else {
                throw new Error(response || 'Failed to send promotion code.');
            }
        } catch (error) {
            notification.error({
                message: 'Error',
                description: error.message || 'An unexpected error occurred.',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            open={visible}
            title="Send Promotion Code to a User"
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Cancel
                </Button>,
                <Button key="send" type="primary" loading={loading} onClick={handleSendCode}>
                    Send
                </Button>,
            ]}
        >
            <Input
                placeholder="Enter User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                style={{ marginBottom: '10px' }}
            />
            <Input
                placeholder="Enter Promotion Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
            />
        </Modal>
    );
};

export default SendPromotionToUserModal;
