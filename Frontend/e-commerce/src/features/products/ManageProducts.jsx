import { useGetProductsQuery, useDeleteProductMutation } from "./productSlice";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { Search } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";
import UpdateProduct from "./UpdateProduct";

export default function ManageProducts() {
    const { data, isLoading, error } = useGetProductsQuery();
    const [deleteProduct] = useDeleteProductMutation();
    const navigate = useNavigate();

    let [allProducts, setAllProducts] = useState([])
    let [searchTerm, setSearchTerm] = useState("")
    let [stockFilter, setStockFilter] = useState("all")

    function filteredProducts() {
        let products = allProducts;

        if (stockFilter === "out") {
            products = products.filter(p => p.stock === 0);
        } else if (stockFilter === "low") {
            products = products.filter(p => p.stock > 0 && p.stock < 10);
        } else if (stockFilter === "in") {
            products = products.filter(p => p.stock >= 10);
        }

       
        if (searchTerm.trim() !== "") {
            products = products.filter(p =>
                p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.description.join(" ").toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        return products;
    }


    useEffect(() => {
        if (data?.allProducts) {
            setAllProducts(data.allProducts)
        }
    }, [data])

    if (isLoading) return <p>Loading products...</p>;
    if (error) return <p>Error loading products: {error.message}</p>;


    function onSearchInput(e) {
        setSearchTerm(e.target.value)
        console.log(e.target.value)

    }

    async function handleDelete(id) {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await deleteProduct(id).unwrap();
                alert("Product deleted successfully!");
            } catch (err) {
                console.error("Delete failed:", err);
                alert("Error deleting product.");
            }
        }
    } 


    return (
        <div className="text-text p-5 bg-background ">


            <h3 className="text-2xl font-bold mb-4">All Products List</h3>
            <div className="flex flex-column  justify-between my-8 items-center">
                <div className="dropdown bg-background text-text">
                    <div tabIndex={0} role="button" className="btn m-1">Stock Status <ChevronDown /></div>
                    <ul tabIndex="-1" className="dropdown-content menu bg-background text-text rounded-box z-1 w-52 p-2 shadow-md">
                        <li><a onClick={()=>setStockFilter("out")} className=" text-red-600">Out of stock</a></li>
                        <li><a onClick={()=>setStockFilter("low")} className=" text-yellow-600">Low in stock</a></li>
                        <li><a onClick={()=>setStockFilter("in")} className=" text-green-600">In Stock</a></li>


                    </ul>
                </div>
                <div className="flex items-center border border-black rounded-lg px-2 w-fit transition-all duration-100 focus-within:border-[2px] focus-within:border-black-500">
                    <input
                        onChange={onSearchInput}
                        type="search"
                        placeholder="Search by title, description, or name"
                        className="input input-bordered border-none focus:outline-none w-80"
                    />
                    <Search className="ml-2 cursor-pointer" />
                </div>

                <div>
                    <h3 className="font-semibold ">Search by Product Id</h3>
                    <label className="floating-label ">

                        <input type="text" placeholder="Product Id" className="input input-md " />
                    </label>

                </div>
            </div>

            <div className="grid grid-cols-5 font-semibold bg-gray-100 border border-gray-300 p-2 text-center">
                <p>Image</p>
                <p>ID</p>
                <p>Product</p>
                <p>Stock</p>
                <p>Action</p>

            </div>
            <div className="max-h-[60vh] overflow-y-scroll border rounded-lg mt-4">

            {filteredProducts().map((product) => (
                <div
                    key={product._id}
                    className="grid grid-cols-5 items-center border-b border-gray-200 p-2 text-center"
                >
                    <div>
                        <img
                            src={
                                product.images?.[0]?.url
                                    ? product.images[0].url
                                    : "https://via.placeholder.com/100"
                            }
                            alt={product.title}
                            className="w-16 h-16 object-cover mx-auto rounded-md border"
                        />
                    </div>
                    <p className="truncate">{product._id}</p>
                    <p>{product.title}</p>

                    <div className="">
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${product.stock === 0
                                ? "bg-red-100 text-red-600"
                                : product.stock < 10
                                    ? "bg-yellow-100 text-yellow-600"
                                    : "bg-green-100 text-green-600"
                                }`}
                        >
                            {product.stock === 0
                                ? "Out of Stock"
                                : product.stock < 10
                                    ? `Low (${product.stock})`
                                    : `In Stock (${product.stock})`}
                        </span>
                    </div>


                    <div className="">
                        <button onClick={()=>navigate(`/update-product/${product._id}`)} className="bg-primary text-white rounded px-3 py-1 mr-4 hover:bg-blue-900">
                            Edit
                        </button>

                        <button
                            onClick={() => handleDelete(product._id)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </div>

                </div>
                
            ))}
            </div>
        </div>
    );
}
