import React, { FC } from 'react'
import { CircularProgress } from '@mui/material'

interface ButtonSpinnerProps {
  size : string;
}

const ButtonSpinner: FC<ButtonSpinnerProps> = ({size}) => {
  return (
    <CircularProgress size = {size} color='primary'/>
  )
}

export default ButtonSpinner; 
