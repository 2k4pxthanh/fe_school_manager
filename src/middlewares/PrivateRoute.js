import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const checkLogin = useSelector(({ auth }) => auth.data);

  if (checkLogin !== "Login successful!") {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
