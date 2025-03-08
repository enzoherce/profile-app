import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
    const { isLogin } = useAuth();

    return isLogin ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
