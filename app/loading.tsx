import { CircularProgress } from '@mui/material'
import React from 'react'

export default function Loading() {
  return (
    <div className = "h-[90vh] flex items-center justify-center">
      <CircularProgress />
    </div>
  )
}
