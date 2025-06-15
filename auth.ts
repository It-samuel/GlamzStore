import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import {prisma} from '@/db/prisma'
import CredentialsProvider from "next-auth/providers/credentials";
import { compareSync } from "bcrypt-ts-edge";
import type { NextAuthConfig } from "next-auth";
import { cookies } from 'next/headers';

export const config = {
    pages: {
        signIn: '/sign-in',
        error: '/sign-in'
    },

    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60
    },

    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            credentials: {
                email: {type: 'email'},
                password: {type: 'password'}
            },
            async authorize(credentials) {
                if(credentials == null) return null;

                // find user in database
                const user = await prisma.user.findFirst({
                    where: {
                        email: credentials.email as string
                    }
                });

                // check if user exists and if password matches
                if(user && user.password) {
                    const isMatch = compareSync(credentials.password as string, user.password);

                    // if password is correct, return user
                    if(isMatch) {
                        return{
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            role: user.role
                        }
                    }
                }

                // if user does not exist or the password does not match 
                return null
            }
        })
    ],

    callbacks: {
        async session({session, user, trigger, token}: any) {
            console.log('Session callback triggered:', { session, token, trigger });
            
            // set the user Id from the token
            session.user.id = token.sub;
            session.user.role = token.role;
            session.user.name = token.name;

            // if there is an update, set the user name
            if(trigger === 'update') {
                session.user.name = user.name
            }
            
            console.log('Final session object:', session);
            return session
        },

        async jwt({token, user, trigger, session}: any) {
            console.log('JWT callback triggered:', { token, user, trigger });
            
            // Assign user field to token
            if (user){
                token.id = user.id;
                token.role = user.role;

                // If user has no name then use the email
                if (user.name === 'NO_NAME') {
                    token.name = user.email!.split('@')[0];

                    // Update the database to reflect the token name
                    await prisma.user.update({
                        where: {id: user.id},
                        data: {name: token.name}
                    })
                }

                if (trigger === 'signIn' || trigger === 'signUp') {
                    const cookiesObject = await cookies();
                    const sessionCartId = cookiesObject.get('sessionCartId')?.value;

                    if(sessionCartId) {
                        const sessionCart = await prisma.cart.findFirst({
                            where: {sessionCartId}
                        })

                        if (sessionCart) {
                            // Delete current user cart
                            await prisma.cart.deleteMany({
                                where: { userId: user.id}
                            })

                            // Assign new cart
                            await prisma.cart.update({
                                where: {id: sessionCart.id},
                                data: {userId: user.id},
                            })
                        }
                    }

                }
            }

            console.log('Final token object:', token);
            return token
        },
        
        // Fixed authorized callback - removed duplicate code
        authorized({ request, auth}: any) {
            console.log('Authorized callback triggered');
            console.log('Auth object:', auth);
            console.log('Request URL:', request.nextUrl.pathname);

            // Get pathname from the request URL object (single declaration)
            const { pathname } = request.nextUrl;

            // Array of regex patterns of paths we want to protect
            const protectedPaths = [
                /^\/shipping-address/,
                /^\/payment-method/,
                /^\/place-order/,
                /^\/profile/,
                /^\/user\/.*/,
                /^\/order\/.*/,
                /^\/admin/,
                /^\/dashboard/, // Added dashboard to regex patterns
            ];

            // Check if user is not authenticated and accessing a protected path
            if (!auth && protectedPaths.some((pattern) => pattern.test(pathname))) {
                console.log('Access denied - no auth for protected route');
                return false;
            }
            
            console.log('Access granted');
            return true;
        },
    },
} satisfies NextAuthConfig;

export const {handlers, auth, signIn, signOut} = NextAuth(config)