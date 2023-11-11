import React, { useState } from "react";
import { IconPlus, IconSearch, IconSetting } from "../icons";
import { Link } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import { Vietnamese } from "flatpickr/dist/l10n/vn";
import IconCalendarBlack from "../../assets/images/icon/ic_calendar-black.svg";
import Select from "react-select";
import {
  optionClinic,
  optionDoctor,
  optionNVTD,
} from "../../constants/options";
import ModalExamination from "../modal/ModalExamination";

const FilterExamination = (props: any) => {
  const { columns } = props;
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
              placeholder="dd/mm/yyyy"
              name="dateOfBirth"
            ></Flatpickr>
            <div className="flex items-center">
              <img src={IconCalendarBlack} alt="icon" />
            </div>
          </div>
          <Select
            options={optionDoctor}
            className="react-select"
            classNamePrefix="react-select select-small"
            placeholder="-Bác sĩ-"
          ></Select>
          <Select
            options={optionClinic}
            className="react-select"
            classNamePrefix="react-select select-small"
            placeholder="-Phòng khám-"
          ></Select>
          <Select
            options={optionNVTD}
            className="react-select"
            classNamePrefix="react-select select-small"
            placeholder="-Nhân viên tiếp đón-"
          ></Select>
        </div>
        <div className="flex items-end gap-2">
          <button
            className="px-3 py-2 rounded-lg bg-grayF3"
            onClick={showModal}
          >
            <IconSetting></IconSetting>
          </button>
        </div>
      </div>
      <ModalExamination
        open={open}
        handleCancel={handleCancel}
        handleOk={handleOk}
        headings={columns}
      ></ModalExamination>
    </div>
  );
};

export default FilterExamination;
