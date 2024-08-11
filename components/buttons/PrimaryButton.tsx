import React, { FC } from "react";
import { Button, Typography } from "@mui/material";

interface PrimaryButtonProps {
  text: string;
  onClick?: () => void;
}

const PrimaryButton: FC<PrimaryButtonProps> = ({ text, onClick }) => {
  return (
    <Button
      variant="contained"
      sx={{
        width: "20rem",
        borderRadius: "25px",
        fontWeight : "bold",
        color : "#1D5D9B",
        backgroundColor : "#FBEEAC",
        textTransform : "none",
        ':hover' : {
          backgroundColor : "#F9E47B",
        }
      }}
      disableElevation={true}
      onClick={onClick}
      type = "submit"
    >
      {text}
    </Button>
  );
};

export default PrimaryButton;
