'use client';
import { Oxygen } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const oxygen = Oxygen({
    weight : ['400'],
    subsets : ['latin'],
})

const theme = createTheme({
  typography: {
    fontFamily: oxygen.style.fontFamily,
  },
});

export default theme;