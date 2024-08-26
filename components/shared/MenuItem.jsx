import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const MenuItem = ({ menuItem, isCollapsed }) => {
  const pathName = usePathname();

  const isActive = pathName === menuItem.path;

  return (
    <Link href={menuItem.path}>
      <div className={`w-full flex ${isCollapsed? 'flex-center' : ''} gap-4 p-2 rounded-xl text-neutral-500 hover:bg-accent
          ${isActive ? 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground' : ''}`}>
            <Image 
                src={isActive? menuItem.activeIcon : menuItem.inactiveIcon}
                alt={menuItem.name}
                width={24}
                height={24}
            />
            <div className={`${isCollapsed ? 'hidden' : ''}`}>
                {menuItem.name}
            </div>
        </div>
    </Link>
  )
}

export default MenuItem