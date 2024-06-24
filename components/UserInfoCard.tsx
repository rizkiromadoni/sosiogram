import { BriefcaseBusiness, Calendar, LinkIcon, MapPin, School } from 'lucide-react'
import Link from 'next/link'

const UserInfoCard = ({ userId }: { userId: string }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">User Information</span>
        <Link href="#" className="text-blue-500 text-xs">
          See all
        </Link>
      </div>

      <div className='flex flex-col gap-4 text-gray-500'>
        <div className='flex items-center gap-2'>
            <span className='text-xl text-black'>John Doe</span>
            <span className='text-sm'>@johndoe</span>
        </div>
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi sint quos, quasi cumque esse ad
        </p>

        <div className='flex items-center gap-2'>
            <MapPin width={16} height={16} />
            <span>Living in <b>Indonesia</b></span>
        </div>
        <div className='flex items-center gap-2'>
            <School width={16} height={16} />
            <span>Went to <b>University of Indonesia</b></span>
        </div>
        <div className='flex items-center gap-2'>
            <BriefcaseBusiness width={16} height={16} />
            <span>Works at <b>Google</b></span>
        </div>

        <div className='flex items-center justify-between'>
            <div className='flex gap-1 items-center'>
                <LinkIcon width={16} height={16} />
                <Link href="#" className='text-blue-500 font-medium text-xs'>
                    rcodx.dev
                </Link>
            </div>
            <div className='flex gap-1 items-center text-xs'>
                <Calendar width={16} height={16} />
                <span>Joined October 2005</span>
            </div>
        </div>
        <button className='bg-blue-500 text-white text-sm rounded-md p-2'>Follow</button>
        <span className='text-red-500 self-end text-xs cursor-pointer'>Block User</span>
      </div>
    </div>
  )
}

export default UserInfoCard