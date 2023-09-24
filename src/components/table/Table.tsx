import React from "react";
import LoadingSpinner from "../common/LoadingSpinner";

interface ITableProps {
  headings?: string[];
  children: React.ReactNode;
  loading?: boolean;
  length?: number | undefined;
}

const Table = ({ children, loading, length, headings }: ITableProps) => {
  return (
    <div className="table-wrapper">
      <table>
        <thead className="">
          <tr className="">
            {headings?.map((heading, index) => (
              <th className="" key={index}>
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="w-full">
          {loading ? (
            <tr>
              <td colSpan={headings?.length} className="h-full hover:bg-white">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  className="min-h-[500px]"
                >
                  <LoadingSpinner />
                </div>
              </td>
            </tr>
          ) : (length && length > 0) || length === undefined ? (
            children
          ) : (
            <tr>
              <td colSpan={headings?.length} className="hover:bg-white">
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
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
