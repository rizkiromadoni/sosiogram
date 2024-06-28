"use client";

import { switchLike } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import React, { useOptimistic, useState } from "react";

const PostInteraction = ({
  postId,
  likes,
  commentNumber,
}: {
  postId: number;
  likes: string[];
  commentNumber: number;
}) => {
  const { isLoaded, userId } = useAuth();
  const [likeState, setLikeState] = useState({
    likeCount: likes.length,
    isLiked: userId ? likes.includes(userId) : false,
  });

  const [optimisticLike, switchOptimisticLike] = useOptimistic(
    likeState,
    (state, value) => {
      return {
        likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
        isLiked: !state.isLiked,
      };
    }
  );

  const likeAction = async () => {
    switchOptimisticLike("")
    try {
        switchLike(postId)
        setLikeState(state => ({
            likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
            isLiked: !state.isLiked,
          }))
    } catch (error) {
        
    }
  }

  return (
    <div className="flex items-center justify-between text-sm my-4">
      <div className="flex gap-8">
        <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
          <form action={likeAction}>
            <button type="submit">
              <Heart
                width={16}
                height={16}
                className={cn(
                  "cursor-pointer",
                  optimisticLike.isLiked ? "text-red-500" : "text-gray-500"
                )}
              />
            </button>
          </form>
          <span className="text-gray-300">|</span>
          <span className="text-gray-500">
            {optimisticLike.likeCount}{" "}
            <span className="hidden md:inline"> Likes</span>
          </span>
        </div>
        <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
          <MessageCircle
            width={16}
            height={16}
            className="text-gray-500 cursor-pointer"
          />
          <span className="text-gray-300">|</span>
          <span className="text-gray-500">
            {commentNumber} <span className="hidden md:inline"> Comments</span>
          </span>
        </div>
      </div>
      <div>
        <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
          <Share2
            width={16}
            height={16}
            className="text-gray-500 cursor-pointer"
          />
          <span className="text-gray-300">|</span>
          <span className="text-gray-500">
            <span className="hidden md:inline"> Share</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostInteraction;
