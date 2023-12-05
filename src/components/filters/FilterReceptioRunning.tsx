import React, { useState } from "react";
import { IconSearch, IconSetting } from "../icons";
import Flatpickr from "react-flatpickr";
import { Vietnamese } from "flatpickr/dist/l10n/vn";
import IconCalendarBlack from "../../assets/images/icon/ic_calendar-black.svg";
import Select from "react-select";
import { ModalWaiting } from "../modal";
import IconTrash2 from "../../assets/images/icon-trash2.png";

const FilterReceptionRunning = (props: any) => {
  const { 
    columns,
    handleSearch,
    handleDayChange,
    handleSearchByStaffId,
    handleSearchByDoctorId,
    handleClinicChange,
    dataStaffs,
    dataDoctors,
    clinics,
    setQuery,
    query,
    day_waiting
  } = props;
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

  return (
    <div className="">
      <div className="flex flex-wrap items-center justify-between gap-5 p-5 bg-white rounded-tl-lg rounded-tr-lg">
        <div className="flex items-center gap-2 filter-wrapper">
          <div className="filter-search flex items-center bg-transparent border border-gray-200 px-2 py-1 gap-2 rounded-lg h-[40px] min-w-[300px]">
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
              }}
              onChange={([date]) => {
                handleDayChange(date);
              }}
              placeholder="Ngày tiếp đón"
              value={[day_waiting]}
            ></Flatpickr>
            <div className="flex items-center w-4 cursor-pointer" onClick={() => setQuery({
              ...query,
              day_waiting: null
            })}>
              <img src={IconTrash2} alt="icon" />
            </div>
            <div className="flex items-center">
              <img src={IconCalendarBlack} alt="icon" />
            </div>
          </div>
          <Select
            options={dataDoctors}
            className="react-select"
            classNamePrefix="react-select select-small"
            placeholder="-Bác sĩ-"
            onChange={handleSearchByDoctorId}
          ></Select>
          <Select
            options={clinics}
            className="react-select"
            classNamePrefix="react-select select-small"
            placeholder="-Phòng khám-"
            onChange={handleClinicChange}
          ></Select>
          <Select
            options={dataStaffs}
            className="react-select"
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
          {/* <Link to={"#"} className="flex gap-2 px-3 py-2 rounded-lg bg-primary">
            <div className="flex items-center p-1 bg-white rounded-lg text-primary">
              <IconPlus></IconPlus>
            </div>
            <span className="flex items-center text-sm text-white">Thêm</span>
          </Link> */}
        </div>
      </div>
      <ModalWaiting
        open={open}
        handleCancel={handleCancel}
        handleOk={handleOk}
        headings={columns}
      ></ModalWaiting>
    </div>
  );
};

export default FilterReceptionRunning;
