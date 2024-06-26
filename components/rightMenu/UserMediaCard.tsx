import prisma from "@/lib/prisma";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

const UserMediaCard = async ({ user }: { user: User }) => {
  const posts = await prisma.post.findMany({
    where: { userId: user.id, image: { not: null } },
    take: 4,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">User Media</span>
        <Link href="#" className="text-blue-500 text-xs">
          See all
        </Link>
      </div>

      <div className="flex gap-4 justify-between flex-wrap">
        {posts.length
          ? posts.map((post) => (
              <div className="relative w-[45%] h-24" key={post.id}>
                <Image
                  src={post.image!}
                  alt=""
                  fill
                  className="object-cover rounded-md"
                />
              </div>
            ))
          : "No Media Found"}
      </div>
    </div>
  );
};

export default UserMediaCard;
