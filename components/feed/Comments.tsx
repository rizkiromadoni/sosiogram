import prisma from "@/lib/prisma";
import { Ellipsis, Heart, SmilePlus } from "lucide-react";
import Image from "next/image";
import React from "react";
import CommentList from "./CommentList";

const Comments = async ({ postId }: { postId: number }) => {
  const comments = await prisma.comment.findMany({
    where: { postId },
    include: { user: true }
  })

  return (
    <div>
      <CommentList comments={comments} postId={postId} />
    </div>
  );
};

export default Comments;
