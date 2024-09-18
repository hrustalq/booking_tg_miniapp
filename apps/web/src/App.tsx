import ThemeProvider from '@/providers/theme-prodiver'
import { AuthProvider } from '@/providers/auth-provider'
import { RouterProvider } from 'react-router-dom'
import router from '@/router'
import LoadingFallback from '@/components/loading-fallback'
import '@/assets/globals.css'
import { useEffect } from 'react'
import WebApp from '@twa-dev/sdk'
import { useTheme } from '@/hooks/use-theme'

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
    <AuthProvider>
      <RouterProvider router={router} fallbackElement={<LoadingFallback />} />
    </AuthProvider>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App
