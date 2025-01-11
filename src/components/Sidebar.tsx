"use client";

import {
  Home,
  Film,
  PlaySquare,
  Clock,
  ThumbsUp,
  History,
  Flame,
  ShoppingBag,
  Music2,
  Radio,
  Gamepad2,
  Trophy,
  Lightbulb,
  Youtube,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarItems = [
  {
    title: "Home",
    icon: Home,
    href: "/",
  },
  {
    title: "Shorts",
    icon: Film,
    href: "/shorts",
  },
  {
    title: "Subscriptions",
    icon: PlaySquare,
    href: "/subscriptions",
  },
  {
    type: "divider",
  },
  {
    title: "Library",
    icon: Youtube,
    href: "/library",
  },
  {
    title: "History",
    icon: History,
    href: "/history",
  },
  {
    title: "Watch Later",
    icon: Clock,
    href: "/playlist?list=WL",
  },
  {
    title: "Liked Videos",
    icon: ThumbsUp,
    href: "/playlist?list=LL",
  },
  {
    type: "divider",
  },
  {
    title: "Trending",
    icon: Flame,
    href: "/trending",
  },
  {
    title: "Shopping",
    icon: ShoppingBag,
    href: "/shopping",
  },
  {
    title: "Music",
    icon: Music2,
    href: "/music",
  },
  {
    title: "Live",
    icon: Radio,
    href: "/live",
  },
  {
    title: "Gaming",
    icon: Gamepad2,
    href: "/gaming",
  },
  {
    title: "Sports",
    icon: Trophy,
    href: "/sports",
  },
  {
    title: "Learning",
    icon: Lightbulb,
    href: "/learning",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 bg-[#0f0f0f] overflow-y-auto fixed left-0 top-14 bottom-0 p-2">
      {sidebarItems.map((item, index) => {
        if (item.type === "divider") {
          return <div key={index} className="my-2 border-t border-[#272727]" />;
        }

        const isActive = pathname === item.href;
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href ?? "#"}
            className={cn(
              "flex items-center gap-4 px-3 py-2 rounded-lg text-sm font-medium hover:bg-[#272727] transition-colors",
              isActive && "bg-[#272727]"
            )}
          >
            {Icon && <Icon className="h-5 w-5" />}
            <span>{item.title}</span>
          </Link>
        );
      })}
    </aside>
  );
}
