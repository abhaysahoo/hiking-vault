"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function SignIn({ providers }) {
    return (
        <div className="w-full max-w-sm bg-white rounded-lg border-neutral-300 border shadow overflow-hidden">
            <div className="flex-col flex-between py-8 px-4 gap-8 bg-white">
                <div className="text-2xl text-brand-600 font-extrabold">
                    Hiking
                    <span className="text-brand-800 tracking-tighter uppercase">
                        Vault
                    </span>
                </div>

                <div className="flex-col gap-4">
                    {Object.values(providers).map((provider) => (
                        <Button
                            variant='secondary'
                            key={provider.id}
                            className="flex gap-2 rounded-lg border border-neutral-300"
                            onClick={() => signIn(provider.id, {
                                callbackUrl: '/dashboard'
                            })}
                        >
                            <Image
                                src="/icons/google-icon-color.svg"
                                alt="google"
                                width={20}
                                height={20}
                            />
                            <span className="text-base">Sign in with {provider.name}</span>
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    );
}