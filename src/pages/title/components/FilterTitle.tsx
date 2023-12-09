import { Link } from "react-router-dom";
import { IconPlus, IconSearch } from "../../../components/icons";
import { optionClinic } from "../../../constants/options";
import Select from "react-select";
type IFilterTitle = {
  handleSearch: (e: any) => void;
  handleStatusChange: (status: any) => void;
};

const FilterTitle = ({ handleSearch, handleStatusChange }: IFilterTitle) => {
  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      handleSearch(e.target.value);
    }
  };
  return (
    <div className="flex flex-wrap items-center justify-between p-5 bg-white rounded-tl-lg rounded-tr-lg">
      <div className="flex items-center gap-2 filter-wrapper">
        <div className="filter-search flex items-center bg-transparent border border-gray-200 px-2 py-1 gap-2 rounded-lg h-[40px] min-w-[350px]">
          <IconSearch></IconSearch>
          <input
            type="text"
            className="w-full bg-transparent border-none outline-none"
            placeholder="Tên chức danh"
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="filter-room"></div>
        <div className="filter-doctor">
          <Select
            className="react-select"
            classNamePrefix="react-select"
            placeholder="-Trạng thái-"
            options={optionClinic}
            onChange={handleStatusChange}
          ></Select>
        </div>
      </div>
    </div>
  );
};
export default FilterTitle;
