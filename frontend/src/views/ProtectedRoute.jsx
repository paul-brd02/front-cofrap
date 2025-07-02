import { Navigate, useLocation } from "react-router";

function ProtectedRoute({ children }) {
  const location = useLocation();
  const user = location.state?.user;

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
