import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { CircleCheck, CircleX } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import FriendRequestList from "./FriendRequestList";

const FriendRequests = async () => {
  const { userId: currentUserId } = auth();
  if (!currentUserId) return null;

  const followRequests = await prisma.followRequest.findMany({
    where: { receiverId: currentUserId },
    include: {
      sender: true,
    },
  });

  if (followRequests.length === 0) return null;

  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">Friend Requests</span>
        <Link href="#" className="text-blue-500 text-xs">
          See all
        </Link>
      </div>

     <FriendRequestList requests={followRequests} />
    </div>
  );
};

export default FriendRequests;
