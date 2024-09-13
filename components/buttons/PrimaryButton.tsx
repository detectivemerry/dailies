import React, { FC } from "react";
import { Button, Typography } from "@mui/material";
import ButtonSpinner from "../loading/ButtonSpinner";
    
interface PrimaryButtonProps {
  text: string;
  onClick?: () => void;
  pending? : boolean;
}

const PrimaryButton: FC<PrimaryButtonProps> = ({ text, onClick, pending = false }) => {
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
        },
        fontSize : "1.125rem",
      }}
      disableElevation={true}
      onClick={onClick}
      type = "submit"
    >
      {pending? <ButtonSpinner size = {"2rem"} /> : <>{text}</>}
    </Button>
  );
};

export default PrimaryButton;
