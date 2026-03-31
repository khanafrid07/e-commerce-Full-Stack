
import { useGetDashboardStatsQuery } from "../features/Dashboard/dashboardSlice"

export default function useDashboardStats() {

    const { data, isLoading, isError } = useGetDashboardStatsQuery()


    return {
        recentOrders: data?.recentOrder || [],
        totalProduct: data?.totalProducts || 0,
        revenue30days: data?.revenue30days || 0,
        pendingDelivery: data?.pendingDelivery || 0,
        totalOrders: data?.totalOrders || 0,
        totalCustomer: data?.totalUser || 0,
        topProducts: data?.topSellingProducts || [],
        cartCount: data?.cartCount || 0,
        isLoading,
        isError
    }

}