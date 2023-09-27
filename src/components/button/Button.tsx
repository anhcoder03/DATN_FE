import React from "react";
import LoadingSpinner from "../common/LoadingSpinner";
import { NavLink } from "react-router-dom";

interface IButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  isLoading?: boolean;
  children: React.ReactNode;
  to?: string;
  className?: string;
}

const Button = (props: IButtonProps) => {
  const styleButton = ` flex items-center justify-center px-10 py-3 text-base font-semibold leading-4 disabled:opacity-50 disabled:pointer-events-none bg-[#48a7001a] rounded-md text-primary  ${props.className}`;
  const child: string | React.ReactNode = props.isLoading ? (
    <LoadingSpinner></LoadingSpinner>
  ) : (
    props.children
  );
  if (props.to !== "" && typeof props.to === "string") {
    return (
      <NavLink to={props.to || ""}>
        <button className={styleButton}>{child}</button>
      </NavLink>
    );
  }
  return (
    <button className={styleButton} {...props}>
      {props.children}
    </button>
  );
};

export default Button;
