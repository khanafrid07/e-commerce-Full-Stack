import { Heart, ShoppingBag } from "lucide-react"
export default function CartAndPrice({handleCart, stock, loading, noMatch}){
      

    return(
        <div className="m-4 grid gap-4 p-4 sm:grid-cols-2">
            <button disabled={stock==0 || noMatch} onClick={()=>handleCart()} className="btn bg-indigo-500 btn-lg text-white"><ShoppingBag/>
            {loading? "Adding to bag":stock==0?"Out of Stock":"Add to Bag"}

            </button>
            <button className="btn bg-red-400 border btn-lg text-white font-semibold "><Heart/>WISHLIST</button>
        </div>
    )
}