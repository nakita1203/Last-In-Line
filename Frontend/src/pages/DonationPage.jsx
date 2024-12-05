import React, { useState, useContext } from 'react';
import DonationHeader from '../components/DonationHeader.jsx';
import ProductList from '../components/ProductList.jsx';
import Pagination from '../components/Pagination.jsx';
import { StoreContext } from '../context/StoreContext.jsx';

const DonationPage = () => {
    const { donationList } = useContext(StoreContext); // Access donationList from context
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 20;

    // Pagination logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = donationList.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(donationList.length / productsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
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
