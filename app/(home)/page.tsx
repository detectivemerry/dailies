import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { Post, UserSubscribedCommunity } from "@/types/model";
import HomeContent from "./HomeContent";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const subscribedResponse = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/user`,
    {
      method: "GET",
      headers: { username: session?.user.username },
      cache: "no-store",
    }
  );

  const { data: userData } = await subscribedResponse.json();
  const subscribedCommunityNames = Array.isArray(userData.subscribedCommunities)
    ? userData.subscribedCommunities.map(
        (community: UserSubscribedCommunity) => community.name
      )
    : [];

  const postsResponse = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/posts`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  const { data: posts } = await postsResponse.json();
  const subscribedPosts = posts.filter((post: Post) =>
    subscribedCommunityNames.includes(String(post.goalName))
  );

  subscribedPosts.reverse();

  return (
    <>
      <div className="flex flex-col w-screen lg:w-[24.5rem]">
        <HomeContent subscribedPosts={subscribedPosts} email = {session?.user.email} />
      </div>
    </>
  );
}
