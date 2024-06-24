import React from "react";
import ProfileCard from "./ProfileCard";
import Link from "next/link";
import { Book, Calendar, Clock, FileText, Images, List, Newspaper, Settings, Store, Video } from "lucide-react";
import Ad from "./Ad";

const links = [
  {
    name: "My Posts",
    href: "#",
    icon: FileText,
  },
  {
    name: "Activity",
    href: "#",
    icon: Clock,
  },
  {
    name: "Marketplace",
    href: "#",
    icon: Store,
  },
  {
    name: "Events",
    href: "#",
    icon: Calendar,
  },
  {
    name: "Albums",
    href: "#",
    icon: Images,
  },
  {
    name: "Videos",
    href: "#",
    icon: Video,
  },
  {
    name: "News",
    href: "#",
    icon: Newspaper,
  },
  {
    name: "Courses",
    href: "#",
    icon: Book,
  },
  {
    name: "Lists",
    href: "#",
    icon: List,
  },
  {
    name: "Settings",
    href: "#",
    icon: Settings,
  },
];

const LeftMenu = ({ type }: { type: "home" | "profile" }) => {
  return (
    <div className="flex flex-col gap-4">
      {type === "home" && <ProfileCard />}
      <div className="p-4 rounded-lg bg-white shadow-md text-sm text-gray-500 flex flex-col gap-2">
        {links.map((link, index) => (
          <div key={index}>
            <Link
              href={link.href}
              className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
            >
              <link.icon width={20} height={20} className="text-blue-500" />
              <span>{link.name}</span>
            </Link>
            <hr className="border-t-1 border-gray-50 w-36 self-center" />
          </div>
        ))}
      </div>
      <Ad size="sm" />
    </div>
  );
};

export default LeftMenu;
