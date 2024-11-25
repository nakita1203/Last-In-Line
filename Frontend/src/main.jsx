// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
import React from 'react';
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom';
import StoreProvider from './context/StoreContext';
import ReactDom from 'react-dom/client';

ReactDom.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <StoreProvider>
            <App />
        </StoreProvider>
    </BrowserRouter>
);
