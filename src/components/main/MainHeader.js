import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Modal, Dropdown, Menu } from 'antd';

const MainHeader = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Kiểm tra token trong localStorage
    const token = localStorage.getItem('tokenData');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('tokenData'); // Xóa token khỏi localStorage
    setIsLoggedIn(false); // Cập nhật state
    navigate('/login'); // Chuyển hướng về trang đăng nhập
  };

  const confirmLogout = () => {
    Modal.confirm({
      title: 'Bạn có chắc chắn muốn đăng xuất?',
      okText: 'Đăng xuất',
      cancelText: 'Hủy',
      onOk: handleLogout,
    });
  };

  const profileMenu = (
    <Menu>
      <Menu.Item key="profile">
        <Link to="/user/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="logout" onClick={confirmLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  const menuExplore = (
    <Menu>
      <Menu.Item key="blog">
        <Link to="/blog">Blog</Link>
      </Menu.Item>
      <Menu.Item key="contact">
        <Link to="/contact-us">Contact</Link>
      </Menu.Item>
      <Menu.Item key="forum">
        <Link to="/forums">Forum</Link>
      </Menu.Item>
    </Menu>
  );

  const menuB = (
    <Menu>
      <Menu.Item key="trainers">
        <a href="#our-team">Trainers</a>
      </Menu.Item>
      <Menu.Item key="clubs">
        <Link to="/clubs">Clubs</Link>
      </Menu.Item>
      <Menu.Item key="gallery">
        <a href="#portfolio">Gallery</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <header id="header">
      <nav id="main-nav" className="navbar navbar-default navbar-fixed-top" role="banner">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>
              <Link to="/" className="logo">
                <div className="logo-name" style={{ fontSize: '28px' }}>
                  <span>FITNESS</span>4LIFE
                </div>
              </Link>
            </div>
          </div>

          <div className="collapse navbar-collapse navbar-right">
            <ul className="nav navbar-nav">
              <li className="scroll active">
                <a href="#home">Home</a>
              </li>
              <li className="scroll">
                <Dropdown overlay={menuB} trigger={['click']}>
                  <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                    Branches <span className="caret"></span>
                  </a>
                </Dropdown>
              </li>
              <li className="scroll">
                <Link to="/bookingMain">Booking</Link>
              </li>
              <li className="scroll">
                <Link to="/packageMain">Membership</Link>
              </li>
              <li className="scroll">
                <Dropdown overlay={menuExplore} trigger={['click']}>
                  <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                    Explore <span className="caret"></span>
                  </a>
                </Dropdown>
              </li>
              {!isLoggedIn ? (
                <>
                  <li className="scroll">
                    <Link className="btn btn-outline-light me-2" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="scroll">
                    <Link className="btn btn-light" to="/registration">
                      Register
                    </Link>
                  </li>
                </>
              ) : (
                <li className="scroll">
                  <Dropdown overlay={profileMenu} trigger={['click']}>
                    <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                      Account <span className="caret"></span>
                    </a>
                  </Dropdown>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default MainHeader;
