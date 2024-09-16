import { ThemeProvider } from '@/context/theme-context'
import { AuthProvider } from '@/context/auth-context'
import { RouterProvider } from 'react-router-dom'
import router from '@/router'
import LoadingFallback from '@/components/loading-fallback'
import eruda from 'eruda'

function App() {
  if (process.env.NODE_ENV === 'development') {
    eruda.init()
  }

  return (
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} fallbackElement={<LoadingFallback />} />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
