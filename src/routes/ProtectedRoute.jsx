import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "@context/AuthProvider";

const ProtectedRoute = ({ allowedRoles }) => {
  const { auth } = useContext(AuthContext);

  if (!auth || !allowedRoles.includes(auth.rol)) {
    return <Navigate to="*" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;