import { CircleCheck, CircleX } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const FriendRequests = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">Friend Requests</span>
        <Link href="#" className="text-blue-500 text-xs">
          See all
        </Link>
      </div>

      {Array(3)
        .fill(0)
        .map((_, index) => (
          <div className="flex items-center justify-between" key={index}>
            <div className="flex items-center gap-4">
              <Image
                src="https://images.pexels.com/photos/20529772/pexels-photo-20529772/free-photo-of-mode-fashion-fesyen-wanita.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
                className="h-10 w-10 rounded-full object-cover"
                width={40}
                height={40}
              />
              <span className="font-semibold ">Oliver</span>
            </div>
            <div className="flex gap-3 justify-end">
              <CircleCheck
                className="cursor-pointer text-blue-500"
                width={20}
                height={20}
              />
              <CircleX className="cursor-pointer" width={20} height={20} />
            </div>
          </div>
        ))}
    </div>
  );
};

export default FriendRequests;
