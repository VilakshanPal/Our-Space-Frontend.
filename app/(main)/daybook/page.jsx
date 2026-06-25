"use client";
import { useUser } from "@/utils/UserProvider";

import CoupleHero from "../../../components/ui/daybook/coupleHero";

export default function Page() {
  const user = useUser();

  return (
    <div>
      Welcome {user.username}
      <CoupleHero/>
    </div>
  );
}