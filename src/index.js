import React from 'react';
import ReactDOM from 'react-dom/client';
import 'reset-css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './uf-style.css';

import LoginPage from './login/Login';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LoginPage />
  </React.StrictMode>
);
