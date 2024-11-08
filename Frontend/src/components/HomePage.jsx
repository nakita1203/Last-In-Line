import ItemCard from './ItemCard';
import pavilionImage from '../assets/pavilion.png'
import banner from '../assets/banner.png'

export default function HomePage() {
    return (
        <div className="p-4">
            <div className="bg-cover h-60 rounded-md mb-4 ml-40 mr-40"
                 style={{backgroundImage: `url(${banner})`}}>
                <div className="text-white text-center p-6">
                    <h1 className="text-2xl font-bold">Preloved Treasures, New Beginnings</h1>
                    <p>Discover high-quality, gently used items...</p>
                </div>
            </div>
            <div className="flex gap-4 ml-40">
                <button className="bg-gradient-to-r from-resolutionBlue to-sapphire px-4 py-2 text-white rounded-md">Items</button>
                <button className="bg-cardinal px-4 py-2 text-white rounded-md">Foods</button>
            </div>
            <div className="mt-10 m-40 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Render item cards */}
                <ItemCard
                    title="OMEN Gaming Laptop 16 2023"
                    condition="Lightly used"
                    price="Rp20.000.000,00"
                />
                <ItemCard
                    title="HP Pavilion Gaming 15"
                    condition="Lightly used"
                    price="Rp20.000.000,00"
                    image={pavilionImage}
                />
                <ItemCard
                    title="Alienware X14 2022 R1"
                    condition="Rough condition"
                    price="Rp6.000.000,00"
                />
                <ItemCard
                    title="HP OMEN 2021 15"
                    condition="Can hardly open .pka files"
                    price="0.000068 BTC"
                />
            </div>
        </div>
    );
}
