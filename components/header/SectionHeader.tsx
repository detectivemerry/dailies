import React from "react";

interface SectionHeaderProps {
  children : any;
}

export default function SectionHeader({ children } : SectionHeaderProps) {
  return (
    <div className="flex justify-center border-b my-4">
      <p className="text-lg text-main underline underline-offset-8">
        {children}
      </p>
    </div>
  );
}
