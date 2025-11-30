import { useParams, useNavigate } from "react-router-dom";
import { useViewProductQuery, useDeleteProductMutation } from "./productSlice";
import { useState } from "react";
import UpdateProduct from "./UpdateProduct";
import ProductDetailCard from "../../components/ProductDetailCard";

export default function ProductDetail() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { data, error, isLoading } = useViewProductQuery(id);
  console.log(data)
  const [editingProduct, setEditingProduct] = useState(false);

  const [deleteProduct, { isLoading: deleting }] = useDeleteProductMutation();

  if (isLoading) return <p>Loading product...</p>;
  if (error) return <p>Error loading product: {error.message}</p>;

  const product = data?.product;
  if (!product) return <p>No product found.</p>;

  async function handleDelete() {
    try {
      await deleteProduct(product._id).unwrap();
      alert("✅ Product deleted successfully");
      navigate("/products"); // redirect after delete
    } catch (err) {
      console.error("Error occurred:", err);
      alert("❌ Failed to delete product");
    }
  }

  return (

        <>
          <ProductDetailCard data={product} />

        
        </>
  
  )
}
