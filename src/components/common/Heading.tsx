import React from "react";

interface Props {
  children: React.ReactNode;
}

const Heading = (props: Props) => {
  return (
    <div>
      <h1 className="text-[18px] font-semibold text-gray4B pb-5">
        {props.children}
      </h1>
    </div>
  );
};

export default Heading;
