"use client";

import { X } from "lucide-react";

export default function CreateHeader({
  onClose,
  onPost,
  disabled,
  loading,
}) {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg">
      <div className="flex items-center justify-between border-b border-[#F4E8E8] px-5 py-4">

        <button
          onClick={onClose}
          className="rounded-full p-2 transition hover:bg-[#FFF3F5]"
        >
          <X className="size-6 text-[#4D3A3A]" />
        </button>

        <h1 className="text-lg font-semibold text-[#2D2020]">
          New Moment
        </h1>

        <button
          disabled={disabled}
          onClick={onPost}
          className={`
            rounded-full
            px-5
            py-2
            text-sm
            font-semibold
            transition-all

            ${
              disabled
                ? "bg-[#F5D5DB] text-white/70 cursor-not-allowed"
                : "bg-[#FF4D6D] text-white shadow-md hover:scale-105"
            }
          `}
        >
          {loading ? "Posting..." : "Post"}
        </button>

      </div>
    </header>
  );
}