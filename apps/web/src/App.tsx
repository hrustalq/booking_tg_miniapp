import { Suspense } from 'react'
import ThemeProvider from '@/providers/theme-prodiver'
import { AuthProvider } from '@/providers/auth-provider'
import { RouterProvider } from 'react-router-dom'
import router from '@/router'
import LoadingFallback from '@/components/loading-fallback'
import '@/assets/globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <Suspense fallback={<LoadingFallback />}>
            <RouterProvider router={router} />
          </Suspense>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
