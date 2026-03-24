import { useGetCategoriesQuery } from "../../features/Banners/categorySlice";
import { Link } from "react-router-dom";

export default function CategoryBanner() {
    const { data: categories = [], isLoading, error } = useGetCategoriesQuery();

    if (isLoading) {
        return (
            <div className="w-full max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 animate-pulse flex gap-6 overflow-hidden">
                {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="flex flex-col items-center gap-3">
                        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gray-200"></div>
                        <div className="w-20 h-4 bg-gray-200 rounded"></div>
                    </div>
                ))}
            </div>
        );
    }

    if (error || categories.length === 0) return null;

    return (
        <div className="w-full bg-white py-12 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Shop by Category</h2>
                    <Link to="/categories" className="text-sm font-semibold text-blue-600 hover:text-blue-500 transition-colors">
                        View all <span aria-hidden="true">&rarr;</span>
                    </Link>
                </div>
                
                {/* Horizontal scroll container */}
                <div className="flex overflow-x-auto gap-6 sm:gap-8 pb-6 pt-2 snap-x snap-mandatory custom-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {categories.map((category) => (
                        <Link 
                            key={category._id} 
                            to={`/category/${category.name.toLowerCase()}`}
                            className="group flex flex-col items-center gap-4 flex-shrink-0 snap-center transition-transform hover:-translate-y-1"
                        >
                            <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden shadow-sm border border-gray-100 ring-4 ring-transparent group-hover:ring-blue-50/50 group-hover:shadow-md transition-all duration-300">
                                {category.image ? (
                                    <img 
                                        src={category.image} 
                                        alt={category.name} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center text-blue-300">
                                        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                            <span className="text-sm sm:text-base font-semibold text-gray-700 group-hover:text-blue-600 text-center transition-colors">
                                {category.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
