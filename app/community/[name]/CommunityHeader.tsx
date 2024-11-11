import { Goal, UserSubscribedCommunity } from "@/types/model";
import React, { useEffect, useState } from "react";
import { ChevronLeft } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import SecondaryButton from "@/components/buttons/SecondaryButton";

interface CommunityHeaderProps {
  community: Goal | undefined;
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
          console.log(community?._id);
          if (subscribedCommunity.goalId === community?._id) {
            setSubscribed(true);
          }
        }
      );
    }
  }, []);

  const formatMembersCount = (number: number | undefined) => {
    if (!number) return 0;
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
      <div className="flex flex-1 justify-start mt-2 w-full mb-[-10px]">
        <Button
          sx={{ textTransform: "none" }}
          onClick={() => {
            router.back();
          }}
        >
          <div>
            <ChevronLeft sx={{ fontSize: "2rem" }} />
          </div>
          <div className="">Back</div>
        </Button>
      </div>
      <div className="flex w-full">
        <div className = "flex-1"></div>
        <div>
          <div className="flex-1 text-lg font-semibold text-main mb-2 flex flex-col items-center">
            {community?.name}
            <div className="text-secondaryText text-xs font-normal">
              {formatMembersCount(community?.no_of_members)} members
            </div>
          </div>
        </div>
        <div className="flex-1 flex justify-center pt-1 pb-5 text-sm">
          <SecondaryButton
            text={subscribed ? "Subscribed" : "Join"}
            onClick={() => {
              console.log("clicked subscribed!");
            }}
            sx={{
              borderRadius: "25px",
              textTransform: "none",
              color: "#B3B3B3",
              borderColor: "#B3B3B3",
              fontSize : "0.75rem",
            }}
          />
        </div>
      </div>
      <div className="border-t w-screen mb-8"></div>
    </div>
  );
}
