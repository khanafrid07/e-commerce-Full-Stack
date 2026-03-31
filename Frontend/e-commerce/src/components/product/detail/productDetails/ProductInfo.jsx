import { Package } from "lucide-react"

export default function ProductInfo({ info }) {

    console.log("info ciming", info)
    const finalPrice = info.price - (info.price * info.discount) / 100;

    return (

        <div className="flex flex-col gap-4 p-4 ">
            <div>

                <h2 className="font-bold text-4xl leading-relaxed">{info.title}</h2>
                <div className="font-bold text-2xl text-blue-500 flex gap-3">
                    <p> &#8377;{info.finalPrice || finalPrice}</p>
                    <div className="flex items-center gap-2 text-blue-400">
                        MRP
                        <p className="line-through"> &#8377;{info.price}</p>
                        <p className="text-yellow-600 font-bold text-lg">({info.discount}% OFF)</p>

                    </div>
                </div>
                <p>In Stock {info.stock} items</p>

            </div>
            <div className="collapse collapse-arrow bg-base-200 rounded-xl">
                <input type="checkbox" defaultChecked />
                <div className="collapse-title text-lg font-semibold flex items-center gap-2">
                    <Package size={20} />
                    Product Description
                </div>
                <div className="collapse-content">
                    <p className="text-base-content/70 leading-relaxed">{info.description}</p>
                </div>
            </div>
        </div>
    )
}