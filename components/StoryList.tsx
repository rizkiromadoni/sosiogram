"use client";

import { addStory } from "@/lib/actions";
import { useUser } from "@clerk/nextjs";
import { Story, User } from "@prisma/client";
import { ImagePlus } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useOptimistic, useState } from "react";

type StoryProps = Story & {
  user: User;
};

const StoryList = ({ stories }: { stories: StoryProps[] }) => {
  const [storyList, setStoryList] = useState(stories);
  const [image, setImage] = useState<any>(null);

  const [optimisticStories, addOptimisticStory] = useOptimistic(
    storyList,
    (state, value: StoryProps) => {
      return [...state, value];
    }
  );

  const { user, isLoaded } = useUser();
  if (!user && !isLoaded) return "Loading...";
  if (!user && isLoaded) return null;

  const add = async () => {
    if (!image?.secure_url) return;

    addOptimisticStory({
      id: Math.random(),
      image: image.secure_url,
      createdAt: new Date(Date.now()),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      userId: user?.id,
      user: {
        id: user?.id,
        username: "Please wait...",
        avatar: user?.imageUrl || "/no-avatar.png",
        cover: "",
        description: "",
        name: "",
        surname: "",
        city: "",
        work: "",
        school: "",
        website: "",
        createdAt: new Date(Date.now()),
      },
    });

    try {
      const newStory = await addStory(image.secure_url);
      setStoryList(prev => [...prev, newStory!]);
      setImage(null)
    } catch (error) {}
  };

  return (
    <>
      <CldUploadWidget
        uploadPreset="social"
        onSuccess={(result, { widget }) => {
          setImage(result.info);
          widget.close();
        }}
      >
        {({ open }) => (
          <div className="flex flex-col items-center gap-2 cursor-pointer relative">
            <Image
              width={80}
              height={80}
              src={image?.secure_url || user?.imageUrl || "/no-avatar.png"}
              alt=""
              className="w-20 h-20 rounded-full ring-2 object-cover"
              onClick={() => open()}
            />
            {image ? (
              <form action={add}>
                <button className="text-xs bg-blue-500 rounded-md text-white p-1">
                  Send
                </button>
              </form>
            ) : (
              <span className="font-medium">Add a Story</span>
            )}
            <div className="absolute text-6xl text-gray-200 top-1">+</div>
          </div>
        )}
      </CldUploadWidget>
      {optimisticStories.map((story) => (
        <div
          className="flex flex-col items-center gap-2 cursor-pointer"
          key={story.id}
        >
          <Image
            width={80}
            height={80}
            src={story.user.avatar || "/no-avatar.png"}
            alt=""
            className="w-20 h-20 rounded-full ring-2"
          />
          <span className="font-medium">
            {story.user.name || story.user.username}
          </span>
        </div>
      ))}
    </>
  );
};

export default StoryList;
