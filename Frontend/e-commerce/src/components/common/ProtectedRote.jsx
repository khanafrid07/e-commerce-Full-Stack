import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ role = "" }) {
  const { user, loading } = useSelector((state) => state.auth);


  if (loading) {
    return <p>Loading...</p>;
  }



  if (role && user?.role !== role) {
    return <p>Access denied</p>;
  }

  return <Outlet />;
}