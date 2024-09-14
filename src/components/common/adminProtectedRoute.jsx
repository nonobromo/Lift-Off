import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth.context";

function AdminProtectedRoute({ children, onlyBusiness = false }) {
  const { user } = useAuth();

  if (!user || (onlyBusiness && !user?.isAdmin)) {
    return <Navigate to="/" />;
  }
  return children;
}

export default AdminProtectedRoute;
