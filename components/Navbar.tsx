import Link from 'next/link'
import React from 'react'
import MobileMenu from './MobileMenu'
import { Bell, CircleFadingPlus, House, MessageSquare, Search, Users } from 'lucide-react'
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

        <div className='hidden md:flex w-[70%] text-sm items-center justify-between'>
            <div className='flex gap-6 text-gray-600'>
                <Link href="/" className='flex gap-2 items-center'>
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

            <div className='hidden lg:flex p-2 bg-slate-100 items-center rounded-md'>
                <input type="text" placeholder='search...' className='bg-transparent outline-none' />
                <Search width={14} height={14} />
            </div>
        </div>

        <div className='w-[30%] flex items-center gap-4 xl:gap-8 justify-end'>
            <ClerkLoading>
                <div className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white" />
            </ClerkLoading>
            <ClerkLoaded>
                <SignedIn>
                    <div className='cursor-pointer text-slate-500'>
                        <Users width={20} height={20} />
                    </div>
                    <div className='cursor-pointer text-slate-500'>
                        <MessageSquare width={20} height={20} />
                    </div>
                    <div className='cursor-pointer text-slate-500'>
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