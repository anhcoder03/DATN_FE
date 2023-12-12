import React from "react";
import styled from "styled-components";
import { PRESCRIPTION_STATUS } from "../../constants/define";

const LabelStatusStyles = styled.span`
  display: inline-block;
  padding: 6px 10px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 400;
`;
type LabelStatusType = {
  type:
    | PRESCRIPTION_STATUS.PENDDING
    | PRESCRIPTION_STATUS.DONE
    | PRESCRIPTION_STATUS.CANCEL;
};
const LabelPrescription = ({ type }: LabelStatusType) => {
  let children = "";
  let styleClassName = "text-gray-500 bg-gray-100";
  switch (type) {
    case PRESCRIPTION_STATUS.PENDDING:
      styleClassName = "text-[#fff] bg-[#eda119] ";
      children = "Chờ thực hiện";
      break;
    case PRESCRIPTION_STATUS.DONE:
      styleClassName = "text-[#fff] bg-primary";
      children = "Đã thực hiện";
      break;
    case PRESCRIPTION_STATUS.CANCEL:
      children = "Đã hủy";
      styleClassName = "bg-[#fd4858] text-white";
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
export default LabelPrescription;
