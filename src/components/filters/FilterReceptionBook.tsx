import React, { useState } from "react";
import { IconPlus, IconSearch, IconSetting } from "../icons";
import { Link } from "react-router-dom";
import AppModal from "../modal/Modal";
import AppSelect from "../select/Select";
import { optionDoctor, optionNVCS } from "../../constants/options";

const FilterReceptionBook = () => {
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
          <div className="filter-search flex items-center bg-transparent border border-gray-200 px-2 py-1 gap-2 rounded-lg h-[40px] min-w-[350px]">
            <IconSearch></IconSearch>
            <input
              type="text"
              className="bg-transparent outline-none border-none w-full"
              placeholder="Tên, số điện thoại hoặc mã bệnh nhân"
            />
          </div>
          <div className="filter-date flex items-center bg-transparent border border-gray-200 px-2 py-1 gap-2 rounded-lg h-[40px] ">
            <input
              type="date"
              className="bg-transparent outline-none border-none"
            />
          </div>
          <div className="filter-nvcs">
            <AppSelect options={optionNVCS} width="300px"></AppSelect>
          </div>
          <div className="filter-doctor">
            <AppSelect options={optionDoctor}></AppSelect>
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
        open={open}
        loading={loading}
        handleCancel={handleCancel}
        handleOk={handleOk}
      ></AppModal>
    </div>
  );
};

export default FilterReceptionBook;
