export default function OrderSummary({ order }) {

    return (
        <div className="border rounded-xl p-4 space-y-2">
            <h2 className="font-semibold mb-2">Order Summary</h2>

            <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>₹{order.totalPrice}</span>
            </div>

            <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>₹{order.shipping}</span>
            </div>

            <div className="flex justify-between text-sm">
                <span>Discount</span>
                <span>-₹{order.discount}</span>
            </div>

            <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                <span>Total</span>
                <span>₹{order.totalPrice}</span>
            </div>

            <div className="pt-2 text-sm text-gray-600">
                <p>
                    <strong>Payment:</strong> {order.paymentMethod}
                </p>
                <p>
                    <strong>Status:</strong>{" "}
                    <span
                        className={
                            order.paymentStatus === "paid"
                                ? "text-green-600"
                                : "text-yellow-600"
                        }
                    >
                        {order.paymentStatus}
                    </span>
                </p>
            </div>
        </div>
    );
}