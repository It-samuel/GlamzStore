'use client'

import {Button} from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Plus, ShoppingCart } from 'lucide-react';
import { CartItem } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { addItemToCart } from '@/lib/actions/cart.actions';
import { useState } from 'react';

export default function AddToCart({item}: {item: CartItem}) {
    const router = useRouter();
    const {toast} = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const handleAddToCart = async () => {
        try {
            setIsLoading(true);
            const res = await addItemToCart(item);

            if (!res.success) {
                toast({
                    variant: 'destructive',
                    description: res.message || 'Failed to add item to cart'
                });
                return;
            }

            // Handle add to cart success
            toast({
                description: `${item.name} added to cart`,
                action: (
                    <ToastAction 
                        className='bg-primary text-white hover:bg-gray-800' 
                        altText='Go To Cart' 
                        onClick={() => router.push('/cart')}
                    >
                        <ShoppingCart className="w-4 h-4 mr-1" />
                        Go To Cart
                    </ToastAction>
                )
            });
        } catch (error) {
            console.error('Add to cart error:', error);
            toast({
                variant: 'destructive',
                description: 'Something went wrong. Please try again.'
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Button 
            className='w-full' 
            type='button' 
            onClick={handleAddToCart}
            disabled={isLoading}
        >
            {isLoading ? (
                <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Adding...
                </>
            ) : (
                <>
                    <Plus className="w-4 h-4 mr-2" />
                    Add To Cart
                </>
            )}
        </Button>
    )
}