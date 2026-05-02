import { useState } from "react";
import { User, MapPin, Package, LogOut, Edit2, Trash2, Plus } from "lucide-react";
import { useSelector } from "react-redux";

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState("profile");
    const user = useSelector((state) => state.auth.user)

    const navItems = [
        { id: "profile", label: "Profile Info", icon: User },
        { id: "address", label: "Addresses", icon: MapPin },
        { id: "orders", label: "Orders", icon: Package },
    ];

    return (
        <div className="min-h-screen bg-base-200 p-4 md:p-8">
            <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6">

                {/* Sidebar */}
                <div className="bg-base-100 rounded-2xl shadow-sm border border-base-300 p-6 space-y-6 md:col-span-1 h-fit">
                    <div className="flex flex-col items-center text-center space-y-3">
                        <div className="avatar">
                            <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=random`} alt="Avatar" />
                            </div>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-base-content">{user?.name}</h3>
                            <p className="text-sm text-base-content/60">{user?.email}</p>
                        </div>
                    </div>

                    <div className="divider my-2"></div>

                    <nav className="flex flex-col gap-2">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = activeTab === item.id;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left w-full font-medium ${isActive
                                        ? "bg-primary text-primary-content shadow-md"
                                        : "hover:bg-base-200 text-base-content/80 hover:text-base-content"
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    {item.label}
                                </button>
                            );
                        })}

                        <button className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left w-full font-medium text-error hover:bg-error/10 mt-4">
                            <LogOut className="w-5 h-5" />
                            Logout
                        </button>
                    </nav>
                </div>

                {/* Main Content */}
                <div className="md:col-span-3">
                    <div className="bg-base-100 rounded-2xl shadow-sm border border-base-300 p-6 md:p-8 min-h-[500px]">

                        {/* PROFILE INFO */}
                        {activeTab === "profile" && (
                            <div className="space-y-6 max-w-2xl animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <div>
                                    <h2 className="text-2xl font-bold text-base-content">Profile Information</h2>
                                    <p className="text-base-content/60 mt-1">Update your account details and personal information.</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text font-medium">Full Name</span>
                                        </label>
                                        <input type="text" className="input input-bordered w-full focus:input-primary" defaultValue={user?.name} />
                                    </div>

                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text font-medium">Email Address</span>
                                        </label>
                                        <input type="email" className="input input-bordered w-full bg-base-200 text-base-content/70 cursor-not-allowed" value={user?.email || ""} disabled />
                                        <label className="label">
                                            <span className="label-text-alt text-base-content/50">Email cannot be changed</span>
                                        </label>
                                    </div>

                                    <div className="pt-4">
                                        <button className="btn btn-primary px-8">Save Changes</button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ADDRESSES */}
                        {activeTab === "address" && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div>
                                        <h2 className="text-2xl font-bold text-base-content">Saved Addresses</h2>
                                        <p className="text-base-content/60 mt-1">Manage your shipping and billing addresses.</p>
                                    </div>
                                    <button className="btn btn-primary btn-sm gap-2">
                                        <Plus className="w-4 h-4" />
                                        Add New Address
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {user?.addresses && user.addresses.length > 0 ? (
                                        user.addresses.map((address, index) => (
                                            <div key={index} className="border border-base-300 rounded-xl p-5 hover:border-primary/50 transition-colors relative group">
                                                <div className="flex justify-between items-start mb-2">
                                                    {index === 0 && <span className="badge badge-primary badge-outline">Default</span>}
                                                    <div className="flex gap-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity ml-auto">
                                                        <button className="btn btn-ghost btn-xs btn-square text-base-content/70 hover:text-primary"><Edit2 className="w-4 h-4" /></button>
                                                        <button className="btn btn-ghost btn-xs btn-square text-base-content/70 hover:text-error"><Trash2 className="w-4 h-4" /></button>
                                                    </div>
                                                </div>
                                                <h3 className="font-semibold text-lg">{address.addressName}</h3>
                                                <p className="text-base-content/70 mt-1 text-sm leading-relaxed">
                                                    {address.address}<br />
                                                    {address.city}, {address.state}<br />
                                                    {address.country} - {address.zip}<br />
                                                </p>
                                                <p className="text-sm font-medium mt-3 flex items-center gap-2">
                                                    Phone: {address.phone}
                                                </p>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="col-span-full text-center py-8 text-base-content/60 bg-base-100 border border-base-300 rounded-xl border-dashed">
                                            No addresses found. Add a new address to get started.
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* ORDERS */}
                        {activeTab === "orders" && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <div>
                                    <h2 className="text-2xl font-bold text-base-content">My Orders</h2>
                                    <p className="text-base-content/60 mt-1">View and track your recent orders.</p>
                                </div>

                                {/* Order Stats */}
                                <div className="stats shadow-sm border border-base-300 w-full mb-4">
                                    <div className="stat">
                                        <div className="stat-title">Total Orders</div>
                                        <div className="stat-value text-primary">5</div>
                                        <div className="stat-desc">2 orders in transit</div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {/* Order Item */}
                                    <div className="border border-base-300 rounded-xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:shadow-md transition-shadow">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-3">
                                                <span className="font-bold text-lg">Order #ORD-12345</span>
                                                <span className="badge badge-success badge-sm">Delivered</span>
                                            </div>
                                            <p className="text-sm text-base-content/60">Placed on April 20, 2026</p>
                                        </div>

                                        <div className="flex flex-col sm:items-end gap-2 w-full sm:w-auto">
                                            <span className="font-bold text-lg">₹1,200</span>
                                            <button className="btn btn-outline btn-sm w-full sm:w-auto">View Details</button>
                                        </div>
                                    </div>

                                    {/* Another Order Item */}
                                    <div className="border border-base-300 rounded-xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:shadow-md transition-shadow">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-3">
                                                <span className="font-bold text-lg">Order #ORD-12346</span>
                                                <span className="badge badge-info badge-sm">Processing</span>
                                            </div>
                                            <p className="text-sm text-base-content/60">Placed on April 25, 2026</p>
                                        </div>

                                        <div className="flex flex-col sm:items-end gap-2 w-full sm:w-auto">
                                            <span className="font-bold text-lg">₹3,450</span>
                                            <button className="btn btn-outline btn-sm w-full sm:w-auto">View Details</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}