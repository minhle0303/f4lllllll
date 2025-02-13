import React, { useEffect, useRef, useState } from 'react';
import { Table, notification, Button, Switch, Form, Input } from 'antd';
import { changestatus, getAllPromotions, verifyCode } from '../../../services/PromotioService';
import PromotionDetailsModal from './PromotionDetailsModal';
import CreatePromotionModal from './CreatePromotionModal';
import moment from 'moment';
import SendPromotionCodeModal from './SendPromotionCodeModal';
import SendPromotionToUserModal from './SendPromotionToUserModal ';

const PromotionPage = () => {
    const [promotions, setPromotions] = useState([]); // Quản lý danh sách khuyến mãi
    const [loading, setLoading] = useState(false); // Quản lý trạng thái tải dữ liệu
    const [selectedPromotion, setSelectedPromotion] = useState(null); // Lưu dữ liệu khuyến mãi được chọn
    const [isModalVisible, setIsModalVisible] = useState(false); // Trạng thái hiển thị modal
    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false); // Trạng thái hiển thị modal tạo mới
    const [isSendCodeModalVisible, setIsSendCodeModalVisible] = useState(false);
    const [isSendCodeToUserModalVisible, setIsSendCodeToUserModalVisible] = useState(false);
    const [form] = Form.useForm(); // Tạo form để quản lý trạng thái nhập liệu
    const [codeInput, setCodeInput] = useState(''); // Lưu mã khuyến mãi người dùng nhập
    const pollingInterval = useRef(null); // Dùng để lưu interval polling

    // Hàm gọi API lấy danh sách khuyến mãi
    const fetchPromotions = async () => {
        setLoading(true);
        try {
            const response = await getAllPromotions();
            if (response && response.data) {
                setPromotions(response.data);
            } else {
                notification.error({
                    message: 'Error',
                    description: 'Failed to fetch promotions.',
                });
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

    useEffect(() => {
        fetchPromotions();
        pollingInterval.current = setInterval(fetchPromotions, 10000); // Tự động gọi lại API mỗi 30 giây
        return () => clearInterval(pollingInterval.current); // Dọn dẹp interval khi unmount
    }, []);

    // Hàm xử lý khi nhấn vào Title hoặc Description
    const handleRowClick = (record) => {
        setSelectedPromotion(record); // Lưu dữ liệu khuyến mãi được chọn
        setIsModalVisible(true); // Hiển thị modal
    };

    // Hàm xử lý khi tạo mới thành công
    const handleCreateSuccess = () => {
        setIsCreateModalVisible(false); // Đóng modal tạo mới
        fetchPromotions(); // Tải lại danh sách khuyến mãi
    };
    // Hàm xử lý thay đổi trạng thái
    const handleStatusChange = async (id, newStatus) => {
        try {
            const response = await changestatus(id, newStatus);
            if (response.status === 201 || response.status === 200) {
                notification.success({
                    message: 'Success',
                    description: `Status changed to ${newStatus ? 'Active' : 'Inactive'} successfully!`,
                });
                fetchPromotions(); // Làm mới danh sách sau khi cập nhật thành công
            } else {
                throw new Error('Failed to update status');
            }
        } catch (error) {
            notification.error({
                message: 'Error',
                description: error.message || 'Failed to change status.',
            });
        }
    };
    // Hàm xử lý khi nhấn nút xác minh mã
    const handleVerifyCode = async () => {
        try {
            const response = await verifyCode(codeInput);
            console.log("Data code đúng ko ta page: ", response);

            if (response && response.status === 200) {
                notification.success({
                    message: 'Success',
                    description: `used code: "${codeInput}" successfully`,
                });
                fetchPromotions();
            } else if (response && response.status === 400) {
                notification.error({
                    message: 'Invalid Code',
                    description: `code not found`,
                });
            } else if (response && response.status === 402) {
                notification.error({
                    message: 'Invalid Code',
                    description: `Code Is Already In active`,
                });
            }
        } catch (error) {
            notification.error({
                message: 'Error',
                description: error.message || 'Failed to verify promotion code.',
            });
        }
    };

    // Định nghĩa các cột trong bảng
    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => (
                <span style={{ cursor: 'pointer' }} onClick={() => handleRowClick(record)}>
                    {text}
                </span>
            ),
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: (text, record) => (
                <span style={{ cursor: 'pointer' }} onClick={() => handleRowClick(record)}>
                    {text}
                </span>
            ),
        },
        {
            title: 'Discount Value',
            dataIndex: 'discountValue',
            key: 'discountValue',
            render: (value) => `₫ ${value}`,
        },
        {
            title: 'Start Date',
            dataIndex: 'startDate',
            key: 'startDate',
            render: (date) => moment(date).format('YYYY-MM-DD HH:mm:ss'),
        },
        {
            title: 'End Date',
            dataIndex: 'endDate',
            key: 'endDate',
            render: (date) => moment(date).format('YYYY-MM-DD HH:mm:ss'),
        },



        {
            title: 'Active',
            dataIndex: 'isActive',
            key: 'isActive',
            render: (isActive, record) => (
                <Switch
                    checked={isActive}
                    onChange={() => handleStatusChange(record.id, !isActive)}
                />
            ),
        },
        {
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
        },
    ];

    return (
        <div style={{ padding: '20px' }}>
            <h2>Promotion List</h2>
            <Button type="primary" onClick={() => setIsCreateModalVisible(true)} style={{ marginBottom: '20px' }}>
                Create Promotion
            </Button>
            <Button type="default" onClick={() => setIsSendCodeModalVisible(true)}>
                Send Code to All Users
            </Button>
            <Button type="default" onClick={() => setIsSendCodeToUserModalVisible(true)}>
                Send Code to User
            </Button>
            {/* Form nhập mã */}
            <div style={{ margin: '20px 0' }}>
                <Form layout="inline" onFinish={handleVerifyCode}>
                    <Form.Item>
                        <Input
                            placeholder="Enter promotion code"
                            value={codeInput}
                            onChange={(e) => setCodeInput(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Verify Code
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <Table
                dataSource={Array.isArray(promotions) ? promotions : []} // Đảm bảo là mảng
                columns={columns}
                rowKey="id"
                loading={loading}
                bordered
            />

            {/* Modal hiển thị chi tiết khuyến mãi */}
            <PromotionDetailsModal
                visible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                promotion={selectedPromotion}
            />
            {/* Modal tạo mới khuyến mãi */}
            <CreatePromotionModal
                visible={isCreateModalVisible}
                onClose={() => setIsCreateModalVisible(false)}
                onSuccess={handleCreateSuccess}
            />
            {/* Modal gửi mã khuyến mãi */}
            <SendPromotionCodeModal
                visible={isSendCodeModalVisible}
                onClose={() => setIsSendCodeModalVisible(false)}
            />
            {/* Modal gửi mã cho một người dùng */}
            <SendPromotionToUserModal
                visible={isSendCodeToUserModalVisible}
                onClose={() => setIsSendCodeToUserModalVisible(false)}
            />
        </div>
    );
};

export default PromotionPage;
