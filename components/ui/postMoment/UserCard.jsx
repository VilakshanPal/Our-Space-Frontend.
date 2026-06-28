"use client";

import Image from "next/image";
import { ChevronDown, Lock } from "lucide-react";

export default function UserCard({
  user,
  partner,
}) {
  return (
    <div className="px-5 pt-5">

      <div
        className="
          flex
          items-center
          justify-between
        "
      >
        {/* Left */}

        <div className="flex items-center gap-4">

          {/* Avatar */}

          {user.profilePicture ? (
            <Image
              src={user.profilePicture}
              alt={user.firstName}
              width={58}
              height={58}
              className="rounded-full object-cover"
            />
          ) : (
            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-full
                bg-[#FFECEF]
                text-xl
                font-semibold
                text-[#FF4D6D]
              "
            >
              {user.firstName[0].toUpperCase()}
            </div>
          )}

          {/* Text */}

          <div>

            <h2 className="text-[18px] font-semibold text-[#2D2020]">
              {user.firstName}
            </h2>

            <button
              className="
                mt-1
                flex
                items-center
                gap-2
                rounded-full
                bg-[#FFF3F5]
                px-3
                py-1.5
                text-xs
                font-medium
                text-[#FF4D6D]
              "
            >
              <Lock size={13} />

              Shared with {partner.firstName}

              <ChevronDown size={14} />
            </button>

            <p className="mt-2 text-xs text-[#9E8C8C]">
              Only visible to the two of you.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}