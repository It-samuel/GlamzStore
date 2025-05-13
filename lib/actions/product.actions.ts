'use server'
import { prisma } from '@/db/prisma'
import { convertPrismaObject } from '@/lib/utils';

// Get latest products
export async function getLatestProducts() {
    const data = await prisma.product.findMany({
        take: 4,
        orderBy: {
            createdAt: 'desc',
        }
    });

    return convertPrismaObject(data);
}

// Get single product by slug
export async function getProductBySlug(slug: string) {
    const data = await prisma.product.findFirst({
        where: {
            slug: slug,
        }
    });

    return convertPrismaObject(data);
}