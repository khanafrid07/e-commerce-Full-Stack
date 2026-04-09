import { useState } from "react";
import CartAndPrice from "./CartAndPrice";
import { useAddToCartMutation } from "../../../../features/cart/cart";
import { useParams } from "react-router-dom";
import Alert from "../../../Alert";
import { useSelector } from "react-redux";

export default function ProductVariants({ images, info, noMatch, allVariant = {}, variantId, setSelectedVariant, selectedVariant, availableOption }) {

    const { token } = useSelector((state) => state.auth)
    const [addToCart, { isLoading: loading }] = useAddToCartMutation()
    const { id } = useParams()
    console.log(allVariant, "varinat also coming")
    if (!allVariant || Object.keys(allVariant).length === 0) {
        return <p>No variants available</p>;
    }

    const finalPrice = info.finalPrice
    const handleSelect = (type, value) => {
        setSelectedVariant((prev) => ({
            ...prev, [type]: value
        }))



    }

    const handleCartSubmit = async () => {
        if (noMatch) return
        
        if (!token) {
            // Local cart logic - check if item already exists
            const localCartData = {
                productId: id,
                variant: selectedVariant,
                basePrice: info.basePrice,
                discount: info.discount || 0,
                price: finalPrice,  // This is the discounted price
                quantity: 1,
                variantImages: images,
                title: info.title,
                variantId: variantId
            }
            const existingCart = JSON.parse(localStorage.getItem("cart")) || []
            
            // Check for existing item with same product and variant
            const existingItem = existingCart.find((item) => {
                const isSameProduct = item.productId === id
                const isSameVariant = JSON.stringify(item.variant || {}) === JSON.stringify(selectedVariant)
                return isSameProduct && isSameVariant
            })
            
            if (existingItem) {
                existingItem.quantity += 1
                console.log(`Item already exists, updating quantity to ${existingItem.quantity}`)
                alert(`Quantity updated to ${existingItem.quantity}`)
            } else {
                existingCart.push(localCartData)
                console.log("New item added to cart")
                alert("Added to cart successfully")
            }
            localStorage.setItem("cart", JSON.stringify(existingCart))
            return
        }
        
        // Server cart logic - backend will handle checking existing items
        try {
            const sanitizedData = {
                productId: id,
                variants: selectedVariant,
                quantity: 1,
            }
            console.log("Adding to server cart:", sanitizedData)
            await addToCart(sanitizedData).unwrap()
            alert("Added to cart successfully")
        } catch (err) {
            console.log(err, "error adding to cart")
            alert("Error adding to cart: " + (err?.data?.message || err.message))
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



                            <button onClick={() => handleSelect(key, val)} key={i} className={`px-3  py-1 border text-center rounded-lg w-16 transition ${!isAvailable && "line-through bg-gray-400 hover:scale-100 transition hover:bg-gray-500"}
                              ${selectedVariant[key] === val ? "bg-blue-600 text-white border-blue-700" : "bg-blue-50 border-blue-400 hover:scale-105 hover:bg-blue-100"}`}>{val}</button>
                        )
                    })}
                </div>
            ))}
            <CartAndPrice noMatch={noMatch} loading={loading} stock={info.stock} handleCart={handleCartSubmit} />
        </div>
    )
}