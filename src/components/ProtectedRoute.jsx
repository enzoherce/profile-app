import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLogin = useSelector((state) => state.auth.isLogin);
  return isLogin ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
