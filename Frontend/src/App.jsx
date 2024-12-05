import React from 'react';
import {link} from 'react-router-dom';
import DonationPage from './pages/DonationPage.jsx';
import './App.css';

const App = () =>{
  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        Welcome to the Donation Page
      </h1>
      <DonationPage />
    </div>
  );
}

return App;