"use client";

import Hero from "@/components/shared/Hero";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";


export default function Home() {

    const router = useRouter();
    const { status } = useSession();

    useEffect(() => {
        if (status === "authenticated") {
            // Redirect to the dashboard if the session is active
            router.push("/dashboard");
        }
    }, [status, router]);

    if (status === 'loading') {
        return null;
    }

    if (status === 'unauthenticated') {
        return (
            <>
                <Hero />
            </>
        );
    }

    return null;
}
