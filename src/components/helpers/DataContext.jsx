// import React, { createContext, useState } from 'react';

// export const DataContext = createContext();
// let userData = localStorage.getItem("user")
// export const DataProvider = ({ children }) => {
//     const [isLoggedIn, setIsLoggedIn] = useState(false); // xác định trạng thái 
//     const [user, setUser] = useState(JSON.parse(userData) || null); // lưu thông tin người dùng
//     const [notificationMessage, setNotificationMessage] = useState(''); // lưu thông báo để hiển thị ui
//     function handleStoreUser(data) {
//         localStorage.setItem("user", JSON.stringify(data))
//         setUser(data)
//         setIsLoggedIn(true)
//         setNotificationMessage('Login successful!'); // Đặt thông báo
//     }
    
//     function handleLogout() {
//         localStorage.removeItem("user")
//         setUser(null)
//         setIsLoggedIn(false)
//     }

//     const clearNotification = () => setNotificationMessage(''); // Để reset thông báo

//     let value = {
//         user,
//         setUser,
//         isLoggedIn, setIsLoggedIn,
//         handleStoreUser,
//         handleLogout,
//         notificationMessage,
//         setNotificationMessage,
//         clearNotification,
//     }

//     return (
//         <DataContext.Provider value={value}>
//             {children}
//         </DataContext.Provider>
//     );
// };


import React, { createContext, useState, useEffect } from 'react';

export const DataContext = createContext();

let userData = localStorage.getItem("user");

export const DataProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!userData); // Khởi tạo từ localStorage
    const [user, setUser] = useState(JSON.parse(userData) || null); // Lưu thông tin người dùng
    const [notificationMessage, setNotificationMessage] = useState(''); // Lưu thông báo để hiển thị UI

    // Hàm gán giá trị mặc định cho profileDTO nếu null
    const ensureProfileDTO = (user) => {
        if (!user || !user.profileDTO) {
            return {
                ...user,
                profileDTO: {
                    hobbies: null,
                    address: null,
                    age: null,
                    heightValue: null,
                    description: null,
                    maritalStatus: null,
                    avatar: null,
                },
            };
        }
        return user;
    };
    useEffect(() => {
        // Kiểm tra trạng thái user khi component được render
        if (user) {
            const updatedUser = ensureProfileDTO(user); // Đảm bảo profileDTO đầy đủ
            if (JSON.stringify(updatedUser) !== JSON.stringify(user)) {
                setUser(updatedUser); // Cập nhật state
                localStorage.setItem("user", JSON.stringify(updatedUser)); // Cập nhật localStorage
            }
        }
    }, [user]);

    function handleStoreUser(data) {
        const updatedUser = ensureProfileDTO(data); // Đảm bảo profileDTO đầy đủ
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        console.log("user: ", updatedUser);
        setIsLoggedIn(true);
        setNotificationMessage('Login successful!'); // Đặt thông báo
    }

    function handleLogout() {
        localStorage.removeItem("user");
        setUser(null);
        setIsLoggedIn(false);
    }

    const clearNotification = () => setNotificationMessage(''); // Để reset thông báo

    let value = {
        user,
        setUser,
        isLoggedIn, setIsLoggedIn,
        handleStoreUser,
        handleLogout,
        notificationMessage,
        setNotificationMessage,
        clearNotification,
    };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
};