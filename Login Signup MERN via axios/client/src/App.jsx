import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/Signup';
import RefreshHandler from './RefreshHandler';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to='/login' />
  }
  return (
    <>
      <Navbar />
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
      <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/home' element={<PrivateRoute element={<HomePage />} />} />
      </Routes>
    </>

  );
}

export default App;
