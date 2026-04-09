import { useUpdateCartItemMutation, useRemoveCartItemMutation } from "./cart";
import { useEffect, useRef } from "react";
import { Trash2, Plus, Minus } from "lucide-react";
export default function CartUpdate({ item, token, setCart, isOutOfStock = false }) {
    const [updateCartItem, { isLoading }] = useUpdateCartItemMutation();
    const [removeCartItem] = useRemoveCartItemMutation();
    const prevQuantityRef = useRef(item.quantity);

    useEffect(() => {
        if (!token) return;
        if (prevQuantityRef.current === item.quantity) return;

        const timeout = setTimeout(() => {
            updateCartItem({
                id: item?.product?._id || item.productId,
                quantity: item.quantity,
                variant: item.variant || {},
            }).unwrap().catch(err => {
                console.error("Update failed:", err);
                prevQuantityRef.current = item.quantity;
            });
            prevQuantityRef.current = item.quantity;
        }, 300);

        return () => clearTimeout(timeout);
    }, [item.quantity, token, updateCartItem, item._id]);

    const handleIncrease = () => {
        if (!token) {
            const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

            const updatedCart = existingCart.map((items) => {
                if (
                    items.productId === item.productId &&
                    items.variantId === item.variantId
                ) {
                    return { ...items, quantity: items.quantity + 1 };
                }
                return items;
            });

            localStorage.setItem("cart", JSON.stringify(updatedCart));
            setCart(updatedCart);
            return;
        }

        updateCartItem({
            id: item.product._id,
            quantity: item.quantity + 1,
            variant: item.variant,
        }).unwrap();
    };

    const handleDecrease = () => {
        if (!token) {
            const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

            const updatedCart = existingCart
                .map((items) => {
                    if (
                        items.productId === item.productId &&
                        items.variantId === item.variantId
                    ) {
                        return { ...items, quantity: items.quantity - 1 };
                    }
                    return items;
                })
                .filter((i) => i.quantity > 0);

            localStorage.setItem("cart", JSON.stringify(updatedCart));
            setCart(updatedCart);
            return;
        }

        if (item.quantity > 1) {
            updateCartItem({
                id: item.product._id,
                quantity: item.quantity - 1,
                variant: item.variant,
            }).unwrap();
        }
    };

    const handleDelete = () => {
        if (!token) {
            const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

            const updatedCart = existingCart.filter(
                (items) =>
                    !(items.productId === item.productId &&
                      items.variantId === item.variantId)
            );

            localStorage.setItem("cart", JSON.stringify(updatedCart));
            setCart(updatedCart);
            return;
        }

        removeCartItem({
            id: item.product._id,
            variant: item.variant,
        }).unwrap();
    };

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="flex items-center gap-2 flex-col">
            <button onClick={handleDelete}>
                <Trash2 color="red" />
            </button>

            {isOutOfStock ? (
                <div className="flex items-center gap-2">
                    <p className="text-xs text-red-600 font-semibold">Out of Stock</p>
                </div>
            ) : (
                <div className="flex items-center bg-gray-400 rounded-full px-2 gap-1">
                    <button 
                        onClick={handleIncrease}
                        disabled={isLoading}
                        className="disabled:opacity-50"
                    >
                        <Plus size={15} />
                    </button>

                    <p>{item.quantity}</p>

                    <button 
                        onClick={handleDecrease}
                        disabled={isLoading || item.quantity === 1}
                        className="disabled:opacity-50"
                    >
                        <Minus size={15} />
                    </button>
                </div>
            )}
        </div>
    );
}