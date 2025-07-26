'use client'
import React from 'react'
import NavButton from '@/components/NavButton'
import {
  Home,
  User,
  Layers3,
  Mail,
  LogIn,
  LogOut,
  Hammer,
} from 'lucide-react'

import { useRouter } from 'next/navigation'
import { useLogoutMutation } from '@/features/auth/authApi'

const DashBoardSideBar = () => {
  const router = useRouter()
  const [logout, { isLoading }] = useLogoutMutation()

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: Home },
    { href: '/dashboard/projects', label: 'Projects', icon: User },
    { href: '/dashboard/skills', label: 'Skills', icon: Layers3 },
    { href: '/dashboard/services', label: 'Services', icon: Hammer },
    { href: '/dashboard/contact', label: 'Contact', icon: Mail },
    { href: '/dashboard/profile', label: 'Profile', icon: LogIn },
  ]

  const logoutHandler = async () => {
    try {
      await logout().unwrap()
      router.push('/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <aside className="bg-background border-r h-full p-4 w-64 pt-10 sticky top-0">
      <nav className="flex flex-col gap-2 align-left">
        {navItems.map(({ href, label, icon }) => (
          <NavButton
            key={label}
            href={href}
            label={label}
            icon={icon}
            className="text-xl w-full text-left px-4 py-2 hover:bg-muted transition rounded-md"
          />
        ))}
      </nav>
      <button
        className="text-xl w-full text-left px-4 py-2 hover:bg-muted transition rounded-md mt-4 flex items-center gap-2"
        onClick={logoutHandler}
      // disabled={isLoading}
      >
        <LogOut size={20} />
        Logout
      </button>
    </aside>
  )
}

export default DashBoardSideBar
