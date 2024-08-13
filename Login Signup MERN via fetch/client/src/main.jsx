import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'; // Add global styles if needed
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/ReactToastify.css'

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
