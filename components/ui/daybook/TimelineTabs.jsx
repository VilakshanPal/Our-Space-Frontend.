"use client";

export default function TimelineTabs({
  activeTab,
  setActiveTab,
}) {
  return (
    <div className="mt-6 px-5">

      <div className="flex items-center border-b border-[#F4E6E6]">

        <button
          onClick={() => setActiveTab("timeline")}
          className="
            relative
            flex-1
            pb-3
            text-sm
            font-semibold
            transition-colors
          "
        >
          <span
            className={
              activeTab === "timeline"
                ? "text-[#FF4D6D]"
                : "text-[#8A7272]"
            }
          >
            Timeline
          </span>

          {activeTab === "timeline" && (
            <span
              className="
                absolute
                bottom-0
                left-1/2
                h-[3px]
                w-16
                -translate-x-1/2
                rounded-full
                bg-[#FF4D6D]
              "
            />
          )}
        </button>

        <button
          onClick={() => setActiveTab("memories")}
          className="
            relative
            flex-1
            pb-3
            text-sm
            font-semibold
            transition-colors
          "
        >
          <span
            className={
              activeTab === "memories"
                ? "text-[#FF4D6D]"
                : "text-[#8A7272]"
            }
          >
            Memories
          </span>

          {activeTab === "memories" && (
            <span
              className="
                absolute
                bottom-0
                left-1/2
                h-[3px]
                w-16
                -translate-x-1/2
                rounded-full
                bg-[#FF4D6D]"
              />
          )}
        </button>

      </div>

    </div>
  );
}