import { Outlet, replace, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useEffect } from "react";

function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  console.log("from protectedRoute component:", isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", {
        viewTransition: true,
        replace: true,
      });
    }
  }, []);

  return <Outlet />;
}

export default ProtectedRoute;
