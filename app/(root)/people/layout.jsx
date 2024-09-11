"use client";

import {
    NavigationMenu,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { peopleMenu } from "@/constants"
import PeopleMenuItem from "@/components/shared/PeopleMenuItem"

const layout = ({ children }) => {
    return (
        <div className="lg:w-full bg-background m-4 rounded-lg p-2 sm:p-4">
            <div className='flex-start flex-col gap-12'>
                <div className='self-start'>
                    <h4 className='text-neutral-600'>
                        People
                    </h4>
                </div>
                <div className="self-start">
                    <NavigationMenu className=''>
                        <NavigationMenuList>
                            {peopleMenu.map(menuItem => (
                                <PeopleMenuItem
                                    key={menuItem.path}
                                    menuItem={menuItem}
                                />))
                            }
                        </NavigationMenuList>
                    </NavigationMenu>
                </div> 
            </div>  
            {children} 
        </div>
    )
}

export default layout