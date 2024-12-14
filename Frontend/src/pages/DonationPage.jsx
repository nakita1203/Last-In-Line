import React, { useState } from 'react';
import DonationHeader from '../components/DonationHeader.jsx';
import ProductList from '../components/ProductList.jsx';
import Pagination from '../components/Pagination.jsx';
import Navbar from '../components/Navbar.jsx';
import '../styles/DonationPage.css';
import WinterCoat from '../assets/winter-coat.jpg';
import Laptop from '../assets/laptop.jpg';
import Toys from '../assets/toys.jpg';
import CannedFoods from '../assets/canned-food.jpg';
import StudyDesk from '../assets/study-desk.jpg';
import Jacket from '../assets/jaket-mini.png';

const DonationPage = () => {
    const donationList = [
        {
            id: 1,
            name: "Warm Winter Coat",
            description: "A cozy winter coat for someone in need.",
            category: "Clothing",
            image: WinterCoat,
            donator: "Ericko Lim",
            status: "Donated",
        },
        {
            id: 2,
            name: "Gently Used Laptop",
            description: "A used laptop, perfect for study and work.",
            category: "Electronics",
            image: Laptop,
            donator: "Muhammad Arief Soeharsono",
            status: "Waiting List",
        },
        {
            id: 3,
            name: "Children's Toys",
            description: "A bundle of toys to bring joy to children.",
            category: "Toys",
            image: Toys,
            donator: "Pradikta Wicaksono",
            status: "Donated",
        },
        {
            id: 4,
            name: "Canned Food Bundle",
            description: "A collection of non-perishable canned goods.",
            category: "Food",
            image: CannedFoods,
            donator: "Ikhan Terrence",
            status: "Waiting List",
        },
        {
            id: 5,
            name: "Study Desk",
            description: "A sturdy desk for students to study comfortably.",
            category: "Furniture",
            image: StudyDesk,
            donator: "Sho Tenkubashi",
            status: "Donated",
        },
        {
            id: 6,
            name: "Preloved The Goods Dept Jacket",
            description: "Gently used",
            image: Jacket,
            donator: "Naki Ta RD",
            status: "Waiting List",
        }
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 5;

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = donationList.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(donationList.length / productsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <Navbar />
            <DonationHeader />
            {donationList.length > 0 ? (
                <>
                    <ProductList products={currentProducts} />
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </>
            ) : (
                <p className="text-gray-500 text-center mt-8">No donations available.</p>
            )}
        </>
    );
};

export default DonationPage;