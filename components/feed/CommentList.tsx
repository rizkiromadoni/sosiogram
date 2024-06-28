"use client";

import { addComment } from "@/lib/actions";
import { useUser } from "@clerk/nextjs";
import { Comment, User } from "@prisma/client";
import { Ellipsis, Heart, SmilePlus } from "lucide-react";
import Image from "next/image";
import { useOptimistic, useState } from "react";

type CommentListProps = Comment & { user: User };

const CommentList = ({
  comments,
  postId,
}: {
  comments: CommentListProps[];
  postId: number;
}) => {
  const { user } = useUser();
  const [commentState, setCommentState] = useState(comments);
  const [description, setDescription] = useState("");

  const [optimisticComments, addOptimisticComment] = useOptimistic(
    commentState,
    (state, value: CommentListProps) => {
      return [value, ...state];
    }
  );

  const add = async () => {
    if (!user || !description) return;

    addOptimisticComment({
      id: Math.random(),
      desc: description,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      userId: user.id,
      postId: postId,
      user: {
        id: user.id,
        username: "Please wait...",
        avatar: user.imageUrl || "/no-avatar.png",
        cover: "",
        description: "",
        name: "",
        surname: "",
        city: "",
        work: "",
        school: "",
        website: "",
        createdAt: new Date()
      }
    });

    try {
      const newComment = await addComment(postId, description);
      setCommentState((prev) => [newComment, ...prev]);
    } catch (error) {}
  };

  return (
    <>
      {user && (
        <div className="flex items-center gap-4">
          <Image
            src={user.imageUrl || "/no-avatar.png"}
            alt=""
            width={32}
            height={32}
            className="w-8 h-8 rounded-full"
          />
          <div className="flex-1 flex items-center justify-between bg-slate-100 rounded-xl text-sm px-6 py-2 w-full">
            <form action={add}>
              <input
                type="text"
                placeholder="Write a comment..."
                className="bg-transparent outline-none"
                onChange={(e) => setDescription(e.target.value)}
              />
              <SmilePlus
                className="text-yellow-500 cursor-pointer"
                width={16}
                height={16}
              />
            </form>
          </div>
        </div>
      )}

      <div>
        {optimisticComments.map((comment) => (
          <div className="flex gap-4 justify-between mt-6" key={comment.id}>
            <Image
              src={comment.user.avatar || "/no-avatar.png"}
              alt=""
              width={40}
              height={40}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex flex-col gap-2 flex-1">
              <span className="font-medium">
                {comment.user.name && comment.user.surname
                  ? `${comment.user.name} ${comment.user.surname}`
                  : comment.user.username}
              </span>
              <p>{comment.desc}</p>
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
            <Ellipsis
              width={16}
              height={16}
              className="cursor-pointer h-4 w-4"
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default CommentList;
