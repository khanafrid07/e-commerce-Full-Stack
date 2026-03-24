import { PlusIcon } from "lucide-react"
import BannerData from "./components/BannerData"
import BannerStats from "./components/BannerStats"
import { useNavigate } from "react-router-dom"
import { useGetBannerQuery } from "./BannerSlice"

export default function Banner() {

    const navigate = useNavigate()
    const { data: banners = [], isLoading } = useGetBannerQuery({ isAdmin: true })

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Banner Management</h1>
                    <p className="text-gray-500 mt-1 text-sm">Manage hero, promo, and category banners</p>
                </div>
                <button 
                    className="btn btn-primary flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition shadow-sm" 
                    onClick={() => navigate("/dashboard/banners/create")}
                >
                    <PlusIcon className="w-5 h-5"/>
                    Create new Banner
                </button>
            </div>
            
            {/* Stats Dashboard Section */}
            {!isLoading && <BannerStats banners={banners} />}

            {/* Banners Table Section */}
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <BannerData banners={banners} isLoading={isLoading} />
            </div>

        </div>
    )
}