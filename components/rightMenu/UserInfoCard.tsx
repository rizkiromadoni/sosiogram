import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { User } from "@prisma/client";
import {
  BriefcaseBusiness,
  Calendar,
  LinkIcon,
  MapPin,
  School,
} from "lucide-react";
import Link from "next/link";
import UserInfoCardInteraction from "./UserInfoCardInteraction";

const UserInfoCard = async ({ user }: { user: User }) => {
  const joinedDate = new Date(user.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  let isUserBlocked = false
  let isFollowing = false
  let isRequestSent = false

  const { userId: currentUserId } = auth()
  if (currentUserId) {
    const blockRes = await prisma.block.findFirst({
      where: { blockedId: user.id, blockerId: currentUserId },
    })
    const followRes = await prisma.follower.findFirst({
      where: { followerId: currentUserId, followingId: user.id },
    })
    const followReqRes = await prisma.followRequest.findFirst({
      where: { senderId: currentUserId, receiverId: user.id },
    })

    if (blockRes) isUserBlocked = true
    if (followRes) isFollowing = true
    if (followReqRes) isRequestSent = true
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">User Information</span>
        <Link href="#" className="text-blue-500 text-xs">
          See all
        </Link>
      </div>

      <div className="flex flex-col gap-4 text-gray-500">
        <div className="flex items-center gap-2">
          <span className="text-xl text-black">
            {user?.name && user?.surname
              ? `${user?.name} ${user?.surname}`
              : user?.username}
          </span>
          <span className="text-sm">@{user?.username}</span>
        </div>
        {user?.description && (
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi sint
            quos, quasi cumque esse ad
          </p>
        )}

        {user?.city && (
          <div className="flex items-center gap-2">
            <MapPin width={16} height={16} />
            <span>
              Living in <b>{user.city}</b>
            </span>
          </div>
        )}
        {user?.school && (
          <div className="flex items-center gap-2">
            <School width={16} height={16} />
            <span>
              Went to <b>{user.school}</b>
            </span>
          </div>
        )}
        {user?.work && (
          <div className="flex items-center gap-2">
            <BriefcaseBusiness width={16} height={16} />
            <span>
              Works at <b>{user.work}</b>
            </span>
          </div>
        )}

        <div className="flex items-center justify-between">
          {user?.website && (
            <div className="flex gap-1 items-center">
              <LinkIcon width={16} height={16} />
              <Link
                href={user.website}
                className="text-blue-500 font-medium text-xs"
              >
                {user.website}
              </Link>
            </div>
          )}
          <div className="flex gap-1 items-center text-xs">
            <Calendar width={16} height={16} />
            <span>Joined {joinedDate}</span>
          </div>
        </div>
        <UserInfoCardInteraction userId={user.id} currentUserId={currentUserId} isUserBlocked={isUserBlocked} isFollowing={isFollowing} isRequestSent={isRequestSent} />
        {/* {user?.id !== currentUserId && (
        )} */}
      </div>
    </div>
  );
};

export default UserInfoCard;
