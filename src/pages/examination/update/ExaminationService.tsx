import React, { useEffect, useState } from "react";
import { Table } from "../../../components/table";
import { Link } from "react-router-dom";
import { LabelStatusDesignation } from "../../../components/label";
import { calculateTotalPrice } from "../../../helpers/calculateTotalPrice";
import { Button } from "../../../components/button";
import Select from "react-select";
import { getAllService } from "../../../services/service.service";
import {
  createServiceByExam,
  deleteServiceByExamination,
  getServiceByIdExam,
} from "../../../services/designation.service";
import { toast } from "react-toastify";
import { cloneDeep } from "lodash";
import { IconPlus, IconTrash } from "../../../components/icons";
import { Modal, Spin } from "antd";
import { data } from "../../statitis";
import LoadingPage from "../../../components/common/LoadingPage";

const headings = [
  "STT",
  "Mã dịch vụ - Tên dịch vụ",
  "Bác sỹ chỉ định",
  "Đơn giá",
  "Kết luận ",
  "Trạng thái thanh toán",
  "Trạng thái thực hiện",
  "Thao tác",
];

const ExaminationSevicer = ({ id }: { id: any }) => {
  const [lengthService, setLengthService] = useState(0);
  const [services, setServices] = useState<any[]>([]);
  const [serviceByExam, setServiceByExam] = useState<any>([]);
  const [service, setService] = useState<any>(null);
  const [isPayment, setIsPayment] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [dataServices, setDataServices] = useState([
    {
      service_id: "",
      price: "",
      paymentStatus: "unpaid",
      status: "waiting",
      _id: null,
    },
  ]);

  useEffect(() => {
    handleGetServiceByExam();
    getServices();
  }, []);

  async function getServices() {
    const response = await getAllService({ _limit: 3000, _status: 1 });
    const ListArr: any = [];
    response?.docs?.map((e: any) => {
      ListArr?.push({
        ...e,
        value: e?._id,
        label: e?.name,
      });
    });
    setServices(ListArr);
  }
  const handleGetServiceByExam = async () => {
    const response = await getServiceByIdExam(id);
    if (response?.docs?.length > 0) {
      const ListArr: any = [];
      response?.docs?.map((e: any) => {
        ListArr?.push({
          price: e?.service_examination?.price,
          service_id: e?.service_examination?._id,
          paymentStatus: e.paymentStatus,
          status: e.status,
          _id: e._id,
        });
      });
      setDataServices([...ListArr]);
      setServiceByExam(response?.docs);
      setLengthService(response?.docs?.length);
    } else {
      if (response?.docs?.length == 0) {
        if (dataServices.length > 1) {
          const newData = dataServices.splice(0);
          setServiceByExam(response?.docs);
          setLengthService(response?.docs?.length);
          setDataServices([...newData]);
          setServiceByExam(response?.docs);
          setLengthService(response?.docs?.length);
        } else {
          setDataServices([
            {
              service_id: "",
              price: "",
              paymentStatus: "unpaid",
              status: "waiting",
              _id: null,
            },
          ]);
          setServiceByExam(response?.docs);
          setLengthService(response?.docs?.length);
        }
      }
    }
  };

  const handleAddService = () => {
    const newData = {
      service_id: "",
      price: "",
      paymentStatus: "unpaid",
      status: "waiting",
      _id: null,
    };
    setDataServices([...dataServices, newData]);
  };

  const handleRemoveService = (index: number) => {
    let newServiceExam = cloneDeep(dataServices);
    newServiceExam.splice(index, 1);
    if (newServiceExam?.length === 0) {
      newServiceExam = [
        {
          service_id: "",
          price: "",
          paymentStatus: "unpaid",
          status: "waiting",
          _id: null,
        },
      ];
    }
    setDataServices(newServiceExam);
  };

  const handleUpdateService = (dataRela: any, index: number) => {
    let newServiceExam = cloneDeep(dataServices);
    newServiceExam[index] = dataRela;
    setDataServices(newServiceExam);
  };

  const handleChange = (e: any, index: any) => {
    const { name, value } = e?.target;
    if (name == "service_id") {
      const check = dataServices?.findIndex((e: any) => {
        return e?.service_id == value?._id;
      });
      if (dataServices[index].paymentStatus === "paid") {
        return toast.warning("Dịch vụ đã thanh toán không thể chỉnh sửa!");
      }
      if (dataServices[index].status !== "waiting") {
        return toast.warning(
          "Chỉ có dịch vụ đang chờ thực hiện mới có thể chỉnh sửa!"
        );
      }
      if (check > -1) {
        toast.warning(
          "Không thể thêm hoặc chỉnh sửa dịch vụ đã có trong phiếu khám!"
        );
      } else {
        handleUpdateService(
          {
            price: value?.price,
            service_id: value?._id,
            paymentStatus: "unpaid",
            status: "waiting",
            _id: dataServices[index]._id ?? null,
          },
          index
        );
      }
    } else {
      handleUpdateService(
        {
          price: value?.price,
          service_id: value?._id,
          paymentStatus: "unpaid",
          status: "waiting",
          _id: dataServices[index]._id ?? null,
        },
        index
      );
    }
  };

  const checkpayment = (status: any) => {
    switch (status) {
      case "unpaid":
        return <span style={{ color: "#ffa726" }}>Chưa thanh toán</span>;
      case "paid":
        return <span style={{ color: "green" }}>Đã thanh toán</span>;
    }
  };
  const handleShowModel = (serviceItem: any, paymentStatus: any) => {
    setService(serviceItem);
    if (paymentStatus === "paid") {
      setIsPayment(true);
    }
    setOpenModal(true);
  };

  const handleDeleteService = async () => {
    if (isPayment) {
      toast.warning("Dịch vụ đã thanh toán không thể hủy!");
    } else {
      setLoading(true);
      const res = await deleteServiceByExamination(service?._id);
      setLoading(false);
      if (res?.designation) {
        toast.success("Huỷ dịch vụ khám thành công");
        await handleGetServiceByExam();
      } else {
        toast.error("Đã có lỗi xảy ra!");
      }
    }
    setOpenModal(false);
  };

  const handleCreateServiceByExamination = async () => {
    let checkService = false;
    dataServices.forEach((item) => {
      if (item.price === "" || item.service_id === "") {
        return (checkService = true);
      }
    });

    if (checkService) {
      return toast.warning("Dịch vụ không được được để trống");
    }
    const newService = dataServices.filter(
      (i) => i.status === "waiting" && i.paymentStatus === "unpaid"
    );
    const value = {
      doctorId: serviceByExam[0].doctorId?._id,
      staffId: serviceByExam[0].staffId?._id,
      customerId: serviceByExam[0].customerId?._id,
      clinicId: serviceByExam[0].clinicId?._id,
      examinationId: id,
      paymentStatus: "unpaid",
      services: newService,
    };
    setLoading(true);
    const res = await createServiceByExam(value);
    setLoading(false);
    if (res?.success) {
      toast.success(res?.message);
      handleGetServiceByExam();
    } else {
      toast.error(res?.response?.data?.message);
    }
  };

  return (
    <Spin spinning={loading} indicator={<LoadingPage />}>
      <div className="bg-white py-5 rounded-md">
        <Table headings={headings} className="min-h-[500px]">
          {dataServices?.map((item: any, index: any) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <Select
                    placeholder="Chọn dich vụ"
                    className="mb-2 react-select"
                    classNamePrefix="react-select"
                    options={services}
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
                </td>
                <td>{serviceByExam[0]?.doctorId?.name}</td>
                <td>
                  {item?.price ? `${item.price.toLocaleString()} đ` : "---"}
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
                  <LabelStatusDesignation type={item?.status} />
                </td>
                <td>
                  <div className="flex items-center gap-x-2">
                    <button
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
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </Table>
        <div className="fixed bottom-0  py-5 bg-white left-[251px] shadowSidebar right-0 action-bottom">
          <div className="flex justify-end w-full px-5">
            <div className="flex items-center gap-x-5">
              <Button to="/examination">Đóng</Button>
              <Button
                type="submit"
                className="flex items-center justify-center px-10 py-3 text-base font-semibold leading-4 text-white rounded-md disabled:opacity-50 disabled:pointer-events-none bg-primary"
                onClick={() => handleCreateServiceByExamination()}
                isLoading={loading}
                disabled={loading}
              >
                Lưu
              </Button>
            </div>
          </div>
        </div>
        <Modal
          centered
          open={openModal}
          onOk={handleDeleteService}
          onCancel={() => setOpenModal(false)}
          confirmLoading={loading}
        >
          <h1 className="text-[#4b4b5a] pb-4 border-b border-b-slate-200 font-bold text-center text-[18px]">
            Thông Báo
          </h1>
          <div className="flex flex-col items-center justify-center py-4 text-sm">
            <p>Bạn có chắc muốn huỷ dịch vụ này</p>
          </div>
        </Modal>
      </div>
    </Spin>
  );
};

export default ExaminationSevicer;
