import { Minus, Plus } from "lucide-react"
export default function CartUpdate({ item, handleIncrease, handleDecrease, isUpdating }) {
    return (
        <div className="flex items-center gap-2 border rounded-lg px-2 py-1">
            <button disabled={isUpdating} className="p-1" onClick={() => handleDecrease(item.product._id, item.variantId, item.quantity)}>
                <Minus size={16} />
            </button>
            <span>{item.quantity}</span>
            <button disabled={isUpdating} className="p-1" onClick={() => handleIncrease(item.product._id, item.variantId, item.quantity)}>
                <Plus size={16} />
            </button>
        </div>
    )
}
