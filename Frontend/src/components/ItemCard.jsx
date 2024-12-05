// eslint-disable-next-line react/prop-types
export default function ItemCard({ title, condition, price, image }) {
    return (
        <div className="card rounded-lg px-6 pt-5 shadow hover:shadow-xl transition w-64"> {/* Adjust width as needed */}
            {image && (
                <img
                    src={image}
                    alt={title}
                    className="w-full h-30 object-cover mb-2 rounded-md"
                />
            )}
            <h3 className="text-lg font-bold">{title}</h3>
            <p>{condition}</p>
            <p className="font-semibold py-4">{price}</p>
        </div>
    );
}

