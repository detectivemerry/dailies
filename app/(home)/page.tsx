import Image from "next/image";
import connectDB from "@/app/lib/mongodb";
import CreateGoalButton from "./CreateGoalButton";
import TemporaryLogOutButton from "./TemporaryLogOutButton";
import PostCard from "@/components/post/PostCard";

export async function testDB() {
  await connectDB();
  return {
    props: {},
  };
}

testDB();

export default function Home() {

  const examplePost = {
    caption: "hello this is my 2nd post POG!!",
    goalId: "66c20d414293b6fbac0507b7",
    imageUrl:
      "https://dailies-image-bucket.s3.ap-southeast-1.amazonaws.com/5d0fcd02d4494f56810a719f9e68c957.png",
    postedDateTime: "2024-10-11T16:04:22.878Z",
    _id: "66c20d414293b6fbac0507b7",
  };

  return (
    <>
      <div className="flex flex-col">
        <div>
          <CreateGoalButton />
        </div>
        <div>
          <TemporaryLogOutButton />
        </div>
        <div>
          <PostCard post = {examplePost} />
        </div>
        <div>This is home truly.</div>
      </div>
    </>
  );
}
