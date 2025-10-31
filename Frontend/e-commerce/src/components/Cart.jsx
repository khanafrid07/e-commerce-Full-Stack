import { useState, useEffect } from "react";
import { Plus, Minus, Trash2 } from "lucide-react";
import {
  useGetCartQuery,
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
} from "../features/cart/cart";
import { useNavigate } from "react-router-dom";
export default function CartPage() {

  const { data: cartData, isLoading } = useGetCartQuery();
  const [updateCartItem] = useUpdateCartItemMutation();
  const [removeCartItem] = useRemoveCartItemMutation();
  const navigate = useNavigate()

  const [cart, setCart] = useState([]);


  useEffect(() => {
    if (cartData?.items) {
      setCart(cartData.items);
    }
  }, [cartData]);

  
  const handleIncrease = async (item) => {
    const updatedQuantity = item.quantity + 1;
    setCart((prev) =>
      prev.map((i) =>
        i.product._id === item.product._id
          ? { ...i, quantity: updatedQuantity }
          : i
      )
    );

    await updateCartItem({
      id: item.product._id,
      quantity: updatedQuantity,
    });
  };


  const handleDecrease = async (item) => {
    if (item.quantity > 1) {
      const updatedQuantity = item.quantity - 1;
      setCart((prev) =>
        prev.map((i) =>
          i.product._id === item.product._id
            ? { ...i, quantity: updatedQuantity }
            : i
        )
      );

      await updateCartItem({
        id: item.product._id,
        quantity: updatedQuantity,
      });
    }
  };

  // 🗑 Remove item
  const handleRemove = async (item) => {
    setCart((prev) =>
      prev.filter((i) => i.product._id !== item.product._id)
    );
    await removeCartItem(item.product._id);
  };

  // 🧮 Calculate total
  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  if (isLoading)
    return <div className="p-6 text-center">Loading your cart...</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen text-text">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

      <div className="space-y-4">
        <div className="grid grid-cols-3 ml-12 text-text font-semibold">
          <div>Items</div>
          <div>Quantity</div>
          <div>Price</div>
        </div>

        {cart.map((item) => (
          <div
            key={item.product._id}
            className="grid grid-cols-3 gap-8 bg-white p-4 rounded-lg shadow"
          >
            {/* Product Info */}
            <div>
              <img
                className="w-24 h-24 object-cover rounded"
                src={item.product.images[0].url }
                alt={item.product.title}
              />
              <h3 className="font-semibold">{item.product.title}</h3>
              <p className="text-gray-600">Rs. {item.product.price}</p>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleDecrease(item)}
                className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
              >
                <Minus size={16} />
              </button>
              <span className="font-semibold">{item.quantity}</span>
              <button
                onClick={() => handleIncrease(item)}
                className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
              >
                <Plus size={16} />
              </button>
            </div>

            {/* Price & Remove */}
            <div className="flex items-center gap-4">
              <p className="font-semibold">
                Rs. {item.product.price * item.quantity}
              </p>
              <button
                onClick={() => handleRemove(item)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total & Checkout */}
      <div className="mt-8 grid grid-cols-[4fr_2fr] items-center">
        <h3 className="text-xl font-bold">Total: Rs. {total}</h3>
        <button onClick={()=>navigate("/checkout")} className="w-32 bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-700">
          Checkout
        </button>
      </div>
    </div>
  );
}
