import { Ellipsis, Heart, MessageCircle, Share2 } from "lucide-react"
import Image from "next/image"
import Comments from "./Comments"

const Post = () => {
  return (
    <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                <Image src="https://images.pexels.com/photos/20485643/pexels-photo-20485643/free-photo-of-cincin-plank-papan-kartu.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="w-10 h-10 rounded-full" width={40} height={40}/>
                <span className="font-medium">Oliver Sykes</span>
            </div>
            <Ellipsis width={16} height={16} className="cursor-pointer" />
        </div>

        <div className="flex flex-col gap-4">
            <div className="w-full min-h-96 relative">
                <Image src="https://images.pexels.com/photos/19915666/pexels-photo-19915666/free-photo-of-laut-pria-laki-laki-lelaki.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="object-cover" fill/>
            </div>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium tenetur suscipit saepe sit error praesentium sint amet aspernatur, deserunt, aliquam consectetur dolorem iste sequi illum voluptates totam ratione quaerat earum!
            </p>
        </div>

        <div className="flex items-center justify-between text-sm my-4">
            <div className="flex gap-8">
                <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
                    <Heart width={16} height={16} className="text-gray-500 cursor-pointer" />
                    <span className="text-gray-300">|</span>
                    <span className="text-gray-500">
                        435 <span className="hidden md:inline"> Likes</span>
                    </span>
                </div>
                <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
                    <MessageCircle width={16} height={16} className="text-gray-500 cursor-pointer" />
                    <span className="text-gray-300">|</span>
                    <span className="text-gray-500">
                        27 <span className="hidden md:inline"> Comments</span>
                    </span>
                </div>
            </div>
            <div>
                <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
                    <Share2 width={16} height={16} className="text-gray-500 cursor-pointer" />
                    <span className="text-gray-300">|</span>
                    <span className="text-gray-500">
                        27 <span className="hidden md:inline"> Shares</span>
                    </span>
                </div>
            </div>
        </div>

        <Comments />
    </div>
  )
}

export default Post