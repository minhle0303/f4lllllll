import React, { useEffect, useState } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import axios from "axios"; // Make sure to import axios

const OrderPage = () => {
    const [searchParams] = useSearchParams();
    const location = useLocation();

    const { package: selectedPackage } = location.state || {}; // Get package info from location.state
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [membershipData, setMembershipData] = useState(null); // Store membership data

    useEffect(() => {
        const paymentId = searchParams.get("paymentId");
        const token = searchParams.get("token");
        const payerId = searchParams.get("PayerID");

        // Check if paymentId, token, and payerId are valid
        if (paymentId && token && payerId) {
            setMessage("Thanh toán thành công rồi nha! Cảm ơn bạn.");
        } else {
            setMessage("Thông tin thanh toán không hợp lệ.");
            setLoading(false);
            return; // If not valid, exit the effect
        }

        // Fetch membership data using the paymentId
        if (paymentId) {
            axios
                .get(`http://localhost:8082/api/paypal/getMembershipByPamentId/${paymentId}`)
                .then((response) => {
                    setMembershipData(response.data); // Update state with fetched data
                })
                .catch((error) => {
                    console.error("Error fetching membership data:", error);
                    setMessage("Không thể lấy thông tin thanh toán.");
                })
                .finally(() => {
                    setLoading(false); // Set loading to false once the data is fetched
                });
        }
    }, [searchParams]); // Depend on searchParams to trigger the effect when it changes

    if (loading) {
        return <p>Đang xử lý thanh toán, vui lòng đợi...</p>;
    }

    return (
        <section id="services">
            <div>
                <h1>Kết quả thanh toán</h1>
                <p>{message}</p>

                {/* Display membership details if available */}
                {membershipData && (
                    <div>
                        <h2>Thông tin gói:</h2>
                        <p><strong>Tên gói:</strong> {membershipData.packageName}</p>
                        <p><strong>Giá:</strong> {membershipData.totalAmount.toLocaleString('vi-VN')} VND</p>
                        <p><strong>Mô tả:</strong> {membershipData.description}</p>
                        <p><strong>Ngày bắt đầu:</strong> {membershipData.startDate.join('/')}</p>
                        <p><strong>Ngày kết thúc:</strong> {membershipData.endDate.join('/')}</p>
                    </div>
                )}

                {/* Fallback if package info is available from location.state */}
                {selectedPackage && !membershipData && (
                    <div>
                        <h2>Thông tin gói:</h2>
                        <p><strong>Tên gói:</strong> {selectedPackage.packageName}</p>
                        <p><strong>Giá:</strong> {selectedPackage.price.toLocaleString('vi-VN')} VND</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default OrderPage;
