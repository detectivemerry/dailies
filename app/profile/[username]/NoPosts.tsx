import { AddPhotoAlternate, AddPhotoAlternateOutlined } from '@mui/icons-material'
import React from 'react'

export default function NoPosts() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 mt-64">
      <div>
        <AddPhotoAlternateOutlined sx={{ color: "#838383", fontSize : "4rem" }} />
      </div>
      <div className="text-secondaryText">You do not have any posts yet.</div>
    </div>
  )
}
