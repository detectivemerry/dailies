"use client";

import {
  AddOutlined,
  HomeOutlined,
  Home,
  NotificationsOutlined,
  Notifications,
  PersonOutlined,
  Person,
  SearchOutlined,
} from "@mui/icons-material";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import revalidatePage from "@/app/lib/actions/revalidatePage/revalidatePage";

export default function Navbar() {
  const pagesWithoutNavbar = [
    "/login",
    "/register",
    "/create-goal",
    "/post",
    "/edit-goal",
  ];
  const pathName = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [selectedIcon, setSelectedIcon] = useState<string>("");

  useEffect(() => {
    if(selectedIcon){
      const intervalId = setInterval(() => {
        setSelectedIcon("")
      },500)

      return () => clearInterval(intervalId);
    }
  }, [selectedIcon])

  return (
    <>
      {!pagesWithoutNavbar.includes(pathName) && (
        <div className="fixed bottom-0 w-[26.85rem] bg-secondary h-min-screen py-2 rounded-t-2xl pb-4">
          <div className="flex justify-around gap-8">
            <div className="flex gap-11">
              <div
                className = {`${selectedIcon === "home" && "bg-secondaryDark"} rounded p-1`}
                onClick={() => {
                  setSelectedIcon("home")
                  router.push("/");
                }}
              >
                {pathName === "/" ? (
                  <>
                    <Home sx={{ color: "#1D5D9B", fontSize: "1.75rem" }} />
                  </>
                ) : (
                  <>
                    <HomeOutlined
                      sx={{ color: "#1D5D9B", fontSize: "1.75rem" }}
                    />
                  </>
                )}
              </div>
              <div 
              className = {`${selectedIcon === "explore" && "bg-secondaryDark"} rounded p-1`}
              onClick={()=>{
                setSelectedIcon("explore")
                router.push("/explore")}}>
                  {pathName === "/explore" ? (
                    <>
                      <SearchOutlined
                        sx={{
                          color: "#1D5D9B",
                          fontSize: "1.75rem",
                          stroke: "#1D5D9B",
                          strokeWidth: 1,
                        }}
                      />
                    </>
                  ) : (
                    <SearchOutlined
                      sx={{ color: "#1D5D9B", fontSize: "1.75rem" }}
                    />
                  )}
              </div>
            </div>
            <div
              className="bg-secondaryDark fixed bottom-4 rounded-full p-2"
              onClick={() => {
                setSelectedIcon("post")
                router.push("/post");
              }}
            >
              {pathName === "/post" ? (
                <>
                  <AddOutlined
                    sx={{
                      color: "#1D5D9B",
                      fontSize: "2.25rem",
                      stroke: "#1D5D9B",
                      strokeWidth: 1,
                    }}
                  />
                </>
              ) : (
                <>
                  <AddOutlined sx={{ color: "#1D5D9B", fontSize: "2.25rem" }} />
                </>
              )}
            </div>
            <div className="flex gap-11">
              <div
                className = {`${selectedIcon === "notification" && "bg-secondaryDark"} rounded p-1`}
                onClick={() => {
                  setSelectedIcon("notification")
                  revalidatePage("/notification")
                  router.push("/notification");
                }}
              >
                {pathName === "/notification" ? (
                  <>
                    <Notifications
                      sx={{ color: "#1D5D9B", fontSize: "1.75rem" }}
                    />
                  </>
                ) : (
                  <>
                    <NotificationsOutlined
                      sx={{ color: "#1D5D9B", fontSize: "1.75rem" }}
                    />
                  </>
                )}
              </div>
              <div
                className = {`${selectedIcon === "profile" && "bg-secondaryDark"} rounded p-1`}
                onClick={() => {
                  setSelectedIcon("profile")
                  revalidatePage(`profile/${session?.user.username}`)
                  router.push(`profile/${session?.user.username}`);
                }}
              >
                {pathName === `/profile/${session?.user.username}` ? (
                  <>
                    <Person sx={{ color: "#1D5D9B", fontSize: "1.75rem" }} />
                  </>
                ) : (
                  <>
                    <PersonOutlined
                      sx={{ color: "#1D5D9B", fontSize: "1.75rem" }}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
