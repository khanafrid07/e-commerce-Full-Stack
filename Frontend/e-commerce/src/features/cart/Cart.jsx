import { useGetCartQuery } from "./cart";
import CartUpdate from "./CartUpdate";
import Discount from "./Discount";
import { Link } from "react-router-dom";
export default function Cart() {
    const { data, isLoading } = useGetCartQuery();

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
                    {data?.items?.map((item) => (
                        <div
                            key={item._id}
                            className="flex gap-4 p-4 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-300"
                        >
                            {/* Image */}
                            <div className="w-24 h-24 flex-shrink-0">
                                <img
                                    className="w-full h-full object-cover rounded-xl"
                                    src={item?.variantImages[0].url}
                                    alt={item?.product.title}
                                />
                            </div>

                            {/* Info */}
                            <div className="flex flex-col justify-between flex-1">
                                <div>
                                    <p className="font-medium text-lg line-clamp-1">
                                        {item.product.title}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        Size: {item.variant.Size}
                                    </p>

                                    <p className="text-blue-600 font-semibold mt-1">
                                        Rs. {item.price}
                                    </p>
                                </div>

                                {/* Quantity Controller */}
                                <div className="mt-2">
                                    <CartUpdate item={item} />
                                </div>
                            </div>
                        </div>
                    ))}
                    <Link to="/">
                        <button className="mt-4 w-2/3 md:w-1/2 mx-auto btn-sm py-3 rounded-xl bg-purple-400 text-white font-medium hover:opacity-90 transition">
                            Continue Shopping
                        </button>
                    </Link>
                </div>


                <div className="sticky top-10 h-fit bg-white rounded-2xl shadow-md p-6 flex flex-col gap-4">

                    <h3 className="text-lg font-semibold">Order Summary</h3>

                    <Discount />

                    <div className="flex justify-between text-sm">
                        <span>Subtotal</span>
                        <span className="font-medium">
                            Rs. {data?.totalPrice}
                        </span>
                    </div>

                    <div className="flex justify-between text-sm">
                        <span>Discount</span>
                        <span className="text-green-600 font-medium">
                            - Rs. {data?.discount}
                        </span>
                    </div>

                    <div className="border-t pt-3 flex justify-between text-lg font-semibold">
                        <span>Total</span>
                        <span className="text-purple-600">
                            Rs. {data?.totalPrice - data?.discount}
                        </span>
                    </div>
                    <Link to="/checkout">

                        <button className="mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-pink-400 to-purple-500 text-white font-medium hover:opacity-90 transition">
                            Proceed to Checkout
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}