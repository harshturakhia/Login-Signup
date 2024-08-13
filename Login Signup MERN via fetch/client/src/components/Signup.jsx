import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import styles from './SignupPage.module.css';
import { handleError, handleSuccess } from '../utils';

const SignupPage = () => {

    const navigate = useNavigate();

    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: "",
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
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            });


            // Check if response status is OK
            if (!response.ok) {
                const errorText = await response.text(); // Read response as text
                throw new Error(`Server error: ${errorText}`);
            }

            const result = await response.json();
            const { success, message, error } = result;

            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/');
                }, 1000);
            }
            else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            }
            else if (!success) {
                handleError(message);
            }
            console.log(result);
        }
        catch (error) {
            console.error('Error:', error.message);
            handleError(error.message);
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
                    autoFocus
                    value={signupInfo.name}
                />
                <input
                    onChange={handleChange}
                    type="email"
                    name="email"
                    placeholder="Email"
                    autoFocus
                    value={signupInfo.email}
                />
                <input
                    onChange={handleChange}
                    type="password"
                    name="password"
                    placeholder="Password"
                    autoFocus
                    value={signupInfo.password}
                />
                <button type="submit">Sign Up</button>
                <span style={{ padding: "1rem", fontSize: '1.1rem' }}>
                    Already have an account?
                    <Link to='/login'>Login</Link>
                </span>

            </form>
            <ToastContainer />
        </div>
    );

};

export default SignupPage;
