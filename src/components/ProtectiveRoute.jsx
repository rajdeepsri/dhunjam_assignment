import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectiveRoute = ({ children }) => {
  const { userId } = useAuth();
  if (!userId) return <Navigate to="/login" />;
  return children;
};

export default ProtectiveRoute;
