import React from 'react';
import './DonationHeader.css';
import { Link } from 'react-router-dom';

const DonationHeader = () => {
    return (
        <div className='donation-header'>
            <div className='donation-header-contents'>
                <h2>Give Your Treasures a Second Life – Donate Today!</h2>
                <p>Turn your gently used items into meaningful change. From clothing to home essentials, your donations help others in need while keeping valuable resources out of landfills. Embrace sustainability and make a difference—one donation at a time.</p>
                <Link to="/donate/add">
                    <button className="donation-button">Donate Here!</button>
                </Link>
            </div>
        </div>
    );
};

export default DonationHeader;
