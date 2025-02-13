import { useLocation } from 'react-router-dom';
import { Card, Button, notification, Row, Col, Typography } from 'antd';
import React, { useContext } from 'react';
import { DataContext } from '../../helpers/DataContext';
import axios from 'axios';

const { Title, Text } = Typography;

function PaymentPage() {
    const location = useLocation();
    
    const { package: selectedPackage } = location.state || {}; // Get package info from state
    const { user } = useContext(DataContext); // Get user info from context

    const handleSubmitPayment = async () => {
        if (!selectedPackage) {
            notification.error({
                message: 'Error',
                description: 'No package selected. Please go back and choose a package.',
            });
            return;
        }

        try {
            const payload = {
                packageId: selectedPackage.id,
                userId: user.id,
                buyDate: new Date().toISOString(),
                totalAmount: selectedPackage.price,
                startDate: new Date().toISOString(),
                endDate: new Date(
                    new Date().setMonth(new Date().getMonth() + selectedPackage.durationMonth)
                ).toISOString(),
                description: selectedPackage.description,
                cancelUrl: "http://localhost:5173/cancel",
                successUrl: "http://localhost:3000/order",
                packageName: selectedPackage.packageName,
                currency: "USD",
                intent: "Sale",
            };

            const response = await axios.post('http://localhost:8082/api/paypal/pay', payload);

            if (response.data && response.data.redirectUrl) {
                window.location.href = response.data.redirectUrl;
            } else {
                window.location.href = response.data;
            }
        } catch (error) {
            notification.error({
                message: 'Payment Error',
                description: 'An error occurred while processing your payment. Please try again later.',
            });
        }
    };

    return (
        <div style={{ padding: '40px', background: '#f5f5f5', minHeight: '100vh' }}>
            <Row justify="center">
                <Col xs={24} sm={22} md={20} lg={18}>
                    <Card
                        bordered
                        style={{
                            borderRadius: '10px',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                            overflow: 'hidden',
                            width: '100%', // Card chiếm toàn bộ chiều rộng của cột
                            padding: '20px',
                        }}
                    >
                        <Title
                            level={2}
                            style={{
                                textAlign: 'center',
                                marginBottom: '30px',
                                fontSize: '32px', // Tăng kích thước chữ tiêu đề
                            }}
                        >
                            {selectedPackage ? 'Payment Page' : 'No Package Selected'}
                        </Title>

                        {selectedPackage ? (
                            <>
                                <Text
                                    type="secondary"
                                    style={{
                                        display: 'block',
                                        marginBottom: '15px',
                                        fontSize: '20px', // Tăng kích thước chữ
                                    }}
                                >
                                    <strong>Package:</strong> {selectedPackage.packageName}
                                </Text>
                                <Text
                                    type="secondary"
                                    style={{
                                        display: 'block',
                                        marginBottom: '15px',
                                        fontSize: '20px', // Tăng kích thước chữ
                                    }}
                                >
                                    <strong>Description:</strong> {selectedPackage.description}
                                </Text>
                                <Text
                                    type="secondary"
                                    style={{
                                        display: 'block',
                                        marginBottom: '15px',
                                        fontSize: '20px', // Tăng kích thước chữ
                                    }}
                                >
                                    <strong>Duration:</strong> {selectedPackage.durationMonth} months
                                </Text>
                                <Text
                                    type="secondary"
                                    style={{
                                        display: 'block',
                                        marginBottom: '15px',
                                        fontSize: '20px', // Tăng kích thước chữ
                                    }}
                                >
                                    <strong>Price:</strong>{' '}
                                    {selectedPackage.price.toLocaleString('vi-VN')} VND
                                </Text>
                                <Text
                                    type="secondary"
                                    style={{
                                        display: 'block',
                                        marginBottom: '20px',
                                        fontSize: '20px', // Tăng kích thước chữ
                                    }}
                                >
                                    <strong>User:</strong> {user.fullName}
                                </Text>

                                <Button
                                    type="primary"
                                    block
                                    onClick={handleSubmitPayment}
                                    style={{
                                        borderRadius: '5px',
                                        height: '50px',
                                        fontSize: '18px', // Tăng kích thước chữ nút
                                    }}
                                >
                                    Submit Payment
                                </Button>
                            </>
                        ) : (
                            <Text
                                style={{
                                    textAlign: 'center',
                                    display: 'block',
                                    fontSize: '20px', // Tăng kích thước chữ
                                }}
                            >
                                No package selected. Please go back and choose a package.
                            </Text>
                        )}
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default PaymentPage;
