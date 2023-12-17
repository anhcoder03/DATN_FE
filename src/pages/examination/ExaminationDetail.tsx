import React, { useEffect, useRef, useState } from "react";
import { Layout } from "../../components/layout";
import Heading from "../../components/common/Heading";
import { Button } from "../../components/button";
import AppTaps from "../../components/tabs/Tabs";
import ExaminationInfo from "./components/ExaminationInfo";
import ExaminationSevicer from "./components/ExaminationSevicer";
import Prescription from "./components/Prescription";
import { useNavigate, useParams } from "react-router-dom";
import {
  UpdateExamination,
  getOneExamination,
} from "../../services/examination.service";
import { toast } from "react-toastify";
import { useReactToPrint } from "react-to-print";
import { PrintBill, PrintExamination } from "../../components/print";
import {
  getServiceByIdExam,
  updateServiceByIdExamination,
} from "../../services/designation.service";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Modal, Radio } from "antd";
import {
  findPayment,
  findPriceTotal,
  fintPricePaymented,
} from "../../helpers/findNoPayment";
import PriceUtils from "../../helpers/PriceUtils";
import { calculateTotalPrice } from "../../helpers/calculateTotalPrice";
import { Field } from "../../components/field";
import { Label } from "../../components/label";
import TextArea from "antd/es/input/TextArea";
import { socketIO } from "../../App";

