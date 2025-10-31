import { useGetCartQuery } from "../features/cart/cart";
import { useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../features/orders/orderSlice";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function Payment() {
  const { currentAddress } = useSelector((state) => state.auth);
  const { data, isError, isLoading } = useGetCartQuery();
  const navigate = useNavigate();
  const [createOrder] = useCreateOrderMutation();


  const items = data?.items || [];

  const [orderInfo, setOrderInfo] = useState({
    products: items,
    totalPrice: data?.totalPrice || 0,
    paymentMethod: "",
    shippingAddress: currentAddress
  });
  if (isError) return <p>Error Loading summary</p>;
  if (isLoading) return <p>Loading Orders...</p>;

  // ✅ Fixed function
  function handleData(e) {
    setOrderInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  // ✅ Handle submit
  async function onSubmit(e) {
    console.log(orderInfo)
    e.preventDefault();
    const orderData = {
      products: data.items,        
      totalPrice: data.totalPrice, 
      paymentMethod: orderInfo.paymentMethod,
      shippingAddress: currentAddress
    };

    if (!orderData.paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    if (!currentAddress) {
      alert("Please select a delivery address");
      return;
    }

    try {
      const res = await createOrder(orderData)
      console.log(res);
      alert("✅ Order Placed Successfully!");

    } catch (err) {
      console.error(err);
      alert("❌ Error placing order");
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10 flex justify-center">
      <div className="bg-base-100 rounded-2xl text-text grid grid-cols-1 md:grid-cols-[4fr_3fr] p-6 md:p-10 gap-6 md:gap-8 shadow-lg w-[95%] md:w-[90%]">

        {/* Left Side - Order Summary */}
        <div className="border-r md:pr-6 flex flex-col">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>

          <div className="overflow-y-auto max-h-[50vh] mb-4 pr-2">
            {items.map((item, idx) => (
              <div key={idx} className="border rounded my-2 flex gap-4 items-center p-2">
                <div className="w-20 h-20 flex-shrink-0">
                  <img
                    className="object-cover w-full h-full rounded"
                    src={item.product.images[0]?.url || "https://via.placeholder.com/100"}
                    alt={item.product.title}
                  />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{item.product.title}</p>
                  <p className="text-xs">Quantity x {item.quantity}</p>
                  <p className="text-xs">Unit Price: ₹{item.product.price}</p>
                </div>
                <p className="font-semibold text-gray-700">
                  ₹{item.product.price * item.quantity}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-auto">
            <p>Subtotal: ₹{data.totalPrice}</p>
            <p className="border-b">Delivery: ₹0</p>
            <p className="text-primary font-semibold">To be Paid: ₹{data.totalPrice}</p>
            <button
              onClick={() => navigate("/cart")}
              className="btn border border-none text-primary mt-2"
            >
              Modify Cart
            </button>
          </div>
        </div>

        {/* Right Side - Payment & Address */}
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>

          <div className="flex flex-col gap-2 mb-4">
            <label className="flex items-center gap-2">
              <input onChange={handleData} type="radio" name="paymentMethod" value="Cash" />
              Cash on Delivery
            </label>
            <label className="flex items-center gap-2">
              <input onChange={handleData} type="radio" name="paymentMethod" value="Online" />
              UPI
            </label>
            <label className="flex items-center gap-2">
              <input onChange={handleData} type="radio" name="paymentMethod" value="Card" />
              Card
            </label>
          </div>

          <div className="border rounded p-4">
            <h2 className="font-semibold mb-2">Delivery Address</h2>
            {currentAddress ? (
              <div>
                <p><strong>Name:</strong> {currentAddress.addressName}</p>
                <p>
                  <strong>Delivery:</strong> {currentAddress.city}, {currentAddress.state}, {currentAddress.zip}
                </p>
                <p><strong>Contact:</strong> {currentAddress.phone}</p>
              </div>
            ) : (
              <p className="text-gray-500">No address selected. Please go back to checkout and add one.</p>
            )}
          </div>

          <button onClick={onSubmit} className="btn btn-primary mt-4 w-full">
            Pay Now
          </button>
        </div>

      </div>
    </div>
  );
}
