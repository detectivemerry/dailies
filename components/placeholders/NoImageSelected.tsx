import React from "react";
import { CollectionsOutlined } from "@mui/icons-material";

export default function NoImageSelected() {
  return (
    <div className="flex flex-col items-center gap-6 h-full justify-center">
      <div className = "text-secondaryText">No image selected</div>
      <div>
        <CollectionsOutlined sx = {{color: "#D3D3D3", fontSize : "6rem"}} />
      </div>
    </div>
  );
}
