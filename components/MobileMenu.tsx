"use client"

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useState } from 'react'

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
    
  return (
    <div className='md:hidden'>
        <div className='flex flex-col gap-[4.5px] cursor-pointer' onClick={() => setIsOpen(!isOpen)}>
            <div className={cn(
                'w-6 h-1 bg-blue-500 rounded-sm origin-left ease-in-out duration-500',
                isOpen && "rotate-45"
            )} />
            <div className={cn(
                'w-6 h-1 bg-blue-500 rounded-sm ease-in-out duration-500',
                isOpen && "opacity-0"
            )} />
            <div className={cn(
                'w-6 h-1 bg-blue-500 rounded-sm origin-left ease-in-out duration-500',
                isOpen && "-rotate-45"
            )} />
        </div>
        {isOpen && (
            <div className='absolute left-0 top-24 w-full h-[calc(100vh-96px)] bg-white flex flex-col items-center justify-center gap-8 text-xl z-10'>
                <Link href="#">Home</Link>
                <Link href="#">Friends</Link>
                <Link href="#">Groups</Link>
                <Link href="#">Stories</Link>
                <Link href="#">Login</Link>
            </div>
        )}
    </div>
  )
}

export default MobileMenu