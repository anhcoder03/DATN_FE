import React, { useEffect, useState } from "react";
import { Layout } from "../../../components/layout";
import Heading from "../../../components/common/Heading";
import { Button } from "../../../components/button";
import { Row } from "../../../components/row";
import { Field } from "../../../components/field";
import { Label } from "../../../components/label";
import { Input } from "../../../components/input";
import { useForm } from "react-hook-form";
import { IconPhone } from "../../../components/icons";
import moment from "moment";
import IconCalendar from "../../../assets/images/icon/ic_calendar-black.svg";
import CalcUtils from "../../../helpers/CalcULtils";
import { Textarea } from "../../../components/textarea";
import {
  UpdateExamination,
  getOneExamination,
} from "../../../services/examination.service";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import { Modal, Spin } from "antd";
import { useSelector } from "react-redux";
import { RootState, store } from "../../../redux/store";
import { socketIO } from "../../../App";
import LoadingPage from "../../../components/common/LoadingPage";

const DetailBooking = () => {
  const auth: any = useSelector((state: RootState) => state.auth.auth?.user);
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [deltail, setDeltail] = useState<any>();
  const { control } = useForm({});
  const [openModal, setOpenModal] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id !== undefined) {
      loadData();
    }
  }, [id]);

  async function loadData() {
    try {
      const response = await getOneExamination(id);
      const resData = response.examination;
      setData({
        customer: resData?.customerId,
        dateOfBirth: resData?.customerId?.dateOfBirth,
        gender: resData?.customerId?.gender,
        phone: resData?.customerId?.phone,
        note: resData?.note,
        staffId: resData?.staffId,
        day_booking: resData?.day_booking,
        _id: resData?._id,
      });
    } catch (error) {
      toast.error("Đã có lỗi sảy ra!!");
    }
  }

  const handleChangeStatus = async (id: any) => {
    const now = new Date();
    const nowVietnam = new Date(
      now.getTime() + now.getTimezoneOffset() * 60000 + 7 * 60 * 60 * 1000
    );
    const day_welcome = nowVietnam.toISOString().slice(0, -1);
    const params = {
      status: "recetion",
      _id: id,
      day_welcome,
    };
    setLoading(true);
    const response: any = await UpdateExamination(params);
    setLoading(false);
    if (response?.examination) {
      toast.success("chuyển trạng thái thành công!");

      navigate(`/reception/${id}`);
    } else {
      toast.error(response?.message);
    }
  };

  const onOk = async () => {
    if (deltail?.type == "remove") {
      setLoading(true);
      const res = await UpdateExamination({
        _id: deltail?.data?._id,
        status: "cancel_schedule",
      });
      setLoading(false);
      if (res?.examination) {
        toast.success("Huỷ đặt lịch thành công!");
        socketIO.emit("client_newNotify", "Bạn có thông báo mới");
        setOpenModal(false);
        navigate(`/reception`);
      } else {
        toast.error(res?.message);
        setOpenModal(false);
      }
      return;
    }
    if (deltail?.type == "statusReception") {
      handleChangeStatus(deltail?.data?._id);
      setOpenModal(false);
      return;
    }
  };

  const handleModal = (data: any) => {
    setOpenModal(true);
    setDeltail(data);
  };

  return (
    <Spin indicator={<LoadingPage />} spinning={loading}>
      <Layout>
        <div className="relative h-full only-view">
          <Heading>Đặt trước lịch khám, Tư vấn</Heading>
          <form className="w-[70%] p-5 bg-white ">
            <Heading>Thông tin bệnh nhân</Heading>
            <Row className="grid-cols-2 ">
              <Field>
                <Label htmlFor="_id">
                  <span className="star-field">*</span>
                  Họ và tên khách hàng/bệnh nhân
                </Label>
                <Input
                  control={control}
                  placeholder="Nhập mã khách hàng"
                  value={data?.customer?.name}
                />
              </Field>
              <Field>
                <Label htmlFor="gender">Giới tính</Label>
                <Input
                  control={control}
                  placeholder="Nhập giới tính"
                  value={data?.gender}
                />
              </Field>
            </Row>
            <Row className="grid-cols-2 ">
              <Field>
                <Label htmlFor="phone">
                  <span className="star-field">*</span>
                  Số điện thoại
                </Label>
                <Input
                  control={control}
                  name="phone"
                  value={data?.phone}
                  placeholder="Nhập số điện thoại"
                >
                  <div className="p-2 bg-white">
                    <IconPhone></IconPhone>
                  </div>
                </Input>
              </Field>
              <Field>
                <Label htmlFor="_id">Ngày đặt lịch</Label>
                <div className="relative pb-3">
                  <Input
                    control={control}
                    name="phone"
                    value={moment(data?.dateOfBirth).format("DD/MM/YYYY")}
                    placeholder="Nhập ngày đặt lịch"
                  />
                  <div className="absolute top-0 right-0">
                    <img src={IconCalendar} alt="icon" />
                  </div>
                </div>
              </Field>
            </Row>
            <Row className="grid-cols-2 ">
              <Field>
                <Label htmlFor="_id">Năm sinh</Label>
                <div className="relative pb-3">
                  <Input
                    control={control}
                    name="phone"
                    value={moment(data?.day_booking).format("DD/MM/YYYY")}
                    placeholder="Nhập năm sinh"
                  />
                  <div className="absolute top-0 right-0">
                    <img src={IconCalendar} alt="icon" />
                  </div>
                </div>
              </Field>
              <Field>
                <Label htmlFor="">Tuổi</Label>
                <Input
                  control={control}
                  className="border-none"
                  name="date"
                  value={
                    data?.dateOfBirth
                      ? CalcUtils.calculateAge(data?.dateOfBirth)
                      : "---"
                  }
                />
              </Field>
            </Row>
            <Row className="grid-cols-2 ">
              <Field>
                <Label htmlFor="staffId">
                  <span className="star-field">*</span>Nhân viên tiếp đón
                </Label>
                <Input
                  control={control}
                  name="phone"
                  value={data?.staffId?.name}
                  placeholder="Chọn nhân viên"
                />
              </Field>
              <Field>
                <Label htmlFor="note">Ghi chú</Label>
                <Textarea
                  control={control}
                  className="outline-none input-primary"
                  name="note"
                  placeholder="Nhập ghi chú"
                  onChange={(val: any) => {
                    setData({
                      ...data,
                      note: val,
                    });
                  }}
                  value={data?.note}
                />
              </Field>
            </Row>
          </form>
          <div className="fixed bottom-0  py-5 bg-white left-[251px] shadowSidebar right-0">
            <div className="flex justify-end w-full px-5">
              <div className="flex items-center gap-x-5">
                <Button to="/reception">Đóng</Button>
                {auth?.role?.roleNumber == 1 ||
                auth?.role?.roleNumber == 3 ? null : (
                  <>
                    <Button
                      type="submit"
                      className="flex items-center justify-center px-10 py-3 text-base font-semibold leading-4 text-white rounded-md disabled:opacity-50 disabled:pointer-events-none bg-primary"
                      onClick={() => {
                        if (
                          auth?.role?.roleNumber == 1 ||
                          auth?.role?.roleNumber == 3
                        ) {
                          toast.warning(
                            "Bạn không có quyền thực hiện hành động này!"
                          );
                          return;
                        }
                        navigate(`/reception/booking/update/${id}`);
                      }}
                    >
                      Chỉnh sửa
                    </Button>
                    <Button
                      type="submit"
                      className="flex items-center justify-center px-10 py-3 text-base font-semibold leading-4 text-white rounded-md disabled:opacity-50 disabled:pointer-events-none btn-info"
                      onClick={() =>
                        handleModal({ type: "statusReception", data: data })
                      }
                      isLoading={loading}
                      disabled={loading}
                    >
                      Tiếp đón
                    </Button>
                    <Button
                      type="submit"
                      className="flex items-center justify-center px-10 py-3 text-base font-semibold leading-4 text-[#fd4858] rounded-md disabled:opacity-50 disabled:pointer-events-none bg-[#fd485833]"
                      onClick={() =>
                        handleModal({ type: "remove", data: data })
                      }
                      isLoading={loading}
                      disabled={loading}
                    >
                      Huỷ
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <Modal
          centered
          open={openModal}
          onOk={onOk}
          onCancel={() => setOpenModal(false)}
        >
          <h1 className="text-[#4b4b5a] pb-4 border-b border-b-slate-200 font-bold text-center text-[18px]">
            Thông Báo
          </h1>
          {deltail?.type == "remove" && (
            <div className="flex flex-col items-center justify-center py-4 text-sm">
              <p>Bạn có chắc muốn huỷ phiếu đặt lịch này?</p>
              <span className="text-center text-[#ff5c75] font-bold">
                {deltail?.data?._id}
              </span>
            </div>
          )}
          {deltail?.type == "statusReception" && (
            <div className="flex flex-col items-center justify-center py-4 text-sm">
              <p>Bạn có chắc muốn tiếp đón phiếu đặt lịch này?</p>
              <span className="text-center text-[#ff5c75] font-bold">
                {deltail?.data?._id}
              </span>
            </div>
          )}
        </Modal>
      </Layout>
    </Spin>
  );
};

export default DetailBooking;
