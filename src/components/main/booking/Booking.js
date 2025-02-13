// import React, { useEffect, useState, useContext } from 'react';
// import { Card, Col, Row, Badge, Modal, Button, notification, Layout } from 'antd';
// import { useNavigate } from 'react-router-dom';
// import { DataContext } from '../../helpers/DataContext';
// import { GetRoomsByPackage, submitBookingRoom } from '../../../services/PackageService';

// const { Meta } = Card;
// const { Content } = Layout;

// function BookingMain() {
//     const { user, isLoggedIn } = useContext(DataContext);
//     const navigate = useNavigate();
//     const [filteredRooms, setFilteredRooms] = useState([]); // Filtered rooms
//     const [selectedRoom, setSelectedRoom] = useState(null);
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     useEffect(() => {
//         console.log('Current User:', user);
//     }, [user]);

//     useEffect(() => {
//         const loadRoomsByPackage = async () => {
//             try {
//                 const rooms = await GetRoomsByPackage(user.workoutPackageId);
//                 setFilteredRooms(rooms);
//             } catch (error) {
//                 notification.error({
//                     message: 'Error Fetching Rooms',
//                     description: error.message || 'Something went wrong while fetching rooms.',
//                 });
//             }
//         };

//         if (user && user.workoutPackageId) {
//             loadRoomsByPackage();
//         }
//     }, [user]);

//     const openModal = (room) => {
//         if (!isLoggedIn) { // Kiểm tra trạng thái đăng nhập
//             notification.warning({
//                 message: 'Authentication Required',
//                 description: 'You need to log in to book a room. Redirecting to login page...',
//             });
//             setTimeout(() => navigate('/login'), 1500); // Điều hướng sau thông báo
//             return;
//         }
//         setSelectedRoom(room);
//         setIsModalOpen(true);
//     };

//     const closeModal = () => {
//         setSelectedRoom(null);
//         setIsModalOpen(false);
//     };

//     const handleSubmitBooking = async () => {
//         if (!selectedRoom) {
//             notification.error({
//                 message: 'Booking Error',
//                 description: 'Please select a room to book.',
//             });
//             return;
//         }

//         const bookingData = {
//             userId: user.id,
//             roomId: selectedRoom.id,
//         };

//         try {
//             const response = await submitBookingRoom(bookingData);
//             if (response.status === 201) {
//                 notification.success({
//                     message: 'Booking Successful',
//                     description: `Room ${selectedRoom.roomName} has been booked for ${user.fullName}.`,
//                 });
//                 closeModal();
//             } else {
//                 throw new Error(response.data.message || 'Failed to book the room');
//             }
//         } catch (error) {
//             notification.error({
//                 message: 'Booking Error',
//                 description: error.message || 'Something went wrong while booking the room.',
//             });
//         }
//     };

//     return (
//         <section id="services">
//             <Layout style={{ minHeight: '100vh' }}>
//                 <Content style={{ padding: '20px' }}>
//                     <h1>Rooms</h1>
//                     <Row gutter={[16, 16]}>
//                         {filteredRooms.length > 0 ? (
//                             filteredRooms.map((room) => (
//                                 <Col xs={24} sm={12} md={8} lg={6} key={room.id}>
//                                     <Badge.Ribbon
//                                         text={room.status ? 'Available' : 'Unavailable'}
//                                         color={room.status ? 'green' : 'red'}
//                                     >
//                                         <Card
//                                             hoverable
//                                             style={{ width: '100%' }}
//                                             title={room.roomName}
//                                             onClick={() => openModal(room)}
//                                         >
//                                             <Meta
//                                                 description={
//                                                     <>
//                                                         <p><strong>Slot:</strong> {room.availableSeats}/{room.capacity}</p>
//                                                         <p><strong>Facilities:</strong> {room.facilities}</p>
//                                                         <p><strong>Start Time:</strong> {room.startTime}</p>
//                                                         <p><strong>End Time:</strong> {room.endTime}</p>
//                                                     </>
//                                                 }
//                                             />
//                                         </Card>
//                                     </Badge.Ribbon>
//                                 </Col>
//                             ))
//                         ) : (
//                             <p>No rooms available for the selected package.</p>
//                         )}
//                     </Row>
//                 </Content>

//                 {isModalOpen && selectedRoom && (
//                     <Modal
//                         title={`Room Details: ${selectedRoom.roomName}`}
//                         open={isModalOpen}
//                         onCancel={closeModal}
//                         footer={[
//                             <Button key="cancel" onClick={closeModal}>Cancel</Button>,
//                             <Button key="submit" type="primary" onClick={handleSubmitBooking}>Submit Booking</Button>,
//                         ]}
//                     >
//                         <p><strong>Capacity:</strong> {selectedRoom.capacity}</p>
//                         <p><strong>Available Seats:</strong> {selectedRoom.availableSeats}</p>
//                         <p><strong>Facilities:</strong> {selectedRoom.facilities}</p>
//                         <p><strong>Start Time:</strong> {`${selectedRoom.startTime[0]}:${selectedRoom.startTime[1] === 0 ? '00' : selectedRoom.startTime[1]}`}</p>
//                         <p><strong>End Time:</strong> {`${selectedRoom.endTime[0]}:${selectedRoom.endTime[1] === 0 ? '00' : selectedRoom.endTime[1]}`}</p>
//                         <p><strong>Status:</strong> {selectedRoom.status ? 'Available' : 'Unavailable'}</p>
//                     </Modal>
//                 )}
//             </Layout>
//         </section>
//     );
// }

// export default BookingMain;

import React, { useEffect, useState, useContext } from 'react';
import { Card, Col, Row, Modal, Button, notification, Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../../helpers/DataContext';
import { GetRoomsByPackage, submitBookingRoom } from '../../../services/PackageService';
import moment from 'moment';
import '../../../assets/css/Booking.css';
const { Meta } = Card;
const { Content } = Layout;

function BookingMain() {
    const { user, isLoggedIn } = useContext(DataContext);
    const navigate = useNavigate();
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const loadRoomsByPackage = async () => {
            try {
                const rooms = await GetRoomsByPackage(user.workoutPackageId);
                setFilteredRooms(rooms);
            } catch (error) {
                notification.error({
                    message: 'Error Fetching Rooms',
                    description: error.message || 'Something went wrong while fetching rooms.',
                });
            }
        };

        if (user && user.workoutPackageId) {
            loadRoomsByPackage();
        }
    }, [user]);

    const openModal = (room) => {
        if (!isLoggedIn) {
            notification.warning({
                message: 'Authentication Required',
                description: 'You need to log in to book a room. Redirecting to login page...',
            });
            setTimeout(() => navigate('/login'), 1500);
            return;
        }
        setSelectedRoom(room);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedRoom(null);
        setIsModalOpen(false);
    };

    const handleSubmitBooking = async () => {
        if (!selectedRoom) {
            notification.error({
                message: 'Booking Error',
                description: 'Please select a room to book.',
            });
            return;
        }

        const bookingData = {
            userId: user.id,
            roomId: selectedRoom.id,
        };

        try {
            const response = await submitBookingRoom(bookingData);
            if (response.status === 201) {
                notification.success({
                    message: 'Booking Successful',
                    description: `Room ${selectedRoom.roomName} has been booked for ${user.fullName}.`,
                });
                closeModal();
            } else {
                throw new Error(response.data.message || 'Failed to book the room');
            }
        } catch (error) {
            notification.error({
                message: 'Booking Error',
                description: error.message || 'Something went wrong while booking the room.',
            });
        }
    };

    return (
        <section id="services">
            <Layout style={{ minHeight: '100vh' }}>
                <Content style={{ padding: '20px' }}>
                    <h1>Rooms</h1>
                    <Row gutter={[16, 16]}>
                        {filteredRooms.length > 0 ? (
                            filteredRooms.map((room) => (
                                <Col xs={24} sm={12} md={8} lg={6} key={room.id}>
                                    <Card
                                        hoverable
                                        className="room-card"
                                        style={{ width: '100%' }}
                                        title={
                                            <div className="card-header">
                                                <span>{room.roomName}</span>
                                                <span className="slot-info">Slot: {room.availableSeats}/{room.capacity}</span>
                                            </div>
                                        }
                                        onClick={() => openModal(room)}
                                    >
                                        <Meta
                                            description={
                                                <div className="card-meta">
                                                    <p><strong>Facilities:</strong> {room.facilities}</p>
                                                    <div className="time-info">
                                                        <span className="start-time">
                                                            Start: {moment({ hour: room.startTime[0], minute: room.startTime[1] }).format('hh:mm A')}
                                                        </span>
                                                        <span className="end-time">
                                                            End: {moment({ hour: room.endTime[0], minute: room.endTime[1] }).format('hh:mm A')}
                                                        </span>
                                                    </div>
                                                </div>
                                            }
                                        />
                                    </Card>
                                </Col>
                            ))
                        ) : (
                            <p>No rooms available for the selected package.</p>
                        )}
                    </Row>
                </Content>

                {isModalOpen && selectedRoom && (
                    <Modal
                        title={`Room Details: ${selectedRoom.roomName}`}
                        open={isModalOpen}
                        onCancel={closeModal}
                        footer={[
                            <Button key="cancel" onClick={closeModal}>Cancel</Button>,
                            <Button key="submit" type="primary" onClick={handleSubmitBooking}>Submit Booking</Button>,
                        ]}
                    >
                        <p><strong>Capacity:</strong> {selectedRoom.capacity}</p>
                        <p><strong>Available Seats:</strong> {selectedRoom.availableSeats}</p>
                        <p><strong>Facilities:</strong> {selectedRoom.facilities}</p>
                        <p><strong>Start Time:</strong> {moment(selectedRoom.startTime).format('hh:mm A')}</p>
                        <p><strong>End Time:</strong> {moment(selectedRoom.endTime).format('hh:mm A')}</p>
                    </Modal>
                )}
            </Layout>
        </section>
    );
}

export default BookingMain;

