import React from "react";

const Field = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col justify-between gap-y-1 form-group">
      {children}
    </div>
  );
};

export default Field;
