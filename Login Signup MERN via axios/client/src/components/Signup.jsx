import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import styles from './SignupPage.module.css';
import { handleError, handleSuccess } from '../utils';

const SignupPage = () => {
    const navigate = useNavigate();
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value
        }));
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupInfo;

        if (!name || !email || !password) {
            return handleError('All fields are required!');
        }

        try {
            const url = 'http://localhost:9898/auth/signup';
            const response = await axios.post(url, signupInfo);

            const { success, message, error } = response.data;

            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/');
                }, 1000);
            } else if (error) {
                handleError(error?.details[0].message);
            } else {
                handleError(message);
            }
        } catch (error) {
            handleError(error.response?.data?.message || error.message);
        }
    }

    return (
        <div className={styles.container}>
            <h2>Sign Up</h2>
            <form onSubmit={submitHandler}>
                <input
                    onChange={handleChange}
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={signupInfo.name}
                />
                <input
                    onChange={handleChange}
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={signupInfo.email}
                />
                <input
                    onChange={handleChange}
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={signupInfo.password}
                />
                <button type="submit">Sign Up</button>
                <span style={{ padding: "1rem", fontSize: '1.1rem' }}>
                    Already have an account? <Link to='/login'>Login</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    );
};

export default SignupPage;
