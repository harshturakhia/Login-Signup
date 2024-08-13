import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div style={{ textAlign: 'center', padding: "1rem", margin: "1rem" }}>
            <Link to="/" style={{ fontSize: "1.5rem" }}>Home</Link>
            <Link to="/login" style={{ fontSize: "1.5rem" }}>Login</Link>
            <Link to="/signup" style={{ fontSize: "1.5rem" }}>Sign Up</Link>
        </div>
    )
}

export default Navbar