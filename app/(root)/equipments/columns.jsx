"use client"

import Image from "next/image";

export const columns = [
    {
        accessorKey: "image",
        header: "Image",
        cell: ({ row }) => {
            const imageKey = row.getValue("image");
            const publicImageUrl = imageKey ?
             `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${imageKey}`.trim()
             : '/images/placeholder-image.jpg';

            return (
                <Image 
                    src={publicImageUrl}
                    alt={`equipment-image-${imageKey}`}
                    width={40}
                    height={40}
                    className="object-contain w-auto h-auto rounded-md shadow-sm"
                />
            )
        }
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "serialNumber",
        header: "Serial Number",
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        accessorKey: "category",
        header: "Category",
    },
]
