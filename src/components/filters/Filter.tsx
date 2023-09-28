import React, { useState } from "react";
import { IconPlus, IconSearch, IconSetting } from "../icons";
import { Link } from "react-router-dom";
import AppModal from "../modal/ModalExamination";
import AppSelect from "../select/Select";
import { optionClinic, optionDoctor } from "../../constants/options";
import Flatpickr from "react-flatpickr";
import { Vietnamese } from "flatpickr/dist/l10n/vn";
import IconCalendarBlack from "../../assets/images/icon/ic_calendar-black.svg";
import Select from "react-select";
const Filter = (props: any) => {
  const { columns } = props;
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <div className="">
      <div className="flex justify-between bg-white flex-wrap p-5 items-center rounded-tl-lg rounded-tr-lg">
        <div className="filter-wrapper flex items-center gap-2">
          <div className="filter-search flex items-center bg-transparent border border-gray-200 px-2 py-1 gap-2 rounded-lg h-[40px]">
            <IconSearch></IconSearch>
            <input
              type="text"
              className="bg-transparent outline-none border-none"
              placeholder="Tên bệnh nhân"
            />
          </div>
          <div className="filter-status">
            <Select
              className="react-select"
              classNamePrefix="react-select"
              placeholder="-Phòng khám-"
              options={optionClinic}
              // onChange={(value: any) => {
              //     handleChange({ target: { name: 'status', value: value.value } })
              // }}
              // value={StatusList?.filter((option: any) => filter?.status === option.value)}
            ></Select>
          </div>
          <div className="filter-doctor">
            <Select
              className="react-select"
              classNamePrefix="react-select"
              placeholder="-Bác sĩ-"
              options={optionDoctor}
              // onChange={(value: any) => {
              //     handleChange({ target: { name: 'status', value: value.value } })
              // }}
              // value={StatusList?.filter((option: any) => filter?.status === option.value)}
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
              // onChange={([date]) => {
              //   setValue("dateOfBirth", date);
              // }}
              placeholder="dd/mm/yyyy"
              name="dateOfBirth"
            ></Flatpickr>
            <div className="flex items-center">
              <img src={IconCalendarBlack} alt="icon" />
            </div>
          </div>
        </div>
        <div className="flex items-end gap-2">
          <button
            className="bg-grayF3 py-2 px-3 rounded-lg"
            onClick={showModal}
          >
            <IconSetting></IconSetting>
          </button>
          <Link to={"#"} className="flex bg-primary py-2 px-3 rounded-lg gap-2">
            <div className="bg-white rounded-lg text-primary flex items-center p-1">
              <IconPlus></IconPlus>
            </div>
            <span className="text-white text-sm flex items-center">Thêm</span>
          </Link>
        </div>
      </div>
      <AppModal
        headings={columns}
        open={open}
        loading={loading}
        handleCancel={handleCancel}
        handleOk={handleOk}
      ></AppModal>
    </div>
  );
};

export default Filter;
