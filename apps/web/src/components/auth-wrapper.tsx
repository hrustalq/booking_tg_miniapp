import { useAuth } from "@/hooks/use-auth";
import { Navigate } from "react-router-dom";

export const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const { gizmoAccounts } = useAuth();
  
  if (!gizmoAccounts.length) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  return <>{children}</>;
};