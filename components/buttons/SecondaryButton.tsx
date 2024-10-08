import React, { FC } from "react";
import { Button, Typography } from "@mui/material";
import { PropaneSharp } from "@mui/icons-material";

interface SecondaryButtonProps {
  text: string;
  onClick?: () => void;
}

const SecondaryButton: FC<SecondaryButtonProps> = ({ text, onClick, ...props }) => {
  return (
    <Button
      variant="outlined"
      sx={{
        width: "20rem",
        borderRadius: "25px",
        textTransform : "none",
        fontWeight : "bold",
      }}
      onClick={onClick}
      {...props}
    >
      {text}
    </Button>
  );
};

export default SecondaryButton;
