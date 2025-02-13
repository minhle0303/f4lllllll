import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { verifyOTP } from '../../../services/authService'; //  API xác thực OTP

const OTPVerification = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']); // Lưu từng số của OTP
  const [loading, setLoading] = useState(false);

  // Xử lý thay đổi input OTP
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!isNaN(value) && value.length <= 1) {
      let newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Tự động chuyển focus sang ô tiếp theo
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  // Gửi OTP để xác thực
  const handleVerifyOTP = async () => {
    const otpCode = otp.join(''); // Chuyển mảng thành chuỗi "123456"
    if (otpCode.length !== 6) {
      toast.error("OTP must be 6 digits");
      return;
    }

    try {
      setLoading(true);
      console.log(otpCode);
      
      const response = await verifyOTP(email,otpCode);

      if (response.status === 200) {
        toast.success("OTP Verified Successfully! Redirecting...");
        setTimeout(() => {
          navigate('/login'); // 🔹 Chuyển đến trang chính sau khi xác thực thành công
        }, 2000);
      } else {
        toast.error(response.message || "Invalid OTP!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="otp-container">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2>Verify OTP</h2>
      <p>Please enter the 6-digit code sent to <b>{email}</b></p>

      <div className="otp-inputs">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            type="text"
            className="otp-input"
            value={digit}
            onChange={(e) => handleChange(e, index)}
            maxLength="1"
          />
        ))}
      </div>

      <button className="btn-verify" onClick={handleVerifyOTP} disabled={loading}>
        {loading ? <span className="spinner-border spinner-border-sm"></span> : "Verify OTP"}
      </button>
    </div>
  );
};

export default OTPVerification;
