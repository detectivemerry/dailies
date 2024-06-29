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
      }}
      onClick={onClick}
      type = "submit"
    >
      {text}
    </Button>
  );
};

export default PrimaryButton;
