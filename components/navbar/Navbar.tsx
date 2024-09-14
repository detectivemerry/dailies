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
import { Button } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";

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

  return (
    <>
      {!pagesWithoutNavbar.includes(pathName) && (
        <div className="fixed bottom-0 w-[26.85rem] bg-secondary h-min-screen py-2 rounded-t-2xl">
          <div className="flex justify-around gap-8">
            <div className="flex gap-4">
              <div>
                <Button
                  onClick={() => {
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
                </Button>
              </div>
              <div>
                <Button
                  onClick={() => {
                    router.push("/explore");
                  }}
                >
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
                </Button>
              </div>
            </div>
            <div className="bg-secondaryDark fixed bottom-4 rounded-full py-2">
              <Button
                onClick={() => {
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
                    <AddOutlined
                      sx={{ color: "#1D5D9B", fontSize: "2.25rem" }}
                    />
                  </>
                )}
              </Button>
            </div>
            <div className="flex gap-4">
              <div>
                <Button
                  onClick={() => {
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
                </Button>
              </div>
              <div>
                <Button
                  onClick={() => {
                    router.push("/profile");
                  }}
                >
                  {pathName === "/profile" ? (
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
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
