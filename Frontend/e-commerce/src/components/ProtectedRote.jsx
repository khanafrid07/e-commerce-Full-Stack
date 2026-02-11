
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { token, loading } = useSelector((state) => state.auth);

  if (loading) return <p>Loading...</p>; 

  if (!token) return <Navigate to="/login" replace />;

  return children;
}
