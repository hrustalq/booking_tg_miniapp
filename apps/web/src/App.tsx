import ThemeProvider from '@/providers/theme-prodiver'
import { AuthProvider } from '@/providers/auth-provider'
import { RouterProvider } from 'react-router-dom'
import router from '@/router'
import LoadingFallback from '@/components/loading-fallback'
import '@/assets/globals.css'
import { useEffect } from 'react'
import WebApp from '@twa-dev/sdk'
import { useTheme } from '@/hooks/use-theme'

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

function AppContent() {
  const { theme } = useTheme()

  useEffect(() => {
    // Запуск в полноэкранном режиме
    WebApp.expand()

    // Установка цвета шапки в зависимости от темы
    const headerColor = theme === 'dark' ? '#101827' : '#ffffff'
    WebApp.setHeaderColor(headerColor)
  }, [theme])

  return (
    <ThemeProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} fallbackElement={<LoadingFallback />} />
        </QueryClientProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

function App() {
  return (
    <AppContent />
  )
}

export default App
