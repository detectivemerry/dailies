import React from "react";

import { Post } from "@/types/model";
import PostCard from "@/components/post/PostCard";
import SectionHeader from "@/components/header/SectionHeader";

interface HomeContentProps {
  subscribedPosts: Post[];
}

export default function HomeContent({ subscribedPosts }: HomeContentProps) {
  return (
    <div className="flex flex-col">
      <div className="-mb-4">
        <SectionHeader>Popular Communities</SectionHeader>
      </div>
      <div>
        {subscribedPosts &&
          subscribedPosts.map((post) => (
            <PostCard post={post} key={String(post._id)} />
          ))}
      </div>
    </div>
  );
}
