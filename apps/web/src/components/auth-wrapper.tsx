import { useAuth } from "@/hooks/use-auth";
import { Navigate } from "react-router-dom";

export const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  
  if (!user?.gizmoData) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  return <>{children}</>;
};