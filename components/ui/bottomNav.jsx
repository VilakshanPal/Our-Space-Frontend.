"use client"
import React from 'react'

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookHeart,
  MessageCircleMore,
  HeartHandshake,
  Upload,
  Settings,
} from "lucide-react";

const navItems = [
  {
    label: "Daybook",
    href: "/daybook",
    icon: BookHeart,
  },
  {
    label: "Messages",
    href: "/messages",
    icon: MessageCircleMore,
  },
  {
    label: "Post",
    href: "/post",
    icon: Upload,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function BottomNav(){
     const pathname = usePathname();

return (
  <nav
    className="
      fixed
      bottom-0
      left-0
      right-0
      z-50
      border-t
      border-[#F3E7E7]
      bg-white/95
      backdrop-blur-xl
      shadow-[0_-4px_18px_rgba(0,0,0,0.04)]
    "
  >
    <div className="mx-auto flex h-16 max-w-md items-center justify-around px-2">
      {navItems.map((item) => {
        const Icon = item.icon;

        const active =
          pathname === item.href ||
          pathname.startsWith(item.href + "/");

        return (
          <Link
            key={item.href}
            href={item.href}
            className="
              flex
              flex-1
              flex-col
              items-center
              justify-center
              gap-1
            "
          >
            <div
              className={`
                flex
                items-center
                justify-center
                rounded-full
                p-2
                transition-all
                duration-200
                ${
                  active
                    ? "bg-[#FFECEF]"
                    : ""
                }
              `}
            >
              <Icon
                size={22}
                strokeWidth={2}
                className={
                  active
                    ? "text-[#FF4D6D]"
                    : "text-[#A69A9A]"
                }
              />
            </div>

            <span
              className={`
                text-[11px]
                font-medium
                transition-colors
                ${
                  active
                    ? "text-[#FF4D6D]"
                    : "text-[#A69A9A]"
                }
              `}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </div>
  </nav>
);
}
