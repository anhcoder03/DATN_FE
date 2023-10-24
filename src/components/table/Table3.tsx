import React from "react";
import DataTable from "react-data-table-component";
import LoadingSpinner from "../common/LoadingSpinner";

const Table3 = ({ data, columns, isLoading }: any) => {
  return (
    <DataTable
      progressPending={isLoading}
      progressComponent={<LoadingSpinner />}
      columns={columns}
      data={data}
      fixedHeader
      highlightOnHover
      pointerOnHover
      onRowClicked={(row: any) => console.log(row?._id)}
      noDataComponent={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: 40,
          }}
          className="flex-col p-16"
        >
          <img
            src="https://nutricms.staging.zsolution.vn/static/media/ic_row-empty.80f5a3dd.svg"
            alt=""
            className="h-full min-h-[350px] "
          />
          Không có dữ liệu!
        </div>
      }
    ></DataTable>
  );
};

export default Table3;
