import { Link } from "react-router-dom"
export default function CartSummary({ cart }) {


    return (

        <div className="bg-white p-6 rounded-2xl shadow h-fit">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>₹{cart?.totalPrice}</span>
            </div>

            <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{cart?.totalPrice}</span>
            </div>
            <Link to="/checkout">
                <button className="mt-6 w-full bg-black text-white py-3 rounded-xl font-semibold hover:opacity-90">
                    Checkout
                </button>
            </Link>
        </div>
    )
}