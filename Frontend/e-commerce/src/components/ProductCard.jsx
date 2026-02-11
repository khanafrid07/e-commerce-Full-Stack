import { Heart } from 'lucide-react';

export default function ProductCard({ title = "Product title", price = 20, image }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden w-80 cursor-pointer">
      {}
      <img
        src={
          image || "/default-image.jpg"
        }
        alt={title}
        className="w-full h-64 rounded-lg object-cover"
      />

      
      <div className="p-4 flex flex-col gap-1 text-text">
        <h3 className="text-lg font-semibold truncate">{title}</h3>
        <p className="text-secondary font-medium text-base">${price}</p>
        <span className='flex items-start'><Heart/></span>
      </div>
    </div>
  );
}
