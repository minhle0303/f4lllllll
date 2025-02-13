import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../../serviceToken/authService';
import { jwtDecode } from 'jwt-decode';
import { getUserByEmail } from '../../../services/authService';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginToken = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error(' Please fill in email or password!');
      return;
    }

    try {
      const data = await loginUser(email, password);
      const { access_token } = data;

      const decodedToken = jwtDecode(access_token);
      const userEmail = decodedToken?.sub;

      if (!userEmail) {
        toast.error('Invalid token.');
        return;
      }

      const userDetails = await getUserByEmail(userEmail, access_token);

      if (!userDetails.active) {
        toast.warning('⚠️ Your account is not active, please contact admin!');
        return;
      }

      localStorage.setItem('tokenData', JSON.stringify(data));
      toast.success('Login successful! Redirecting...');

      setTimeout(() => {
        switch (decodedToken.role) {
          case 'ADMIN':
            navigate('/admin/profile');
            break;
          case 'USER':
            navigate('/user/profile');
            break;
          default:
            toast.error('You have not been granted permission.');
        }
      }, 1500);
    } catch (err) {
      toast.error(`${err.message}`);
    }
  };

  return (
    <section id="services">
      <div className="login-container">
        <h2>Login</h2>
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="submit-button">Login</button>
        </form>
      </div>
    </section>
  );
};

export default LoginToken;
