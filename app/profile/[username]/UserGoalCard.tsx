"use client";

import React, { useEffect, Dispatch, SetStateAction } from "react";
import {
  AccessTime,
  CheckCircle,
  Edit,
  HourglassEmptyOutlined,
  Replay,
  Whatshot,
  MoreHorizOutlined,
} from "@mui/icons-material";
import { Menu, MenuItem, AlertColor } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";

import { UserGoal } from "@/types/model";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import WarningAlertDialog from "@/components/dialogs/WarningAlertDialog";
import { computeTimeLeftForGoal } from "@/app/lib/display/userGoalCardDisplay";
import revalidatePage from "@/app/lib/actions/revalidatePage/revalidatePage";

interface UserGoalCardProps {
  userGoal: UserGoal;
  setAlert: Dispatch<SetStateAction<Alert>>;
  currentProfileUsername: string | undefined;
}

type Alert = {
  message: string;
  type: AlertColor;
};

export default function UserGoalCard({
  userGoal,
  setAlert,
  currentProfileUsername,
}: UserGoalCardProps) {
  const router = useRouter();
  const [clickedEdit, setClickedEdit] = useState<boolean>(false);
  const [openSettings, setOpenSettings] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [deleteSelected, setDeleteSelected] = useState<boolean>(false);
  const { data: session } = useSession();

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
    setOpenSettings((prev) => !prev);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenSettings((prev) => !prev);
  };

  const displayDate = computeTimeLeftForGoal({
    endDate: new Date(String(userGoal.endDate)),
    startDate: new Date(String(userGoal.startDate)),
  });

  useEffect(() => {
    if (clickedEdit) {
      const intervalId = setInterval(() => {
        setClickedEdit(false);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [clickedEdit]);

  const deleteGoal = async () => {
    try {
      const response = await fetch("/api/goal", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userGoalId: userGoal._id }),
      });
      setDeleteSelected(false);

      if (response.ok) {
        setAlert({ message: "Goal deleted", type: "success" });
        revalidatePage(`/profile/${session?.user.username}`);
      } else {
        setAlert({ message: "Failed to delete goal", type: "error" });
      }
    } catch (error) {
      console.error(error);
      setAlert({ message: "Failed to delete goal", type: "error" });
    }
  };

  return (
    <>
      <WarningAlertDialog
        showDialog={deleteSelected}
        title="Delete confirmation"
        content="Are you sure you want to delete this goal? This action cannot be undone."
        buttonText="Delete"
        secondaryButtonText="Cancel"
        mainDialogAction={deleteGoal}
        secondaryDialogAction={async () => {
          setDeleteSelected(false);
        }}
      />

      <div className="flex flex-col border p-3 mx-3">
        <div className="flex justify-between">
          <div className="text-main font-bold pb-3">{userGoal.name}</div>
          {session?.user.username === currentProfileUsername && (
            <>
              <div
                onClick={handleClick}
                className={`${
                  openSettings ? "bg-lightGray" : "bg-white"
                } rounded my-[7px] pt-[2px] px-2`}
              >
                <MoreHorizOutlined
                  sx={{ color: "#1D5D9B", fontSize: "1.125rem" }}
                />
              </div>
              <Menu
                anchorEl={anchorEl}
                open={openSettings}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                autoFocus={false}
                slotProps={{ paper: { sx: { width: "7rem" } } }}
              >
                <MenuItem
                  onClick={() => {
                    router.push(`/edit-goal/${userGoal._id}`);
                  }}
                >
                  Edit
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setDeleteSelected(true);
                  }}
                >
                  Delete
                </MenuItem>
              </Menu>
            </>
          )}
          {/* <div
          className={`${clickedEdit && "bg-lightGray"} mb-[7px] px-2`}
          onClick={async () => {
            setClickedEdit(true);
            router.push(`/edit-goal/${userGoal._id}`);
          }}
        >
          <Edit sx={{ color: "#1D5D9B", fontSize: "1rem" }} />
        </div> */}
        </div>
        <div className="flex gap-2 flex-wrap">
          <div
            className="bg-lightGray rounded-2xl px-3 py-[2px] bg-secondaryDark text-main"
            onClick={() => {
              router.push(`/community/${userGoal.goalName}`);
            }}
          >
            {userGoal.goalName}
          </div>
          <div className="bg-lightGray rounded-2xl px-3 py-[2px]">
            {userGoal.frequencyCount} times {userGoal.frequencyPeriod}
          </div>
          <div className="bg-lightGray rounded-2xl px-3 flex py-[3px]">
            <div className="pr-[3px]">
              {displayDate === "Finished" ? (
                <CheckCircle
                  sx={{
                    color: "#1D5D9B",
                    fontSize: "1rem",
                    marginTop: "-3px",
                  }}
                />
              ) : displayDate === "Not started" ? (
                <HourglassEmptyOutlined
                  sx={{
                    color: "#1D5D9B",
                    fontSize: "1rem",
                    marginTop: "-2px",
                  }}
                />
              ) : userGoal.endDate ? (
                <AccessTime
                  sx={{
                    color: "#1D5D9B",
                    fontSize: "1rem",
                    marginTop: "-3px",
                  }}
                />
              ) : (
                <Replay
                  sx={{
                    color: "#1D5D9B",
                    fontSize: "1rem",
                    marginTop: "-3px",
                  }}
                />
              )}
            </div>
            <div>{displayDate}</div>
          </div>
        </div>

        <div className="flex py-3 justify-center gap-8 pt-5">
          <div className="flex items-center gap-1">
            <Whatshot sx={{ color: userGoal.streak ? "#1D5D9B" : "#D3D3D3" }} />
            {!userGoal.streak ? (
              <span className="text-lightGray">0 streak</span>
            ) : (
              <span className="text-main">{userGoal.streak} streak</span>
            )}
          </div>
          {/* {!isDefaultDate(dayjs(String(userGoal.endDate))) && (
          <div className="flex gap-2 items-center">
            <div>
              <PieChart data={pieChartData} style={{ height: "25px" }} />
            </div>
            <div>{percentCompleted}</div>
          </div>
        )} */}
        </div>

        <div className="flex justify-between items-center">
          <div className="">
            {userGoal.timesPostedCurrentPeriod}/{userGoal.frequencyCount}{" "}
            {userGoal.frequencyPeriod.replace(/per (\w+)/, "this $1")}
          </div>
          <div>
            <PrimaryButton
              text="Post"
              sx={{
                fontSize: "0.75rem",
                width: "6rem",
                borderRadius: "25px",
                fontWeight: "bold",
                color: "#1D5D9B",
                backgroundColor: "#FBEEAC",
                textTransform: "none",
                ":hover": {
                  backgroundColor: "#F9E47B",
                },
              }}
              onClick={() => {
                router.push("/post");
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
