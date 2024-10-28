import React from 'react'
import EditPostForm from './EditPostForm'

interface EditPostPageProps {
    params : {
        postId : string
    }
}

export default function EditPostPage({params} : EditPostPageProps) {
  return (
    <div>
        <EditPostForm postId = {params.postId}/>
    </div>
  )
}
