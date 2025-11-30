import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetCartQuery } from "../features/cart/cart";
import { addAddress, setCurrentAddress } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: cartData, isLoading, isError } = useGetCartQuery();
  const items = cartData?.items || [];
  const { user } = useSelector((state) => state.auth);

  // Default addresses (max 4)
  const defaultAddresses = user?.addresses?.filter(addr => addr.isDefault).slice(0, 4) || [];

  const [selectedAddress, setSelectedAddress] = useState(null); // selected default address
  const [showNewForm, setShowNewForm] = useState(true); // toggle new address form
  const [formDetails, setFormDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    zip: "",
    country: "India",
    isDefault: true,
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleDefaultChange = (e) => {
    setFormDetails((prev) => ({ ...prev, isDefault: e.target.checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedAddress) {
         dispatch(setCurrentAddress(selectedAddress));
        // If a default address is selected, use it
        console.log("Selected default address:", selectedAddress);
        navigate("/payment");
      } else {
        // Otherwise, add the new address
        await dispatch(addAddress(formDetails));
        navigate("/payment");
      }
    } catch (err) {
      console.error("Error submitting address:", err);
      alert("An error occurred. Please try again.");
    }
  };

  if (isLoading) return <p className="p-6 text-center">Loading cart...</p>;
  if (isError) return <p className="p-6 text-center text-red-500">Error loading cart.</p>;
  if (!items.length) return <p className="p-6 text-center">Your cart is empty.</p>;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 0;
  const discount = 0;
  const total = subtotal + shipping - discount;

  return (
    <form onSubmit={handleSubmit} className="min-h-screen bg-gray-100 flex justify-center py-10">
      <div className="bg-base-100 rounded-2xl shadow-lg w-[95%] md:w-[90%] grid grid-cols-1 md:grid-cols-[4fr_3fr] gap-10 p-6 md:p-10">
        
        {/* Left - Shipping Form */}
        <div className="border-b md:border-b-0 md:border-r md:pr-8">
          <h2 className="text-3xl font-semibold mb-6">Shipping Information</h2>

          {/* Default Addresses */}
          {defaultAddresses.length > 0 && (
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Default Addresses</h2>
              {defaultAddresses.map((addr, i) => (
                <div
                  key={i}
                  className={`p-3 border rounded-lg mb-2 cursor-pointer ${
                    selectedAddress === addr ? "border-green-500 bg-green-50" : "border-gray-200"
                  }`}
                  onClick={() => {
                    setSelectedAddress(addr);
                    setShowNewForm(false);
                  }}
                >
                  <p className="font-medium">{addr.firstName} {addr.lastName} <span className="text-green-600 text-xs">Default</span></p>
                  <p className="text-gray-600 text-sm">{addr.city}, {addr.state}, {addr.zip}</p>
                  <p className="text-gray-600 text-sm">{addr.phone}</p>
                </div>
              ))}

              <button
                type="button"
                className="btn btn-outline btn-sm mt-2"
                onClick={() => {
                  setShowNewForm(true);
                  setSelectedAddress(null);
                }}
              >
                + Add New Address
              </button>
            </div>
          )}

          {/* New Address Form */}
          {showNewForm && (
            <div className="space-y-5">
              {/* Name */}
              <div className="flex flex-wrap gap-4">
                <div className="w-full sm:w-[48%]">
                  <label className="block font-medium mb-1">First Name*</label>
                  <input
                    type="text"
                    name="firstName"
                    onChange={handleInputChange}
                    required
                    placeholder="Enter first name"
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="w-full sm:w-[48%]">
                  <label className="block font-medium mb-1">Last Name*</label>
                  <input
                    type="text"
                    name="lastName"
                    onChange={handleInputChange}
                    required
                    placeholder="Enter last name"
                    className="input input-bordered w-full"
                  />
                </div>
              </div>

              {/* Contact */}
              <div className="flex flex-wrap gap-4">
                <div className="w-full sm:w-[48%]">
                  <label className="block font-medium mb-1">Email*</label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleInputChange}
                    required
                    placeholder="Enter email"
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="w-full sm:w-[48%]">
                  <label className="block font-medium mb-1">Phone*</label>
                  <input
                    type="tel"
                    name="phone"
                    onChange={handleInputChange}
                    required
                    placeholder="Enter phone number"
                    className="input input-bordered w-full"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="flex flex-wrap gap-4">
                <div className="w-full sm:w-[30%]">
                  <label className="block font-medium mb-1">City*</label>
                  <input
                    type="text"
                    name="city"
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div className="w-full sm:w-[30%]">
                  <label className="block font-medium mb-1">State*</label>
                  <input
                    type="text"
                    name="state"
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div className="w-full sm:w-[30%]">
                  <label className="block font-medium mb-1">Zip*</label>
                  <input
                    type="text"
                    name="zip"
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                    required
                  />
                </div>
              </div>

              {/* Default */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  name="isDefault"
                  checked={formDetails.isDefault}
                  onChange={handleDefaultChange}
                  className="checkbox checkbox-primary"
                />
                <label className="font-medium">Set as default address</label>
              </div>
            </div>
          )}
        </div>

        {/* Right - Cart Review */}
        <div className="flex flex-col h-[80vh]">
          <h2 className="text-2xl font-semibold mb-4 text-center md:text-left">
            Review Your Cart
          </h2>

          <div className="flex-1 overflow-y-auto pr-2 space-y-5">
            {items.map((item) => (
              <div
                key={item._id}
                className="flex items-center bg-gray-50 p-3 rounded-xl shadow-sm"
              >
                <div className="relative w-20 h-20 flex-shrink-0">
                  <img
                    src={item.product.images[0]?.url || "/placeholder.png"}
                    alt={item.product.title}
                    className="w-full h-full object-cover rounded-lg border"
                  />
                  <span className="absolute -top-2 -right-2 bg-black text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                    {item.quantity}
                  </span>
                </div>

                <div className="ml-4 flex-1">
                  <p className="font-semibold text-gray-800 truncate">
                    {item.product.title}
                  </p>
                  {item.variant && Object.keys(item.variant).length > 0 && (
                    <p className="text-gray-500 text-sm">
                      {Object.entries(item.variant)
                        .map(([k, v]) => `${k}: ${v}`)
                        .join(", ")}
                    </p>
                  )}
                  <p className="text-gray-700 font-medium mt-1">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="mt-6 border-t pt-4 space-y-2">
            <div className="flex justify-between text-sm md:text-base">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm md:text-base">
              <span>Shipping</span>
              <span>₹{shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm md:text-base">
              <span>Discount</span>
              <span>-₹{discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full mt-4 text-base font-semibold tracking-wide"
            >
              Continue to Payment
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
