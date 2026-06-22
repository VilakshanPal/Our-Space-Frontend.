"use client";

import { VenusAndMars } from "lucide-react";

export default function GenderInput({ registration, error }) {
  const hasError = Boolean(error);

  return (
    <div>
      <div
        className={`rounded-2xl border bg-white p-4 ${
          hasError ? "border-[#F06B6B]" : "border-[#F1E5E5]"
        }`}
      >
        <div className="flex items-center gap-2 mb-3">
          <VenusAndMars className="size-5 text-[#FF4D6D]" />

          <span className="text-sm text-[#9A8A8A]">Gender</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <label className="cursor-pointer">
            <input
              type="radio"
              value="male"
              {...registration}
              className="hidden peer"
            />

            <div
              className="
                h-11
                rounded-xl
                border
                border-[#F1E5E5]
                flex
                items-center
                justify-center
                text-sm
                text-[#7A6A6A]
                transition-all

                peer-checked:bg-[#FF4D6D]
                peer-checked:text-white
                peer-checked:border-[#FF4D6D]
              "
            >
              Male
            </div>
          </label>

          <label className="cursor-pointer">
            <input
              type="radio"
              value="female"
              {...registration}
              className="hidden peer"
            />

            <div
              className="
                h-11
                rounded-xl
                border
                border-[#F1E5E5]
                flex
                items-center
                justify-center
                text-sm
                text-[#7A6A6A]
                transition-all

                peer-checked:bg-[#FF4D6D]
                peer-checked:text-white
                peer-checked:border-[#FF4D6D]
              "
            >
              Female
            </div>
          </label>
        </div>
      </div>

      {hasError && (
        <p className="mt-1.5 pl-1 text-[11px] text-[#C94D4D]">{error.message}</p>
      )}
    </div>
  );
}