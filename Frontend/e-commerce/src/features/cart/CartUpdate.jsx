import { useEffect, useState } from "react";
import { Trash2, Plus, Minus } from "lucide-react";
import { useUpdateCartItemMutation, useRemoveCartItemMutation } from "./cart.js";

export default function CartUpdate({ item }) {
    const [updateCartItem, { isLoading }] = useUpdateCartItemMutation();
    const [removeCartItem] = useRemoveCartItemMutation();

    const [quantity, setQuantity] = useState(item.quantity);


    useEffect(() => {
        setQuantity(item.quantity);
    }, [item.quantity]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            updateCartItem({ id: item.product._id, quantity, variant: item.variant }).unwrap();
        }, 400);

        return () => clearTimeout(timeout);
    }, [quantity]);

    const handleIncrease = () => setQuantity(q => q + 1);
    const handleDecrease = () => setQuantity(q => Math.max(0, q - 1));
    const handleDelete = () => removeCartItem({ id: item.product._id, variant: item.variant }).unwrap();
    if (isLoading) return <p>Loading...</p>
    return (
        <div className="flex items-center gap-2 flex-col">
            <button onClick={handleDelete}>
                <Trash2 color="red" />
            </button>

            <div className="flex items-center bg-gray-400 rounded-full px-2 gap-1">
                <button onClick={handleIncrease}>
                    <Plus size={15} />
                </button>

                <p>{quantity}</p>

                <button onClick={handleDecrease}>
                    <Minus size={15} />
                </button>
            </div>
        </div>
    );
}