import { useParams, useNavigate } from "react-router-dom";

export default function CategoryFilter() {
  const { category } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <h1 className="text-2xl font-bold capitalize">{category}</h1>

      {category === "Fashion" && (
        <>
          <h2>Men</h2>
          <div>
            <button onClick={() => navigate(`/category/fashion/men`)}>
              Men
            </button>
          </div>

          <h2>Women</h2>
          <div>
            <button onClick={() => navigate(`/category/fashion/women`)}>
              Women
            </button>
          </div>
        </>
      )}

      {category === "Beauty" && (
        <div>
          <button onClick={() => navigate(`/category/beauty/makeup`)}>
            Makeup
          </button>
          <button onClick={() => navigate(`/category/beauty/skincare`)}>
            Skincare
          </button>
        </div>
      )}
    </>
  );
}
