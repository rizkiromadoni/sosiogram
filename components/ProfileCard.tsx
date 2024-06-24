import Image from 'next/image'
import React from 'react'

const ProfileCard = () => {
  return (
    <div className='p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-6'>
        <div className='h-20 relative'>
            <Image src="https://images.pexels.com/photos/26152779/pexels-photo-26152779/free-photo-of-kayu-pemandangan-lanskap-lansekap.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt='' fill className='rounded-md object-cover' />
            <Image src="https://images.pexels.com/photos/15301144/pexels-photo-15301144/free-photo-of-pantai-ombak-gelombang-pesisir.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt='' width={48} height={48} className='rounded-full object-cover w-12 h-12 absolute left-0 right-0 m-auto -bottom-6 ring-1 ring-white z-10' />
        </div>

        <div className='flex flex-col gap-2 items-center h-20'>
            <span className='font-semibold'>John Doe</span>
            <span className='text-xs text-gray-500'>3232 Followers</span>
            <button className='bg-blue-500 text-white rounded-md p-2 text-xs'>My Profile</button>
        </div>
    </div>
  )
}

export default ProfileCard