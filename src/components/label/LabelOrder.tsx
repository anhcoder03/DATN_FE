import React from "react";
import styled from "styled-components";

const LabelStatusStyles = styled.span`
  display: inline-block;
  padding: 6px 10px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 400;
`;
type LabelStatusType = {
  type: 0 | 1 | 2;
};
const LabelOrder = ({ type }: LabelStatusType) => {
  let children = "";
  let styleClassName = "text-gray-500 bg-gray-100";
  switch (type) {
    case 0:
      styleClassName = "text-[#eda119]  ";
      children = "Chờ thực hiện";
      break;
    case 1:
      styleClassName = "text-primary";
      children = "Đã thực hiện";
      break;

    case 2:
      children = "Đã hủy";
      styleClassName = "text-[#fd4858]";
      break;
    default:
      break;
  }
  return (
    <LabelStatusStyles className={`${styleClassName}`}>
      {children}
    </LabelStatusStyles>
  );
};
export default LabelOrder;
