import { useUpdateBannerStatusMutation, useDeleteBannerMutation } from "../BannerSlice";
import { Link } from "react-router-dom";
import CategoryBanner from "../../../components/product/CategoryBanner";
export default function BannerData({ banners, isLoading }) {
    const [updateBanner] = useUpdateBannerStatusMutation();
    const [deleteBanner] = useDeleteBannerMutation();

    const BASE_URL = "http://localhost:8080";

    const handleStatusToggle = async (banner) => {
        try {
            await updateBanner({
                id: banner._id,
                isActive: !banner.isActive,
            }).unwrap();
        } catch (err) {
            console.log(err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this banner?")) return;

        try {
            await deleteBanner(id).unwrap();
        } catch (err) {
            console.log(err);
        }
    };

    if (isLoading) return <div className="p-6 text-gray-500">Loading banners...</div>;

    return (
        <div>

            <div className="overflow-x-auto bg-white">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-gray-600">
                        <tr>
                            <th className="p-4 text-left">Image</th>
                            <th className="p-4 text-left">Title</th>
                            <th className="p-4 text-left">Type</th>
                            <th className="p-4 text-left">Category</th>
                            <th className="p-4 text-left">Placement</th>
                            <th className="p-4 text-left">Position</th>
                            <th className="p-4 text-left">Priority</th>
                            <th className="p-4 text-left">Status</th>
                            <th className="p-4 text-left">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {banners.length > 0 ? (
                            banners.map((banner) => (
                                <tr
                                    key={banner._id}
                                    className="border-t hover:bg-gray-50 transition"
                                >
                                    {/* Image */}
                                    <td className="p-4">
                                        <img
                                            src={
                                                banner.image
                                                    ? banner.image
                                                    : "/placeholder.png"
                                            }
                                            className="w-20 h-12 object-cover rounded-md border"
                                        />
                                    </td>

                                    {/* Title */}
                                    <td className="p-4 font-medium">
                                        {banner.title || banner.heading || "-"}
                                    </td>

                                    {/* Type */}
                                    <td className="p-4">
                                        <span
                                            className={`px-2 py-1 text-xs rounded-full capitalize ${banner.type === "hero"
                                                ? "bg-blue-100 text-blue-600"
                                                : banner.type === "category"
                                                    ? "bg-purple-100 text-purple-600"
                                                    : "bg-orange-100 text-orange-600"
                                                }`}
                                        >
                                            {banner.type}
                                        </span>
                                    </td>

                                    {/* Category */}
                                    <td className="p-4">
                                        {banner.categoryId?.name || "-"}
                                    </td>

                                    {/* Placement */}
                                    <td className="p-4">
                                        {banner.placement || "-"}
                                    </td>

                                    {/* Position */}
                                    <td className="p-4 text-xs text-gray-500">
                                        {banner.position} / {banner.vertical}
                                    </td>

                                    {/* Priority */}
                                    <td className="p-4">
                                        {banner.priority ?? "-"}
                                    </td>

                                    {/* Status */}
                                    <td className="p-4">
                                        <button
                                            onClick={() => handleStatusToggle(banner)}
                                            className={`px-3 py-1 rounded-full text-xs border transition ${banner.isActive
                                                ? "bg-green-100 text-green-700 hover:bg-green-200"
                                                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                                                }`}
                                        >
                                            {banner.isActive ? "Active" : "Inactive"}
                                        </button>
                                    </td>

                                    {/* Actions */}
                                    <td className="p-4 flex gap-3">
                                        <Link
                                            to={`/admin/banner/edit/${banner._id}`}
                                            className="text-blue-500 hover:underline"
                                        >
                                            Edit
                                        </Link>

                                        <button
                                            onClick={() => handleDelete(banner._id)}
                                            className="text-red-500 hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="p-6 text-center text-gray-500">
                                    No banners found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

            </div>
        </div>
    );
}