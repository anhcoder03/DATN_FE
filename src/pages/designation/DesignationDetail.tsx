import React, { useEffect, useRef, useState } from "react";
import { Layout } from "../../components/layout";
import { useParams, useNavigate } from "react-router-dom";
import {
  deleteServiceByExamination,
  getOneServiceByExam,
  updateServiceByExam,
} from "../../services/designation.service";
import Heading from "../../components/common/Heading";
import {
  Label,
  LabelStatusDesignation,
  LabelStatusDesignationDetail,
} from "../../components/label";
import { Row } from "../../components/row";
import { Field } from "../../components/field";
import { Input } from "../../components/input";
import { useForm } from "react-hook-form";
import moment from "moment";
import PriceUtils from "../../helpers/PriceUtils";
import { Textarea } from "../../components/textarea";
import { Button } from "../../components/button";
import { Modal } from "antd";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useReactToPrint } from "react-to-print";
import DesignationPrint from "./components/DesignationPrint";
import { PAYMENT_METHOD, PAYMENT_STATUS } from "../../constants/define";

const DesignationDetail = () => {
  const auth: any = useSelector((state: RootState) => state.auth.auth?.user);
  const [loading, setLoading] = useState<boolean>(false);
  const { control, handleSubmit } = useForm();
  const [designation, setDesignation] = useState<any>({});
  const [oneDesignation, setOneDesignation] = useState<any>();
  const [openModal, setOpenModal] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const componentRef = useRef(null);

  const [dataPrint, setDataPrint] = useState<any>();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => {
      setLoading(false);
      setOpenModal(false);
      setDataPrint({});
    },
    copyStyles: true,
  });

  const handlePrintDes = (data: any) => {
    setOpenModal(true);
    setDataPrint(data);
    setLoading(true);
    setTimeout(() => {
      handlePrint();
    }, 1000);
  };

  useEffect(() => {
    getOneService();
  }, [id]);

  async function getOneService() {
    const response = await getOneServiceByExam(id);
    setDesignation(response);
  }

  const handleShowModel = (data: any) => {
    setOpenModal(true);
    setOneDesignation(data);
  };

  const onOk = async () => {
    if (oneDesignation?.type == "cancel") {
      const response = await deleteServiceByExamination(
        oneDesignation?.data?._id
      );
      if (response?.message) {
        toast.success(response?.message);
        setOpenModal(false);
        navigate(`/designation/list`);
      } else {
        toast.error(response?.message);
      }
    }

    if (oneDesignation?.type == "running") {
      const params = {
        _id: id,
        status: "running",
      };
      const response: any = await updateServiceByExam(params);
      if (response?.message) {
        toast.success(response?.message);
        setOpenModal(false);
        getOneService();
      } else {
        toast.error(response?.message);
      }
    }

    if (oneDesignation?.type == "done") {
      const params = {
        _id: id,
        status: "done",
      };
      const response: any = await updateServiceByExam(params);
      if (response?.message) {
        toast.success(response?.message);
        setOpenModal(false);
        getOneService();
      } else {
        toast.error(response?.message);
      }
    }

    setOpenModal(false);
  };

  return (
    <Layout>
      <div className="relative-h-full">
        <Heading>Xem chi tiết đơn dịch vụ: {id}</Heading>
        <form className="flex justify-between w-full pb-16 gap-x-10">
          <div className="flex flex-col gap-y-5 w-[60%]">
            <div className="w-full p-5 bg-white rounded-xl">
              <Heading>
                Thông tin chung
                <LabelStatusDesignationDetail type={designation?.status} />
              </Heading>
              <Row>
                <Field className={"only-view"}>
                  <Label className="font-semibold" htmlFor="phone">
                    Mã phiếu
                  </Label>
                  <Input
                    control={control}
                    placeholder="----"
                    className="!border-transparent font-semibold text-black"
                    value={designation?._id ? designation?._id : "---"}
                  ></Input>
                </Field>
                <Field className={"only-view"}>
                  <Label className="font-semibold" htmlFor="phone">
                    Mã chứng từ
                  </Label>
                  <Input
                    control={control}
                    placeholder="----"
                    className="!border-transparent font-semibold text-black"
                    value={
                      designation?.examinationId
                        ? designation?.examinationId
                        : "---"
                    }
                  ></Input>
                </Field>
                <Field className={"only-view"}>
                  <Label className="font-semibold" htmlFor="clinicId">
                    Phòng khám
                  </Label>
                  <Input
                    control={control}
                    placeholder="----"
                    className="!border-transparent font-semibold text-black"
                    value={
                      designation?.clinicId?._id
                        ? designation?.clinicId?.name
                        : "---"
                    }
                  ></Input>
                </Field>
                <Field className={"only-view"}>
                  <Label className="font-semibold" htmlFor="doctorId">
                    Bác sĩ
                  </Label>
                  <Input
                    control={control}
                    placeholder="----"
                    className="!border-transparent font-semibold text-black"
                    value={
                      designation?.doctorId?._id
                        ? designation?.doctorId?.name
                        : "---"
                    }
                  ></Input>
                </Field>
              </Row>
              <Row>
                <Field className={"only-view"}>
                  <Label className="font-semibold" htmlFor="doctorId">
                    Ngày tạo
                  </Label>
                  <Input
                    control={control}
                    placeholder="----"
                    className="!border-transparent font-semibold text-black"
                    value={
                      designation?.createdAt
                        ? moment(designation?.createdAt).format(
                            "HH:mm:ss DD/MM/YYYY"
                          )
                        : "---"
                    }
                  ></Input>
                </Field>
                <Field className={"only-view"}>
                  <Label className="font-semibold" htmlFor="doctorId">
                    Người tạo
                  </Label>
                  <Input
                    control={control}
                    placeholder="----"
                    className="!border-transparent font-semibold text-black"
                    value={
                      designation?.staffId?._id
                        ? designation?.staffId?.name
                        : "---"
                    }
                  ></Input>
                </Field>
                <Field className={"only-view"}>
                  <Label className="font-semibold" htmlFor="doctorId">
                    Ngày thực hiện
                  </Label>
                  <Input
                    control={control}
                    placeholder="----"
                    className="!border-transparent font-semibold text-black"
                    value={
                      designation?.day_done
                        ? moment(designation?.day_done).format(
                            "HH:mm:ss DD/MM/YYYY"
                          )
                        : "---"
                    }
                  ></Input>
                </Field>
              </Row>
            </div>
            <div className="w-full p-5 bg-white rounded-xl">
              <Heading>Thông tin dịch vụ</Heading>
              <table className="w-full custom-table">
                <thead className="bg-[#f4f6f8] text-sm">
                  <th>Tên dịch vụ</th>
                  <th>Đơn giá</th>
                </thead>
                <tbody>
                  <tr>
                    <td>{designation?.service_examination?.name}</td>
                    <td>
                      {PriceUtils.format(
                        designation?.service_examination?.price
                      ) || "---"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="w-full p-5 bg-white rounded-xl">
              <Heading>Kết quả và kết luận</Heading>
              <Field>
                <Label htmlFor="mainResults">Nội dung kết quả</Label>
                <Textarea
                  control={control}
                  placeholder="----"
                  className="!border-transparent font-semibold text-black"
                  value={
                    designation?.mainResults ? designation?.mainResults : "---"
                  }
                ></Textarea>
              </Field>
            </div>
            <div className="w-full p-5 bg-white rounded-xl">
              <Heading>Hình ảnh và tệp kết quả</Heading>
              <Label htmlFor="mainResults">Chèn link</Label>
              <tbody style={{ lineHeight: 2 }}>
                {designation?.fileResult &&
                  designation?.fileResult?.map((item: any) => {
                    return (
                      <tr>
                        <a
                          style={{
                            color: "#3183FF",
                            marginLeft: 20,
                            marginTop: 15,
                          }}
                          href={item?.url}
                          target="_blank"
                        >
                          {item?.url}
                        </a>
                      </tr>
                    );
                  })}
              </tbody>
            </div>
          </div>
          <div className="flex flex-col gap-y-5 w-[40%]">
            <div className="w-full p-5 bg-white rounded-xl">
              <Heading>Thông tin khách hàng</Heading>
              <Row>
                <Field className={"only-view"}>
                  <Label className="font-semibold" htmlFor="phone">
                    Bệnh nhân
                  </Label>
                  <Input
                    control={control}
                    placeholder="----"
                    className="!border-transparent font-semibold text-black"
                    value={
                      designation?.customerId?.name
                        ? designation?.customerId?.name
                        : "---"
                    }
                  ></Input>
                </Field>
              </Row>
            </div>
            <div className="w-full p-5 bg-white rounded-xl">
              <Heading>
                Thông tin thanh toán
                <div className="inline-flex items-center ml-10 gap-x-3 ">
                  {/* {PriceUtils.format(
                      designation?.service_examination?.price
                    ) || "---"} */}
                  <LabelStatusDesignation type={designation?.paymentStatus} />
                </div>
              </Heading>
              {designation.paymentStatus === PAYMENT_STATUS.PAID && (
                <Row className="grid-cols-1 gap-y-5">
                  <Field className={"only-view"}>
                    <Label className="font-semibold" htmlFor="phone">
                      <span className="star-field">*</span>
                      Hình thức
                    </Label>
                    <Input
                      control={control}
                      placeholder="----"
                      className="!border-transparent font-semibold text-black"
                      value={
                        designation?.paymentMethod == PAYMENT_METHOD.BANK
                          ? "Chuyển khoản"
                          : "Tiền mặt"
                      }
                    ></Input>
                  </Field>
                  <Field className={"only-view"}>
                    <Label className="font-semibold" htmlFor="phone">
                      <span className="star-field">*</span>
                      Số tiền
                    </Label>
                    <Input
                      control={control}
                      placeholder="----"
                      className="!border-transparent font-semibold text-black"
                      value={
                        PriceUtils.format(
                          designation?.service_examination?.price
                        ) || "---"
                      }
                    ></Input>
                  </Field>
                </Row>
              )}
            </div>
          </div>
        </form>
        <div className="fixed bottom-0  py-5 bg-white left-[251px] shadowSidebar right-0 action-bottom">
          <div className="flex justify-end w-full gap-x-2">
            <div className="flex items-center gap-x-2">
              <Button to="/designation/list">Đóng</Button>
              {designation?.paymentStatus == "paid" && (
                <Button
                  type="submit"
                  className="flex items-center justify-center px-5 py-3 text-base font-semibold leading-4 text-white rounded-md disabled:opacity-50 disabled:pointer-events-none bg-primary"
                  onClick={() => handlePrintDes(designation)}
                  isLoading={loading}
                  disabled={loading}
                >
                  In phiếu
                </Button>
              )}
              {auth?.role?.roleNumber == 2 ||
              auth?.role?.roleNumber == 3 ? null : (
                <>
                  {designation?.status == "waiting" && (
                    <>
                      <Button
                        type="submit"
                        className="flex items-center justify-center px-5 py-3 text-base font-semibold leading-4 text-white rounded-md disabled:opacity-50 disabled:pointer-events-none btn-info"
                        onClick={() =>
                          handleShowModel({
                            type: "running",
                            data: designation,
                          })
                        }
                      >
                        Đang thực hiện
                      </Button>
                      <Button
                        type="submit"
                        className="flex items-center justify-center px-5 py-3 text-base font-semibold leading-4 text-[#fd4858] rounded-md disabled:opacity-50 disabled:pointer-events-none bg-[#fd485833]"
                        onClick={() =>
                          handleShowModel({ type: "cancel", data: designation })
                        }
                      >
                        Hủy
                      </Button>
                    </>
                  )}
                  {designation?.status == "running" && (
                    <Button
                      type="submit"
                      className="flex items-center justify-center px-5 py-3 text-base font-semibold leading-4 text-white rounded-md disabled:opacity-50 disabled:pointer-events-none bg-primary"
                      onClick={() =>
                        handleShowModel({ type: "done", data: designation })
                      }
                    >
                      Hoàn thành
                    </Button>
                  )}
                  {designation?.status !== "done" && (
                    <Button
                      type="submit"
                      className="flex items-center justify-center px-5 py-3 text-base font-semibold leading-4 text-white rounded-md disabled:opacity-50 disabled:pointer-events-none bg-primary"
                      onClick={() => navigate(`/designation/update/${id}`)}
                    >
                      Chỉnh sửa
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {openModal && dataPrint !== undefined ? (
        <DesignationPrint dataPrint={dataPrint} componentRef={componentRef} />
      ) : (
        <Modal
          centered
          open={openModal}
          onOk={onOk}
          onCancel={() => setOpenModal(false)}
          confirmLoading={loading}
        >
          <h1 className="text-[#4b4b5a] pb-4 border-b border-b-slate-200 font-bold text-center text-[18px]">
            Thông Báo
          </h1>
          {oneDesignation?.type == "cancel" && (
            <div className="flex flex-col items-center justify-center py-4 text-sm">
              <p>Bạn có chắc muốn huỷ đơn dịch vụ này không?</p>
              <span className="text-center text-[#ff5c75] font-bold">
                {oneDesignation?.name}
              </span>
            </div>
          )}
          {oneDesignation?.type == "running" && (
            <div
              className="flex flex-col items-center justify-center py-4 text-sm"
              style={{ textAlign: "center" }}
            >
              <p>Bạn có chắc chắn muốn thực hiện đơn dịch vụ này không?</p>
              <span className="text-center text-[#ff5c75] font-bold">
                {oneDesignation?.name}
              </span>
            </div>
          )}
          {oneDesignation?.type == "done" && (
            <div
              className="flex flex-col items-center justify-center py-4 text-sm"
              style={{ textAlign: "center" }}
            >
              <p>Bạn có chắc chắn muốn hoàn thành đơn dịch vụ này không?</p>
              <span className="text-center text-[#ff5c75] font-bold">
                {oneDesignation?.name}
              </span>
            </div>
          )}
        </Modal>
      )}
    </Layout>
  );
};

export default DesignationDetail;
