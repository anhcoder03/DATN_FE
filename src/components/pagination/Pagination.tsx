import React from "react";
import ReactPaginate from "react-paginate";
import { IOption } from "../../constants/options";
import Select from "react-select";

type TPagination = {
  handlePageClick: (e: any) => void;
  pageCount: number;
  optionsPagination: IOption | any;
  handleLimitChange: (data: any) => void;
  totalPages: number | string;
  totalDocs: number | string;
};

const Pagination = ({
  handlePageClick,
  pageCount,
  optionsPagination,
  handleLimitChange,
  totalPages,
  totalDocs,
}: TPagination) => {
  return (
    <React.Fragment>
      <div className="flex items-center justify-between px-5 py-10">
        <Select
          menuPlacement="top"
          options={optionsPagination}
          onChange={handleLimitChange}
          defaultValue={optionsPagination[0]}
          className="react-select"
          classNamePrefix="react-select"
        ></Select>
        <>
          <ReactPaginate
            hrefBuilder={() => {
              return "#";
            }}
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageCount={pageCount}
            disableInitialCallback={true}
            previousLabel="<"
            renderOnZeroPageCount={null}
            className="mb-10 flex flex-wrap items-center justify-center gap-x-2 gap-y-[6px] text-[15px] text-[#ececec] lg:gap-x-3 lg:text-base lg:mb-0 "
            pageLinkClassName="border border-gray-500 text-primary page-link transition-all inline-block text-center py-1  w-8 h-8 rounded-[5px]"
            previousClassName="border border-gray-500 text-xl  font-bold text-black bg-white nextPage transition-all hover:bg-gray-200 w-8 h-8 text-center  rounded-[5px]"
            nextClassName="border border-gray-500 text-xl  font-bold text-black bg-white nextPage transition-all hover:bg-gray-200 w-8 h-8 text-center  rounded-[5px]"
            activeClassName="page-active "
            disabledClassName="opacity-40"
            disabledLinkClassName="hover:cursor-default"
          />
        </>
        <div>
          Của <span className="text-base font-semibold">{totalPages}</span>{" "}
          trang | Có tất cả{" "}
          <span className="text-base font-semibold">{totalDocs}</span> bản ghi
        </div>
      </div>
    </React.Fragment>
  );
};

export default Pagination;
