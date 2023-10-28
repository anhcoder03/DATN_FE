import React from "react";

const Row = ({
  children,
  className = "grid-cols-4",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`grid items-start mb-3 text-sm gap-x-6 ${className}`}>
      {children}
    </div>
  );
};

export default Row;
