import React from "react";
import Select from "react-select";
import { IOption } from "../../constants/options";

const AppSelect = ({
  options,
  width = "150px",
}: {
  options: IOption[];
  width?: string;
}) => {
  return (
    <Select
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          borderColor: state.isFocused ? "gray" : "gray",
          width: width,
        }),
      }}
      defaultValue={options[0]}
      className="text-gray16"
      options={options}
    />
  );
};

export default AppSelect;
