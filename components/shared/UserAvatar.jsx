"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import TextCopyComponent from "./TextCopyComponent";


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
            <DropdownMenuTrigger className="lg:w-full max-w-max focus:outline-none ml-auto">
                <div className="flex flex-start p-2 rounded-xl gap-2 w-full lg:border lg:border-neutral-200 lg:shadow-sm">
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
                
                <AlertDialog>
                    <AlertDialogTrigger>
                        <div className="flex flex-between gap-4 hover:bg-accent p-2 rounded-lg">
                            <div>Log Out</div>
                            <Image
                                src="/icons/logout.svg"
                                alt="logout icon"
                                width={20}
                                height={20}
                            />
                        </div>
                    </AlertDialogTrigger>
                    <AlertDialogContent className='max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-lg'>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Next time you want to access your profile, you have to log in again.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                                onClick={() => signOut({ 
                                    callbackUrl: '/',
                                 })}
                            >
                                Log Out
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                <Dialog>
                    <DialogTrigger>
                        <div className="flex flex-between gap-4 hover:bg-accent p-2 rounded-lg">
                            <div>Profile</div>
                            <Image
                                src="/icons/new-tab.svg"
                                alt="new tab icon"
                                width={20}
                                height={20}
                            />
                        </div>
                    </DialogTrigger>
                    <DialogContent className='max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-lg'>
                        <DialogHeader>
                            <DialogTitle></DialogTitle>
                            <DialogDescription>
                                
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-col gap-4 overflow-hidden">
                            <Image
                                src={session?.user?.image}
                                alt="user avatar"
                                width={80}
                                height={80}
                                className='rounded-full object-contain self-center mb-8'
                            />
                        
                            <div className=" flex items-center gap-1">
                                <div className="font-semibold basis-1/4">Name </div> 
                                <div className="basis-3/4">
                                    <div className="flex items-center max-w-max bg-brand-100 text-accent-foreground 
                                    px-2 py-1 rounded-md">
                                        <span className="text-xs">{session?.user?.name}</span>
                                        <TextCopyComponent text={session?.user?.name} />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-1">
                                <div className="font-semibold basis-1/4">Email </div>
                                <div className="basis-3/4">
                                    <div className="flex items-center max-w-max bg-brand-100 text-accent-foreground 
                                    px-2 py-1 rounded-md">
                                        <span className="hidden lg:flex text-xs">
                                            {session?.user?.email}
                                        </span>
                                        <span className="hidden sm:flex lg:hidden text-xs">
                                            {session?.user?.email.length > 18 ?
                                                session?.user?.email.slice(0, 18) + '...'
                                                : session?.user?.email}
                                        </span>
                                        <span className="flex sm:hidden text-xs">
                                            {session?.user?.email.length > 10 ?
                                                session?.user?.email.slice(0, 12) + '...'
                                                : session?.user?.email}
                                        </span>
                                        <TextCopyComponent text={session?.user?.email} />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-1">
                                <div className="font-semibold basis-1/4">Role </div>
                                <div className="basis-3/4">
                                    <div className="max-w-max bg-brand-100 text-accent-foreground 
                                    px-2 py-1 rounded-md">
                                        <span className="text-xs">{session?.user?.role}</span>
                                    </div>   
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserAvatar