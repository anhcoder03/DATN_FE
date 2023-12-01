import { IconSearch } from "../../../components/icons";
import {
  optionDoctor,
  optionOrderPaymentStatus,
  optionOrderStatus,
  optionOrderType,
} from "../../../constants/options";
import Flatpickr from "react-flatpickr";
import { Vietnamese } from "flatpickr/dist/l10n/vn";
import IconCalendarBlack from "../../../assets/images/icon/ic_calendar-black.svg";
import Select from "react-select";
type TFilterCustomer = {
  handleSearch: (e: any) => void;
  handleChangeOrderType: (e: any) => void;
  handleChangeStatusPayment: (e: any) => void;
  handleChangeStatus: (e: any) => void;
  handleDayChange: (day: any) => void;
};

const Filter = ({
  handleSearch,
  handleChangeOrderType,
  handleChangeStatusPayment,
  handleChangeStatus,
  handleDayChange,
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
              placeholder="Mã đơn hàng"
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="filter-room">
            <Select
              className="react-select"
              classNamePrefix="react-select"
              placeholder="-Loại đơn-"
              options={optionOrderType}
              onChange={handleChangeOrderType}
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
              placeholder="Ngày bán"
              name="dateOfBirth"
            ></Flatpickr>
            <div className="flex items-center">
              <img src={IconCalendarBlack} alt="icon" />
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-5 items-center gap-x-5 justify-between  pb-5 pl-5 bg-white rounded-tl-lg rounded-tr-lg">
        <div className="filter-room">
          <Select
            className="react-select"
            classNamePrefix="react-select"
            placeholder="-Trạng thái thanh toán-"
            options={optionOrderPaymentStatus}
            onChange={handleChangeStatusPayment}
          ></Select>
        </div>
        <div className="filter">
          <Select
            className="react-select"
            classNamePrefix="react-select"
            placeholder="-Trạng thái thực hiện-"
            options={optionOrderStatus}
            onChange={handleChangeStatus}
          ></Select>
        </div>
      </div>
    </div>
  );
};
export default Filter;
