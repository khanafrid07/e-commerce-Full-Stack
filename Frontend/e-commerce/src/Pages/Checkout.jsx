import { useGetCartQuery } from "../features/cart/cart";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addAddress } from "../features/auth/authSlice";
import { useState } from "react";
export default function Checkout() {
    const dispatch = useDispatch()
    const { loading, error } = useSelector((state) => state.auth)
   let navigate = useNavigate()
    const { data, isError, isLoading } = useGetCartQuery();
    const items = data?.items;
    const [details, setFormDetails] = useState({country: "India", isDefault: true})

    function handleInputChange(e) {
        setFormDetails((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

        function handleDefault(e){
           
                setFormDetails((prev)=>({
                    ...prev,
                    isDefault: e.target.checked,
                }))
          
        }


  
    async function handleSubmit(e) {
        e.preventDefault();
        try{
            await dispatch(addAddress(details))
            console.log(details)
             
             navigate("/payment")

        }catch(err){
            alert("Error occured")
            console.log(error, err)
        }
        

    }

   
    if (isLoading) return <p>Loading cart...</p>;
    if (isError) return <p>Error loading cart.</p>;
    if (!items || items.length === 0) return <p>Your cart is empty.</p>;

    return (
        <form className="flex flex-col gap-4 w-full validator" onSubmit={handleSubmit}>
        <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10">
            <div className="bg-base-100 rounded-2xl text-text grid grid-cols-1 md:grid-cols-[4fr_3fr]
                      p-6 md:p-10 gap-6 md:gap-8 shadow-lg w-[95%] md:w-[90%]">

                {/* Left Side - Shipping Info */}
                <div className="border-b md:border-b-0 md:border-r md:pr-6">
                    <h2 className="font-semibold text-3xl mb-4">Checkout</h2>
                    
                        <h2 className="font-semibold text-xl mb-2">Shipping Information</h2>

                        {/* Name Fields */}
                        <div className="flex flex-wrap gap-4 w-full">
                            <div className="w-full sm:w-[48%]">
                                <label className="block">First Name*</label>
                                <input type="text" onChange={(handleInputChange)} name="firstName" className="input w-full validator" required placeholder="Enter your first name" />
                                <div className="validator-hint">Enter your First Name</div>
                            </div>
                            <div className="w-full sm:w-[48%]">
                                <label className="block">Last Name*</label>
                                <input type="text" onChange={(handleInputChange)} name="lastName" className="input w-full validator" required placeholder="Enter your last name" />
                                <div className="validator-hint">Enter your Last Name</div>
                            </div>
                        </div>

                        {/* Contact */}
                        <div className="flex flex-wrap gap-4 w-full">
                            <div className="w-full sm:w-[48%]">
                                <label className="block">Email*</label>
                                <input type="email" onChange={(handleInputChange)} name="email" className="input w-full validator" required placeholder="Enter email address" />
                                <div className="validator-hint">Enter valid email address</div>
                            </div>
                            <div className="w-full sm:w-[48%]">
                                <label className="block">Phone Number*</label>
                                <input type="number" pattern="[0-9]*" minLength={10} maxLength={10} onChange={(handleInputChange)} name="phone" className="input w-full validator" required placeholder="Enter phone number" />
                                <p className="validator-hint">Must be 10 digits</p>
                            </div>
                        </div>

                        {/* Address */}
                        <div className="flex flex-wrap gap-4 w-full">
                            <div className="w-full sm:w-[30%]">
                                <label className="block">City</label>
                                <input type="text" onChange={(handleInputChange)} name="city" className="input w-full validator" required placeholder="City" />
                            </div>
                            <div className="w-full sm:w-[30%]">
                                <label className="block">State</label>
                                <input type="text" onChange={(handleInputChange)} name="state" className="input w-full validator" required placeholder="State" />
                            </div>
                            <div className="w-full sm:w-[30%]">
                                <label className="block">Zip Code</label>
                                <input type="number" onChange={(handleInputChange)} name="zip" className="input w-full validator" required placeholder="Zip Code" />
                            </div>
                        </div>
                   
                    <div className="mt-4">
                        <label className="font-semibold">Set this address as default</label>
                        <input defaultChecked name="isDefault" onChange={(handleDefault)} className="checkbox checkbox-primary ml-2" type="checkbox" />

                    </div>
                </div>

                {/* Right Side - Cart Review */}
                {/* Right Side - Cart Review */}
                <div className="flex flex-col p-2 h-[80vh]">
                    {/* Sticky heading */}
                    <h2 className="mb-4 font-semibold text-2xl text-center md:text-left">
                        Review your Cart
                    </h2>

                    {/* Scrollable products */}
                    <div className="flex-1  pr-2">
                        {items.map((item, idx) => (
                            <div key={idx} className="flex items-center mb-4">
                                <div className="w-24 h-24 md:w-14 md:h-14 border rounded-lg indicator">
                                    <img
                                        className="object-cover w-full h-full rounded-lg"
                                        src={item.product.images[0]?.url || "https://via.placeholder.com/150"}
                                        alt="Product"
                                    />
                                    <span className="indicator-item badge bg-black border border-black w-2 h-5 text-center rounded-xs text-white text-xs">{item.quantity}</span>
                                </div>
                                <p className="ml-4 flex-1">{item.product.title}</p>
                                <p className="font-semibold text-gray-700">₹{item.product.price * item.quantity}</p>
                            </div>
                        ))}
                    </div>

                    {/* Fixed totals and discount at bottom */}
                    <div className="mt-4">
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                            <input type="text" className="input flex-1" placeholder="Discount Code" />
                            <button className="btn btn-outline">Apply</button>
                        </div>

                        <div className="grid grid-cols-2 gap-y-2 text-sm md:text-base mb-4">
                            <div>
                                <p>Subtotal</p>
                                <p>Shipping</p>
                                <p>Discount</p>
                                <p className="font-bold border-t pt-1 mt-1">Total</p>
                            </div>
                            <div className="text-right">
                                <p>₹{data.totalPrice}</p>
                                <p>0</p>
                                <p>-₹999</p>
                                <p className="font-bold border-t pt-1 mt-1">₹{data.totalPrice}</p>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary w-full">
                            Continue to Payment
                        </button>
                    </div>
                </div>

            </div>
        </div>
             </form>
    );
}
