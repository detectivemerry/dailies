"use client";
import { Settings } from "@mui/icons-material";
import { Menu, MenuItem, MenuList } from "@mui/material";
import React, { useState } from "react";
import { signOut } from "next-auth/react";

interface ProfileTitleHeaderProps {
  username: string;
}

export default function ProfileTitleHeader({
  username,
}: ProfileTitleHeaderProps) {
  const [openSettings, setOpenSettings] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
    setOpenSettings((prev) => !prev);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenSettings((prev) => !prev);
  };

  const handleSignOut = async () => {
    await signOut({
      redirect: true,
      callbackUrl: `${process.env.NEXT_PUBLIC_URL}login`,
    });
  };

  return (
    <>
      <div className="border-b fixed bg-white h-16 w-full lg:w-[24.5rem] z-10">
        <div className=" fixed left-1/2 transform -translate-x-1/2 top-4 w-auto">
          <div className="text-lg text-main">
            {username}
          </div>
        </div>
        <div className="fixed py-4 ml-[24rem] lg:ml-[22.5rem]">
          <div onClick={handleClick} className = {`${openSettings ? "bg-lightGray" : "bg-white"} rounded`}>
            <Settings sx={{ color: "#1D5D9B" }} />
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
              onClick={handleSignOut}
            >
              Logout
            </MenuItem>
          </Menu>
        </div>
      </div>
    </>
  );
}
