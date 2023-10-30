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
  type: "waiting" | "done" | "canceled" | "paid" | "unpaid";
};
const LabelStatusDesignation = ({ type }: LabelStatusType) => {
  let children = "";
  let styleClassName = "text-gray-500 bg-gray-100";
  switch (type) {
    case "waiting":
      styleClassName = "text-[#eda119]  ";
      children = "Chờ thực hiện";
      break;
    case "unpaid":
      styleClassName = "text-[#7398bb]  ";
      children = "Chưa thanh toán";
      break;
    case "done":
      styleClassName = "text-primary";
      children = "Đã thực hiện";
      break;
    case "paid":
      styleClassName = "text-primary";
      children = "Đã thanh toán";
      break;
    case "canceled":
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
export default LabelStatusDesignation;
