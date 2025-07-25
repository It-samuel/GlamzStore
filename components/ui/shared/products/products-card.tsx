import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {Card, CardContent, CardHeader} from '@/components/ui/card'
import ProductPrice from './product-price'

export default function ProductCard({product}:{product: any}) {
  return (
    <Card className='w-full max-w-sm' >
        <CardHeader className='p-0 items-center'>
            <Link href={`/products/${product.slug}`}>
                <Image 
                    src={product.images[0]}
                    alt={product.name}
                    width={300}
                    height={300}
                    />
            </Link>
        </CardHeader>
        <CardContent className='p-4 grid gap-4'>
            <div className="text-sm font-medium">{product.brand}</div>
            <Link href={`/products/${product.slug}`}>
                <h3 className="text-sm font-medium">{product.name}</h3>
            </Link>
            <div className="flex-between gap-4">
                <p>{product.rating} Stars</p>
                {
                    product.stock > 0 ? (
                        <ProductPrice value={Number(product.price)} />
                    ): (
                        <p className="text-red-500">Out of Stock</p>
                    )
                }
            </div>
        </CardContent>
    </Card>
  )
}