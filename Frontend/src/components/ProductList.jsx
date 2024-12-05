import React from 'react';

const ProductList = ({ products }) => {
    return (
        <div className="px-4 sm:px-8 lg:px-16">
            <div
                className="grid mx-auto my-8 max-w-screen-lg"
                style={{
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '16px', // Adjusted gap for closer cards
                }}
            >
                {products.length > 0 ? (
                    products.map((product, index) => (
                        <div
                            key={index}
                            className="bg-white shadow-lg rounded-md hover:shadow-xl transition-transform transform hover:scale-105"
                            style={{ maxWidth: '100%', margin: '0 auto' }}
                        >
                            <img
                                src={product.image}
                                alt="Product"
                                className="rounded-t-md object-cover"
                                style={{ height: '150px', width: '100%' }}
                            />
                            <div className="p-4">
                                <h3 className="text-resolutionBlue font-bold text-lg">{product.name}</h3>
                                <p className="text-gray-500 text-sm">{product.donator}</p>
                                <div className="flex items-center justify-between mt-2">
                                    <span
                                        className={`text-xs px-2 py-0.5 rounded-md font-medium ${
                                            product.status === 'Donated'
                                                ? 'bg-lavenderWeb text-resolutionBlue'
                                                : 'bg-mimiPink text-claret'
                                        }`}
                                    >
                                        {product.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-center col-span-5">No products available.</p>
                )}
            </div>
        </div>
    );
};

export default ProductList;
