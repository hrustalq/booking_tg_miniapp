export const ENV = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  GIZMO_API_BASE_URL: import.meta.env.VITE_GIZMO_API_BASE_URL,
  IS_DEV: import.meta.env.DEV,
  // Add other environment variables here
};

export const validateEnv = () => {
  const requiredVars = ['API_BASE_URL', 'GIZMO_API_BASE_URL'];
  requiredVars.forEach(varName => {
    if (!ENV[varName as keyof typeof ENV]) {
      throw new Error(`Missing required environment variable: ${varName}`);
    }
  });
};