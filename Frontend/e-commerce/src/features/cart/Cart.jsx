import { useEffect, useState, useRef } from "react";
import { useGetCartQuery, useAddToCartMutation } from "./cart";
import CartUpdate from "./CartUpdate";
import Discount from "./Discount";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
export default function Cart() {
    const { token } = useSelector((state) => state.auth)
    const { data, isLoading } = useGetCartQuery(undefined, { skip: !token });
    const [cart, setCart] = useState([])
    const [addToCart] = useAddToCartMutation()
    const syncAttemptedRef = useRef(false);

    useEffect(() => {
        if (!token) {
            const cartData = JSON.parse(localStorage.getItem("cart")) || [];
            setCart(cartData);
            syncAttemptedRef.current = false;  // Reset sync flag when logging out
        } else if (data?.items) {
            setCart((prev) => {
                if (JSON.stringify(prev) === JSON.stringify(data.items)) {
                    return prev;
                }
                console.log("Cart updated from server:", data.items);
                return data.items;
            });
        }
    }, [token, data?.items, data]);

    useEffect(() => {
        if (!token || isLoading || !data) return;
        if (syncAttemptedRef.current) return;  // Prevent duplicate syncs
        
        const syncCart = async () => {
            const localCart = JSON.parse(localStorage.getItem("cart")) || [];

            if (localCart.length === 0) {
                console.log("No local cart to sync");
                return;
            }

            syncAttemptedRef.current = true;
            console.log("🔄 Syncing local cart to server:", localCart);
            console.log("📊 Current server cart:", data?.items || []);

            try {
                for (let localItem of localCart) {
                    // Check if item with same product and variant already exists on server
                    const itemExistsOnServer = data?.items?.some(serverItem => {
                        const sameProduct = serverItem.product?._id === localItem.productId;
                        const sameVariant = JSON.stringify(serverItem.variant || {}) === 
                                          JSON.stringify(localItem.variant || {});
                        return sameProduct && sameVariant;
                    });

                    if (itemExistsOnServer) {
                        console.log(`⏭️  Skipping ${localItem.productId} - already on server`);
                        continue;  // Skip this item, don't add it again
                    }

                    console.log(`➕ Adding ${localItem.productId} to server cart`);
                    await addToCart({
                        productId: localItem.productId,
                        quantity: localItem.quantity,
                        variants: localItem.variant || {},
                    });
                }

                console.log("✅ Guest cart synced successfully");
                localStorage.removeItem("cart");

            } catch (err) {
                console.error("❌ Sync error:", err);
                syncAttemptedRef.current = false;  // Reset on error to retry
            }
        };

        syncCart();
    }, [token, data, isLoading, addToCart]);
    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center text-lg">
                Loading your cart...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-2 md:px-10">

            <h2 className="text-3xl font-semibold mb-8 text-center tracking-tight">
                Your Cart
            </h2>

            <div className="grid md:grid-cols-3 gap-8">


                <div className="md:col-span-2 flex flex-col gap-5">

                    {cart.map((item, idx) => (

                        <div
                            key={idx}
                            className="flex gap-4 p-4 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-300"
                        >
                            {/* Image */}
                            <div className="w-24 h-24 flex-shrink-0">
                                <img
                                    className="w-full h-full object-cover rounded-xl"
                                    src={item?.variantImages?.[0].url}
                                    alt={item?.product?.title || item.title}
                                />
                            </div>

                            {/* Info */}
                            <div className="flex flex-col justify-between flex-1">
                                <div>
                                    <p className="font-medium text-lg line-clamp-1">
                                        {item?.product?.title || item.title}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        Size: {item.variant?.Size}
                                    </p>

                                    <div className="flex items-center gap-2 mt-1">
                                        {item.discount > 0 ? (
                                            <>
                                                <p className="text-blue-600 font-semibold">
                                                    Rs. {item.price?.toFixed(0)}
                                                </p>
                                                <p className="text-xs text-gray-400 line-through">
                                                    Rs. {item.basePrice?.toFixed(0)}
                                                </p>
                                                <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                                                    -{item.discount}%
                                                </span>
                                            </>
                                        ) : (
                                            <p className="text-blue-600 font-semibold">
                                                Rs. {item.price?.toFixed(0)}
                                            </p>
                                        )}
                                    </div>

                                    {/* Stock Status */}
                                    {item.stock === 0 || (item.stock && item.stock < 1) ? (
                                        <p className="text-red-600 font-semibold text-sm mt-2">
                                            ❌ Out of Stock
                                        </p>
                                    ) : item.stock && item.stock < 5 ? (
                                        <p className="text-orange-600 text-sm mt-2">
                                            ⚠️ Only {item.stock} left
                                        </p>
                                    ) : null}
                                </div>

                                {/* Quantity Controller */}
                                <div className="mt-2">
                                    <CartUpdate 
                                        item={item} 
                                        setCart={setCart} 
                                        token={token}
                                        isOutOfStock={item.stock === 0 || (item.stock && item.stock < 1)}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                    {data?.items.length < 1 && <p className="text-center font-bold">Your Cart is Empty</p>}
                    <Link to="/">
                        <button className="mt-4 w-2/3 md:w-1/2 mx-auto btn-sm py-3 rounded-xl bg-purple-400 text-white font-medium hover:opacity-90 transition">
                            Continue Shopping
                        </button>
                    </Link>
                </div>


                <div className="sticky top-10 h-fit bg-white rounded-2xl shadow-md p-6 flex flex-col gap-4">

                    <h3 className="text-lg font-semibold">Order Summary</h3>

                    <Discount />

                    {token ? (
                        <>
                            <div className="flex justify-between text-sm">
                                <span>Subtotal</span>
                                <span className="font-medium">
                                    Rs. {data?.totalPrice?.toFixed(0) || 0}
                                </span>
                            </div>

                            <div className="flex justify-between text-sm">
                                <span>Discount</span>
                                <span className="text-green-600 font-medium">
                                    - Rs. {data?.discount?.toFixed(0) || 0}
                                </span>
                            </div>

                            <div className="border-t pt-3 flex justify-between text-lg font-semibold">
                                <span>Total</span>
                                <span className="text-purple-600">
                                    Rs. {(data?.totalPrice - data?.discount)?.toFixed(0) || 0}
                                </span>
                            </div>
                        </>
                    ) : (
                        <>
                            {(() => {
                                const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                                const savings = cart.reduce((sum, item) => {
                                    if (item.discount && item.basePrice) {
                                        return sum + ((item.basePrice - item.price) * item.quantity);
                                    }
                                    return sum;
                                }, 0);
                                return (
                                    <>
                                        <div className="flex justify-between text-sm">
                                            <span>Subtotal</span>
                                            <span className="font-medium">
                                                Rs. {subtotal.toFixed(0)}
                                            </span>
                                        </div>

                                        <div className="flex justify-between text-sm">
                                            <span>Discount</span>
                                            <span className="text-green-600 font-medium">
                                                - Rs. {savings.toFixed(0)}
                                            </span>
                                        </div>

                                        <div className="border-t pt-3 flex justify-between text-lg font-semibold">
                                            <span>Total</span>
                                            <span className="text-purple-600">
                                                Rs. {subtotal.toFixed(0)}
                                            </span>
                                        </div>
                                    </>
                                );
                            })()}
                        </>
                    )}
                    
                    {(() => {
                        const hasOutOfStockItems = cart.some(item => item.stock === 0 || (item.stock && item.stock < 1));
                        const isCartEmpty = cart.length === 0;
                        const canCheckout = !isCartEmpty && !hasOutOfStockItems;

                        return (
                            <>
                                {hasOutOfStockItems && (
                                    <div className="bg-red-50 border border-red-300 rounded-lg p-3 text-center">
                                        <p className="text-red-700 text-sm font-semibold">
                                            ⚠️ Some items are out of stock. Please remove them before checkout.
                                        </p>
                                    </div>
                                )}
                                
                                {isCartEmpty ? (
                                    <button disabled className="mt-4 w-full py-3 rounded-xl bg-gray-300 text-gray-500 font-medium cursor-not-allowed">
                                        Cart is Empty
                                    </button>
                                ) : (
                                    <Link to={canCheckout ? "/checkout" : "#"}>
                                        <button 
                                            disabled={!canCheckout}
                                            className={`mt-4 w-full py-3 rounded-xl font-medium transition ${
                                                canCheckout 
                                                    ? "bg-gradient-to-r from-pink-400 to-purple-500 text-white hover:opacity-90 cursor-pointer"
                                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                            }`}
                                        >
                                            Proceed to Checkout
                                        </button>
                                    </Link>
                                )}
                            </>
                        );
                    })()}
                </div>
            </div>
        </div>
    );
}