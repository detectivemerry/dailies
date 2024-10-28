import React from 'react'
import { decryptData } from "@/app/lib/encryption/encryption";
import EditPostForm from './EditPostForm'

interface EditPostPageProps {
    params : {
        postId : string
    }
}

export default async function EditPostPage({params} : EditPostPageProps) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/post`, {
    method : "GET",
    headers : {"postId" : params.postId},
    cache : "no-store",
  })

  const {data : post} = await response.json();

  return (
    <div className = "w-screen lg:w-[24.5rem]">
        <EditPostForm post = {post}/>
    </div>
  )
}
