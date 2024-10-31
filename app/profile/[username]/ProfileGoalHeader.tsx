import React from "react";
import { useRouter } from "next/navigation";
import SecondaryButton from "@/components/buttons/SecondaryButton";

export default function ProfileGoalHeader() {
  const router = useRouter();
  return (
    <div className="flex justify-end my-3 w-full">
      <SecondaryButton
        text="Add new Goal"
        onClick={() => {
          router.push("/post");
        }}
        sx={{
          width: "8rem",
          marginRight: "1rem",
          textTransform: "none",
          borderRadius: "30px",
          fontWeight: "bold",
        }}
      />
    </div>
  );
}