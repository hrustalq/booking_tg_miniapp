import ThemeProvider from '@/providers/theme-prodiver'
import { AuthProvider } from '@/providers/auth-provider'
import { RouterProvider } from 'react-router-dom'
import router from '@/router'
import LoadingFallback from '@/components/loading-fallback'
import '@/assets/globals.css'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} fallbackElement={<LoadingFallback />} />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
