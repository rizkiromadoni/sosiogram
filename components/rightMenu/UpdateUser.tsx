"use client";

import { updateProfile } from "@/lib/actions";
import { User } from "@prisma/client";
import { X } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";

const UpdateUser = ({ user }: { user: User }) => {
  const [open, setOpen] = useState(false);
  const [cover, setCover] = useState<any>(user.cover)

  return (
    <div>
      <span
        className="text-blue-500 text-xs cursor-pointer"
        onClick={() => setOpen(true)}
      >
        Update
      </span>
      {open && (
        <div className="absolute h-screen w-screen top-0 left-0 bg-black bg-opacity-65 flex items-center justify-center z-50">
          <form
            action={(formData) => updateProfile(formData, cover?.secure_url)}
            className="relative p-12 bg-white shadow-md flex flex-col gap-2 w-full md:w-1/2"
          >
            <h1>Update Profile</h1>
            <div className="mt-4 text-xs text-gray-500">
              Use the navbar profile to change username and avatar.
            </div>

            <CldUploadWidget uploadPreset="social" onSuccess={(result) => {
              setCover(result.info)
            }}>
              {({ open }) => (
                <div className="flex flex-col gap-4 my-4" onClick={() => open()}>
                  <label>Profile Cover</label>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <Image
                      src={cover || "/no-avatar.png"}
                      alt=""
                      width={40}
                      height={32}
                      className="w-12 h-8 rounded-md object-cover"
                    />
                    <span className="text-xs underline text-gray-600">
                      Change
                    </span>
                  </div>
                </div>
              )}
            </CldUploadWidget>

            <div className="flex flex-wrap justify-between gap-2 xl:gap-4">
              <div className="flex flex-col gap-4">
                <label className="text-xs text-gray-500">First Name</label>
                <input
                  className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                  type="text"
                  name="name"
                />
              </div>

              <div className="flex flex-col gap-4">
                <label className="text-xs text-gray-500">Last Name</label>
                <input
                  className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                  type="text"
                  name="surname"
                />
              </div>

              <div className="flex flex-col gap-4">
                <label className="text-xs text-gray-500">Bio</label>
                <input
                  className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                  type="text"
                  name="description"
                />
              </div>

              <div className="flex flex-col gap-4">
                <label className="text-xs text-gray-500">School</label>
                <input
                  className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                  type="text"
                  name="school"
                />
              </div>

              <div className="flex flex-col gap-4">
                <label className="text-xs text-gray-500">City</label>
                <input
                  className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                  type="text"
                  name="city"
                />
              </div>

              <div className="flex flex-col gap-4">
                <label className="text-xs text-gray-500">Work</label>
                <input
                  className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                  type="text"
                  name="work"
                />
              </div>

              <div className="flex flex-col gap-4">
                <label className="text-xs text-gray-500">Website</label>
                <input
                  className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                  type="text"
                  placeholder="johndoe.dev"
                  name="website"
                />
              </div>
            </div>

            <button className="bg-blue-500 text-white p-2 mt-2 rounded-md">
              Update
            </button>

            <X
              width={20}
              height={20}
              className="absolute w-6 h-6 right-3 top-3 cursor-pointer"
              onClick={() => setOpen(false)}
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateUser;
