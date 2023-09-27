import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IconPlus, IconSearch } from "../../../components/icons";
import AppSelect from "../../../components/select/Select";
import AppModal from "../../../components/modal/Modal";
import { optionClinic } from "../../../constants/options";

const FilterCustomer = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

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
      <div className="flex flex-wrap items-center justify-between p-5 bg-white rounded-tl-lg rounded-tr-lg">
        <div className="flex items-center gap-2 filter-wrapper">
          <div className="filter-search flex items-center bg-transparent border border-gray-200 px-2 py-1 gap-2 rounded-lg h-[40px] min-w-[350px]">
            <IconSearch></IconSearch>
            <input
              type="text"
              className="w-full bg-transparent border-none outline-none"
              placeholder="Tên, số điện thoại hoặc mã bệnh nhân"
            />
          </div>
          <div className="filter-status">
            <AppSelect options={optionClinic}></AppSelect>
          </div>
          <div className="filter-room"></div>
          <div className="filter-doctor">
            <AppSelect options={optionClinic}></AppSelect>
          </div>
          <div className="filter-date flex items-center bg-transparent border border-gray-200 px-2 py-1 gap-2 rounded-lg h-[40px]">
            <input
              type="date"
              className="bg-transparent border-none outline-none"
            />
          </div>
        </div>
        <div className="flex items-end gap-2">
          <Link
            to={"/customer/add"}
            className="flex gap-2 px-3 py-2 rounded-lg bg-primary"
          >
            <div className="flex items-center p-1 bg-white rounded-lg text-primary">
              <IconPlus></IconPlus>
            </div>
            <span className="flex items-center text-sm text-white">Thêm</span>
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

export default FilterCustomer;
