// PrivateRoute.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const { user, loading } = useSelector((state) => state.auth);

  // wait for /me check
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  // not logged in → redirect
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}