import { Link } from "react-router-dom";
import { IconPlus, IconSearch } from "../../../../components/icons";
import IconCalendarBlack from "../../../../assets/images/icon/ic_calendar-black.svg";
import Flatpickr from "react-flatpickr";
import { Vietnamese } from "flatpickr/dist/l10n/vn";

type TFilterPrescription = {
  handleSearch: (e: any) => void;
  handleDayChange: (date: any) => void;
};

const FilterPrescription = ({
  handleSearch,
  handleDayChange,
}: TFilterPrescription) => {
  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      handleSearch(e.target.value);
    }
  };
  return (
    <div className="">
      <div className="flex flex-wrap items-center justify-between p-5 bg-white rounded-tl-lg rounded-tr-lg">
        <div className="flex items-center gap-2 filter-wrapper">
          <div className="filter-search flex items-center bg-transparent border border-gray-200 px-2 py-1 gap-2 rounded-lg h-[40px] min-w-[350px]">
            <IconSearch></IconSearch>
            <input
              type="text"
              className="w-full bg-transparent border-none outline-none"
              placeholder="Tìm kiếm mã đơn"
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="filter-date flex items-center bg-transparent border border-gray-200 px-2 py-1 gap-2 rounded-lg h-[40px]">
            <Flatpickr
              options={{
                locale: Vietnamese,
                allowInput: true,
                dateFormat: "d/m/Y",
                altInputClass: "date-range",
                maxDate: "today",
              }}
              onChange={([date]) => {
                handleDayChange(date);
              }}
              placeholder="dd/mm/yyyy"
              name="dateOfBirth"
            ></Flatpickr>
            <div className="flex items-center">
              <img src={IconCalendarBlack} alt="icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FilterPrescription;
