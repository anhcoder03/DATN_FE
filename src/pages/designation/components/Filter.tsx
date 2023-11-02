import { IconSearch } from "../../../components/icons";
import {
  optionPaymentStatus,
  optionStatusDesignation,
} from "../../../constants/options";
import Flatpickr from "react-flatpickr";
import { Vietnamese } from "flatpickr/dist/l10n/vn";
import IconCalendarBlack from "../../../assets/images/icon/ic_calendar-black.svg";
import Select from "react-select";
type TFilterCustomer = {
  handleSearch: (e: any) => void;
  handleDoctorChange: (selectedOption: any) => void;
  handleClinicChange: (selectedOption: any) => void;
  handleStatusChange: (selectedOption: any) => void;
  handlePaymentStatusChange?: (selectedOption: any) => void;
  handleDayChange: (date: any) => void;
  dataDoctor: any[];
  dataClinic: any[];
};

const Filter = ({
  handleSearch,
  handleDoctorChange,
  handleDayChange,
  handleClinicChange,
  handleStatusChange,
  handlePaymentStatusChange,
  dataDoctor,
  dataClinic,
}: TFilterCustomer) => {
  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      handleSearch(e.target.value);
    }
  };
  return (
    <div className="">
      <div className="grid grid-cols-1 gap-y-5 items-center justify-between p-5 bg-white rounded-tl-lg rounded-tr-lg">
        <div className="flex items-center gap-2 filter-wrapper">
          <div className="filter-search flex items-center bg-transparent border border-gray-200 px-2 py-1 gap-2 rounded-lg h-[40px] min-w-[350px]">
            <IconSearch></IconSearch>
            <input
              type="text"
              className="w-full bg-transparent border-none outline-none"
              placeholder="Mã dịch vụ"
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="filter-doctor">
            <Select
              className="react-select !z-[9999]"
              classNamePrefix="react-select"
              placeholder="-Bác sĩ-"
              options={dataDoctor}
              onChange={handleDoctorChange}
            ></Select>
          </div>
          <div className="filter-room">
            <Select
              className="react-select"
              classNamePrefix="react-select"
              placeholder="-Phòng-"
              options={dataClinic}
              onChange={handleClinicChange}
            ></Select>
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
              placeholder="Ngày chỉ định"
              name="dateOfBirth"
            ></Flatpickr>
            <div className="flex items-center">
              <img src={IconCalendarBlack} alt="icon" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 items-center gap-x-2">
          <div className="filter-doctor">
            <Select
              className="react-select"
              classNamePrefix="react-select"
              placeholder="-Trạng thái thực hiện-"
              options={optionStatusDesignation}
              onChange={handleStatusChange}
            ></Select>
          </div>
          <div className="filter-room">
            <Select
              className="react-select"
              classNamePrefix="react-select"
              placeholder="-Trạng thái thanh toán-"
              options={optionPaymentStatus}
              onChange={handlePaymentStatusChange}
            ></Select>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Filter;
