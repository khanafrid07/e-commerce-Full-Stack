import { useState, useEffect } from "react";
import { Plus, Minus, Trash2 } from "lucide-react";
import {
  useGetCartQuery,
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
} from "../features/cart/cart";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { data: cartData, isLoading } = useGetCartQuery();
  const [updateCartItem] = useUpdateCartItemMutation();
  const [removeCartItem] = useRemoveCartItemMutation();
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (!cartData?.items) return;

    const mappedItems = cartData.items
      .filter((item) => item.product)
      .map((item) => {
        let price = item.price || item.product.basePrice || 0;

        const productVariants = item.product.variants || [];

        if (productVariants.length > 0 && item.variant) {
          const matchedVariant = productVariants.find((v) => {
            const vObj =
              v.typeValues instanceof Map
                ? Object.fromEntries(v.typeValues)
                : v.typeValues;

            return Object.entries(item.variant).every(
              ([key, val]) => vObj[key] === val
            );
          });

          if (matchedVariant) price = matchedVariant.price;
        }

        return { ...item, price };
      });

    setCart(mappedItems);
  }, [cartData]);

  /* --------------------------------------------------- */
  /*                Increase Quantity                     */
  /* --------------------------------------------------- */

  const handleIncrease = async (item) => {
    const updatedQty = item.quantity + 1;

    setCart((prev) =>
      prev.map((i) => (i._id === item._id ? { ...i, quantity: updatedQty } : i))
    );

    await updateCartItem({
      id: item.product._id,
      quantity: updatedQty,
      variant: item.variant || {},
    });
  };

  /* --------------------------------------------------- */
  /*                Decrease Quantity                     */
  /* --------------------------------------------------- */

  const handleDecrease = async (item) => {
    if (item.quantity <= 1) return;

    const updatedQty = item.quantity - 1;

    setCart((prev) =>
      prev.map((i) => (i._id === item._id ? { ...i, quantity: updatedQty } : i))
    );

    await updateCartItem({
      id: item.product._id,
      quantity: updatedQty,
      variant: item.variant || {},
    });
  };

  /* --------------------------------------------------- */
  /*                    Remove Item                       */
  /* --------------------------------------------------- */

  const handleRemove = async (item) => {
    setCart((prev) => prev.filter((i) => i._id !== item._id));

    await removeCartItem({
      id: item.product._id,
      variant: item.variant || {},
    });
  };

  if (isLoading)
    return <div className="p-6 text-center text-gray-500">Loading your cart...</div>;

  const total = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <div className="p-4 sm:p-6 lg:p-10 bg-gray-50 min-h-screen text-gray-900">
      <h2 className="text-3xl font-bold mb-6 text-center sm:text-left">
        Your Cart
      </h2>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500 mt-20">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item._id}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 bg-white p-4 sm:p-6 rounded-lg shadow-md items-center"
            >
              {/* Product Info */}
              <div className="flex items-center gap-4 md:col-span-1">
                <img
                  className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-lg"
                  src={item.product.images?.[0]?.url || "/placeholder.png"}
                  alt={item.product.title}
                />
                <div className="flex flex-col gap-1">
                  <h3 className="font-semibold text-lg">
                    {item.product.title}
                  </h3>

                  {/* Show selected variant */}
                  {item.variant && Object.keys(item.variant).length > 0 && (
                    <p className="text-gray-600 text-sm">
                      {Object.entries(item.variant).map(([k, v]) => (
                        <span key={k}>
                          {k}: {v}{" "}
                        </span>
                      ))}
                    </p>
                  )}

                  <p className="text-gray-800 font-medium">
                    Rs. {item.price.toFixed(2)} / item
                  </p>
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center justify-center gap-4 md:col-span-1">
                <button
                  onClick={() => handleDecrease(item)}
                  className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
                >
                  <Minus size={16} />
                </button>
                <span className="font-semibold">{item.quantity}</span>
                <button
                  onClick={() => handleIncrease(item)}
                  className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* Total + Remove */}
              <div className="flex flex-col items-end gap-2 md:col-span-1">
                <p className="font-semibold">
                  Rs. {(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleRemove(item);
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}

          {/* Total */}
          <div className="mt-8 flex flex-col sm:flex-row justify-between items-center bg-white p-5 rounded-lg shadow-md gap-4 sm:gap-0">
            <h3 className="text-2xl font-bold">
              Total: Rs. {total.toFixed(2)}
            </h3>
            <button
              onClick={() => navigate("/checkout")}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
