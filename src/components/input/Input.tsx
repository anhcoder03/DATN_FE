import React from "react";
import { useController } from "react-hook-form";

interface IInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  children?: React.ReactNode;
  control: any;
}

const Input = ({
  className = "input-primary",
  children,
  type,
  name = "",
  placeholder,
  control,
  ...rest
}: IInputProps) => {
  const { field } = useController({
    name,
    control,
    defaultValue: "",
  });
  return (
    <div className="relative">
      <input
        type={type}
        id={name}
        placeholder={placeholder}
        {...field}
        {...rest}
        className={`w-full h-[34px] text-[12px] placeholder:text-[12px] ${className}`}
      />
      {children && (
        <div className="absolute right-0 cursor-pointer select-none top-2/4 -translate-y-2/4">
          {children}
        </div>
      )}
    </div>
  );
};

export default Input;
