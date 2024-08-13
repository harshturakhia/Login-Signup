import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

import styles from './HomePage.module.css';

const HomePage = () => {

    const navigate = useNavigate();

    const [loggedInUser, setLoggedInUser] = useState('');
    const [products, setProducts] = useState('');

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'))
    }, [])

    const handleLogout = (e) => {

        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Logged-out');

        setTimeout(() => {
            navigate('/login');
        }, 500)
    }

    const fetchProducts = async () => {
        try {
            const url = "http://localhost:9898/products";
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            }
            const response = await fetch(url, headers);
            const result = await response.json();
            setProducts(result);
        }
        catch (err) {
            handleError(err);
        }
    }
    
    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <>
            <div className={styles.container}>
                <h1 style={{ fontSize: "2.5rem", padding: '2rem' }}>Welcome {loggedInUser}</h1>

                {
                    loggedInUser ? <button onClick={handleLogout} style={{ fontSize: "2rem", padding: "1rem", border: "5%" }}>Logout</button> : ''
                }
                {
                    loggedInUser ?
                        <div>
                            {
                                products && products?.map((item, index) => (
                                    <ul key={index} style={{ padding: "0 2rem", color: "black", textAlign: 'center' }}>
                                        <h1>{item.name} : {item.gender}</h1>
                                    </ul>
                                ))
                            }
                        </div>
                        : ''
                }

                <ToastContainer />
            </div>
        </>
    );
};

export default HomePage;
