import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { DataContext } from "../../helpers/DataContext";
import { QRCode } from "antd";
import '../../../assets/css/QR.css';

const HistoryBooking = () => {
    const { user } = useContext(DataContext);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedQRCode, setSelectedQRCode] = useState(null);


    
    // Fetch booking history for the user
    useEffect(() => {
        const fetchBookingHistory = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8082/api/booking/bookingRooms/history/${user.id}`
                );
                console.log(">>CheckUser Profile",user.id);
                

                const bookingsWithQR = await Promise.all(
                    response.data.data.map(async (booking) => {
                        try {
                            // Fetch QR code for each booking
                            const qrResponse = await axios.get(
                                `http://localhost:8082/api/booking/qrCode/${booking.id}`
                            );
                            console.log(
                                `Booking ID: ${booking.id}, QR Code Response:`,
                                qrResponse.data
                            );
                            return {
                                ...booking,
                                checkInQRCode: qrResponse.data.data || null, // Add QR code to booking
                            };
                        } catch (qrError) {
                            // console.error(
                            //     `Error fetching QR code for booking ID ${booking.id}:`,
                            //     qrError
                            // );
                            return { ...booking, checkInQRCode: null }; // Return booking without QR code if error occurs
                        }
                    })
                );

                setBookings(bookingsWithQR);
            } catch (err) {
                setError("Không thể tải dữ liệu lịch sử booking.");
            } finally {
                setLoading(false);
            }
        };

        fetchBookingHistory();
    }, [user.id]);

    if (loading) {
        return <div>Đang tải dữ liệu...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const handleQRCodeClick = (qrCode) => {
        setSelectedQRCode(qrCode);
    };

    const handleCloseQRCode = () => {
        setSelectedQRCode(null);
    };

    
    return (
        <section id="services">
            <h2>Lịch Sử Booking</h2>
            {bookings.length === 0 ? (
                <p>Bạn chưa có lịch sử booking phòng nào.</p>
            ) : (
                <div className="booking-grid">
                    {bookings.map((booking) => (
                        <div key={booking.id} className="booking-card">
                            <h3>Phòng: {booking.roomName}</h3>
                            <p>Ngày booking: {new Date(booking.bookingDate).toLocaleString()}</p>
                            <p>Trạng thái: {booking.status}</p>

                            {booking.checkInQRCode ? (
                                <div onClick={() => handleQRCodeClick(booking.checkInQRCode)}>
                                    <QRCode value={booking.checkInQRCode} size={128} />
                                </div>
                            ) : (
                                <p>Không có mã QR</p>
                            )}

                        </div>
                    ))}
                </div>
            )}

            {selectedQRCode && (
                <div className="qr-modal" onClick={handleCloseQRCode}>
                    <div className="qr-modal-content">
                        <QRCode value={selectedQRCode} size={256} />
                    </div>
                </div>
            )}
        </section>
    );
};

export default HistoryBooking;
