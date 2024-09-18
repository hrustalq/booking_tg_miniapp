import React, { ComponentProps, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTheme } from "@/hooks/use-theme";
import { cn } from '@/lib/utils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { UserIcon, HistoryIcon, CreditCardIcon, SettingsIcon, LinkIcon, UserPlusIcon } from 'lucide-react';

interface UserAvatarProps extends ComponentProps<"div"> {
  src?: string
  fallback: string | React.ReactNode
  size?: 'sm' | 'md' | 'lg'
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ className, src, fallback, size = 'md' }) => {
  const { theme } = useTheme()
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12'
  }

  const themeClasses = {
    light: 'bg-gray-100 text-gray-600',
    dark: 'bg-gray-800 text-gray-300',
    system: 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
  }

  const avatarClass = `${sizeClasses[size]} ${themeClasses[theme as keyof typeof themeClasses] || themeClasses.system}`

  const isAuthorized = user?.gizmoData !== null

  const links = isAuthorized
    ? [
        { to: '/profile', label: 'Профиль', icon: <UserIcon size={18} /> },
        { to: '/bookings', label: 'История бронирований', icon: <HistoryIcon size={18} /> },
        { to: '/payments', label: 'История платежей', icon: <CreditCardIcon size={18} /> },
        { to: '/settings', label: 'Настройки', icon: <SettingsIcon size={18} /> },
      ]
    : [
        { to: '/link-account', label: 'Привязать аккаунт', icon: <LinkIcon size={18} /> },
        { to: '/create-account', label: 'Создать аккаунт', icon: <UserPlusIcon size={18} /> },
      ]

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger>
        <Avatar className={cn(avatarClass, className)}>
          <AvatarImage src={src} alt="User avatar" />
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-0 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700">
        {links.map((link) => (
          <DropdownMenuItem key={link.to} className="p-0 focus:bg-gray-100 dark:focus:bg-gray-800 rounded-md">
            <Link 
              className="flex items-center px-3 py-2 gap-x-3 text-base w-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150 ease-in-out rounded-md" 
              to={link.to}
              onClick={() => setIsOpen(false)}
            >
              {React.cloneElement(link.icon, { className: "text-gray-500 dark:text-gray-400" })}
              {link.label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
