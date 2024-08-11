import React, { FC } from "react";
import { Button, Typography } from "@mui/material";

interface SecondaryButtonProps {
  text: string;
  onClick?: () => void;
}

const SecondaryButton: FC<SecondaryButtonProps> = ({ text, onClick }) => {
  return (
    <Button
      variant="outlined"
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

export default SecondaryButton;
