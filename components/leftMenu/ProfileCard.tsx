import prisma from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import Image from 'next/image'
import Link from 'next/link'
import React, { use } from 'react'

const ProfileCard = async () => {
  const { userId } = auth()
  if (!userId) return null

  const user = await prisma.user.findFirst({
    where: { id: userId },
    include: {
      _count: {
        select: { followers: true }
      }
    }
  })

  console.log(user)

  return (
    <div className='p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-6'>
        <div className='h-20 relative'>
            <Image src={user?.cover || "/no-cover.png"} alt='' fill className='rounded-md object-cover' />
            <Image src={user?.avatar || "/no-avatar.png"} alt='' width={48} height={48} className='rounded-full object-cover w-12 h-12 absolute left-0 right-0 m-auto -bottom-6 ring-1 ring-white z-10' />
        </div>

        <div className='flex flex-col gap-2 items-center h-20'>
            <span className='font-semibold'>
              {(user?.name && user?.surname) ? `${user?.name} ${user?.surname}` : user?.username}
            </span>
            <span className='text-xs text-gray-500'>{user?._count?.followers} Followers</span>
            <Link href={`/profile/${user?.username}`} className='bg-blue-500 text-white rounded-md p-2 text-xs'>My Profile</Link>
        </div>
    </div>
  )
}

export default ProfileCard