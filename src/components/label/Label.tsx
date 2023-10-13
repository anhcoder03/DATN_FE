import React from "react";

const Label = ({
  htmlFor,
  className = "text-gray81",
  children
}: {
  htmlFor: string;
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <label htmlFor={htmlFor} className={` ${className}`}>
      {children}
    </label>
  );
};

export default Label;
