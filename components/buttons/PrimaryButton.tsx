import React, { FC } from "react";
import { Button, ButtonProps, Typography } from "@mui/material";
import ButtonSpinner from "../loading/ButtonSpinner";
    
interface PrimaryButtonProps extends ButtonProps {
  text: string;
  onClick?: () => void;
  pending? : boolean;
}

const PrimaryButton: FC<PrimaryButtonProps> = ({ text, onClick, pending = false, ...props}) => {
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
        paddingY : "0.5rem"
      }}
      disableElevation={true}
      onClick={onClick}
      {...props}
      type = "submit"
    >
      {pending? <ButtonSpinner size = {"1.5rem"} /> : <>{text}</>}
    </Button>
  );
};

export default PrimaryButton;
