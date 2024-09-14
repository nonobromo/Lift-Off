import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth.context";

function ProtectedRoute({ children, onlyBusiness = false }) {
  const { user } = useAuth();

  if (!user || (onlyBusiness && !user?.isBusiness)) {
    return <Navigate to="/" />;
  }
  return children;
}

export default ProtectedRoute;
