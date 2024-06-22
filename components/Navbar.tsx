import Link from 'next/link'
import React from 'react'
import MobileMenu from './MobileMenu'
import { CircleFadingPlus, House, Users } from 'lucide-react'

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
            <MobileMenu />
        </div>
    </div>
  )
}

export default Navbar