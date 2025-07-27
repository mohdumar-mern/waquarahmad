'use client'

import { Button } from "@/components/ui/Button"
import Link from "next/link"
import { usePathname } from "next/navigation"

const NavButton = ({ icon: Icon, label, href, className = '', onClick }) => {
  const pathname = usePathname()
  const isActive = pathname === href

  const activeClass = 'text-primary font-semibold border-b-2 border-r-1 border-primary'
  const inactiveClass = 'text-gray-700 hover:text-primary'

  return (
    <Button
      variant="ghost"
      aria-label={label}
      title={label}
      className={`flex items-center gap-1 rounded-sm justify-start ${isActive ? activeClass : inactiveClass} ${className}`}
      asChild
      onClick={onClick}
      data-active={isActive}
      data-inactive={!isActive}
      
    >
      <Link href={href} prefetch={false}>
        <>
          {/* Icon shows only on mobile/tablet */}
          {Icon && <Icon className="w-4 h-4 block md:hidden" />}

          {/* Label always visible */}
          <span className=" md:block">{label}</span>
        </>
      </Link>
    </Button>
  )
}

export default NavButton
