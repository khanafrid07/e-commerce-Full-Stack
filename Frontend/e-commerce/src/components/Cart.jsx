import { useState, useEffect } from "react";
import { Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
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
    const updatedCart = cartData.items.filter((item) => item.product);
    setCart(updatedCart);
  }, [cartData]);

  const handleIncrease = async (item) => {
    const qty = item.quantity + 1;
    setCart((prev) =>
      prev.map((i) => (i._id === item._id ? { ...i, quantity: qty } : i))
    );

    await updateCartItem({
      id: item.product._id,
      quantity: qty,
      variant: item.variant || {},
    });
  };

  const handleDecrease = async (item) => {
    if (item.quantity <= 1) return;
    const qty = item.quantity - 1;

    setCart((prev) =>
      prev.map((i) => (i._id === item._id ? { ...i, quantity: qty } : i))
    );

    await updateCartItem({
      id: item.product._id,
      quantity: qty,
      variant: item.variant || {},
    });
  };

  const handleRemove = async (item) => {
    setCart((prev) => prev.filter((i) => i._id !== item._id));

    await removeCartItem({
      id: item.product._id,
      variant: item.variant || {},
    });
  };

  // Get the correct image for this variant
  const getItemImage = (item) => {
    // First try variantImages (stored in cart)
    if (item.variantImages?.length > 0) {
      return item.variantImages[0].url;
    }

    // Fallback to product main image
    return item.product.images?.find((i) => i.isMain)?.url || 
           item.product.images?.[0]?.url || 
           "/placeholder.png";
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );

  const total = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <ShoppingBag size={32} className="text-primary" />
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
        </div>

        {cart.length === 0 ? (
          <div className="bg-base-100 rounded-2xl shadow-xl p-12 text-center">
            <ShoppingBag size={64} className="mx-auto text-base-300 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-base-content/60 mb-6">Add some products to get started!</p>
            <button onClick={() => navigate("/")} className="btn btn-primary">
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="bg-base-100 shadow-lg p-4 rounded-2xl flex flex-col sm:flex-row gap-4"
                >
                  {/* Product Image */}
                  <div className="w-full sm:w-32 h-32 bg-base-200 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={getItemImage(item)}
                      alt={item.product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 space-y-2">
                    <h2 className="text-lg font-bold">{item.product.title}</h2>

                    {/* Variant Details */}
                    {item.variant && Object.keys(item.variant).length > 0 && (
                      <div className="space-y-1">
                        {Object.entries(item.variant).map(([key, value]) => (
                          <div key={key} className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-base-content/60 uppercase">
                              {key}:
                            </span>
                            <span className="badge badge-outline badge-sm">
                              {value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    <p className="text-primary font-bold text-lg">
                      ₹{item.price.toFixed(2)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleDecrease(item)}
                        className="btn btn-sm btn-circle btn-outline"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={16} />
                      </button>

                      <span className="font-bold text-lg min-w-[40px] text-center">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => handleIncrease(item)}
                        className="btn btn-sm btn-circle btn-outline"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Total + Remove */}
                  <div className="flex flex-col justify-between items-end">
                    <p className="text-xl font-bold text-primary">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>

                    <button
                      onClick={() => handleRemove(item)}
                      className="btn btn-error btn-sm gap-2"
                    >
                      <Trash2 size={16} />
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-base-100 shadow-xl rounded-2xl p-6 sticky top-4">
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-base-content/70">Subtotal</span>
                    <span className="font-semibold">₹{total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-base-content/70">Shipping</span>
                    <span className="font-semibold text-success">Free</span>
                  </div>
                  <div className="divider my-2"></div>
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="text-primary">₹{total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate("/checkout")}
                  className="btn btn-primary btn-lg w-full"
                >
                  Proceed to Checkout
                </button>

                <button
                  onClick={() => navigate("/")}
                  className="btn btn-outline btn-lg w-full mt-3"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}