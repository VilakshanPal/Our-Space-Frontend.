"use client";

import { useEffect, useRef } from "react";

export default function MomentEditor({
  value,
  onChange,
  maxLength = 1000,
}) {
  const textareaRef = useRef(null);

  // Auto resize
  useEffect(() => {
    if (!textareaRef.current) return;

    textareaRef.current.style.height = "0px";
    textareaRef.current.style.height =
      textareaRef.current.scrollHeight + "px";
  }, [value]);

  return (
    <div className="px-5 mt-7">

      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={1}
        maxLength={maxLength}
        placeholder="What's on your mind today?"
        className="
          w-full
          resize-none
          overflow-hidden
          bg-transparent
          text-[22px]
          leading-9
          text-[#3F2F2F]
          placeholder:text-[#B8AAAA]
          outline-none
        "
      />

      <div className="mt-4 flex justify-end">

        <span
          className={`
            text-xs

            ${
              value.length > maxLength * 0.85
                ? "text-[#FF4D6D]"
                : "text-[#B8AAAA]"
            }
          `}
        >
          {value.length}/{maxLength}
        </span>

      </div>

    </div>
  );
}