import { useEffect, useState, useRef } from "react";
import { Layout } from "../../../components/layout";
import Heading from "../../../components/common/Heading";
import { Row } from "../../../components/row";
import { Field } from "../../../components/field";
import { Label } from "../../../components/label";
import { Input } from "../../../components/input";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import moment from "moment";
import {
  getOnePrescription,
  updatePrescription,
} from "../../../services/prescription.service";
import { Button } from "../../../components/button";
import { Textarea } from "../../../components/textarea";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useReactToPrint } from "react-to-print";
import Printprescription from "../../../components/print/Printprescription";
import { Modal, Radio } from "antd";
import { toast } from "react-toastify";
import LabelPrescription from "../../../components/label/LabelPrescription";
import { PAYMENT_METHOD, PRESCRIPTION_STATUS } from "../../../constants/define";
import PriceUtils from "../../../helpers/PriceUtils";
import { calculateTotalPricePrescription2 } from "../../../helpers/calculateTotalPrice";

const PrescriptionDetail = () => {
  const auth: any = useSelector((state: RootState) => state.auth.auth?.user);
  const { id } = useParams();
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const [data, setData] = useState<any>();

  const { control, setValue, reset } = useForm<any>({});
  const [openModal, setOpenModal] = useState(false);
  const [action, setAction] = useState<any>();
  const [prescription, setPrescription] = useState<any>();
  const [paymentMethod, setPaymentMethod] = useState(null);
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => {
      setOpenModal(false);
    },
    copyStyles: true,
  });

  useEffect(() => {
    loadData(id);
  }, [id]);

  const loadData = async (id: any) => {
    try {
      const data: any = await getOnePrescription(id);
      reset(data);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickPrint = () => {
    setAction({ type: "print" });
    setTimeout(() => {
      handlePrint();
    }, 500);
  };

  const handleShowModel = (data: any) => {
    setOpenModal(true);
    setPrescription(data);
  };

  const onOk = async () => {
    if (prescription?.type == "cancel") {
      if (data?.cancel_reason === "" || !data?.cancel_reason) {
        toast.error("Lý do hủy không được bỏ trống");
        return;
      }
      const params = {
        status: 3,
        _id: prescription?.data?._id,
        cancel_reason: data?.cancel_reason,
      };
      setLoadingSubmit(true);
      const res = await updatePrescription(params);
      setLoadingSubmit(false);
      if (res?.message) {
        toast.success("Huỷ đơn thuốc thành công!");
        setData({
          cancel_reason: "",
        });
        loadData(id);
      } else {
        toast.error(res?.message);
        setData({
          cancel_reason: "",
        });
      }
    } else {
      if (!paymentMethod) {
        toast.error("Vui lòng chọn hình thức thanh toán");
        return;
      }
      const params = {
        status: 2,
        _id: data?._id,
        paymentMethod,
        paymentStatus: 1,
      };
      setLoadingSubmit(true);
      const res = await updatePrescription(params);
      setLoadingSubmit(false);
      if (res?.success) {
        toast.success("Trả kê đơn thành công");
        loadData(id);
        handleClickPrint();
      } else {
        toast.error("Đã có lỗi xảy ra!");
      }
    }
    setOpenModal(false);
  };

  const handleChangeInput = (event?: any) => {
    const { value, name } = event.target;
    if (value === " ") return;
    setData({
      ...data,
      [name]: value,
    });
  };

  return (
    <Layout>
      <div className="relative h-full">
        <Heading>
          Xem chi tiết kê đơn: {id}
          {data?.status === PRESCRIPTION_STATUS.CANCEL && (
            <div className="flex items-center text-sm gap-x-3">
              <span className="text-sm font-bold text-red-500">Lý do hủy:</span>
              <span className="text-red-500">
                {data?.cancel_reason ?? "---"}
              </span>
            </div>
          )}
        </Heading>
        <div className="w-full p-5 bg-white ">
          <Heading>
            Thông tin kê đơn <LabelPrescription type={data?.status} />
          </Heading>
          <Row>
            <Field className={"only-view"}>
              <Label className="font-semibold" htmlFor="phone">
                <span className="star-field">*</span>
                Khách hàng
              </Label>
              <Input
                control={control}
                placeholder=""
                className="!border-transparent font-semibold text-black"
                value={data?.medicalExaminationSlipId?.customer?.name}
              ></Input>
            </Field>
            <Field className={"only-view"}>
              <Label className="font-semibold" htmlFor="phone">
                <span className="star-field">*</span>
                Bác sỹ
              </Label>
              <Input
                control={control}
                placeholder=""
                className="!border-transparent font-semibold text-black"
                value={data?.doctorId?.name}
              ></Input>
            </Field>
          </Row>
          <Row>
            <Field>
              <Label className="font-semibold" htmlFor="_id">
                Địa chỉ
              </Label>
              <Input
                control={control}
                className="font-semibold text-black border-none"
                value={
                  data?.customerId
                    ? `${data?.customerId?.commune.name}, ${data?.customerId?.district?.name}, ${data?.customerId?.province?.name}`
                    : "---"
                }
              />
            </Field>
            <Field className={"only-view"}>
              <Label className="font-semibold" htmlFor="phone">
                Thời gian kê đơn
              </Label>
              <Input
                control={control}
                placeholder=""
                className="!border-transparent font-semibold text-black"
                value={
                  data?.createdAt
                    ? moment(data?.createdAt).format("DD/MM/YYYY")
                    : "---"
                }
              ></Input>
            </Field>
          </Row>
          <Row>
            <Field className={"only-view"}>
              <Label className="font-semibold" htmlFor="phone">
                Chẩn đoán
              </Label>
              <div className="!border-transparent font-semibold text-black">
                {data?.diagnostic || "---"}
              </div>
            </Field>
            <Field className={"only-view"}>
              <Label className="font-semibold" htmlFor="phone">
                Lời dặn
              </Label>
              <div className="!border-transparent font-semibold text-black">
                {data?.advice || "---"}
              </div>
            </Field>
          </Row>

          <Field className={"only-view"}>
            <Label className="font-semibold" htmlFor="phone">
              Chú thích
            </Label>
            <Textarea
              control={control}
              placeholder="----"
              className="!border-transparent font-semibold text-black"
              value={data?.note}
            />
          </Field>
        </div>
        <div className="p-5 my-5 bg-white rounded-xl">
          <Heading>Danh sách thuốc/thực phẩm chức năng</Heading>
          <table className="w-full custom-table">
            <thead className="bg-[#f4f6f8] text-sm">
              <th style={{ width: "20%" }}>Tên thuốc</th>
              <th style={{ width: "8%" }}>Số lượng</th>
              <th style={{ width: "13%" }}>Đơn vị bán</th>
              <th style={{ width: "13%" }}>Đơn vị sử dụng</th>
              <th style={{ width: "8%" }}>Liều lượng</th>
              <th>Số lần sử dụng/ngày</th>
              <th style={{ width: "20%" }}>Cách sử dụng</th>
              {/* <th style={{ width: "10%" }}>Hành động</th> */}
            </thead>
            <tbody>
              {data?.medicines?.map((item: any) => (
                <tr className="hover:bg-transparent">
                  <td>
                    <Input
                      control={control}
                      placeholder="0"
                      value={item?.medicineId?.name}
                      className="px-3 mb-1 font-semibold text-black border rounded-md"
                    />
                  </td>
                  <td>
                    <Input
                      control={control}
                      placeholder="0"
                      value={item?.quantity}
                      className="px-3 mb-1 font-semibold text-black border rounded-md"
                    />
                  </td>
                  <td>
                    <Input
                      control={control}
                      placeholder="0"
                      value={item?.unit_selling}
                      className="px-3 mb-1 font-semibold text-black border rounded-md"
                    />
                  </td>
                  <td>
                    <Input
                      control={control}
                      placeholder="0"
                      value={item?.unit_using}
                      className="px-3 mb-1 font-semibold text-black border rounded-md"
                    />
                  </td>
                  <td>
                    <Input
                      control={control}
                      placeholder="0"
                      value={item?.dosage}
                      className="px-3 mb-1 font-semibold text-black border rounded-md"
                    />
                  </td>
                  <td>
                    <Input
                      control={control}
                      placeholder="0"
                      value={item?.timesUsePerDay}
                      className="px-3 mb-1 font-semibold text-black border rounded-md"
                    />
                  </td>
                  <td>
                    <Input
                      control={control}
                      placeholder="0"
                      value={item?.how_using}
                      className="px-3 mb-1 font-semibold text-black border rounded-md"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="fixed bottom-0  py-5 bg-white left-[251px] shadowSidebar right-0">
          <div className="flex justify-end w-full px-5">
            <div className="flex items-center gap-x-5">
              <Button to="/prescription">Đóng</Button>

              {data?.status == 1 && (
                <>
                  <Button
                    to={`/prescription/update/${data?._id}`}
                    className="flex items-center justify-center px-10 py-3 text-base font-semibold leading-4 text-white rounded-md disabled:opacity-50 disabled:pointer-events-none bg-primary"
                  >
                    Chỉnh sửa
                  </Button>
                </>
              )}
              {data?.status == 2 && (
                <Button
                  onClick={() => handleClickPrint()}
                  to=""
                  className="flex items-center justify-center px-10 py-3 text-base font-semibold leading-4 text-white rounded-md disabled:opacity-50 disabled:pointer-events-none btn-info"
                >
                  In đơn
                </Button>
              )}
              {auth?.role?.roleNumber == 2 ||
              auth?.role?.roleNumber == 3 ? null : (
                <>
                  {data?.status == 1 && (
                    <Button
                      type="submit"
                      className="flex items-center justify-center px-10 py-3 text-base font-semibold leading-4 text-white rounded-md disabled:opacity-50 disabled:pointer-events-none bg-primary"
                      onClick={() =>
                        handleShowModel({ type: "done", data: data })
                      }
                    >
                      Hoàn thành
                    </Button>
                  )}
                </>
              )}
              {data?.status === 1 && (
                <Button
                  className="flex items-center justify-center px-10 py-3 text-base font-semibold leading-4 text-[#fd4858] rounded-md disabled:opacity-50 disabled:pointer-events-none bg-[#fd485833]"
                  onClick={() => {
                    if (data?.paymentStatus == 1) {
                      toast.warning("Không thể huỷ kê đơn đã thanh toán!");
                      return;
                    }
                    handleShowModel({ type: "cancel", data: data });
                  }}
                  isLoading={loadingSubmit}
                  disabled={loadingSubmit}
                >
                  Huỷ
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={openModal}
        onOk={onOk}
        onCancel={() => setOpenModal(false)}
        className={`${prescription?.type === "done" ? "modal-payment" : ""}`}
        confirmLoading={loadingSubmit}
      >
        {prescription?.type == "cancel" ? (
          <>
            <h1 className="text-[#4b4b5a] pb-4 border-b border-b-slate-200 font-bold text-center text-[18px]">
              Thông báo
            </h1>
            <div className="flex flex-col justify-center py-4 text-sm">
              <p className="text-center">
                Bạn có chắc muốn huỷ đơn thuốc này không
              </p>
              <span className="text-center text-[#ff5c75] font-bold">
                {prescription?.data?._id}
              </span>
              <Field>
                <Label className="font-semibold" htmlFor="note">
                  Lời dặn
                </Label>
                <Textarea
                  control={control}
                  className="outline-none input-primary"
                  name="cancel_reason"
                  placeholder="Nhập lời dặn cho khách hàng"
                  value={data?.cancel_reason}
                  onChange={(val: any) => {
                    handleChangeInput(val);
                  }}
                />
              </Field>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-[#4b4b5a] pb-4 border-b border-b-slate-200 font-bold text-center text-[18px] mb-5">
              Xác nhận và thanh toán
            </h1>
            <div className="flex justify-between gap-x-5">
              <div className="w-1/2">
                <h3 className="text-[18px] font-semibold ">
                  Thông tin khách hàng
                </h3>
                <p className="p-2">
                  <span className="text-sm font-semibold">Họ và tên:</span>{" "}
                  <span>{prescription?.data?.customerId?.name ?? ""}</span>
                </p>
                <p className="p-2">
                  <span className="text-sm font-semibold">Số điện thoại:</span>{" "}
                  <span>{prescription?.data?.customerId?.phone ?? "---"}</span>
                </p>
                <p className="p-2">
                  <span className="text-sm font-semibold">Địa chỉ:</span>{" "}
                  <span>
                    {prescription?.data?.customerId?.province
                      ? `${prescription?.data?.customerId?.commune.name}, ${prescription?.data?.customerId?.district?.name}, ${prescription?.data?.customerId?.province?.name}`
                      : "---"}
                  </span>
                </p>
                <p className="p-2">
                  <span className="text-sm font-semibold">Mã kê đơn: </span>
                  <span>{prescription?.data?._id}</span>
                </p>
                <p className="p-2">
                  <span className="text-sm font-semibold">Mã chứng từ: </span>
                  <span>
                    {prescription?.data?.medicalExaminationSlipId?._id}
                  </span>
                </p>
              </div>

              <div className="w-1/2 mb-5">
                <div className="flex flex-col">
                  <h3 className="text-[18px] font-semibold ">
                    Danh sách kê đơn
                  </h3>
                  <div className="flex flex-col">
                    {prescription?.data?.medicines?.map(
                      (i: any, index: any) => (
                        <div
                          className="flex items-center justify-between p-2 border-b border-b-gray-200"
                          key={index}
                        >
                          <span>{i?.medicineId?.name}</span>
                          <span>{PriceUtils.format(i?.medicineId?.price)}</span>
                        </div>
                      )
                    )}
                  </div>
                  <div className="flex justify-end my-1 gap-x-3">
                    <span>Tổng: </span>
                    <span className="text-sm font-semibold text-primary">
                      {calculateTotalPricePrescription2(
                        prescription?.data?.medicines ?? []
                      )}
                    </span>
                  </div>
                  <div className="flex justify-end my-1 gap-x-3">
                    <span>Tổng tiền cần thanh toán: </span>
                    <span className="text-sm font-semibold text-primary">
                      {calculateTotalPricePrescription2(
                        prescription?.data?.medicines ?? []
                      )}
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
                      <Radio value={PAYMENT_METHOD.CASH}>Tiền mặt</Radio>
                    </p>
                    <p>
                      <Radio value={PAYMENT_METHOD.BANK}>Chuyển khoản</Radio>
                    </p>
                  </Radio.Group>
                </div>
              </div>
            </div>
          </>
        )}
      </Modal>
      {action?.type == "print" && (
        <Printprescription
          componentRef={componentRef}
          dataPrint={data}
          check={true}
        ></Printprescription>
      )}
    </Layout>
  );
};

export default PrescriptionDetail;
