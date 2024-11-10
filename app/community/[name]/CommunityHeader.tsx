import { Goal, UserSubscribedCommunity } from "@/types/model";
import React, { useEffect, useState } from "react";
import { ChevronLeft } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import SecondaryButton from "@/components/buttons/SecondaryButton";

interface CommunityHeaderProps {
  community: Goal;
  subscribedCommunities: UserSubscribedCommunity[] | unknown;
}

export default function CommunityHeader({
  community,
  subscribedCommunities,
}: CommunityHeaderProps) {
  const [subscribed, setSubscribed] = useState<boolean>(false);
  const router = useRouter();

  const subscribeCommunity = async () => {
    const subscribeResponse = await fetch("/api/community/subscribe");
  };

  useEffect(() => {
    if (Array.isArray(subscribedCommunities)) {
      subscribedCommunities?.forEach(
        (subscribedCommunity: UserSubscribedCommunity) => {
          console.log("communities!");
          console.log(subscribedCommunity.goalId);
          console.log(community._id);
          if (subscribedCommunity.goalId === community._id) {
            setSubscribed(true);
          }
        }
      );
    }
  }, []);

  const formatMembersCount = (number: number) => {
    if (number < 1000) {
      return number.toString(); // Show the full number if below 1000
    } else if (number < 1_000_000) {
      return (number / 1000).toFixed(1).replace(/\.0$/, "") + "k"; // Thousands with "k"
    } else {
      return (number / 1_000_000).toFixed(1).replace(/\.0$/, "") + "m"; // Millions with "m"
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-start w-screen mt-2">
        <Button
          sx={{ textTransform: "none" }}
          onClick={() => {
            router.back();
          }}
        >
          <div>
            <ChevronLeft sx={{ fontSize: "2rem" }} />
          </div>
          <div className="text-lg">Back</div>
        </Button>
      </div>
      <div className="flex">
        <div>
          <div className="text-3xl font-semibold text-main my-2 flex flex-col items-center">
            {community.name}
          </div>
          <div className="text-secondaryText">
            {formatMembersCount(community.no_of_members)} members
          </div>
        </div>
        <div>
          <SecondaryButton
            text={subscribed ? "Subscribed" : "Join"}
            onClick={() => {
              console.log("clicked subscribed!");
            }}
            sx = {{
              borderRadius: "25px",
              textTransform : "none",
              backgroundColor : "#6D6D6D"
            }}
          />
        </div>
      </div>
      <div className="border-t w-screen mb-8"></div>
    </div>
  );
}
