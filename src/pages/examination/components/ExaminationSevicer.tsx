import React, { useEffect, useState } from "react";
import { Table } from "../../../components/table";
import { Link } from "react-router-dom";
import { LabelStatusDesignation } from "../../../components/label";
import { calculateTotalPrice } from "../../../helpers/calculateTotalPrice";
import Select from 'react-select';
import { toast } from 'react-toastify';
import { cloneDeep } from "lodash";
import { IconTrash } from "../../../components/icons";
import { IconPlus } from "../../../components/icons";
import { deleteServiceByExamination } from "../../../services/designation.service";

const ExaminationSevicer = (props: any) => {
  const { data, services, dataServices, setDataServices } = props;
  const [service, setService] = useState<any>(null);
  const [isPayment, setIsPayment] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const headings = [
    "Mã dịch vụ - Tên dịch vụ",
    "Bác sỹ chỉ định",
    "Đơn giá",
    "Kết luận ",
    "Trạng thái thanh toán",
    "Trạng thái thực hiện",
    ""
  ];

  const checkpayment = (status: any) => {
    switch (status) {
      case "unpaid":
        return <span style={{ color: "#ffa726" }}>Chưa thanh toán</span>;
      case "paid":
        return <span style={{ color: "green" }}>Đã thanh toán</span>;
    }
  };

  const handleUpdateService = (dataRela: any, index: number) => {
    let newServiceExam = cloneDeep(dataServices);
    newServiceExam[index] = dataRela;
    setDataServices(newServiceExam);
  };

  const handleRemoveService = (index: number) => {
    let newServiceExam = cloneDeep(dataServices);
    newServiceExam.splice(index, 1);
    if (newServiceExam?.length === 0) {
      newServiceExam = [
        {
          service_id: "",
          price: "",
        },
      ];
    }
    setDataServices(newServiceExam);
  };

  const handleChange = (e: any, index: any) => {
    const { name, value } = e?.target;
    if (name == "service_id") {
      const check = dataServices?.findIndex((e: any) => {
        return e?.service_id == value?._id;
      });
      if (check > -1) {
        toast.warning(
          "Không thể thêm hoặc chỉnh sửa dịch vụ đã có trong phiếu khám!"
        );
      } else {
        handleUpdateService(
          {
            price: value?.price,
            service_id: value?._id,
          },
          index
        );
      }
    } else {
      handleUpdateService(
        {
          price: value?.price,
          service_id: value?._id,
        },
        index
      );
    }
  };

  const handleShowModel = (serviceItem: any, paymentStatus: any) => {
    setService(serviceItem);
    if (paymentStatus === "paid") {
      setIsPayment(true);
    }
    setOpenModal(true);
  };

  // const handleDeleteService = async () => {
  //   if (isPayment) {
  //     toast.warning("Dịch vụ đã thanh toán không thể hủy!");
  //   } else {
  //     const res = await deleteServiceByExamination(service?._id);
  //     if (res?.designation) {
  //       toast.success("Huỷ dịch vụ khám thành công");
  //       await handleGetServiceByExam();
  //     } else {
  //       toast.error("Đã có lỗi xảy ra!");
  //     }
  //   }
  //   setOpenModal(false);
  // };

  return (
    <div className="bg-white py-5 rounded-md min-h-screen">
      <Table headings={headings}>
        {data?.map((item: any, index: any) => {
          return (
            <tr key={index}>
              <td>{
                  <Select
                  placeholder="Chọn dich vụ"
                  className="mb-2 react-select"
                  classNamePrefix="react-select"
                  options={services}
                  // menuPlacement="top"  
                  menuIsOpen={true}
                  maxMenuHeight={250}
                  onChange={(value: any) => {
                    handleChange(
                      {
                        target: { name: "service_id", value: value },
                      },
                      index
                    );
                  }}
                  value={services?.filter(
                    (option: any) => item?.service_id === option.value
                  )}
                ></Select>
                }</td>
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
                  target="_blank"
                >
                  Xem
                </Link>
              </td>
              <td>{checkpayment(item?.paymentStatus)}</td>
              <td>
                {" "}
                <LabelStatusDesignation type={item?.status} />
              </td>
              <td>
                <div className="flex items-center gap-x-2">
                  {/* <button
                    type="button"
                    className="w-[40px] h-[40px] border border-gray-200 rounded-lg flex justify-center items-center"
                    onClick={() => {
                      if (serviceByExam[index]?._id) {
                        handleShowModel(
                          serviceByExam[index],
                          serviceByExam[index]?.paymentStatus
                        );
                      } else {
                        handleRemoveService(index);
                      }
                    }}
                  >
                    <IconTrash />
                  </button>
                  {dataServices?.length == index + 1 && (
                    <button
                      className="flex items-center w-[40px] h-[40px] bg-primary rounded-lg text-white justify-center"
                      onClick={handleAddService}
                    >
                      <IconPlus></IconPlus>
                    </button>
                  )} */}
                </div>
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
