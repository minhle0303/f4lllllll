import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerUser } from '../../../services/authService';
import { useNavigate } from 'react-router-dom'; // 🔹 Import useNavigate

const Registration = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // 🔹 Khai báo navigate

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string().required("Email is required").email("Email should be valid"),
    password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters long"),
    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref('password')], 'Passwords must match'),
    gender: Yup.string().required("Gender is required")
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = async (data) => {
    let newData = { ...data, role: "USER" };
    try {
      setLoading(true);
      let result = await registerUser(newData);

      if (result.status === 201) {
        reset();
        toast.success("Registration successful! Redirecting to OTP verification...");
        setTimeout(() => {
          navigate(`/verify-otp/${data.email}`);
        }, 2000);
      } else if (result.status === 400) {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Oops, something went wrong!!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="services">
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <div href="#" className="logo">
          <div className="logo-name">RE<span>GISTER</span></div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />

            <form className="reg-page" onSubmit={handleSubmit(onSubmit)}>
              <div className="reg-header">
                <h2>Register a new account</h2>
                <p>
                  Already Signed Up? Click{' '}
                  <a href="/login" className="color-green">Sign In</a>{' '}
                  to login your account.
                </p>
              </div>

              {/* Full Name */}
              <label>Full Name</label>
              <input type="text" className={`form-control ${errors.fullName ? 'is-invalid' : ''}`} {...register('fullName')} />
              <div className="invalid-feedback">{errors.fullName?.message}</div>

              {/* Email */}
              <label>Email Address <span className="color-red">*</span></label>
              <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} {...register('email')} required />
              <div className="invalid-feedback">{errors.email?.message}</div>

              {/* Password & Confirm Password */}
              <div className="row">
                <div className="col-sm-6">
                  <label>Password <span className="color-red">*</span></label>
                  <input type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} {...register('password')} />
                  <div className="invalid-feedback">{errors.password?.message}</div>
                </div>
                <div className="col-sm-6">
                  <label>Confirm Password <span className="color-red">*</span></label>
                  <input type="password" className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} {...register('confirmPassword')} />
                  <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
                </div>
              </div>

              {/* Gender */}
              <div className="row">
                <div className="col-md-12 mb-3">
                  <label className="form-label">Gender</label>
                  <div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" {...register('gender')} value="MALE" defaultChecked />
                      <label className="form-check-label">Male</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" {...register('gender')} value="FEMALE" />
                      <label className="form-check-label">Female</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" {...register('gender')} value="OTHER" />
                      <label className="form-check-label">Other</label>
                    </div>
                    <div className="invalid-feedback d-block">{errors.gender?.message}</div>
                  </div>
                </div>
              </div>

              <hr />

              {/* Submit Button */}
              <div className="row">
                <div className="col-lg-6 text-right">
                  <button className="btn-u" disabled={loading} type="submit">
                    {loading ? <span className="spinner-border spinner-border-sm"></span> : "Register"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Registration;
