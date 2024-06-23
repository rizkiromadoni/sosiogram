import Link from 'next/link'
import React from 'react'
import MobileMenu from './MobileMenu'
import { Bell, CircleFadingPlus, House, MessageSquare, Users } from 'lucide-react'
import { ClerkLoaded, ClerkLoading, SignInButton, UserButton } from '@clerk/nextjs'
import { SignedIn, SignedOut } from '@clerk/nextjs'

const Navbar = () => {
  return (
    <div className='flex items-center justify-between h-24'>
        <div className='md:hidden lg:block w-[20%]'>
            <Link href="/" className='font-bold text-xl text-blue-500'>
                {process.env.NEXT_PUBLIC_APP_NAME!}
            </Link>
        </div>

        <div className='hidden md:flex w-[50%] text-sm'>
            <div className='flex gap-6 text-gray-600'>
                <Link href="#" className='flex gap-2 items-center'>
                    <House width={16} height={16} className='text-blue-500 h-4 w-4' />
                    <span>Homepage</span>
                </Link>
                <Link href="#" className='flex gap-2 items-center'>
                    <Users width={16} height={16} className='text-blue-500 h-4 w-4' />
                    <span>Friends</span>
                </Link>
                <Link href="#" className='flex gap-2 items-center'>
                    <CircleFadingPlus width={16} height={16} className='text-blue-500 h-4 w-4' />
                    <span>Stories</span>
                </Link>
            </div>
        </div>

        <div className='w-[30%] flex items-center gap-4 xl:gap-8 justify-end'>
            <ClerkLoading>
                <div className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white" />
            </ClerkLoading>
            <ClerkLoaded>
                <SignedIn>
                    <div className='cursor-pointer'>
                        <Users width={20} height={20} />
                    </div>
                    <div className='cursor-pointer'>
                        <MessageSquare width={20} height={20} />
                    </div>
                    <div className='cursor-pointer'>
                        <Bell width={20} height={20} />
                    </div>
                    <UserButton />
                </SignedIn>
                <SignedOut>
                    <Link href="/sign-in" className='text-blue-500'>
                        Login
                    </Link>
                </SignedOut>
            </ClerkLoaded>
            <MobileMenu />
        </div>
    </div>
  )
}

export default Navbar