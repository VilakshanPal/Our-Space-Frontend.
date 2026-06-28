"use client";

import Image from "next/image";
import { ChevronLeft, Heart, Users } from "lucide-react";

export default function DaybookHeader({
  user1,
  user2,
  onBack,
}) {
  return (
    <div className="px-5 pt-5">
      {/* Top Row */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-sm text-[#8A7272]"
        >
          <ChevronLeft className="size-4" />
          Back
        </button>

        <div className="flex items-center gap-2 rounded-full bg-[#FFECEF] px-4 py-2">
          <Users className="size-4 text-[#FF4D6D]" />

          <span className="text-xs font-medium text-[#FF4D6D]">
            Together
          </span>
        </div>
      </div>

      {/* Couple */}
      <div className="mt-6 flex items-center gap-4">
        <div className="relative w-20 h-14">
          <Image
            src={user1.avatar}
            alt={user1.name}
            width={52}
            height={52}
            className="absolute left-0 rounded-full border-2 border-white object-cover"
          />

          <Image
            src={user2.avatar}
            alt={user2.name}
            width={52}
            height={52}
            className="absolute right-0 rounded-full border-2 border-white object-cover"
          />

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center justify-center w-7 h-7 rounded-full bg-white shadow">
            <Heart
              className="size-4 text-[#FF4D6D]"
              fill="#FF4D6D"
            />
          </div>
        </div>

        <div>
          <h1 className="text-[24px] font-semibold text-[#2D2020]">
            {user1.name} & {user2.name}
          </h1>

          <p className="text-sm text-[#756565] mt-1">
            Our Daybook 🔒
          </p>

          <p className="text-xs text-[#9A8A8A] mt-1">
            Private space for just the two of us
          </p>
        </div>
      </div>
    </div>
  );
}