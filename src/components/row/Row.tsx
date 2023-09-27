import React from "react";

const Row = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid items-start grid-cols-4 mb-3 text-sm gap-x-6">
      {children}
    </div>
  );
};

export default Row;
