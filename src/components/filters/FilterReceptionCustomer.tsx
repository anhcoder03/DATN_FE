import React, { startTransition, useEffect, useState } from "react";
import { IconPlus, IconSearch, IconSetting } from "../icons";
import Flatpickr from "react-flatpickr";
import { Vietnamese } from "flatpickr/dist/l10n/vn";
import IconCalendarBlack from "../../assets/images/icon/ic_calendar-black.svg";
import Select from "react-select";
import { ModalReception } from "../modal";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import moment from "moment";
import IconTrash2 from "../../assets/images/icon-trash2.png";

type TFilterReceptionCustomer = {
  handleSearch: (e: any) => void;
  handleDayChange: (day: any) => void;
  handleSearchByStaffId: (id: any) => void;
  handleSearchByDoctorId: (id: any) => void;
  handleClinicChange: (id: any) => void;
  columns: any;
  dataStaffs: any[];
  dataDoctors: any[];
  clinics: any[];
  day_welcome: any,
  setQuery: any,
  query: any
};

const FilterReceptionCustomer = ({
  columns,
  handleSearch,
  handleDayChange,
  handleSearchByStaffId,
  handleSearchByDoctorId,
  handleClinicChange,
  dataStaffs,
  dataDoctors,
  clinics,
  day_welcome,
  setQuery,
  query
}: TFilterReceptionCustomer) => {
  
  const auth: any = useSelector((state: RootState) => state.auth.auth?.user);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<any>();
  const navigate = useNavigate();
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

  useEffect(() => {
    // format date
    if(day_welcome !== null) {
      const parsedDate = new Date(day_welcome);
      const formattedDate = parsedDate.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
      setDate(formattedDate)
    }else {
      setDate(day_welcome)
    }
  },[day_welcome])

  

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
                dateFormat: "d/m/Y",
                altInputClass: 'date-range',
              }}
              onChange={([date]) => {
                handleDayChange(date);
              }}
              placeholder="Ngày tiếp đón"
              value={[date]}
            ></Flatpickr>
            <div className="flex items-center w-4 cursor-pointer" onClick={() => setQuery({
              ...query,
              day_welcome: null
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
          {auth?.role?.roleNumber == 1 || auth?.role?.roleNumber == 3 ? null : (
            <div
              className="flex gap-2 px-3 py-2 rounded-lg bg-primary cursor-pointer"
              onClick={() => {
                if (
                  auth?.role?.roleNumber == 1 ||
                  auth?.role?.roleNumber == 3
                ) {
                  toast.warning("Bạn không có quyền thực hiện hành động này!");
                  return;
                }
                navigate("/reception/add");
              }}
            >
              <div className="flex items-center p-1 bg-white rounded-lg text-primary">
                <IconPlus></IconPlus>
              </div>
              <span className="flex items-center text-sm text-white">Thêm</span>
            </div>
          )}
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
