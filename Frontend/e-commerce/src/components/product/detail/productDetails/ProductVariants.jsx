import { useState } from "react";
import CartAndPrice from "./CartAndPrice";
import { useAddToCartMutation } from "../../../../features/cart/cart";
import { useParams } from "react-router-dom";
import Alert from "../../../Alert";
import { useSelector } from "react-redux";

export default function ProductVariants({images, info, noMatch, allVariant = {}, setSelectedVariant, selectedVariant, availableOption }) {

    const {token} = useSelector((state)=>state.auth)
    const [addToCart, {isLoading: loading}]  = useAddToCartMutation()
    const {id}  = useParams()
    console.log(allVariant, "varinat also coming")
    if (!allVariant || Object.keys(allVariant).length === 0) {
        return <p>No variants available</p>;
    }
    
    const finalPrice = info.price - (info.price * info.discount) / 100;

    const handleSelect = (type, value) => {
        setSelectedVariant((prev) => ({
            ...prev, [type]: value
        }))



    }

    const handleCartSubmit = async()=>{
        if(noMatch) return
        const cartData  = {
            productId: id,
            variants: selectedVariant,
            price: finalPrice,
            quantity: 1,
            images: images,
            title: info.title
        }
       if(!token){
        localStorage.removeItem("cart")
        const existingCart = JSON.parse(localStorage.getItem("cart")) || []
        const existingItem = existingCart.find((item)=>item.productId===id && JSON.stringify(item.variants)===JSON.stringify(selectedVariant))
        if(existingItem){
            existingItem.quantity++
        }else{
            existingCart.push(cartData)
        }
        localStorage.setItem("cart", JSON.stringify(existingCart))
       }

        try{
            addToCart(cartData).unwrap()
            return <Alert message={"Added to Cart"} type="success"/>
            
        }catch(err){
            console.log(err, "error adding Cart")
        }


    }



    return (
        <div>
           
            <h2 className="font-semibold text-xl">Available Variants</h2>
            {noMatch && (
                <p className="text-red-600  mt-2 shake">
                    Please Select Available Variant
                </p>
            )}

            {Object.entries(allVariant).map(([key, value]) => (

                <div key={key} className="p-2 flex gap-5">
                    <div className="p-2 rounded  font-semibold tracking-wider">{key}  :</div>
                    {value.map((val, i) => {
                        const isAvailable = availableOption(key, val)
                        console.log(isAvailable, "option")

                        return (



                            <button onClick={() => handleSelect(key, val)} key={i} className={`px-3 py-1 border rounded-lg w-16 transition ${!isAvailable && "line-through bg-gray-400 hover:scale-100 transition hover:bg-gray-500"}
                              ${selectedVariant[key] === val ? "bg-blue-600 text-white border-blue-700" : "bg-blue-50 border-blue-400 hover:scale-105 hover:bg-blue-100"}`}>{val}</button>
                        )
                    })}
                </div>
            ))}
            <CartAndPrice noMatch={noMatch} loading = {loading} stock={info.stock} handleCart = {handleCartSubmit}/>
        </div>
    )
}