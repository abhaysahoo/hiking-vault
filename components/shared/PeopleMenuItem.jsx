import { NavigationMenuItem } from '../ui/navigation-menu'
import { usePathname } from 'next/navigation'
import Link from 'next/link';
import Image from 'next/image';

const PeopleMenuItem = ({ menuItem }) => {
    const pathName = usePathname();

    const isActive = pathName.includes(menuItem.path);
    return (
        <NavigationMenuItem>
            <Link href={menuItem.path}>
                <div className={`w-full flex gap-2 p-2 border-b-2 border-b-background text-neutral-400
          ${isActive ? 'border-b-primary text-primary hover:border-b-primary hover:text-primary' : ''}`}
                >
                    <Image
                        src={isActive ? menuItem.activeIcon : menuItem.inactiveIcon}
                        alt={menuItem.name}
                        width={24}
                        height={24}
                    />
                    <div className={``}>
                        {menuItem.name}
                    </div>
                </div>
            </Link>
        </NavigationMenuItem>
    )
}

export default PeopleMenuItem