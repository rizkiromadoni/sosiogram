"use client";

import { useUser } from "@clerk/nextjs";
import {
  BarChart,
  CalendarDays,
  ImagePlus,
  SmilePlus,
  Video,
} from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";
import AddPostButton from "./AddPostButton";
import { addPost } from "@/lib/actions";

const AddPost = () => {
  const { user, isLoaded } = useUser();
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<any>("");

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <div className="p-4 bg-white rounded-lg flex gap-4 justify-between text-sm shadow-md">
      <Image
        src={user?.imageUrl || "/no-avatar.png"}
        alt=""
        className="w-12 h-12 object-cover rounded-full"
        width={48}
        height={48}
      />
      <div className="flex-1">
        <form
          action={(formData) => addPost(formData, image?.secure_url || "")}
          className="flex gap-4"
        >
          <textarea
            placeholder="Write something..."
            className="bg-slate-100 rounded-lg flex-1 p-2 min-h-20"
            onChange={(e) => setDescription(e.target.value)}
            name="description"
          ></textarea>
          <div>
            <AddPostButton />
          </div>
        </form>
        <div className="flex items-center gap-4 mt-4 text-gray-400 flex-wrap">
          <CldUploadWidget
            uploadPreset="social"
            onSuccess={(result, { widget }) => {
              setImage(result.info);
              widget.close();
            }}
          >
            {({ open }) => (
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => open()}
              >
                <ImagePlus width={20} height={20} className="text-green-500" />
                Photo
              </div>
            )}
          </CldUploadWidget>
          <div className="flex items-center gap-2 cursor-pointer">
            <Video width={20} height={20} className="text-purple-500" />
            Video
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <BarChart width={20} height={20} className="text-blue-500" />
            Poll
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <CalendarDays width={20} height={20} className="text-pink-500" />
            Event
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
