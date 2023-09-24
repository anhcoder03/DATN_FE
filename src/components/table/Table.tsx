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
        <thead>
          <tr>
            {headings?.map((heading, index) => (
              <th key={index}>{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody className="w-full">
          {loading ? (
            <tr>
              <td colSpan={headings?.length}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: 40,
                  }}
                >
                  <LoadingSpinner />
                </div>
              </td>
            </tr>
          ) : (length && length > 0) || length === undefined ? (
            children
          ) : (
            <>
              <tr>
                <td
                  colSpan={headings?.length}
                  style={{ textAlign: "center", height: 40 }}
                >
                  {"common.No data"}
                </td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
