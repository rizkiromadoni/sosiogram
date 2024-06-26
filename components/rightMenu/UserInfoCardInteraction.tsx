"use client";

import { switchBlock, switchFollow } from "@/lib/actions";
import { useOptimistic, useState } from "react";

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
  });

  const follow = async () => {
    switchOptimisticState("follow");
    try {
      await switchFollow(userId);
      setUserState((prev) => ({
        ...prev,
        isFollowing: !prev.isFollowing && false,
        isRequestSent: !prev.isFollowing && !prev.isRequestSent ? true : false,
      }));
    } catch (error) {}
  };

  const block = async () => {
    switchOptimisticState("block");
    try {
      await switchBlock(userId);
      setUserState((prev) => ({
        ...prev,
        isUserBlocked: !prev.isUserBlocked
      }))
    } catch (error) {}
  }

  const [optimisticState, switchOptimisticState] = useOptimistic(
    userState,
    (state, value: "follow" | "block") => {
      if (value === "follow") {
        return {
          ...state,
          isFollowing: !state.isFollowing && false,
          isRequestSent: !state.isFollowing && !state.isRequestSent ? true : false,
        }
      }

      return {
        ...state,
        isUserBlocked: !state.isUserBlocked
      }
    }
  );

  return (
    <>
      <form action={follow}>
        <button className="w-full bg-blue-500 text-white text-sm rounded-md p-2">
          {optimisticState.isFollowing
            ? "Unfollow"
            : optimisticState.isRequestSent
            ? "Requested"
            : "Follow"}
        </button>
      </form>
      <form action={block} className="self-end">
        <button className="text-red-500 text-xs cursor-pointer">
          {optimisticState.isUserBlocked ? "Unblock" : "Block"}
        </button>
      </form>
    </>
  );
};

export default UserInfoCardInteraction;
