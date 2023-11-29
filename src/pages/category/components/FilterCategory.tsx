import { Link } from "react-router-dom";
import { IconPlus, IconSearch } from "../../../components/icons";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
type TFilterCategory = {
  handleSearch: (e: any) => void;
};

const FilterCategory = ({ handleSearch }: TFilterCategory) => {
  const auth: any = useSelector((state: RootState) => state.auth.auth?.user);
  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      handleSearch(e.target.value);
    }
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
              placeholder="Tìm kiếm theo tên"
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
        {auth?.role?.roleNumber == 2 ? null : (
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
        )}
      </div>
    </div>
  );
};
export default FilterCategory;
