import { useParams } from "react-router-dom"
import { useViewProductQuery } from "../../../../features/products/productSlice"
import { useEffect, useState } from "react"
import ProductInfo from "./ProductInfo"
import ProductImageGallery from "./ProductImageGallery"
import ProductVariants from "./ProductVariants"
import CartAndPrice from "./CartAndPrice"
import Reviews from "../Reviews"

export default function ProductDetail() {


    const { id } = useParams()
    const { data, isLoading, isError } = useViewProductQuery(id)
    const product = data?.product
    const [allVariant, setAllVariant] = useState({})
    const [selectedVariant, setSelectedVariant] = useState({})
    const [noMatch, setNoMatch] = useState(false)
    const [info, setInfo] = useState({
        price: 0,
        discount: 0,
        category: null,
        description: "",
        title: "",
        stock: 0
    })
    const [images, setImages] = useState(null)

    useEffect(() => {
        if (data?.product) {

            setInfo({
                price: product.basePrice,
                discount: product.discount,
                category: product.category,
                description: product.description,
                title: product.title,
                stock: product.stock,
            })
            setImages(product.images)



            const availableVariant = Object.entries(product.baseVariant.typeValues)
            console.log(availableVariant, "ava")
            const additionalVariants = product.variants.map((type) => (
                Object.entries(type.typeValues)
            ))
            const merged = {}

            const allAvailableVariant = [...availableVariant, ...additionalVariants.flat()]
            allAvailableVariant.forEach(([key, value]) => {
                if (!merged[key]) {
                    merged[key] = new Set()
                }
                merged[key].add(value)
            })
            const finalVariant = {}
            for (let key in merged) {
                finalVariant[key] = Array.from(merged[key])
            }
            setAllVariant(finalVariant)
            console.log(finalVariant, "final")
        }
        //recent product
        let viewedItem = {
            category: product?.category?.main,
            gender: product?.category.gender,
            id: product?._id,
            viewedAt: Date.now()
        }

        let recentProducts = JSON.parse(localStorage.getItem("recentProducts")) || []
        recentProducts = recentProducts.filter((p) => p.id !== product?._id)
        recentProducts.unshift(viewedItem)
        recentProducts = recentProducts.slice(0, 10);
        localStorage.setItem("recentProducts", JSON.stringify(recentProducts))



    }, [product])
    console.log(selectedVariant, "sel var")


    useEffect(() => {
        if (product) {

            if (!product || Object.keys(selectedVariant).length === 0) return

            const isBaseMatch = Object.entries(product.baseVariant.typeValues).every(
                ([key, value]) => selectedVariant[key] === value
            );

            let matched = null
            if (isBaseMatch) {
                matched = product.baseVariant
            } else {
                matched = product.variants.find((v) => (
                    Object.entries(v.typeValues).every(([key, value]) => (
                        selectedVariant[key] === value
                    ))
                ))
            }
            console.log(matched, "matched var")
            if (matched) {
                setInfo((prev) => ({
                    ...prev,
                    price: matched.price ?? product.basePrice,
                    discount: matched.discount ?? product.discount,
                    stock: matched.stock ?? product.stock,


                }))
                setImages(matched.images && matched.images.length > 0 ? matched.images : product.images)
                setNoMatch(false)
            } else {
                setNoMatch(true)
            }

        }
    }, [selectedVariant, product])
    console.log(images, "omg")



    //auto selection for Single variant
    useEffect(() => {
        if (!allVariant || Object.keys(allVariant).length === 0) return;
        const autoSelected = {}
        Object.entries(allVariant).forEach(([key, value]) => {
            if (value.length === 1) {
                autoSelected[key] = value[0]
            }
        })
        if (Object.keys(autoSelected).length > 0) {
            setSelectedVariant(autoSelected)
        }
        console.log(selectedVariant)
        console.log(autoSelected, "Auto")
    }, [allVariant])

    const availableOption = (type, value) => {
        const tempVar = {
            ...selectedVariant,
            [type]: value
        };

        console.log(tempVar, "tempp")

        // check base variant
        const baseMatch = Object.entries(tempVar).every(
            ([key, val]) => product.baseVariant.typeValues[key] === val
        );

        // check additional variants
        const variantMatch = product.variants.some(v =>
            Object.entries(tempVar).every(
                ([key, val]) => v.typeValues[key] === val
            )
        );

        return baseMatch || variantMatch;
    };


    if (isLoading) {
        return <p>Loading....</p>
    }

    return (
        <div className="grid md:grid-cols-2 gap-3 py-4">
            <ProductImageGallery images={images} />
            <div>

                <ProductInfo info={info} />

                <ProductVariants images={images} info={info} noMatch={noMatch} availableOption={availableOption} selectedVariant={selectedVariant} setSelectedVariant={setSelectedVariant} allVariant={allVariant} />
                <Reviews reviews={product.reviews} />

            </div>

        </div>
    )
}

