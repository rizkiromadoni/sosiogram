import { Ellipsis, Heart, SmilePlus } from "lucide-react";
import Image from "next/image";
import React from "react";

const Comments = () => {
  return (
    <div>
      <div className="flex items-center gap-4">
        <Image
          src="https://images.pexels.com/photos/15301144/pexels-photo-15301144/free-photo-of-pantai-ombak-gelombang-pesisir.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
          width={32}
          height={32}
          className="w-8 h-8 rounded-full"
        />
        <div className="flex-1 flex items-center justify-between bg-slate-100 rounded-xl text-sm px-6 py-2 w-full">
          <input
            type="text"
            placeholder="Write a comment..."
            className="bg-transparent outline-none"
          />
          <SmilePlus
            className="text-yellow-500 cursor-pointer"
            width={16}
            height={16}
          />
        </div>
      </div>

      <div>
        <div className="flex gap-4 justify-between mt-6">
          <Image
            src="https://images.pexels.com/photos/15301144/pexels-photo-15301144/free-photo-of-pantai-ombak-gelombang-pesisir.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 rounded-full"
          />
          <div className="flex flex-col gap-2 flex-1">
            <span className="font-medium">Oliver Sykes</span>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptates, corporis aperiam vel impedit debitis ullam in,
              expedita neque exercitationem est quisquam illum obcaecati non
              eveniet praesentium, iusto nihil. Nulla, voluptatibus.
            </p>
            <div className="flex items-center gap-8 text-xs text-gray-500 mt-2">
              <div className="flex items-center gap-4">
                <Heart
                  width={12}
                  height={12}
                  className="cursor-pointer w-4 h-4"
                />
                <span className="text-gray-300">|</span>
                <span className="text-gray-500">37 Likes</span>
              </div>
              <div>Reply</div>
            </div>
          </div>
          <Ellipsis width={16} height={16} className="cursor-pointer h-4 w-4" />
        </div>
      </div>
    </div>
  );
};

export default Comments;
