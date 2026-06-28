"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/utils/UserProvider";
import { redirect } from "next/navigation";

import DaybookHeader from "../../../components/ui/daybook/DaybookHeader";
import CoupleHero from "../../../components/ui/daybook/CoupleHero";
import TimelineTabs from "../../../components/ui/daybook/TimelineTabs";
import MomentCard from "../../../components/ui/daybook/MomentCard";

const MOMENTS_API = "http://localhost:5000/moments/get";

export default function Page() {
  const user = useUser();
  const [activeTab, setActiveTab] = useState("timeline");
  const [moments, setMoments] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  async function loadMoments(nextCursor = null) {
    if (loading || !hasMore) return;

    setLoading(true);
    setError(null);

    try {
      const url = nextCursor ? `${MOMENTS_API}?cursor=${nextCursor}` : MOMENTS_API;
      const response = await fetch(url, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Failed to load moments (${response.status})`);
      }

      const data = await response.json();
      const nextMoments = Array.isArray(data)
        ? data
        : Array.isArray(data.details)
        ? data.details
        : [];

      setMoments((current) => [...current, ...nextMoments]);
      setHasMore(nextMoments.length > 0);
      setCursor(nextMoments.length ? nextMoments[nextMoments.length - 1].id : nextCursor);
    } catch (fetchError) {
      setError(fetchError.message || "Unable to load moments.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMoments();
  }, []);

  return (
    <div>
      <DaybookHeader
        onBack={() => redirect("/")}
        user1={{
          name: user.username,
          avatar: "/temp/boy.png",
        }}
        user2={{
          name: "Noah",
          avatar: "/temp/girlPfp.jpg",
        }}
      />
      <CoupleHero image1="/temp/cafe.jpg" image2="/temp/sunset.webp" />
      <TimelineTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "timeline" && (
        <>
          {error && (
            <p className="text-red-500 text-sm mb-4">{error}</p>
          )}

          {moments.length === 0 && !loading && !error && (
            <p className="text-gray-500 text-sm mb-4">No moments yet.</p>
          )}

          {moments.map((moment) => (
            <MomentCard key={moment.id} moment={moment} />
          ))}

          {loading && (
            <p className="text-gray-500 text-sm mt-4">Loading moments…</p>
          )}

          {!loading && hasMore && (
            <button
              type="button"
              onClick={() => loadMoments(cursor)}
              className="mt-4 px-4 py-2 rounded bg-[#FF4D6D] text-white"
            >
              Load more
            </button>
          )}
        </>
      )}
    </div>
  );
}
