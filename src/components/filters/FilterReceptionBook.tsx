import React, { useState } from "react";
import { IconPlus, IconSearch, IconSetting } from "../icons";
import Select from "react-select";
import { ModalBooking } from "../modal";
import Flatpickr from "react-flatpickr";
import { Vietnamese } from "flatpickr/dist/l10n/vn";
import IconCalendarBlack from "../../assets/images/icon/ic_calendar-black.svg";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

type TFilterCustomer = {
  handleSearch: (e: any) => void;
  handleDayChange: (day: any) => void;
  handleSearchByStaffId: (id: any) => void;
  columns: any;
  dataStaffs: any[];
};

const FilterReceptionBook = ({
  columns,
  handleDayChange,
  handleSearch,
  dataStaffs,
  handleSearchByStaffId,
}: TFilterCustomer) => {
  const auth: any = useSelector((state: RootState) => state.auth.auth?.user);
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      handleSearch(e.target.value);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="">
      <div className="flex flex-wrap items-center justify-between p-5 bg-white rounded-tl-lg rounded-tr-lg">
        <div className="flex items-center gap-2 filter-wrapper">
          <div className="filter-search flex items-center bg-transparent border border-gray-200 px-2 py-1 gap-2 rounded-lg h-[40px] min-w-[350px]">
            <IconSearch></IconSearch>
            <input
              type="text"
              className="w-full bg-transparent border-none outline-none"
              placeholder="Tên, số điện thoại hoặc mã bệnh nhân"
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
              placeholder="Ngày đặt lịch"
            ></Flatpickr>
            <div className="flex items-center">
              <img src={IconCalendarBlack} alt="icon" />
            </div>
          </div>
          <Select
            options={dataStaffs}
            className="react-select w-full"
            classNamePrefix="react-select select-small"
            placeholder="-Nhân viên tiếp đón-"
            onChange={handleSearchByStaffId}
          ></Select>
        </div>
        <div className="flex items-end gap-2">
          <button
            className="px-3 py-2 rounded-lg bg-grayF3"
            onClick={showModal}
          >
            <IconSetting></IconSetting>
          </button>
          {
            auth?.role?.roleNumber == 1 ? null : (
              <div
                className="flex gap-2 px-3 py-2 rounded-lg bg-primary cursor-pointer"
                onClick={() => {
                  if(auth?.role?.roleNumber == 1 || auth?.role?.roleNumber == 3) {
                    toast.warning('Bạn không có quyền thực hiện hành động này!')
                    return
                  }
                  navigate("/reception/addBooking");
                }}
              >
                <div className="flex items-center p-1 bg-white rounded-lg text-primary">
                  <IconPlus></IconPlus>
                </div>
                <span className="flex items-center text-sm text-white">Thêm</span>
              </div>
            )
          }
          
        </div>
      </div>
      <ModalBooking
        open={open}
        handleCancel={handleCancel}
        handleOk={handleOk}
        headings={columns}
      ></ModalBooking>
    </div>
  );
};

export default FilterReceptionBook;
