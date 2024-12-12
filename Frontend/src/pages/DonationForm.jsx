import React, { useState } from 'react';
import './DonationForm.css';

const DonationForm = () => {
    const [formData, setFormData] = useState({
        initial: '',
        phoneNumber: '',
        address: '',
        itemName: '',
        itemPhoto: null,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageUpload = (e) => {
        setFormData({ ...formData, itemPhoto: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted Donation:', formData);
        // TODO: Replace with API call or state management logic to save the donation
        alert('Donation submitted successfully!');
    };

    return (
        <div className="donation-page">
            <h1>Donation Form</h1>
            <form className="donation-form" onSubmit={handleSubmit}>
                <label>
                    Initial (Can be Anonymous or Initials):
                    <input
                        type="text"
                        name="initial"
                        value={formData.initial}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                    />
                </label>

                <label>
                    Phone Number:
                    <input
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        placeholder="081234567899"
                    />
                </label>

                <label>
                    Address:
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Electrical Engineering Department, 2nd Floor"
                    />
                </label>

                <label>
                    Item Name:
                    <input
                        type="text"
                        name="itemName"
                        value={formData.itemName}
                        onChange={handleInputChange}
                        placeholder="SBA Router + Ethernet cable"
                    />
                </label>

                <label>
                    Upload Item Photo:
                    <div className="upload-button">
                        <i className="upload-icon"></i>
                        <span>Choose File</span>
                        <input
                            type="file"
                            onChange={handleImageUpload}
                            accept="image/*"
                            style={{ display: 'none' }}
                        />
                    </div>
                </label>

                <button type="submit" className="submit-button">
                    Submit Donation
                </button>
            </form>
        </div>
    );
};

export default DonationForm;