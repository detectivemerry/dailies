import { AddchartOutlined } from "@mui/icons-material";
import React from "react";

export default function NoGoals() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 mt-52">
      <div>
        <AddchartOutlined sx={{ color: "#838383", fontSize : "4rem" }} />
      </div>
      <div className="text-secondaryText">You do not have any goals yet.</div>
    </div>
  );
}
