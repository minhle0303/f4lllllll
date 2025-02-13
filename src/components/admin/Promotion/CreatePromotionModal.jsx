import React, { useState } from 'react';
import { Modal, Form, Input, Select, InputNumber, DatePicker, Button, notification, Row, Col } from 'antd';
import { createPromotions } from '../../../services/PromotioService';
import dayjs from 'dayjs'; // Import dayjs

const { RangePicker } = DatePicker;
const { Option } = Select;

const CreatePromotionModal = ({ visible, onClose, onSuccess }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            const [startDate, endDate] = values.dateRange;
            const newPromotion = {
                ...values,
                startDate: dayjs(startDate).format('YYYY-MM-DD HH:mm:ss'),
                endDate: dayjs(endDate).format('YYYY-MM-DD HH:mm:ss'),
            };
            console.log('new data: ', newPromotion);

            await createPromotions(newPromotion);
            notification.success({
                message: 'Success',
                description: 'Promotion created successfully!',
            });
            form.resetFields();
            onSuccess();
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
            title="Create Promotion"
            open={visible}
            onCancel={onClose}
            footer={null}
            width="60%"
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
            >
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Form.Item
                            name="title"
                            label="Title"
                            rules={[{ required: true, message: 'Please input the title!' }]}
                        >
                            <Input placeholder="Enter promotion title" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="description"
                            label="Description"
                            rules={[{ required: true, message: 'Please input the description!' }]}
                        >
                            <Input placeholder="Enter promotion description" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Form.Item
                            name="discountType"
                            label="Discount Type"
                            rules={[{ required: true, message: 'Please select the discount type!' }]}
                        >
                            <Select mode="multiple" placeholder="Select discount types">
                                <Option value="PERCENTAGE">Percentage</Option>
                                <Option value="FIXED">Fixed Amount</Option>
                                <Option value="SERVICE">SERVICE Amount</Option>
                                <Option value="COMBO">COMBO Amount</Option>
                                <Option value="REFERRAL">REFERRAL Amount</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="discountValue"
                            label="Discount Value"
                            rules={[{ required: true, message: 'Please input the discount value!' }]}
                        >
                            <InputNumber placeholder="Enter discount value" min={0} style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <Form.Item
                            name="dateRange"
                            label="Promotion Period"
                            rules={[{ required: true, message: 'Please select the promotion period!' }]}
                        >
                            <RangePicker showTime style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Form.Item
                            name="isActive"
                            label="Active"
                            rules={[{ required: true, message: 'Please select the status!' }]}
                        >
                            <Select placeholder="Select status">
                                <Option value={true}>Active</Option>
                                <Option value={false}>Inactive</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="minValue"
                            label="Minimum Value"
                            rules={[{ required: true, message: 'Please input the minimum value!' }]}
                        >
                            <InputNumber placeholder="Enter minimum value" min={0} style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Form.Item
                            name="maxUsage"
                            label="Max Usage"
                            rules={[{ required: true, message: 'Please input the max usage!' }]}
                        >
                            <InputNumber placeholder="Enter maximum usage" min={0} style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="createdBy"
                            label="Created By"
                            rules={[{ required: true, message: 'Please input the creator name!' }]}
                        >
                            <Input placeholder="Enter creator name" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Form.Item
                            name="applicableService"
                            label="Applicable Services"
                            rules={[{ required: true, message: 'Please select the applicable services!' }]}
                        >
                            <Select mode="multiple" placeholder="Select services">
                                <Option value="GYM">Gym</Option>
                                <Option value="YOGA">Yoga</Option>
                                <Option value="PT">PT</Option>
                                <Option value="MASSAGE">MASSAGE</Option>
                                <Option value="ALL">ALL</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="packageName"
                            label="Package Name"
                            rules={[{ required: true, message: 'Please select package names!' }]}
                        >
                            <Select mode="multiple" placeholder="Select package names">
                                <Option value="CLASSIC">Classic</Option>
                                <Option value="CLASSIC_PLUS">Classic Plus</Option>
                                <Option value="PRESIDENT">PRESIDENT</Option>
                                <Option value="ROYAL">ROYAL</Option>
                                <Option value="SIGNATURE">SIGNATURE</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} block>
                        Create
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreatePromotionModal;
