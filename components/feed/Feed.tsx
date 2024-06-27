import { auth } from "@clerk/nextjs/server"
import Post from "./Post"
import prisma from "@/lib/prisma"

const Feed = async ({ username }: { username?: string }) => {
  const { userId } = auth()

  let posts: any[] = []
  if (username) {
    posts = await prisma.post.findMany({
      where: { user: { username } },
      include: {
        user: true,
        likes: {
          select: { userId: true },
        },
        _count: {
          select: { comments: true },
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    })
  }

  if (!username && userId) {
    const following = await prisma.follower.findMany({
      where: { followerId: userId },
      select: { followerId: true }
    })

    const followingIds = following.map(x => x.followerId)
    posts = await prisma.post.findMany({
      where: { userId: { in: followingIds } },
      include: {
        user: true,
        likes: {
          select: { userId: true },
        },
        _count: {
          select: { comments: true },
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    })
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex flex-col gap-12">
      {posts?.length ? posts?.map((post) => (
        <Post key={post.id} post={post} />))
        : (
          <p className="text-center">No posts yet</p>
        )}
    </div>
  )
}

export default Feed