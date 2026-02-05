import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowGuest = false }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-none h-12 w-12 border-t-2 border-b-2 border-gray-500"></div>
          <p className="text-gray-500 font-mono text-sm">LOADING...</p>
        </div>
      </div>
    );
  }

  if (!user && !allowGuest) {
    return <Navigate to="/login" state={{ from: window.location.pathname }} replace />;
  }

  return children;
};

export default ProtectedRoute;

