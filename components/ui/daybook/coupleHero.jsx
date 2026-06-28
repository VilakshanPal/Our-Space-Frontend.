"use client";
import React from "react";
import Image from "next/image";
import { Heart } from "lucide-react";

export default function CoupleHero({
  title = "A space for our everyday moments, big or small.",
  image1 = "/demo/photo1.jpg",
  image2 = "/demo/photo2.jpg",
}) {
  return (
  <section className="px-5 mt-5">
  <div
    className="
      relative
      overflow-hidden
      rounded-[28px]
      border
      border-[#F8E6E8]
      bg-gradient-to-br
      from-[#FFF4F5]
      via-[#FFF9F9]
      to-[#FFEDEE]
      px-5
      py-5
      h-[145px]
    "
  >
    {/* Background Glow */}
    <div className="absolute -left-12 -top-12 h-44 w-44 rounded-full bg-[#FFD9DF]/40 blur-3xl" />
    <div className="absolute -right-8 bottom-0 h-32 w-32 rounded-full bg-[#FFF5F5]/60 blur-2xl" />

    <div className="relative flex h-full justify-between items-center">

      {/* Left */}
      <div className="max-w-[165px]">

        <div className="flex items-start gap-3">

          <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full shadow-sm">
            <Heart
              size={16}
              fill="#FF4D6D"
              className="text-[#FF4D6D]"
            />
          </div>

          <p className="text-[15px] text-[#5A4545] font-medium">
            {title}
          </p>

        </div>

      </div>

      {/* Right */}

      <div className="relative h-full w-[125px]">

        {/* Hearts */}

        <Heart
          className="absolute left-0 top-6 text-[#FFAEBB]"
          size={20}
        />

        <Heart
          className="absolute left-4 top-2 text-[#FFC8D1]"
          size={10}
        />

        <Heart
          className="absolute left-6 top-12 text-[#FFC8D1]"
          size={8}
        />

        {/* Back Polaroid */}

        <div
          className="
            absolute
            right-0
            top-4
            rotate-[8deg]
            rounded-lg
            bg-white
            p-1.5
            shadow-md
          "
        >
          <Image
            src={image2}
            alt=""
            width={70}
            height={90}
            className="rounded-md object-cover h-[82px] w-[70px]"
          />
        </div>

        {/* Front Polaroid */}

        <div
          className="
            absolute
            right-10
            top-0
            -rotate-[4deg]
            rounded-lg
            bg-white
            p-1.5
            shadow-lg
          "
        >
          <Image
            src={image1}
            alt=""
            width={72}
            height={92}
            className="rounded-md object-cover h-[84px] w-[72px]"
          />
        </div>

      </div>

    </div>
  </div>
</section>
  );
}
