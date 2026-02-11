import { Link } from "react-router-dom";
import { useGetProductsQuery } from "./productSlice";
import ProductCard from "../../components/ProductCard";

export default function ProductList() {
  const { data, isLoading, isError, error,  } = useGetProductsQuery();

  if (isLoading) return <p>Loading products...</p>;
  if (isError) return <p style={{ color: "red" }}>Error: {error?.data?.message}</p>;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-6">
        {data?.allProducts?.map((product) => {
          const mainImageUrl = product.images?.[0]?.url
            
          return (
            <Link key={product._id} to={`/products/${product._id}`}>
              <ProductCard
                title={product.title}
                price={product.price}
                image={mainImageUrl}
              />
            </Link>
          );
        })}
      </div>
    </>
  );
}
