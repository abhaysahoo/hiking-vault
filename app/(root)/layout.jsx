"use client";

import MenuItem from '@/components/shared/MenuItem';
import { navMenu } from '@/constants';

import Image from 'next/image'
import { useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import UserAvatar from '@/components/shared/UserAvatar';

const layout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggle = () => {
    setIsCollapsed(prevState => !prevState);
  }

  return ( 
      <aside className={`hidden lg:flex flex-col min-h-screen w-64 border border-black p-4 gap-12
      ${isCollapsed? 'max-w-max px-2' : 'w-64'}`}>
          <div className='flex-center gap-2'>
            <Image 
              src="/images/logo.png"
              alt="logo"
              width={34}  
              height={34}
              className=''
            />
            <div className={`text-xl text-brand-600 font-extrabold ${isCollapsed ? 'hidden' : ''}`}>
              Hiking<span className='text-brand-800 tracking-tighter uppercase'>Vault</span>
            </div>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger 
                className={`ml-auto ${isCollapsed ? 'hidden' : ''}`}
                onClick={handleToggle}
                >
                  <Image
                    src="/icons/collapse-left.svg"
                    alt='collapse-left icon'
                    width={30}
                    height={30}
                    className='cursor-pointer hover:bg-neutral-200 p-1 hover:rounded-md'
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Collapse Sidebar</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>   
          </div>

          <nav className='flex-col flex gap-4'>
            {
              navMenu.map((menuItem) => (
                <MenuItem 
                  key={menuItem.name} 
                  menuItem={menuItem} 
                  isCollapsed={isCollapsed}
                />
              ))
            }
          </nav>

          <div className='mt-auto flex flex-col items-center gap-2'>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger
                  className={`${isCollapsed ? '' : 'hidden'}`}
                  onClick={handleToggle}
                >
                  <Image
                    src="/icons/expand-right.svg"
                    alt='expand right icon'
                    width={30}
                    height={30}
                    className='cursor-pointer hover:bg-neutral-200 p-1 hover:rounded-md'
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Expand Sidebar</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <UserAvatar isCollapsed={isCollapsed} />
          </div>
      </aside>
  )
}

export default layout