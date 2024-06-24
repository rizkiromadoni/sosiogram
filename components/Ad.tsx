import { cn } from '@/lib/utils'
import { Ellipsis } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Ad = ({ size }: { size: "sm" | "md" | "lg" }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
      <div className="flex justify-between items-center font-medium text-gray-500">
        <span>Sponsored Ads</span>
        <Ellipsis width={16} height={16} />
      </div>

      <div className={cn(
        "flex flex-col mt-4",
        size === "sm" ? "gap-2" : "gap-4"
      )}>
        <div className={cn(
          "relative w-full",
          size === "sm" ? "h-24" :
          size === "md" ? "h-36" : "h-48"
        )}>
          <Image src="https://images.pexels.com/photos/24259755/pexels-photo-24259755/free-photo-of-wanita-perempuan-kaum-wanita-hidangan.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt='' fill className='rounded-lg object-cover' />
        </div>

        <div className='flex items-center gap-4'>
          <Image src="https://images.pexels.com/photos/24259755/pexels-photo-24259755/free-photo-of-wanita-perempuan-kaum-wanita-hidangan.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt='' width={24} height={24} className='rounded-full object-cover h-6 w-6' />
          <span className='text-blue-500 font-medium'>BigChef Longous</span>
        </div>
        <p className={cn(size === "sm" ? "text-xs" : "text-sm")}>
          {
            size === "sm" ? "Lorem ipsum dolor sit amet"
            : size === "md" ? "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, voluptate. Lorem ipsum dolor"
            : "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor minus tenetur, nobis autem quibusdam voluptate eaque? Nihil error alias autem adipisci laudantium, ratione illum quod. Quo eos sit voluptatum consectetur?"
          }
        </p>
        <button className='bg-gray-200 text-gray-500 p-2 text-xs rounded-lg'>
          Learn more
        </button>
      </div>
  </div>
  )
}

export default Ad