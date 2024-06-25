"use client";

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
  return (
    <>
      <form action="">
        <button className="w-full bg-blue-500 text-white text-sm rounded-md p-2">
          {isFollowing ? "Unfollow" : isRequestSent ? "Requested" : "Follow"}
        </button>
      </form>
      <form action="" className="self-end">
        <button className="text-red-500 text-xs cursor-pointer">
          {isUserBlocked ? "Unblock" : "Block"}
        </button>
      </form>
    </>
  );
};

export default UserInfoCardInteraction;
