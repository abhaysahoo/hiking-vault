"use client";

import Header from "@/components/shared/Header";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Layout({ children }) {
    const router = useRouter();
    const { status } = useSession();

    if(status === 'loading') {
        return <></>;
    }

    if(status === 'authenticated') {
        router.push('/dashboard');
    }

    if(status === 'unauthenticated') {
        return (
            <>
                <Header />
                {children}
            </>
        );
    }   
}
