import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import './style.scss';
import logo from '../../assets/images/logo.png';
import { Form, Button } from "react-bootstrap";
import { login } from '../../services/http';
import { useFormik } from "formik";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {

  const location = useLocation();


  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = 'required';
    }
    if (!values.password) {
      errors.password = 'required';
    }
    return errors;
  };


  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: async (values) => {

      // //setLoading(true);
      try {
        let res = await login(values);
        console.error("Response:", res);
  
        if (res.status === 200) {
          const user = JSON.stringify(res.data.data);
          
          localStorage.setItem('user', user);
          toast.success("Login successful!");
          if (location.state && location.state.from) {
            window.location.href = location.state.from; // Redirect to the previous location
          } else {
            window.location.href = '/dashboard'; // Redirect to dashboard after successful login
          }
        }
      } catch (error) {
        console.error("An error occurred:", error);
        toast.error("Invalid Credentials");
      }
    },
  });


  return (
    <div className='loginPage'>
      <div className='loginBlock text-center'>
        <img src={logo} alt='logo' />
        <h1>Login in to Arnold | DataPackr</h1>
        <p>Please enter your email address</p>
        <Form className="form-wrap" onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Control
              type="email"
              onChange={formik.handleChange}
              placeholder="Enter your email"
              onBlur={formik.handleBlur}
              value={formik.values.email}

            />
            {formik.errors.email && formik.touched.email ? (
              <div className="text-danger">
                <p className="text-danger">Invalid Email</p>
              </div>
            ) : null}
          </Form.Group>
          <Form.Group className="form-group" controlId="password">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}

            />
            {formik.errors.password && formik.touched.password ? (
              <div className="text-danger">
                <p className="text-danger"> Invalid password</p>
              </div>
            ) : null}
            {/* {loginError ? (
                <div className="text-danger">Invalid Credentials</div>
              ) : null} */}
          </Form.Group>
          <Form.Group className="form-group text-center">
            <Button variant="primary" type="submit" className='w-100 submitBtn' >
              Continues
            </Button>
          </Form.Group>

          <p className='accountYet'>Do not have an account yet ? <Link href={"/"}>Sign Up</Link></p>
        </Form>
        <ToastContainer/>
      </div>
    </div>
  )
}

export default Login;
