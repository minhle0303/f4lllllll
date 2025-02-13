import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import Sidebar from './components/admin/Sidebar';
import Navbar from './components/admin/Navbar';
import Home from './components/admin/page/Home';
import AdminDashboard from './components/admin/page/AdminDashboard';
import AdminLayout from './components/layout/AdminLayout';
import MainLayout from './components/layout/MainLayout';
import Footer from './components/main/Footer';
import MainHeader from './components/main/MainHeader';
import Blog from './components/main/blog/Blog';
import BlogDetail from './components/main/blog/BlogDetail';
import ContactForm from './components/main/contact/ContactForm';
import Club from './components/admin/Club/Club'
import Blogs from './components/admin/Blog/Blogs';
import Users from './components/admin/User/Users';
import Booking from './components/admin/Booking/Booking';
import Room from './components/admin/Room/Room';
import Branch from './components/admin/Branch/Branch';
import Trainer from './components/admin/Trainer/Trainer';
import Login from './components/main/login/Login';
import Registration from './components/main/login/Registration';
import BookingMain from './components/main/booking/Booking';
import Package from './components/admin/Package/Package';
import PackageMain from './components/main/package/Package';
import PaymentMain from './components/main/Paypal/PaymentMain';
import PaymentSuccess from './components/main/Paypal/SuccessfullyPay';
import UserProfilePage from './components/main/user/UserProfilePage';
import HistoryBooking from './components/main/user/HistoryBooking';
import PromotionPage from './components/admin/Promotion/PromotionPage';
import PostPage from './components/admin/Post/PostPage';
import OTPVerification from './components/main/login/OTPVerification';
import ForumPage from './components/main/forum/ForumPage';
import ForumLayout from './components/main/forum/ForumLayout ';
import CategoryPage from './components/main/forum/CategoryPage';
import WhatsNew from './components/main/forum/WhatsNew';
import PostNew from './components/main/forum/PostNew';
import CreateNewPost from './components/main/forum/CreateNewPost';
import DetailPage from './components/main/forum/DetailPage';
import CreatePostQuestions from './components/main/user/CreatePostQuestions';
import YourPostThread from './components/main/user/YourPostThread';
import YourPostDetailPage from './components/main/user/YourPostDetailPage';
import UpdateQuestion from './components/main/forum/UpdateQuestion';
import OrderPage from './components/main/Paypal/Order';
import ClubHome from './components/main/club/clubHome';
import ClubDetails from './components/main/club/clubDetail';
import LoginToken from './components/main/login/LoginToken';


const App = () => {

  return (
    <Router>
      <Routes>
        {/* trang main */}
        <Route path="/" element={<MainLayout />}>

        </Route>

        <Route element={<><MainHeader/><Outlet /><Footer /></>}>
        <Route path='/login' element={<LoginToken />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/blog' element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/contact-us/" element={<ContactForm />} />
        <Route path="/verify-otp/:email" element={<OTPVerification />} />
        <Route path="/forums" element={<ForumLayout />}>
            <Route index element={<CategoryPage />} />
            <Route path="forum" element={<ForumPage />} />
            <Route path="category" element={<CategoryPage />} />
            <Route path="whats-new" element={<WhatsNew />} />
            <Route path="post-new" element={<PostNew />} />
            <Route path="create-new-post" element={<CreateNewPost />} />
          </Route>
          <Route path="forum/:id" element={<DetailPage />} />
          <Route path="/post-thread" element={<CreatePostQuestions />} />
          <Route path="/your-posts" element={<YourPostThread />} />
          <Route path="/post/:postId" element={<YourPostDetailPage />} />
          <Route path="/update-question/:postId" element={<UpdateQuestion/>} />
        <Route path='/bookingMain' element={<BookingMain />} />
        <Route path="/packageMain/" element={<PackageMain />} />
        <Route path="/payment" element={<PaymentMain />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/user/profile" element={<UserProfilePage />} />
        <Route path="/history-booking" element={<HistoryBooking />} />

        <Route path="/clubs/" element={<ClubHome />} />
        <Route path="/clubs/:id" element={<ClubDetails />} />

        </Route>

        {/* Trang  Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="home" element={<Home />} />
          <Route path="Users" element={<Users/>} />
          <Route path="Blogs" element={<Blogs/>} />
          <Route path="Club" element={<Club/>} />
          <Route path="Booking" element={<Booking/>} />
          <Route path="Room" element={<Room/>} />
          <Route path="Branch" element={<Branch/>} />
          <Route path="Trainer" element={<Trainer/>} />
          <Route path="Package" element={<Package/>} />
          <Route path="Promotion" element={<PromotionPage />} />
          <Route path="Post" element={<PostPage />} />
          <Route path="/admin/profile" element={<UserProfilePage />} />

        </Route>
      </Routes>
    </Router>

  );
}

export default App;

