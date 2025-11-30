import { useState, useEffect } from "react";
import { useGetCartQuery, useClearCartMutation } from "../features/cart/cart";
import { useCreateOrderMutation } from "../features/orders/orderSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Payment() {
  const { currentAddress } = useSelector((state) => state.auth);
  const { data: cartData, isLoading, isError } = useGetCartQuery();
  const [createOrder] = useCreateOrderMutation();
  const [clearCart] = useClearCartMutation();
  const navigate = useNavigate();

  const items = cartData?.items || [];

  const [paymentMethod, setPaymentMethod] = useState("");

  if (isLoading) return <p className="p-6 text-center">Loading cart...</p>;
  if (isError) return <p className="p-6 text-center text-red-500">Error loading cart.</p>;
  if (!items.length) return <p className="p-6 text-center">Your cart is empty.</p>;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 0;
  const discount = 0;
  const total = subtotal + shipping - discount;

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!paymentMethod) {
    alert("Please select a payment method.");
    return;
  }

  if (!currentAddress) {
    alert("Please select a delivery address.");
    return;
  }

  // Prepare order items with variant info
  const orderItems = items.map((item) => ({
    product: item.product._id,
    quantity: item.quantity,
    price: item.price,
    variant: item.variant || {},
  }));

  const orderData = {
    products: orderItems, 
    totalPrice: total,
    paymentMethod,
    shippingAddress: currentAddress,
  };

  try {
    await createOrder(orderData).unwrap();
    await clearCart().unwrap();
    alert("✅ Order placed successfully!");
    navigate("/orders");
  } catch (err) {
    console.error("Error placing order:", err);
    alert("❌ Failed to place order. Please try again.");
  }
};

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">
      <div className="bg-base-100 rounded-2xl shadow-lg w-[95%] md:w-[90%] grid grid-cols-1 md:grid-cols-[4fr_3fr] gap-8 p-6 md:p-10">

        {/* Left: Order Summary */}
        <div className="border-b md:border-b-0 md:border-r md:pr-6 flex flex-col">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          <div className="overflow-y-auto max-h-[50vh] mb-4 pr-2">
            {items.map((item) => (
              <div key={item._id} className="border rounded flex gap-4 items-center p-2 mb-2">
                <div className="w-20 h-20 flex-shrink-0">
                  <img
                    className="w-full h-full object-cover rounded"
                    src={item.product.images[0]?.url || "/placeholder.png"}
                    alt={item.product.title}
                  />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{item.product.title}</p>
                  {item.variant && Object.keys(item.variant).length > 0 && (
                    <p className="text-xs text-gray-500">
                      {Object.entries(item.variant).map(([k, v]) => `${k}: ${v}`).join(", ")}
                    </p>
                  )}
                  <p className="text-xs">Quantity: {item.quantity}</p>
                  <p className="text-xs">Unit Price: ₹{item.price}</p>
                </div>
                <p className="font-semibold text-gray-700">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-auto">
            <div className="flex justify-between text-sm mb-1">
              <span>Subtotal:</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span>Shipping:</span>
              <span>₹{shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span>Discount:</span>
              <span>-₹{discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
              <span>Total:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            <button
              onClick={() => navigate("/cart")}
              className="btn border-none text-primary mt-2"
            >
              Modify Cart
            </button>
          </div>
        </div>

        {/* Right: Payment & Address */}
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>
          <div className="flex flex-col gap-2 mb-4">
            {["Cash", "Online", "Card"].map((method) => (
              <label key={method} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                {method === "Online" ? "UPI" : method}
              </label>
            ))}
          </div>

          <div className="border rounded p-4">
            <h2 className="font-semibold mb-2">Delivery Address</h2>
            {currentAddress ? (
              <div>
                <p><strong>Name:</strong> {currentAddress.firstName} {currentAddress.lastName}</p>
                <p><strong>Address:</strong> {currentAddress.city}, {currentAddress.state}, {currentAddress.zip}</p>
                <p><strong>Phone:</strong> {currentAddress.phone}</p>
              </div>
            ) : (
              <p className="text-gray-500">No address selected. Please go back to checkout and add one.</p>
            )}
          </div>

          <button onClick={handleSubmit} className="btn btn-primary mt-4 w-full">
            Pay Now
          </button>
        </div>

      </div>
    </div>
  );
}
