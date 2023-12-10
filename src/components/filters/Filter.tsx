import React, { useEffect, useState } from "react";
import { IconSearch, IconSetting } from "../icons";
import Flatpickr from "react-flatpickr";
import { Vietnamese } from "flatpickr/dist/l10n/vn";
import IconCalendarBlack from "../../assets/images/icon/ic_calendar-black.svg";
import Select from "react-select";
import { examinationStatus} from "../../constants/options";
import ModalExamination from "../modal/ModalExamination";
import IconTrash2 from "../../assets/images/icon-trash2.png";

type TFilterExamination = {
  handleSearch: (e: any) => void;
  handleDayChange: (day: any) => void;
  handleClinicChange: (id: any) => void;
  handleSearchByDoctorId: (id: any) => void;
  handleChangeStatus: (id: any) => void;
  columns: any;
  // dataStaffs: any[];
  dataDoctors: any[];
  clinics: any[];
  day_welcome: any;
  query: any;
  setQuery: any;
};
const FilterExamination = ({
  columns,
  handleChangeStatus,
  handleSearchByDoctorId,
  handleClinicChange,
  handleDayChange,
  handleSearch,
  dataDoctors,
  clinics,
  day_welcome,
  query,
  setQuery
}: TFilterExamination) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<any>();
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
              placeholder="Tên bệnh nhân hoặc mã phiếu khám"
              onKeyDown={handleKeyDown}
            />
          </div>
          <Select
            options={examinationStatus}
            className="react-select"
            classNamePrefix="react-select select-small"
            placeholder="-Trạng thái-"
            onChange={handleChangeStatus}
          ></Select>
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
              placeholder="Ngày khám"
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
