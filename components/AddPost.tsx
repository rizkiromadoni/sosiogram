import { BarChart, CalendarDays, ImagePlus, SmilePlus, Video } from "lucide-react"
import Image from "next/image"

const AddPost = () => {
  return (
    <div className="p-4 bg-white rounded-lg flex gap-4 justify-between text-sm shadow-md">
      <Image src="https://images.pexels.com/photos/15301144/pexels-photo-15301144/free-photo-of-pantai-ombak-gelombang-pesisir.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="w-12 h-12 object-cover rounded-full" width={48} height={48} />
      <div className="flex-1">
        <div className="flex gap-4">
          <textarea placeholder="Write something..." className="bg-slate-100 rounded-lg flex-1 p-2 min-h-20">
          </textarea>
            <SmilePlus className="w-5 h-5 cursor-pointer self-end text-yellow-500" width={20} height={20}  />
        </div>
        <div className="flex items-center gap-4 mt-4 text-gray-400 flex-wrap">
          <div className="flex items-center gap-2 cursor-pointer">
            <ImagePlus width={20} height={20} className="text-green-500"/>
            Photo
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <Video width={20} height={20} className="text-purple-500"/>
            Video
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <BarChart width={20} height={20} className="text-blue-500"/>
            Poll
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <CalendarDays width={20} height={20} className="text-pink-500"/>
            Event
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddPost