'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import {
  Home,
  Menu,
  X,
  User,
  Layers3,
  Hammer,
  Mail,
  LogIn,
} from 'lucide-react'
import Link from 'next/link'
import NavButton from '@/components/NavButton'

const Header = () => {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  if (pathname === '/login') return null

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/about', label: 'About', icon: User },
    { href: '/projects', label: 'Projects', icon: Layers3 },
    { href: '/skills', label: 'Skills', icon: Hammer },
    { href: '/services', label: 'Services', icon: Hammer },
    { href: '/contact', label: 'Contact', icon: Mail },
    { href: '/login', label: 'Login', icon: LogIn },
  ]

  const handleOpen = () => {
    setMenuOpen(true)
  }

  const handleClose = () => {
    setMenuOpen(false)
  }

  return (
    <header className="bg-background border-b sticky top-0 z-50 px-4 py-3 animate-slide-in">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-foreground">
          3D Animator
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-2">
          {navItems.slice(1).map(({ href, label, icon }) => (
            <NavButton
              key={href}
              href={href}
              label={label}
              icon={icon}
              hideIconOnLargeScreen={true} // ✅ Only label on large screen
            />
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground"
          onClick={handleOpen}
          aria-label="Open Menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Slide Menu */}
      <div
        className={`
          fixed top-0 right-0 h-full w-64 z-[999] bg-white p-6 border-l shadow-lg transform transition-transform duration-300 ease-in-out
          ${menuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <button
          onClick={handleClose}
          className="self-end text-gray-700 mb-4 hover:text-gray-500"
          aria-label="Close Menu"
        >
          <X className="w-6 h-6" />
        </button>

        <nav className="mt-8 flex flex-col gap-5 items-center">
          {navItems.map(({ href, label, icon }) => (
            <NavButton
              key={href}
              href={href}
              label={label}
              icon={icon}
              className="text-lg w-full text-center py-2 border-b"
              onClick={handleClose}
            />
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Header
