import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="text-center mt-56">
      <h1>Not found – 404!</h1>
      <div className="text-blue-500 underline">
        <Link href="/">Click here to go back to Home</Link>
      </div>
    </div>
  );
}
