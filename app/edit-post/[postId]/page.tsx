import React from 'react'
import { decryptData } from "@/app/lib/encryption/encryption";
import EditPostForm from './EditPostForm'

interface EditPostPageProps {
    params : {
        postId : string
    }
}

export default async function EditPostPage({params} : EditPostPageProps) {
  const postId = decodeURIComponent(params.postId)
  const decrpytedPostId = await decryptData(postId)

  return (
    <div>
        <EditPostForm postId = {decrpytedPostId}/>
    </div>
  )
}
