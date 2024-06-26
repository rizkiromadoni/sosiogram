"use client";

import { acceptFollowRequest, declineFollowRequest } from "@/lib/actions";
import { FollowRequest, User } from "@prisma/client";
import { CircleCheck, CircleX } from "lucide-react";
import Image from "next/image";
import { useOptimistic, useState } from "react";

type FriendRequestListProps = {
  requests: (FollowRequest & {
    sender: User;
  })[];
};

const FriendRequestList = ({ requests }: FriendRequestListProps) => {
  const [requestState, setRequestState] = useState(requests);

  const accept = async (requestId: number, userId: string) => {
    removeOptimisticRequests(requestId);

    try {
      await acceptFollowRequest(userId);
      setRequestState((prev) => prev.filter((req) => req.id !== requestId));
    } catch (error) {}
  };

  const decline = async (requestId: number, userId: string) => {
    removeOptimisticRequests(requestId);

    try {
      await declineFollowRequest(userId);
      setRequestState((prev) => prev.filter((req) => req.id !== requestId));
    } catch (error) {}
  };

  const [optimisticRequests, removeOptimisticRequests] = useOptimistic(
    requestState,
    (state, value: number) => {
      return state.filter((req) => req.id !== value);
    }
  );

  return (
    <>
      {optimisticRequests.map((request) => (
        <div className="flex items-center justify-between" key={request.id}>
          <div className="flex items-center gap-4">
            <Image
              src={request.sender.avatar || "/no-avatar.png"}
              alt=""
              className="h-10 w-10 rounded-full object-cover"
              width={40}
              height={40}
            />
            <span className="font-semibold ">
              {request.sender.name && request.sender.surname
                ? `${request.sender.name} ${request.sender.surname}`
                : request.sender.username}
            </span>
          </div>
          <div className="flex gap-3 justify-end">
            <form action={() => accept(request.id, request.sender.id)}>
              <button>
                <CircleCheck
                  className="text-blue-500"
                  width={20}
                  height={20}
                />
              </button>
            </form>
            <form action={() => decline(request.id, request.sender.id)}>
              <button>
                <CircleX className="cursor-pointer" width={20} height={20} />
              </button>
            </form>
          </div>
        </div>
      ))}
    </>
  );
};

export default FriendRequestList;
