import React, { useState } from 'react';
import axios from 'axios';
import styles from './LoginPage.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

const LoginPage = () => {
    const navigate = useNavigate();
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value
        }));
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;

        if (!email || !password) {
            return handleError('Email and password are required');
        }

        try {
            const url = 'http://localhost:9898/auth/login';
            const response = await axios.post(url, loginInfo);

            const { success, message, jwtToken, name, error } = response.data;

            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
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
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    name='email'
                    onChange={handleChange}
                    value={loginInfo.email}
                />
                <input
                    type="password"
                    name='password'
                    placeholder="Password"
                    onChange={handleChange}
                    value={loginInfo.password}
                />
                <button type="submit">Login</button>
                <span style={{ padding: "1rem", fontSize: '1.1rem' }}>
                    Doesn't have an account? <Link to="/signup">Signup</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    );
};

export default LoginPage;
