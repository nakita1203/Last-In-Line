import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex items-center justify-center mt-8">
            <button
                className="px-4 py-2 bg-lavenderWeb text-resolutionBlue rounded-md mr-2 hover:bg-periwinkle"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                &lt;
            </button>
            {pageNumbers.map((pageNumber) => (
                <button
                    key={pageNumber}
                    className={`px-4 py-2 bg-lavenderWeb text-resolutionBlue rounded-md mx-1 hover:bg-periwinkle ${
                        currentPage === pageNumber ? 'bg-periwinkle' : ''
                    }`}
                    onClick={() => onPageChange(pageNumber)}
                >
                    {pageNumber}
                </button>
            ))}
            <button
                className="px-4 py-2 bg-lavenderWeb text-resolutionBlue rounded-md ml-2 hover:bg-periwinkle"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                &gt;
            </button>
        </div>
    );
};

export default Pagination;