export interface IDataTabs {
  title: string;
  children: React.ReactNode;
  id: string;
  name: string;
}
const ExaminationDetail = () => {
  const auth: any = useSelector((state: RootState) => state.auth.auth?.user);
  const navigate = useNavigate();
  const [dataPrint, setDataPrint] = useState<any>();
  const [services, setServices] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [openModalExam, setOpenModalExam] = useState<boolean>(false);
  const [openModalPayment, setOpenModalPayment] = useState<boolean>(false);
  const [openPrintBill, setOpenPrintBill] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const componentRef = useRef(null);
  const [cancelRequester, setCancelRequester] = useState<any>();
  const [cancelReason, setCancelReason] = useState<string>();
  const [examination, setExamination] = useState<any>();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => {
      setOpenModal(false);
      setOpenModalPayment(false);
    },
    copyStyles: true,
  });

  const [data, setData] = useState<any>({});
  const { id } = useParams();

  useEffect(() => {
    if (id !== undefined) {
      loadData();
      getService();
    }
  }, [id]);

  async function loadData() {
    try {
      const response = await getOneExamination(id);
      const resData = response?.examination;
      setData({
        ...resData,
      });
    } catch (error) {
      toast.error("Đã có lỗi xảy ra!");
    }
  }

  async function getService() {
    try {
      const response = await getServiceByIdExam(id);
      const resData = response?.docs;
      setServices(resData);
    } catch (error) {
      toast.error("Đã có lỗi xảy ra!");
    }
  }

  const dataTabs: IDataTabs[] = [
    {
      title: "THÔNG TIN KHÁM",
      children: <ExaminationInfo data={data} />,
      id: "1",
      name: "info",
    },
    {
      title: "CHỈ ĐỊNH DỊCH VỤ",
      children: <ExaminationSevicer data={services} />,
      id: "2",
      name: "designation",
    },
    {
      title: "KÊ ĐƠN",
      children: <Prescription id={id} />,
      id: "3",
      name: "prescription",
    },
  ];

  useEffect(() => {
    document.title = "Chi tiết phiếu khám";
  }, []);

  const handleChangeStatus = async (status: string) => {
    if (status === "cancel") {
      if (!cancelRequester || cancelRequester === "") {
        toast.error("Vui lòng chọn người yêu cầu hủy!");
        return;
      }
      if (!cancelReason || cancelReason === "") {
        toast.error("Vui lòng nhập lý do hủy!");
        return;
      }
      const now = new Date();
      const nowVietnam = new Date(
        now.getTime() + now.getTimezoneOffset() * 60000 + 7 * 60 * 60 * 1000
      );
      const day_cancel = nowVietnam.toISOString().slice(0, -1);
      const params = {
        status,
        day_cancel,
        _id: id,
        cancel_requester: cancelRequester,
        cancel_reason: cancelReason,
      };
      setLoading(true);
      const response: any = await UpdateExamination(params);
      setLoading(false);
      if (response?.examination) {
        if (response.examination && response.examination.status === "cancel") {
          socketIO.emit("client_newNotify", "Bạn có thông báo mới");
        }
        toast.success("Chuyển trạng thái thành công!");
        setOpenModalExam(false);
        loadData();
      } else {
        toast.error("Đã có lỗi xảy ra!");
      }
    } else if (status === "done") {
      const noPayment = findPayment(services);
      if (noPayment) {
        toast.warning("Vui lòng thanh toán trước khi hoàn thành");
        return;
      }
      const now = new Date();
      const nowVietnam = new Date(
        now.getTime() + now.getTimezoneOffset() * 60000 + 7 * 60 * 60 * 1000
      );
      const day_done = nowVietnam.toISOString().slice(0, -1);
      const params = {
        status,
        day_done,
        _id: id,
      };
      setLoading(true);
      const response: any = await UpdateExamination(params);
      setLoading(false);
      if (response?.examination) {
        toast.success("Chuyển trạng thái thành công!");
        loadData();
        setOpenModalExam(false);
      } else {
        toast.error("Đã có lỗi xảy ra!");
      }
    } else {
      const now = new Date();
      const nowVietnam = new Date(
        now.getTime() + now.getTimezoneOffset() * 60000 + 7 * 60 * 60 * 1000
      );
      const day_running = nowVietnam.toISOString().slice(0, -1);
      const params = {
        status,
        day_running,
        _id: id,
      };
      setLoading(true);
      const response: any = await UpdateExamination(params);
      setLoading(false);
      if (response?.examination) {
        toast.success("Chuyển trạng thái thành công!");
        setOpenModalExam(false);
        loadData();
      } else {
        toast.error("Đã có lỗi xảy ra!");
      }
    }
  };

  const handleClickPrint = (item: any) => {
    setOpenModal(true);
    setDataPrint({ ...item, services });
    setTimeout(() => {
      handlePrint();
    }, 500);
  };

  const handleClickPrintBill = () => {
    setOpenPrintBill(true);
    setDataPrint({ services, ...data });
    setTimeout(() => {
      handlePrint();
    }, 500);
  };

  const handlePayment = async () => {
    if (!paymentMethod) {
      toast.error("Vui lòng chọn hình thức thanh toán");
      return;
    }
    setLoading(true);
    const res = await updateServiceByIdExamination({
      id,
      paymentMethod,
      paymentStatus: "paid",
    });
    setLoading(false);
    setOpenModalPayment(false);
    if (res?.success) {
      toast.success("Thanh toán thành công");
      getService();
      handleClickPrintBill();
    } else {
      toast.error("Đã có lỗi xảy ra!");
    }
  };

  const handleShowModel = (data: any) => {
    setOpenModalExam(true);
    setExamination(data);
  };

  const onOk = async () => {
    if (examination?.type == "cancel") {
      handleChangeStatus("cancel");
    }
    if (examination?.type == "done") {
      handleChangeStatus("done");
    }
    if (examination?.type == "running") {
      handleChangeStatus("running");
    }
  };

  return (
    <Layout>
      <div>
        <div className="relative-h-full">
          <Heading>
            Chi tiết phiếu khám: <span>{id}</span>
            {data?.status === "cancel" && (
              <div className="flex items-center text-sm gap-x-3">
                <span className="text-sm font-bold text-red-500">
                  Lý do hủy:
                </span>
                <span className="text-red-500">
                  {data?.cancel_reason ?? "---"}
                </span>
              </div>
            )}
          </Heading>
        </div>
        <AppTaps
          keyActive="1"
          className="p-0 custom-tab"
          data={dataTabs}
        ></AppTaps>
        <div className="fixed bottom-0  py-5 bg-white left-[251px] shadowSidebar right-0 action-bottom">
          <div className="flex justify-end w-full px-5">
            <div className="flex items-center gap-x-5">
              <Button to="/examination">Đóng</Button>
              {findPayment(services) &&
                data?.status !== "cancel" &&
                data?.status !== "done" && (
                  <Button
                    type="submit"
                    className="flex items-center justify-center px-10 py-3 text-base font-semibold leading-4 text-white rounded-md disabled:opacity-50 disabled:pointer-events-none btn-info"
                    onClick={() => setOpenModalPayment(true)}
                    isLoading={loading}
                    disabled={loading}
                  >
                    Thanh toán
                  </Button>
                )}
              {data?.status === "waiting" && (
                <>
                  {auth?.role?.roleNumber == 3 ? null : (
                    <>
                      <Button
                        type="submit"
                        className="flex items-center justify-center px-5 py-3 text-base font-semibold leading-4 text-[#fd4858] rounded-md disabled:opacity-50 disabled:pointer-events-none bg-[#fd485833]"
                        onClick={() =>
                          handleShowModel({ type: "cancel", data })
                        }
                        isLoading={loading}
                        disabled={loading}
                      >
                        Hủy khám
                      </Button>
                      <Button
                        type="submit"
                        className="flex items-center justify-center px-10 py-3 text-base font-semibold leading-4 text-white rounded-md disabled:opacity-50 disabled:pointer-events-none bg-primary"
                        onClick={() =>
                          handleShowModel({ type: "running", data })
                        }
                        isLoading={loading}
                        disabled={loading}
                      >
                        Khám
                      </Button>
                    </>
                  )}
                </>
              )}
              {data?.status === "done" && (
                <>
                  {auth?.role?.roleNumber == 3 ? null : (
                    <>
                      <Button
                        type="submit"
                        className="flex items-center justify-center px-10 py-3 text-base font-semibold leading-4 text-white rounded-md disabled:opacity-50 disabled:pointer-events-none btn-info"
                        onClick={() =>
                          handleShowModel({ type: "running", data })
                        }
                        isLoading={loading}
                        disabled={loading}
                      >
                        Đang khám
                      </Button>
                      <Button
                        type="submit"
                        className="flex items-center justify-center px-5 py-3 text-base font-semibold leading-4 text-white rounded-md disabled:opacity-50 disabled:pointer-events-none bg-primary"
                        onClick={() => handleClickPrint(data)}
                      >
                        In phiếu
                      </Button>
                    </>
                  )}
                </>
              )}
              {data?.status === "running" && (
                <>
                  {auth?.role?.roleNumber == 3 ? null : (
                    <Button
                      type="submit"
                      className="flex items-center justify-center px-10 py-3 text-base font-semibold leading-4 text-white rounded-md disabled:opacity-50 disabled:pointer-events-none bg-primary"
                      onClick={() => handleShowModel({ type: "done", data })}
                      isLoading={loading}
                      disabled={loading}
                    >
                      Hoàn thành khám
                    </Button>
                  )}
                </>
              )}
              {data?.status !== "done" && data?.status !== "cancel" ? (
                <>
                  {auth?.role?.roleNumber == 3 ? null : (
                    <Button
                      type="submit"
                      className="flex items-center justify-center px-10 py-3 text-base font-semibold leading-4 text-white rounded-md disabled:opacity-50 disabled:pointer-events-none bg-primary"
                      onClick={() => navigate(`/examination/${id}`)}
                    >
                      Chỉnh sửa
                    </Button>
                  )}
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      {openModal && (
        <PrintExamination
          componentRef={componentRef}
          dataPrint={dataPrint}
        ></PrintExamination>
      )}
      {openPrintBill && (
        <PrintBill
          componentRef={componentRef}
          dataPrint={dataPrint}
        ></PrintBill>
      )}
      <Modal
        open={openModalPayment}
        onCancel={() => setOpenModalPayment(false)}
        onOk={handlePayment}
        confirmLoading={loading}
        className="modal-payment"
      >
        <h1 className="text-[#4b4b5a] pb-4 border-b border-b-slate-200 font-bold text-center text-[18px] mb-5">
          Thanh toán toán dịch vụ khám
        </h1>
        <div className="flex justify-between gap-x-5">
          <div className="w-1/2">
            <h3 className="text-[18px] font-semibold ">Thông tin khách hàng</h3>
            <p className="p-2">
              <span className="text-sm font-semibold">Họ và tên:</span>{" "}
              <span>{data?.customerId?.name}</span>
            </p>
            <p className="p-2">
              <span className="text-sm font-semibold">Số điện thoại:</span>{" "}
              <span>{data?.customerId?.phone ?? "---"}</span>
            </p>
            <p className="p-2">
              <span className="text-sm font-semibold">Địa chỉ:</span>{" "}
              <span>
                {data?.customerId?.province
                  ? `${data?.customerId?.commune.name}, ${data?.customerId?.district?.name}, ${data?.customerId?.province?.name}`
                  : "---"}
              </span>
            </p>
            <p className="p-2">
              <span className="text-sm font-semibold">Mã chứng từ: </span>
              <span>{data?._id}</span>
            </p>
          </div>

          <div className="w-1/2 mb-5">
            <div className="flex flex-col">
              <h3 className="text-[18px] font-semibold ">
                Danh sách dịch vụ khám
              </h3>
              <div className="flex flex-col">
                {services?.map((i, index) => (
                  <div
                    className="flex items-center justify-between p-2 border-b border-b-gray-200"
                    key={index}
                  >
                    <span>{i?.service_examination?.name}</span>
                    <span>
                      {PriceUtils.format(i?.service_examination?.price)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex justify-end my-1 gap-x-3">
                <span>Tổng: </span>
                <span className="text-sm font-semibold text-primary">
                  {calculateTotalPrice(services)}
                </span>
              </div>
              <div className="flex justify-end my-1 gap-x-3">
                <span>Đã thanh toán: </span>
                <span className="text-sm font-semibold text-red-500">
                  {PriceUtils.format(fintPricePaymented(services))}
                </span>
              </div>
              <div className="flex justify-end my-1 gap-x-3">
                <span>Tổng tiền cần thanh toán: </span>
                <span className="text-sm font-semibold text-primary">
                  {PriceUtils.format(findPriceTotal(services))}
                </span>
              </div>
              <h3 className="text-[18px] font-semibold ">
                Hình thức thanh toán
              </h3>
              <Radio.Group
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mt-3"
              >
                <p className="mb-2">
                  <Radio value={1}>Tiền mặt</Radio>
                </p>
                <p>
                  <Radio value={2}>Chuyển khoản</Radio>
                </p>
              </Radio.Group>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        open={openModalExam}
        onCancel={() => setOpenModalExam(false)}
        footer={[
          <Button onClick={() => setOpenModalExam(false)}>Hủy</Button>,
          <Button
            onClick={onOk}
            type="submit"
            className="flex items-center justify-center px-10 py-3 text-base font-semibold leading-4 text-white rounded-md disabled:opacity-50 disabled:pointer-events-none bg-primary"
            isLoading={loading}
            disabled={loading}
          >
            Xác nhận
          </Button>,
        ]}
        className="custom-modal"
      >
        <h1 className="text-[#4b4b5a] pb-4 border-b border-b-slate-200 font-bold text-center text-[18px]">
          {examination?.type === "cancel"
            ? "Hủy Phiếu Khám ?"
            : examination?.data?.status === "done" &&
              examination?.type === "running"
            ? "Xác nhận đưa về đang khám ?"
            : examination?.type === "running"
            ? "Xác nhận khám ?"
            : examination?.type === "running"
            ? "Xác nhận khám ?"
            : "Hoàn thành khám"}
        </h1>
        {examination?.type == "done" && (
          <div className="flex flex-col items-center justify-center py-4 text-sm">
            <p>Bạn có chắc hoàn thành phiếu khám này không?</p>
            <span className="text-center text-[#ff5c75] font-bold">
              {examination?.data?._id}
            </span>
          </div>
        )}
        {examination?.data?.status === "done" &&
        examination?.type === "running" ? (
          <div className="flex flex-col items-center justify-center py-4 text-sm">
            <p>Phiếu khám đã hoàn thành. Bạn có chắc đưa về đang khám ?</p>
            <span className="text-center text-[#ff5c75] font-bold">
              {examination?.data?._id}
            </span>
          </div>
        ) : examination?.type === "running" ? (
          <div className="flex flex-col items-center justify-center py-4 text-sm">
            <p>Bạn có muốn khám phiếu khám này không?</p>
            <span className="text-center text-[#ff5c75] font-bold">
              {examination?.data?._id}
            </span>
          </div>
        ) : null}
        {examination?.type == "cancel" && (
          <>
            <Field className={"grid-cols-1 w-full my-2"}>
              <Label htmlFor="cancel_requester">
                <span className="star-field">*</span> Người yêu cầu hủy
              </Label>
              <Radio.Group onChange={(e) => setCancelRequester(e.target.value)}>
                <div className="flex items-center">
                  <Radio
                    className="flex items-center h-[34px]"
                    value={examination?.data?.customerId?._id}
                  >
                    Khách hàng
                  </Radio>
                  <Radio
                    className="flex items-center h-[34px]"
                    value={examination?.data?.doctorId?._id}
                  >
                    Bác sĩ
                  </Radio>
                </div>
              </Radio.Group>
            </Field>
            <Field>
              <Label className="font-semibold" htmlFor="note">
                <span className="star-field">*</span> Lý do hủy khám
              </Label>
              <TextArea
                className="outline-none input-primary  focus:!shadow-none"
                name="medicalHistory"
                placeholder="Nhập lý do hủy khám"
                onChange={(e) => setCancelReason(e.target.value)}
              />
            </Field>
            <div className="my-5">
              <span>* Chú ý:</span>
              <p className="text-sm font-semibold">
                Khi hủy phiếu khám, các dịch vụ chỉ định cũng đồng thời bị hủy
              </p>
            </div>
          </>
        )}
      </Modal>
    </Layout>
  );
};

export default ExaminationDetail;
