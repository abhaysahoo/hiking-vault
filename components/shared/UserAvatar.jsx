"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";


const UserAvatar = ({ isCollapsed }) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    if(status === 'loading') {
        return <></>;
    }

    if(status === 'unauthenticated') {
        router.push("/auth/sign-in");
        return null;
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="w-full focus:outline-none">
                <div className="flex flex-start p-2 rounded-xl gap-2 w-full border border-neutral-200 shadow-sm">
                    <Image 
                        src={session?.user?.image}
                        alt="user avatar"
                        width={34}
                        height={34}
                        className='rounded-full object-contain'
                    />
                    <div className={`${isCollapsed ? 'hidden' : ''} text-xs flex flex-col items-start justify-center`}>
                        <p>{session?.user?.name}</p>
                        <p className="text-neutral-400">
                            {session?.user?.email.length > 18 ? 
                            session?.user?.email.slice(0, 18) + '...' 
                            : session?.user?.email}
                        </p>
                    </div>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 min-w-48 w-auto flex flex-col gap-4">
                <Link href="/auth/sign-out">
                    <div className="flex flex-between gap-4 hover:bg-accent p-2 rounded-lg">
                        <div>Log Out</div>
                        <Image 
                            src="/icons/logout.svg"
                            alt="logout icon"
                            width={20}
                            height={20}
                        />
                    </div>
                </Link>
                <Link href="/api/users/user_id">
                    <div className="flex flex-between gap-4 hover:bg-accent p-2 rounded-lg">
                        <div>Profile</div>
                        <Image
                            src="/icons/new-tab.svg"
                            alt="new tab icon"
                            width={20}
                            height={20}
                        />
                    </div>
                </Link>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserAvatar