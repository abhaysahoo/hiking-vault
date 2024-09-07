"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Pagination = ({ totalPages }) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathName = usePathname();
    const currentPage = Number(searchParams.get('page')) || 1;

    const createPageURL = (newPage) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', newPage.toString());
        router.push(`${pathName}?${params.toString()}`, { scroll: false });
    }

    return (
        <div className="flex gap-2">
            <button
                className=""
                onClick={() => createPageURL(currentPage-1)}
                disabled={Number(currentPage) <= 1}
            >
                {/* Change icons/text if you want here  */}
                <Image 
                    src="/icons/arrow-left-circle.svg"
                    alt="arrow left circle"
                    width={24}
                    height={24}
                />
            </button>
            <button
                className=""
                onClick={() => createPageURL(currentPage+1)}
                disabled={Number(currentPage) >= totalPages}
            >
                {/* Change icons/text if you want here  */}
                <Image
                    src="/icons/arrow-right-circle.svg"
                    alt="arrow left circle"
                    width={24}
                    height={24}
                />
            </button>
        </div>
    )
}

export default Pagination