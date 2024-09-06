import Image from 'next/image'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import { navMenu } from '@/constants'
import MenuItem from './MenuItem'
import UserAvatar from './UserAvatar'


const MobileHeader = () => {
  return (
    <header className='flex lg:hidden bg-background px-4 sm:px-8 py-4'>
          <div className='flex-between w-full gap-4'>
            <Image 
                src="/images/logo.png"
                alt='logo'
                width={34}
                height={34}
            />

            <UserAvatar isCollapsed={true} />
            
            <Sheet>
                <SheetTrigger>
                    <Image
                        src="/icons/menu-burger.svg"
                        alt='menu burger icon'
                        width={34}
                        height={34}
                    />
                </SheetTrigger>
                <SheetContent side="left">
                    <SheetHeader>
                        <SheetTitle></SheetTitle>
                        <SheetDescription></SheetDescription>
                    </SheetHeader>
                    <div className='flex-col flex gap-8'>
                        <div className={`text-xl text-brand-600 font-extrabold`}>
                            Hiking<span className='text-brand-800 tracking-tighter uppercase'>Vault</span>
                        </div>

                        <nav className='flex-col flex gap-4'>
                            {
                                navMenu.map((menuItem) => (
                                    <MenuItem
                                        key={menuItem.name}
                                        menuItem={menuItem}
                                        isCollapsed={false}
                                    />
                                ))
                            }
                        </nav>  
                    </div>      
                </SheetContent>
            </Sheet>
        </div>
    </header>
  )
}

export default MobileHeader