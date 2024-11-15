"use client";

import { HolidayVillageOutlined } from "@mui/icons-material";
import React from "react";
import { useRouter } from "next/navigation";

import PrimaryButton from "@/components/buttons/PrimaryButton";

export default function NoSubscribed() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center gap-8 mt-64">
      <div>
        <HolidayVillageOutlined sx={{ color: "#838383", fontSize: "4rem" }} />
      </div>
      <div className="flex flex-col items-center px-3 text-center">
        <div className="text-secondaryText font-bold">No subscribed communities</div>
        <div className="text-secondaryText">Subscribe to communities now to view their posts here</div>
      </div>
      <div>
        <PrimaryButton
          onClick={() => {
            router.push("/explore");
          }}
          text="Explore"
        />
      </div>
    </div>
  );
}
