import Image from "next/image";
import connectDB from "@/app/lib/mongodb";
import CreateGoalButton from "./CreateGoalButton";

export async function testDB() {
  await connectDB();

  return {
    props: {},
  };
}

testDB();

export default function Home() {
  return (
    <>
      <div className="flex flex-col">
        <CreateGoalButton />
        <div>This is home truly.</div>
      </div>
    </>
  );
}
