import React, { useState } from 'react';
import styles from './LoginPage.module.css';
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

const LoginPage = () => {
    const navigate = useNavigate();

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copyLoginInfo = { ...loginInfo };
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) {
            return handleError('email and password are required')
        }
        try {

            const url = 'http://localhost:9898/auth/login';
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });

            const result = await response.json();
            const { success, message, jwtToken, name, error } = result;

            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                setTimeout(() => {
                    navigate('/')
                }, 1000)
            }
            else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            }
            else if (!success) {
                handleError(message);
            }
            console.log(result);
        } catch (err) {
            handleError(err.message);
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
                    onChange={handleChange}
                    type="password"
                    name='password'
                    placeholder="Password"
                    value={loginInfo.password}
                />
                <button type="submit">Login</button>

                <span style={{ padding: "1rem" , fontSize : '1.1rem'}}>Does't have an account ?
                    <Link to="/signup">Signup</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    );
};

export default LoginPage;
