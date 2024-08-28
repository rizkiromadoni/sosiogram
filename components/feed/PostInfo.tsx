"use client"

import { deletePost } from "@/lib/actions"
import { Ellipsis } from "lucide-react"
import { useState } from "react"

const PostInfo = ({ postId }: { postId: number }) => {
  const [open, setOpen] = useState(false)

  const deletePostWithId = deletePost.bind(null, postId)

  return (
    <div className="relative">
        <Ellipsis width={16} height={16} className="cursor-pointer" onClick={() => setOpen(!open)} />
        
        {open && (
            <div className="absolute top-4 right-0 bg-white p-4 w-32 rounded-lg flex flex-col gap-2 text-xs shadow-lg z-30">
                <span className="cursor-pointer">View</span>
                <span className="cursor-pointer">Repost</span>
                <form action={deletePostWithId}>
                    <button className="text-red-500">Delete</button>
                </form>
            </div>
        )}
    </div>
  )
}

export default PostInfo