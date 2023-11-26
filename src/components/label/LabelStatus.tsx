import React from "react";
import styled from "styled-components";

const LabelStatusStyles = styled.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 400;
`;
type LabelStatusType = {
  type:
    | "recetion"
    | "waiting"
    | "running"
    | "done"
    | "cancel_schedule"
    | "cancel"
    | "booking";
};
const LabelStatus = ({ type }: LabelStatusType) => {
  let children = "";
  let styleClassName = "text-gray-500 bg-gray-100";
  switch (type) {
    case "recetion":
      styleClassName = "text-[#fff] bg-[#25c2e3]";
      children = "Tiếp đón";
      break;
    case "waiting":
      styleClassName = "text-[#fff] bg-[#eda119]";
      children = "Chờ khám";
      break;
    case "running":
      styleClassName = "text-[#fff] bg-[#6f42c1]";
      children = "Đang khám";
      break;
    case "done":
      styleClassName = "text-[#fff] bg-primary";
      children = "Đã khám";
      break;
    case "cancel_schedule":
      styleClassName = "bg-[#555559] text-[#fff]";
      children = "Đã hủy lịch";
      break;
    case "cancel":
      children = "Đã hủy";
      styleClassName = "bg-[#fd4858] text-white";
      break;
    case "booking":
      children = "Đặt lịch";
      styleClassName = "bg-[#545532] text-white";
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
export default LabelStatus;
