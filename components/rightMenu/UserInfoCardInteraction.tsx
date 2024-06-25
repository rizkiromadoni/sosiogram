"use client";

import { switchFollow } from "@/lib/actions";
import { useState } from "react";

interface Props {
  userId: string;
  currentUserId: string | null;
  isFollowing: boolean;
  isRequestSent: boolean;
  isUserBlocked: boolean;
}

const UserInfoCardInteraction: React.FC<Props> = ({
  userId,
  currentUserId,
  isFollowing,
  isRequestSent,
  isUserBlocked,
}) => {
  const [userState, setUserState] = useState({
    isFollowing: isFollowing,
    isRequestSent: isRequestSent,
    isUserBlocked: isUserBlocked,
  })

  const follow = async () => {
    try {
      await switchFollow(userId)
      setUserState(prev => ({
        ...prev,
        isFollowing: !prev.isFollowing && false,
        isRequestSent: !prev.isFollowing && !prev.isRequestSent ? true : false,

      }))
    } catch (error) {
      
    }
  }

  return (
    <>
      <form action={follow}>
        <button className="w-full bg-blue-500 text-white text-sm rounded-md p-2">
          {userState.isFollowing ? "Unfollow" : userState.isRequestSent ? "Requested" : "Follow"}
        </button>
      </form>
      <form action="" className="self-end">
        <button className="text-red-500 text-xs cursor-pointer">
          {userState.isUserBlocked ? "Unblock" : "Block"}
        </button>
      </form>
    </>
  );
};

export default UserInfoCardInteraction;
