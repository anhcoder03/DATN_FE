import React, { useEffect, useState } from "react";
import { Table } from "../../../components/table";
import { Link } from "react-router-dom";
import { LabelStatusDesignation } from "../../../components/label";
import { calculateTotalPrice } from "../../../helpers/calculateTotalPrice";

const ExaminationSevicer = ({ data }: { data: any[] }) => {
  const headings = [
    "STT",
    "Mã dịch vụ - Tên dịch vụ",
    "Bác sỹ chỉ định",
    "Đơn giá",
    "Kết luận ",
    "Trạng thái thanh toán",
    "Trạng thái thực hiện",
  ];

  const checkpayment = (status: any) => {
    switch (status) {
      case "unpaid":
        return <span style={{ color: "#ffa726" }}>Chưa thanh toán</span>;
      case "paid":
        return <span style={{ color: "green" }}>Đã thanh toán</span>;
    }
  };
  return (
    <div className="bg-white py-5 rounded-md">
      <Table headings={headings}>
        {data?.map((item: any, index: any) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{`${item?.service_examination?.serviceId} - ${item?.service_examination?.name}`}</td>
              <td>{item?.doctorId?.name}</td>
              <td>
                {item?.service_examination?.price
                  ? `${item.service_examination.price.toLocaleString()} đ`
                  : "---"}
              </td>
              <td>
                <Link
                  to={`/designation/${item?._id}/view`}
                  style={{ color: "blue", textDecoration: "underline" }}
                >
                  Xem
                </Link>
              </td>
              <td>{checkpayment(item?.paymentStatus)}</td>
              <td>
                {" "}
                <LabelStatusDesignation type={item?.status} />
              </td>
            </tr>
          );
        })}
        {data?.length > 0 && (
          <tr className="hover:!bg-white ">
            <td></td>
            <td colSpan={2} className="text-end">
              Tổng tiền:
            </td>
            <td className="text-primary font-semibold">
              {data?.length ? calculateTotalPrice(data) : ""}
            </td>
          </tr>
        )}
      </Table>
    </div>
  );
};

export default ExaminationSevicer;
