"use client";

import Image from "next/image";
import {
  Ellipsis,
  MessageCircle,
  SmilePlus,
} from "lucide-react";

export default function MomentCard({
  moment,
}) {
       console.log("Moment:", moment);

  if (!moment) {
    return null;
  }
  const {
    author,
    textMessage,
    imgUrl,
    createdAt,
    momentReplies,
  } = moment;
console.log(author,'hi ')
  return (
    <article
      className="
        px-5
        py-5
        border-b
        border-[#F4E8E8]
        bg-white
      "
    >
      {/* Header */}

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          {author.profilePicture ? (
            <Image
              src={author.profilePicture}
              alt={author.firstName}
              width={46}
              height={46}
              className="rounded-full object-cover"
            />
          ) : (
            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                bg-[#FFECEF]
                text-[#FF4D6D]
                font-semibold
                text-lg
              "
            >
              {author.firstName[0].toUpperCase()}
            </div>
          )}

          <div>

            <h3 className="text-[15px] font-semibold text-[#2D2020]">
              {author.firstName}
            </h3>

            <p className="mt-0.5 text-xs text-[#9E8C8C]">
              {createdAt}
            </p>

          </div>

        </div>

        <button
          className="
            rounded-full
            p-2
            text-[#A69797]
            transition
            hover:bg-[#FFF4F5]
          "
        >
          <Ellipsis size={20} />
        </button>

      </div>

      {/* Message */}

      {textMessage && (
        <p
          className="
            mt-4
            whitespace-pre-wrap
            leading-7
            text-[15px]
            text-[#453535]
          "
        >
          {textMessage}
        </p>
      )}

      {/* Image */}

      {imgUrl && (
        <div className="mt-4 overflow-hidden rounded-3xl">

          <Image
            src={imgUrl}
            alt=""
            width={600}
            height={600}
            className="
              h-auto
              w-full
              object-cover
            "
          />

        </div>
      )}

      {/* Footer */}

      <div
        className="
          mt-5
          flex
          items-center
          justify-between
        "
      >
        <button
          className="
            flex
            items-center
            gap-2
            rounded-full
            px-3
            py-2
            text-[#7E6B6B]
            transition
            hover:bg-[#FFF5F5]
          "
        >
          <SmilePlus size={18} />

          <span className="text-sm">
            React
          </span>
        </button>

        <button
          className="
            flex
            items-center
            gap-2
            rounded-full
            px-3
            py-2
            text-[#7E6B6B]
            transition
            hover:bg-[#FFF5F5]
          "
        >
          <MessageCircle size={18} />

          <span className="text-sm">
            Reply
          </span>
        </button>
      </div>

      {/* Replies */}

      {momentReplies.length > 0 && (
        <button
          className="
            mt-3
            text-sm
            font-medium
            text-[#FF4D6D]
          "
        >
          View {momentReplies.length}{" "}
          {momentReplies.length === 1
            ? "reply"
            : "replies"}
        </button>
      )}
    </article>
  );
}