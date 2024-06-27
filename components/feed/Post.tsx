import { Ellipsis, Heart, MessageCircle, Share2 } from "lucide-react";
import Image from "next/image";
import Comments from "./Comments";
import { User, Post as PostType } from "@prisma/client";
import PostInteraction from "./PostInteraction";

type PostProps = PostType & { user: User } & { likes: { userId: string }[] } & {
  _count: { comments: number };
};

const Post = ({ post }: { post: PostProps }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src={post.user.avatar || "/no-avatar.png"}
            alt=""
            className="w-10 h-10 rounded-full"
            width={40}
            height={40}
          />
          <span className="font-medium">
            {post.user.name && post.user.surname
              ? `${post.user.name} ${post.user.surname}`
              : post.user.username}
          </span>
        </div>
        <Ellipsis width={16} height={16} className="cursor-pointer" />
      </div>

      <div className="flex flex-col gap-4">
        {post.image && (
          <div className="w-full min-h-96 relative">
            <Image
              src={post.image}
              alt=""
              className="object-cover"
              fill
            />
          </div>
        )}
        <p>{post.desc}</p>
      </div>

      <PostInteraction postId={post.id} likes={post.likes.map(x => x.userId)} commentNumber={post._count.comments} />

      <Comments />
    </div>
  );
};

export default Post;
