import React from "react";
import { useController } from "react-hook-form";

interface ITextarea
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  children?: React.ReactNode;
  control: any;
}

function Textarea({ name = "", placeholder, control, ...rest }: ITextarea) {
  const { field } = useController({
    name,
    control,
    defaultValue: "",
  });
  return (
    <React.Fragment>
      <textarea
        className="outline-none input-primary min-h-[100px]"
        id={name}
        placeholder={placeholder}
        {...field}
        {...rest}
      />
    </React.Fragment>
  );
}

export default Textarea;
