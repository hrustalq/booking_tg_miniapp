import { useContext } from "react";
import { AuthContext } from '../providers/auth-provider';
import { AuthContextType } from '../providers/auth-provider'; // Add this import

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};