"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "../ui/input";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";


const Search = ({ placeholder = "Search anything..." }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(searchParams.get('query')?.toString());
    const pathName = usePathname();
    const firstRender = useRef(true);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            const params = new URLSearchParams(searchParams);
            
            if(firstRender.current) {
                firstRender.current = false;
            } else {
                params.set('page', 1);
            }
            
            if(query) {
                params.set('query', query);  
                router.push(`${pathName}?${params.toString()}`, { scroll: false });
            } else {
                params.delete('query');
                router.push(`${pathName}`, { scroll: false });
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [query]);

    return (
        <div className="relative flex-center max-w-lg">
            <Image
                src="/icons/search.svg"
                alt="search"
                width={24}
                height={24}
                className="absolute left-2"
            />
            {/* change border background, foreground to suit your needs - if you change placeholder, make sure to change icon 
        color as well */}
            <Input
                type="text"
                placeholder={placeholder}
                onChange={(e) => setQuery(e.target.value)}
                className="border-neutral-400 border bg-neutral-50 placeholder:text-neutral-400 
        focus-visible:ring-0 focus-visible:ring-offset-0 pl-10 w-full"
                defaultValue={query}
            />
        </div>
    )
}

export default Search