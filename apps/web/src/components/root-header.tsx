import React from 'react'
import { useTheme } from "@/hooks/use-theme"
import { BsSunFill, BsMoonFill } from "react-icons/bs";
import { UserAvatar } from './user-avatar'
import { LuUser } from 'react-icons/lu'
import { cn } from '@/lib/utils'

interface RootHeaderProps {
  title: string
}

export const RootHeader: React.FC<RootHeaderProps> = ({ title }) => {
  const { theme, setTheme } = useTheme()

  const headerClass = cn(
    'fixed top-0 left-0 right-0 flex items-center h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 z-50',
    theme === 'dark' ? 'text-white' : 'text-gray-700'
  )

  return (
    <header className={headerClass}>
      <div className="flex justify-between items-center w-full px-6">
        <h1 className="text-xl font-bold">{title}</h1>
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="focus:outline-none"
          >
            {theme === 'light' ? <BsSunFill className="w-6 h-6" /> : <BsMoonFill className="w-6 h-6" />}
          </button>
          <UserAvatar fallback={<LuUser className="w-6 h-6" />} />  
        </div>
      </div>
    </header>
  )
}
