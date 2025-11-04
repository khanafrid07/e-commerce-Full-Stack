import { useState, useRef } from "react";
import { useGetOrdersQuery } from "../features/orders/orderSlice";
import { useCancelOrderMutation } from "../features/orders/orderSlice";
export default function Order() {
  const [activeTab, setActiveTab] = useState("Delivered");
  const detailsRef = useRef(null);
  const { data, isLoading, isError, refetch } = useGetOrdersQuery();
  console.log(data)
  let [cancelOrder] = useCancelOrderMutation()
  if (isLoading)
    return <p className="text-center mt-10 text-gray-600">Loading orders...</p>;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">
        Failed to load your orders. Please try again.
      </p>
    );

  const cancelledProducts = data
    .flatMap(order =>
      order.products
        .filter(product => product.status === "Cancelled")
        .map(product => ({
          ...product,
          orderId: order._id,
          orderDate: order.createdAt,
          shippingAddress: order.shippingAddress,
        }))
    );

  console.log("Cancelled ortder: ", cancelledProducts)

  const pendingOrders = data?.filter(
    order => order.status === "Pending" || order.status === "Shipped"
  );

  const handleViewPending = () => {
    setActiveTab("Pending");
    setTimeout(() => {
      detailsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 200);
  };

  async function handleCancelProduct(orderId, productId) {
    try {
      console.log("Cancelling:", orderId, productId);

      await cancelOrder({ orderId, productId }).unwrap();
      refetch()
      alert("Product cancelled successfully");
    } catch (err) {
      alert("Failed to cancel the order");
      console.log(err);
    }
  }


  const renderTrackingSteps = status => {
    const steps = ["Order Placed", "Shipped", "Out for Delivery", "Delivered"];
    const statusIndex =
      status === "Pending"
        ? 1
        : status === "Shipped"
          ? 2
          : status === "Delivered"
            ? 4
            : 0;

    return (
      <div className="flex flex-col mt-4">
        <div className="flex justify-between relative mb-2">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center w-full">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full z-10 ${idx + 1 <= statusIndex
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-400"
                  }`}
              >
                {idx + 1}
              </div>
              <p
                className={`text-xs mt-1 font-medium ${idx + 1 <= statusIndex ? "text-blue-700" : "text-gray-400"
                  }`}
              >
                {step}
              </p>
            </div>
          ))}
          {/* Connecting line */}
          <div className="absolute top-4 left-0 w-full h-[3px] bg-gray-200 z-0">
            <div
              className={`h-[3px] bg-blue-600 transition-all duration-500`}
              style={{
                width: `${(statusIndex / steps.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10 flex justify-center">
      <div className="bg-white rounded-2xl shadow-md w-[95%] md:w-[80%] p-8">
        <h2 className="mb-6 font-semibold text-3xl border-b pb-3 text-gray-700">
          My Orders
        </h2>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 md:gap-0 justify-between md:justify-start border rounded-lg overflow-hidden mb-8">
          {["Delivered", "Pending", "Cancelled"].map(status => (
            <button
              key={status}
              onClick={() => setActiveTab(status)}
              className={`flex-1 text-center py-3 font-medium transition-all duration-300 ${activeTab === status
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                }`}
            >
              {status === "Delivered" && "Orders"}
              {status === "Pending" && "Not Yet Shipped"}
              {status === "Cancelled" && "Cancelled Orders"}
            </button>
          ))}
        </div>

        {/* ===== ORDERS TAB ===== */}
        {activeTab === "Delivered" && (
          <div className="space-y-6">
            {data?.length > 0 ? (
              data.map(order => (
                <div
                  key={order._id}
                  className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
                >
                  <div className="flex flex-wrap justify-between items-center bg-gray-50 p-4 border-b">
                    <div>
                      <p className="text-sm text-gray-500">Order Placed</p>
                      <p className="font-medium text-gray-700">
                        {new Date(order.createdAt).toDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total</p>
                      <p className="font-semibold text-gray-700">
                        Rs {order.totalPrice?.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Ship to</p>
                      <p className="font-medium text-gray-700">
                        {order.shippingAddress?.city},{" "}
                        {order.shippingAddress?.state}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">
                        Order ID:{" "}
                        <span className="font-semibold text-gray-700">
                          #{order._id.slice(-6)}
                        </span>
                      </p>
                      <p
                        className={`text-sm font-medium mt-1 ${order.status === "Delivered"
                          ? "text-green-600"
                          : order.status === "Pending" ||
                            order.status === "Shipped"
                            ? "text-yellow-600"
                            : "text-red-500"
                          }`}
                      >
                        {order.status}
                      </p>
                      {order.status === "Pending" && (
                        <button
                          onClick={handleViewPending}
                          className="text-blue-600 text-sm font-medium hover:underline mt-1"
                        >
                          View Shipping Details
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4">
                    <img
                      src={
                        order.products?.[0]?.product?.images?.[0]?.url ||
                        "https://via.placeholder.com/150"
                      }
                      alt="Product"
                      className="w-20 h-20 object-cover rounded-md border"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">
                        {order.products?.[0]?.product?.title ||
                          "Product Title"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {order.products?.length > 1
                          ? `+ ${order.products.length - 1} more items`
                          : ""}
                      </p>
                    </div>
                    <button className="btn btn-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md">
                      Buy Again
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">
                You have no orders yet.
              </p>
            )}
          </div>
        )}

        {/* ===== NOT YET SHIPPED TAB ===== */}
        {activeTab === "Pending" && (
          <div ref={detailsRef}>
            {pendingOrders?.length > 0 ? (
              pendingOrders.map(order => (
                <div
                  key={order._id}
                  className="border border-gray-200 rounded-xl mb-6 overflow-hidden shadow-sm hover:shadow-md transition"
                >
                  <div className="flex flex-wrap justify-between items-center bg-gray-50 p-4 border-b">
                    <div>
                      <p className="text-sm text-gray-500">Order Placed</p>
                      <p className="font-medium text-gray-700">
                        {new Date(order.createdAt).toDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total</p>
                      <p className="font-semibold text-gray-700">
                        Rs {order.totalPrice?.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Ship to</p>
                      <p className="font-medium text-gray-700">
                        {order.shippingAddress?.city},{" "}
                        {order.shippingAddress?.state}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">
                        Order ID:{" "}
                        <span className="font-semibold text-gray-700">
                          #{order._id.slice(-6)}
                        </span>
                      </p>
                      <p className="text-yellow-600 font-medium text-sm">
                        {order.status}
                      </p>
                    </div>
                  </div>

                  {order.products?.map((product, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col md:flex-row items-center gap-6 p-4 border-b last:border-b-0"
                    >
                      <img
                        src={
                          product.product.images?.find(img => img.isMain)?.url ||
                          "https://via.placeholder.com/150"
                        }
                        alt={product.product.title}
                        className="w-28 h-28 object-cover rounded-md border"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">
                          {product.product.title}
                        </p>
                        <p className="text-sm text-gray-500">
                          Quantity: {product.quantity}
                        </p>
                        {renderTrackingSteps(order.status)}
                      </div>
                      <div className="flex gap-3 items-center mt-4">
                        <button className="btn btn bg-blue-600 hover:bg-blue-700 text-white rounded-md">
                          Track Package
                        </button>

                        {/* The button to open modal */}
                        <label htmlFor={`cancel_modal_${product.product._id}`} className="btn bg-gray-200"> Cancel Order</label>

                        {/* Put this part before </body> tag */}
                        <input type="checkbox" id={`cancel_modal_${product.product._id}`} className="modal-toggle" />
                        <div className="modal" role="dialog">
                          <div className="modal-box">
                            <h3 className="text-lg font-bold">Hello!</h3>
                            <p className="py-4">Are you sure you wanna cancel this order?</p>
                            <div className="modal-action">
                              <label htmlFor={`cancel_modal_${product.product._id}`} onClick={(e) => {
                                e.preventDefault();
                                handleCancelProduct(order._id, product.product._id)
                              }} className="btn">Confirm</label>
                              <label htmlFor={`cancel_modal_${product.product._id}`} className="btn">Cancel</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">
                You have no pending shipments.
              </p>
            )}
          </div>
        )}


        {activeTab === "Cancelled" && (
          <div>
            {cancelledProducts?.length > 0 ? (
              cancelledProducts.map(item => (
                <div
                  key={item._id} // product _id
                  className="border border-gray-200 rounded-xl p-4 mb-6 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex justify-between">
                    <p className="font-semibold text-gray-700">
                      Order #{item.orderId.slice(-6)} {/* from flatMap */}
                    </p>
                    <p className="text-red-600 font-medium">Cancelled</p>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Product: {item.product.title} <br />
                    Cancelled on: {new Date(item.cancelledAt || item.updatedAt).toDateString()}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Ship to: {item.shippingAddress?.city}, {item.shippingAddress?.state}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No cancelled orders found.</p>
            )}

          </div>
        )}
      </div>
    </div>
  );
}
