import Select from "react-select";
import { IOption } from "../../constants/options";

const AppSelect = ({
  options,
  width = "150px",
  name,
}: {
  options: IOption[] | any;
  width?: string;
  name?: string;
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
    />
  );
};

export default AppSelect;
