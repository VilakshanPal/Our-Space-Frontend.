import React from 'react'

const CoupleHero = () => {
  return (
    <div className="px-5 mt-5">
      <div className="flex items-center gap-4">
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200"
            className="size-14 rounded-full object-cover"
          />

          <img
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200"
            className="size-14 rounded-full object-cover border-2 border-white absolute left-8 top-0"
          />
        </div>

        <div>
          <h1 className="font-semibold text-xl">
            Maya & Noah
          </h1>

          <p className="text-sm text-[#8A7272]">
            Our Daybook 🔒
          </p>

          <p className="text-xs text-[#A08B8B]">
            Private space for just the two of us
          </p>
        </div>
      </div>
    </div>
  );
}

export default CoupleHero;
