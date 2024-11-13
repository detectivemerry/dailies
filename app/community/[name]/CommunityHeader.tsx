import { Goal, UserSubscribedCommunity } from "@/types/model";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ChevronLeft } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import Message from "@/app/lib/message/Message";
import ButtonSpinner from "@/components/loading/ButtonSpinner";

interface CommunityHeaderProps {
  community: Goal | undefined;
  setErrorMessage: Dispatch<SetStateAction<string>>;
  subscribed: boolean;
  setSubscribed: Dispatch<SetStateAction<boolean>>;
  subscribedCommunities: Array<UserSubscribedCommunity> | unkown;
}

export default function CommunityHeader({
  community,
  setErrorMessage,
  subscribed,
  setSubscribed,
  subscribedCommunities,
}: CommunityHeaderProps) {
  const [pending, setPending] = useState<boolean>(false);
  const router = useRouter();

  const subscribeCommunity = async () => {
    setPending(true);
    const subscribeResponse = await fetch("/api/subscribe", {
      method: "POST",
      body: JSON.stringify({ communityId: community?._id }),
    });

    if (subscribeResponse.ok) {
      setSubscribed(true);
    } else {
      setErrorMessage(Message.Error.UnsuccessfulSubscribe);
    }

    setPending(false);
  };

  useEffect(() => {
    if (Array.isArray(subscribedCommunities)) {
      subscribedCommunities.forEach(
        (subscribedCommunity: UserSubscribedCommunity) => {
          if (subscribedCommunity.goalId === community?._id) {
            setSubscribed(true);
          }
        }
      );
    }
  }, [subscribedCommunities]);

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
        <div className="flex-1"></div>
        <div>
          <div className="flex-1 text-lg font-semibold text-main mb-2 flex flex-col items-center">
            {community?.name}
            <div className="text-secondaryText text-xs font-normal">
              {formatMembersCount(community?.no_of_members)} members
            </div>
          </div>
        </div>
        <div className="flex-1 flex justify-center pt-1 pb-5 text-sm">
          <Button
            onClick={async () => {
              await subscribeCommunity();
            }}
            variant = "outlined"
            sx={{
              borderRadius: "25px",
              textTransform: "none",
              backgroundColor: !subscribed && "#FBEEAC",
              color: subscribed ? "#B3B3B3" : "#1D5D9B",
              borderColor: subscribed ? "#B3B3B3" : "#1D5D9B",
              fontSize: "0.75rem",
              fontWeight: !subscribed && "700",
            }}
            disabled={subscribed}
          >
            {pending ? (
              <ButtonSpinner size={"1.15rem"} />
            ) : subscribed ? (
              "Subscribed"
            ) : (
              "Join"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
