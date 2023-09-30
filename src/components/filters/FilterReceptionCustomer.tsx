import React, { useState } from "react";
import { IconPlus, IconSearch, IconSetting } from "../icons";
import { Link } from "react-router-dom";
import AppSelect from "../select/Select";
import {
  optionClinic,
  optionDoctor,
  optionNVTD,
} from "../../constants/options";
import { ModalReception } from "../modal";

const FilterReceptionCustomer = (props: any) => {
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
          <div className="filter-search flex items-center bg-transparent border border-gray-200 px-2 py-1 gap-2 rounded-lg h-[40px] min-w-[350px]">
            <IconSearch></IconSearch>
            <input
              type="text"
              className="w-full bg-transparent border-none outline-none"
              placeholder="Tên, số điện thoại hoặc mã bệnh nhân"
            />
          </div>
          <div className="filter-date flex items-center bg-transparent border border-gray-200 px-2 py-1 gap-2 rounded-lg h-[40px] ">
            <input
              type="date"
              className="bg-transparent border-none outline-none"
            />
          </div>
          <div className="filter-doctor">
            <AppSelect options={optionDoctor}></AppSelect>
          </div>
          <div className="filter-clinic">
            <AppSelect options={optionClinic}></AppSelect>
          </div>
          <div className="filter-nvtd">
            <AppSelect options={optionNVTD}></AppSelect>
          </div>
        </div>
        <div className="flex items-end gap-2">
          <button
            className="px-3 py-2 rounded-lg bg-grayF3"
            onClick={showModal}
          >
            <IconSetting></IconSetting>
          </button>
          <Link to={"#"} className="flex gap-2 px-3 py-2 rounded-lg bg-primary">
            <div className="flex items-center p-1 bg-white rounded-lg text-primary">
              <IconPlus></IconPlus>
            </div>
            <span className="flex items-center text-sm text-white">Thêm</span>
          </Link>
        </div>
      </div>
      <ModalReception
        open={open}
        handleCancel={handleCancel}
        handleOk={handleOk}
        headings={columns}
      ></ModalReception>
    </div>
  );
};

export default FilterReceptionCustomer;
