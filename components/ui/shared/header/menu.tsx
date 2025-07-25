import React from 'react'
import ModeToggle from "@/components/ui/shared/header/mode-toggle"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {  EllipsisVertical, ShoppingCart, UserIcon } from 'lucide-react'
import { SheetContent, SheetTitle, SheetTrigger, Sheet } from '../../sheet'

export default function Menu() {
  return (
    <div>
        <nav className="hidden md:flex w-full max-w-xs gap-1">
            
            <ModeToggle />
                <Button asChild variant="ghost" >
                    <Link href="/cart">
                        <ShoppingCart /> Cart
                    </Link>

                </Button>
                <Button asChild >
                    <Link href="/sign-in">
                        <UserIcon /> Sign In
                    </Link>

                </Button>

        </nav>
        <nav className="md:hidden">
            <Sheet>
                <SheetTrigger className='align-middle'>
                    <EllipsisVertical/>
                </SheetTrigger>
                <SheetContent className='flex flex-col items-start'>
                    <SheetTitle>Menu</SheetTitle>
                    <ModeToggle />
                    <Button asChild variant="ghost" >
                        <Link href='/cart'>
                            <ShoppingCart /> 
                        </Link>

                    </Button>
                    <Button asChild >
                    <Link href="/sign-in">
                        <UserIcon /> Sign In
                    </Link>

                </Button>

                </SheetContent>
            </Sheet>
        </nav>
    </div>
  )
}
