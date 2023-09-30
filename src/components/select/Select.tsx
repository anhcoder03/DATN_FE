import Select from "react-select";
import { IOption } from "../../constants/options";

const AppSelect = ({
  options,
  width = "150px",
  name,
  menuPlacement,
}: {
  options: IOption[] | any;
  width?: string;
  name?: string;
  menuPlacement?: string;
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
      name={name}
      defaultValue={options[0]}
      className="text-gray16"
      options={options}
      menuPlacement={menuPlacement}
    />
  );
};

export default AppSelect;
