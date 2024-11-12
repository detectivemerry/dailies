import React, { FC } from "react";
import { Button, ButtonProps, Typography } from "@mui/material";
import ButtonSpinner from "../loading/ButtonSpinner";

interface SecondaryButtonProps extends ButtonProps {
  text: string;
  onClick?: () => void;
  pending?: boolean
}

const SecondaryButton: FC<SecondaryButtonProps> = ({ text, onClick, pending, ...props }) => {
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
      {pending? <ButtonSpinner size = {"1rem"} /> : <>{text}</>}
    </Button>
  );
};

export default SecondaryButton;
