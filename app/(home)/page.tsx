import Image from "next/image";
import connectDB from "@/app/lib/mongodb";
import CreateGoalButton from "./CreateGoalButton";
import TemporaryLogOutButton from "./TemporaryLogOutButton";

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
        <div>
          <CreateGoalButton />
        </div>
        <div>
          <TemporaryLogOutButton />
        </div>
        <div>This is home truly.</div>
      </div>
    </>
  );
}
