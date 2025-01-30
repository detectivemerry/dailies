import React from "react";

interface SectionHeaderProps {
  children : any;
}

export default function SectionHeader({ children } : SectionHeaderProps) {
  return (
      <div className="border-b fixed bg-white h-16 w-full lg:w-[24.5rem] z-10">
        <div className=" fixed left-1/2 transform -translate-x-1/2 top-5 w-auto">
       <p className="text-lg text-main underline underline-offset-[1.45rem]">
         {children}
       </p>
        </div>
      </div>
    // <div className="flex justify-center border-b my-4">
    //   <p className="text-lg text-main underline underline-offset-8">
    //     {children}
    //   </p>
    // </div>
  );
}
