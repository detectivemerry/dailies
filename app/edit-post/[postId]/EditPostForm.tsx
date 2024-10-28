"use client"

import React, { useEffect } from "react";
import { decryptData } from "@/app/lib/encryption/encryption";

interface EditPostPageProps {
  postId: string;
}

export default function EditPostForm({ postId }: EditPostPageProps) {
  const decrpytedPostId = decryptData(postId)

  useEffect(() => {
    console.log(decrpytedPostId)
  }, [])

  return <div>EditPostForm</div>;
}
