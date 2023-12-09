import React from "react";
import styled from "styled-components";

const LabelStatusStyles = styled.span`
  display: inline-block;
  padding: 6px 10px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
`;
type LabelStatusType = {
  type: "waiting" | "done" | "canceled" | "running";
};
const LabelStatusDesignationDetail = ({ type }: LabelStatusType) => {
  let children = "";
  let styleClassName = "text-gray-500 bg-gray-100";
  switch (type) {
    case "waiting":
      styleClassName = "text-[#fff] bg-[#eda119]";
      children = "Chờ thực hiện";
      break;
    case "done":
      styleClassName = "text-[#fff] bg-primary";
      children = "Đã thực hiện";
      break;

    case "canceled":
      children = "Đã hủy";
      styleClassName = "bg-[#fd4858] text-white";
      break;

    case "running":
      children = "Đang thực hiện";
      styleClassName = "text-[#fff] btn-info";
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
export default LabelStatusDesignationDetail;
