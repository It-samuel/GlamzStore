'use client';
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
export default function ProductImages({ images }: { images: string[] }) {
    const [current, setCurrent] = useState(0); 
  return (
    <div className="space-y-4">
        <Image
            src={images[current]}
            alt="Product Image"
            width={1000}
            height={1000}
            className="min-h-[300px]" object-cover object-center
            />
        <div className="flex">
            {images.map((image, index) => (
                <div key={image} onClick={() => setCurrent(index)} 
                    className={cn("cursor-pointer relative w-24 h-24 mr-2", {
                        "border-2 border-blue-500": current === index,
                        "border-gray-200": current !== index
                    })} >
                    <Image 
                        src={image}
                        alt="Product Thumbnail"
                        width={100}
                        height={100}
                    />
                </div>
            ))}
        </div>
    </div>
  )
}
