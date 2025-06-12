'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signUpDefaultValues } from "@/lib/constants"
import Link from "next/link"
import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { signUpUser } from "@/lib/actions/user.actions"
import { useSearchParams } from "next/navigation"

export default function SignUpForm() {
    const [data, action] = useActionState(signUpUser, {
        success: false,
        message: ''
    })

    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/'

    const SignUpButton = () => {
        const {pending} = useFormStatus();

        return (
            <Button disabled={pending} className="w-full" variant='default'>
                {pending ? 'Submiting...' : 'Sign Up'}
            </Button>
        )
    }

  return (
    <form action={action}>
        <Input type="hidden" name="callbackUrl" value={callbackUrl} />
        <div className="space-y-6">
             <div>
                <Label htmlFor="email">Name</Label>
                <Input 
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete=" "
                    defaultValue={signUpDefaultValues.name}
                />
                
            </div>
            <div>
                <Label htmlFor="email">Email</Label>
                <Input 
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email "
                    defaultValue={signUpDefaultValues.email}
                />
                
            </div>
            <div>
                <Label htmlFor="password">Password</Label>
                <Input 
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="password"
                    defaultValue={signUpDefaultValues.password}
                />
                
            </div>
            <div>
                <Label htmlFor="password">Confirm Password</Label>
                <Input 
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    autoComplete="confirmPassword"
                    defaultValue={signUpDefaultValues.confirmpassword}
                />
                
            </div>
            <SignUpButton />
            {data && !data.success && (
                <div className="text-center text-destructive">
                    {data.message}
                </div>
            )}
            <div className="text-sm text-center text-muted-foreground">
                Already have an account?{' '} 
                <Link href='/sign-in' target="_self" className="link">
                    Sign In
                </Link>
            </div>
        </div>
    </form>
  )
}
