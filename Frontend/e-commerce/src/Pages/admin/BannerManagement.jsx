import BannerData from "../../features/Banners/components/BannerData"
import useDashboardStats from "../../hooks/useDashboardStats"
import BannerFilters from "../../features/Banners/components/BannerFilter"
import { useGetBannerQuery } from "../../features/Banners/BannerSlice"
import { useState } from "react"
import { Link } from "react-router-dom"
export default function BannerManagement() {
    const { bannersCount } = useDashboardStats()
    const [filters, setFilters] = useState({
        type: "",
        status: null
    })
    const { data: banners = [], isLoading, isError } = useGetBannerQuery(filters);

    return (
        <div className="md:p-4">
            <div className="flex justify-between">
                <h1 className="text-3xl font-bold">
                    Banners
                </h1>
                <Link to={"create"}>
                    <button className="btn btn-primary">+ Create Banner</button>
                </Link>

            </div>

            <div>
                <BannerData isError={isError} isLoading={isLoading} banners={banners} filters={filters} setFilters={setFilters} bannerCounts={bannersCount} />
            </div>
        </div>
    )
}