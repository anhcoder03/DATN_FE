import { Link } from "react-router-dom";
import { IconPlus} from "../../../components/icons";

const FilterCategory = () => {
  return (
    <div className="">
      <div className="flex flex-wrap items-center justify-between p-5 bg-white rounded-tl-lg rounded-tr-lg">
        <div className="flex items-center gap-2 filter-wrapper">
          {/* <div className="filter-search flex items-center bg-transparent border border-gray-200 px-2 py-1 gap-2 rounded-lg h-[40px] min-w-[350px]">
            <IconSearch></IconSearch>
            <input
              type="text"
              className="w-full bg-transparent border-none outline-none"
              placeholder="Tên, số điện thoại hoặc mã bệnh nhân"
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="filter-room"></div>
          <div className="filter-doctor">
            <Select
              className="react-select"
              classNamePrefix="react-select"
              placeholder="-Giới tính-"
              options={optionGender}
              onChange={handleGenderChange}
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
              onChange={([date]) => {
                handleDayChange(date);
              }}
              placeholder="dd/mm/yyyy"
              name="dateOfBirth"
            ></Flatpickr>
            <div className="flex items-center">
              <img src={IconCalendarBlack} alt="icon" />
            </div>
          </div> */}
        </div>
        <div className="flex items-end gap-2">
          <Link
            to={"/category/add"}
            className="flex gap-2 px-3 py-2 rounded-lg bg-primary"
          >
            <div className="flex items-center p-1 bg-white rounded-lg text-primary">
              <IconPlus></IconPlus>
            </div>
            <span className="flex items-center text-sm text-white">Thêm</span>
          </Link>
        </div>
      </div>
      {/* <AppModal
        open={open}
        loading={loading}
        handleCancel={handleCancel}
        handleOk={handleOk}
      ></AppModal> */}
    </div>
  );
};
export default FilterCategory;
