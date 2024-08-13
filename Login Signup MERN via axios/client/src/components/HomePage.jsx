import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import styles from './HomePage.module.css';

const HomePage = () => {
    const navigate = useNavigate();
    const [loggedInUser, setLoggedInUser] = useState('');
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Logged-out');

        setTimeout(() => {
            navigate('/login');
        }, 500);
    }

    const fetchProducts = async () => {
        try {
            const url = "http://localhost:9898/products";
            const response = await axios.get(url, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            });
            setProducts(response.data);
        } catch (err) {
            handleError(err.response?.data?.message || err.message);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className={styles.container}>
            <h1 style={{ fontSize: "2.5rem", padding: '2rem' }}>Welcome </h1>
            <h1 style={{ fontSize: "2.5rem", padding: '2rem' }}>Welcome {loggedInUser}</h1>

            {loggedInUser && (
                <button onClick={handleLogout} style={{ fontSize: "2rem", padding: "1rem", border: "5%" }}>
                    Logout
                </button>
            )}
    
            {loggedInUser ?
                <div>
                    {products.map((item, index) => (
                        <ul key={index} style={{ padding: "0 2rem", color: "black", textAlign: 'center' }}>
                            <h1>{item.name} : {item.gender}</h1>
                        </ul>
                    ))}
                </div>
                :
                <span style={{ padding: "1rem", fontSize: '1.1rem' }}>
                    Login here
                    <Link to="/login">Login</Link>
                </span>}

            <ToastContainer />
        </div>
    );
};

export default HomePage;
