import React, { useState } from "react";
import { IconPlus, IconSearch, IconSetting } from "../icons";
import { Link } from "react-router-dom";
import AppModal from "../modal/Modal";

const Filter = () => {
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
            <select
              name=""
              id=""
              className="h-[40px] w-[200px] bg-transparent border border-gray-200 px-2 py-1 gap-2 rounded-lg outline-none"
            >
              <option value="" className="text-slate-50">
                -Trạng thái-
              </option>
              <option value="">Chờ khám</option>
              <option value="">Đang khám</option>
              <option value="">Đã khám</option>
              <option value="">Đã hủy</option>
              <option value="">Chờ hủy</option>
            </select>
          </div>
          <div className="filter-room">
            <select
              name=""
              id=""
              className="h-[40px] w-[200px] bg-transparent border border-gray-200 px-2 py-1 gap-2 rounded-lg outline-none"
            >
              <option value="">-Phòng khám-</option>
              <option value="">Phòng 1</option>
              <option value="">Tầng 1 P203</option>
              <option value="">Tầng 2 P203</option>
              <option value="">Tầng 3 P203</option>
            </select>
          </div>
          <div className="filter-doctor">
            <select
              name=""
              id=""
              className="h-[40px] w-[200px] bg-transparent border border-gray-200 px-2 py-1 gap-2 rounded-lg outline-none"
            >
              <option value="">-Bác sĩ-</option>
              <option value="">Nguyễn Hồng Sơn</option>
              <option value="">Nguyễn Phi Anh</option>
              <option value="">Chu Tuấn Phương</option>
              <option value="">Trần Minh Hiếu</option>
            </select>
          </div>
          <div className="filter-date flex items-center bg-transparent border border-gray-200 px-2 py-1 gap-2 rounded-lg h-[40px]">
            <input
              type="date"
              className="bg-transparent outline-none border-none"
            />
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

export default Filter;
