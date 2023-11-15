import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IconPlus, IconSearch } from "../../../components/icons";
import { Table } from "../../../components/table";
import { BsPrinter } from "react-icons/bs";

type Props = {
  id: any;
};

const Prescription = (props: Props) => {
  const { id } = useParams();
  const [data, setData] = useState<any[]>([]);
  const headings = ["STT", "Mã đơn", "Khách hàng", "Bác sĩ", "Hành động"];
  return (
    <div className="w-full">
      <div className="flex items-center justify-between bg-white border-b-gray-200 p-5 rounded-tr-md rounded-tl-md  w-full">
        <div className="filter-search flex items-center bg-transparent border border-gray-200 px-2 py-1 gap-2 rounded-lg h-[40px] min-w-[300px]">
          <IconSearch></IconSearch>
          <input
            type="text"
            className="w-full bg-transparent border-none outline-none"
            placeholder="Mã đơn"
          />
        </div>
        <Link
          to={`/prescription/add/${id}`}
          className="flex gap-2 px-3 py-2 rounded-lg bg-primary"
        >
          <div className="flex items-center p-1 bg-white rounded-lg text-primary">
            <IconPlus></IconPlus>
          </div>
          <span className="flex items-center text-sm text-white">Thêm</span>
        </Link>
      </div>
      <div>
        <Table headings={headings} length={0}>
          {data?.map((item: any, index: any) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item?._id}</td>
                <td>{item?.customerId?.name}</td>
                <td>dfdfdf</td>
                <td>{item?.doctorId?.name}</td>
                <td>
                  <button className="button-nutri text-[#585858]">
                    <span className="text-base">
                      <BsPrinter />
                    </span>
                  </button>
                </td>
              </tr>
            );
          })}
        </Table>
      </div>
    </div>
  );
};

export default Prescription;
