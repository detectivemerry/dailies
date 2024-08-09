"use client";
import { Oxygen } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const oxygen = Oxygen({
  weight: ["400"],
  subsets: ["latin"],
});

const theme = createTheme({
  typography: {
    fontFamily: oxygen.style.fontFamily,
  },
  palette: {
    mode: "light",
    primary: {
      main: "#1D5D9B",
    },
    secondary: {
      main: "#FBEEAC",
    },
  },
});

export default theme;
