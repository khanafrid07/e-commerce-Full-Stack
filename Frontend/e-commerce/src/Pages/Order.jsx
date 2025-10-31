

export default function Order(){

    return(
        <>
        <div className="bg-gray-100 min-h-screen py-10 flex justify-center">
        <div className="bg-base-100 rounded-2xl shadow-md w-[90%] p-10">
            <h2 className="mb-4 font-semibold text-2xl">Your Orders</h2>
            <div className="grid grid-cols-3 w-[50%] border rounded-lg">
                <button className="btn border-r">Orders</button>
                <button className="btn border-r">Not Yet Shipped</button>
                <button className="btn border-none">Cancelled Order</button>
            </div>
            <div className="w-[80%] border border-gray-200 rounded-xs mt-8">
                <div className="flex flex gap-8 bg-gray-100 p-10 w-full">
                    <div>
                        <p>Order Placed</p>
                        <p>Jan 2, 2025</p>
                    </div>
                    <div>
                        <p>Total</p>
                        <p>Rs 9999</p>
                    </div>
                    <div>
                        <p>Ship to</p>
                        <p>Lucknow, Uttarpradesh</p>
                    </div>
                    <div className="ml-8">
                        <p>Order Id: #234324324</p>
                        <button className="link text-primary">View Order Details</button>
                    </div>
                </div>
                <div className="p-4 flex items-center flex-row gap-3">
                        {/* <h2 className="font-semibold text-xl text-top">Delivered Jan 5</h2> */}
                    <div className="w-32 h-32 border rounded-md">
                        <img className="w-full h-full object-cover" src="https://cdn.gadgetbytenepal.com/wp-content/uploads/2025/03/Samsung-Galaxy-A36-Black.jpg"/>
                        </div>
                        <div>
                        <p>Samsun S22 ULTRA BLACK 256GB thinner and lighter than the Galaxy</p>
                        <p>Rerturn or Replace items: Eligible through: Jan 5, 2025</p>
                        <button className="btn ">Buy Again</button>
                        <button className="btn">View Your Order</button>

                        </div>
                    
                </div>
            </div>
        </div>

        </div>
        </>
    )
}