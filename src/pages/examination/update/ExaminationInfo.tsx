import React, { useEffect, useState } from "react";
import Heading from "../../../components/common/Heading";
import { Row } from "../../../components/row";
import { Field } from "../../../components/field";
import { Label, LabelStatus } from "../../../components/label";
import { Input } from "../../../components/input";
import { IconPhone, IconPlus } from "../../../components/icons";
import Flatpickr from "react-flatpickr";
import { Vietnamese } from "flatpickr/dist/l10n/vn";
import * as yup from "yup";
import moment from "moment";
import IconCalendar from "../../../assets/images/icon/ic_calendar-black.svg";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Textarea } from "../../../components/textarea";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { UpdateExamination } from "../../../services/examination.service";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/button";
import { Spin } from "antd";
import LoadingPage from "../../../components/common/LoadingPage";

const schema = yup.object({
  // customerId: yup.string().required("Bệnh nhân không được để trống!"),
  // staffId: yup.string().required("Nhân viên tiếp đón không được để trống!"),
});
const ExaminationInfo = (props: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { data, setData } = props;
  const navigate = useNavigate();

  const [day_welcome, setDayWelcome] = useState(new Date());
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver<any>(schema),
    mode: "onSubmit",
  });

  const handleUpdate = async (values: any) => {
    const cloneData = {
      ...values,
      ...data,
      clinicId: data?.clinicId?._id,
      staffId: data?.staffId?._id,
      doctorId: data?.doctorId?._id,
      customerId: data?.customerId?._id,
    };
    if (cloneData?.customer) {
      delete cloneData.customer;
    }
    setLoading(true);
    const response: any = await UpdateExamination(cloneData);
    setLoading(false);
    if (response?.examination) {
      toast.success("Cập nhật phiếu khám thành công!");
      navigate(`/examination/${data?._id}/view`);
    } else {
      toast.error("Đã có lỗi sảy ra!!!");
    }
  };

  const handleDoneExamination = async (values: any) => {
    const now = new Date();
    const nowVietnam = new Date(
      now.getTime() + now.getTimezoneOffset() * 60000 + 7 * 60 * 60 * 1000
    );
    const day_done = nowVietnam.toISOString().slice(0, -1);
    const cloneData = {
      ...values,
      ...data,
      clinicId: data?.clinicId?._id,
      staffId: data?.staffId?._id,
      doctorId: data?.doctorId?._id,
      customerId: data?.customerId?._id,
      status: "done",
      day_done,
    };
    if (cloneData?.customer) {
      delete cloneData.customer;
    }
    setLoading(true);
    const response: any = await UpdateExamination(cloneData);
    setLoading(false);
    if (response?.examination) {
      toast.success("Cập nhật phiếu khám thành công!");
      navigate(`/examination/${data?._id}/view`);
    } else {
      toast.error("Đã có lỗi xảy ra!!!");
    }
  };

  useEffect(() => {
    const arrayError: any = Object.values(errors);
    if (arrayError.length > 0) {
      toast.warning(arrayError[0]?.message);
    }
  }, [errors]);

  function calculateAge(dateOfBirth: any) {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = birthDate.getDate() - today.getDate();

    if (months < 0 || (months === 0 && days < 0)) {
      years--;
      months += 12;
    }

    return `${years} tuổi , ${months} tháng , ${days}ngày`;
  }

  const dateOfBirth = data?.customerId?.dateOfBirth;
  const ageWithDetails = dateOfBirth ? calculateAge(dateOfBirth) : "---";

  return (
    <Spin spinning={loading} indicator={<LoadingPage />}>
      <div className="relative">
        <form className="flex bg-grayF3 justify-between gap-x-10 w-full pb-16">
          <div className="flex flex-col gap-y-10 w-1/2">
            <div className="p-5 bg-white rounded-xl">
              <Heading>
                Thông tin bệnh nhân
                <span>
                  <LabelStatus type={data?.status} />
                </span>
              </Heading>
              <Row className="grid-cols-3 mb-10 ">
                <Field>
                  <Label className="font-semibold" htmlFor="_id">
                    <span className="star-field">*</span>
                    Chọn bệnh nhân
                  </Label>
                  <Input
                    control={control}
                    className="border-none font-semibold text-black"
                    value={data?.customerId?.name || "---"}
                  />
                </Field>
                <Field>
                  <Label className="font-semibold" htmlFor="staffId">
                    Nhân viên tiếp đón
                  </Label>
                  <Input
                    control={control}
                    className="border-none font-semibold text-black"
                    value={data?.staffId?.name || "---"}
                  />
                </Field>
                <Field>
                  <Label className="font-semibold" htmlFor="staffId">
                    Bác sĩ
                  </Label>
                  <Input
                    control={control}
                    className="border-none font-semibold text-black"
                    value={data?.doctorId?.name || "---"}
                  />
                </Field>
              </Row>
              <Row className="grid-cols-3 mb-10">
                <Field>
                  <Label className="font-semibold" htmlFor="">
                    Ngày sinh
                  </Label>
                  <Input
                    control={control}
                    className="border-none font-semibold text-black"
                    value={moment(data?.customerId?.dateOfBirth).format(
                      "YYYY-MM-DD"
                    )}
                  />
                </Field>
                <Field>
                  <Label className="font-semibold" htmlFor="">
                    Tuổi
                  </Label>
                  <Input
                    control={control}
                    className="border-none font-semibold text-black"
                    value={`${ageWithDetails}`}
                  />
                </Field>
                <Field className={"only-view"}>
                  <Label className="font-semibold" htmlFor="phone">
                    <span className="star-field">*</span>
                    Số điện thoại
                  </Label>
                  <Input
                    control={control}
                    placeholder="----"
                    className="!border-transparent font-semibold text-black"
                    value={
                      data?.customerId?.phone ? data?.customerId?.phone : "---"
                    }
                  >
                    <div className="p-2 bg-white">
                      <IconPhone></IconPhone>
                    </div>
                  </Input>
                </Field>
              </Row>
              <Row className="grid-cols-2 mb-10">
                <Field className={"only-view"}>
                  <Label className="font-semibold" htmlFor="">
                    Giới tính
                  </Label>
                  <Input
                    control={control}
                    className="!border-transparent font-semibold text-black"
                    value={
                      data?.customerId?.gender
                        ? data?.customerId?.gender
                        : "---"
                    }
                  />
                </Field>
                <Field>
                  <Label className="font-semibold" htmlFor="">
                    Địa chỉ
                  </Label>
                  <Input
                    control={control}
                    className="border-none font-semibold text-black"
                    value={
                      data?.customerId
                        ? `${data?.customerId?.commune.name}, ${data?.customerId?.district?.name}, ${data?.customerId?.province?.name}`
                        : "---"
                    }
                  />
                </Field>
              </Row>
              <Row className="grid-cols-2 mb-10">
                <Field>
                  <Label className="font-semibold" htmlFor="_id">
                    Thời gian tiếp đón
                  </Label>
                  <div className="relative border-b border-b-gray-200 pb-3">
                    <Flatpickr
                      value={day_welcome}
                      options={{
                        locale: Vietnamese,
                        allowInput: true,
                        enableTime: true,
                        dateFormat: "d/m/Y H:i",
                        altInputClass: "date-range",
                        time_24hr: true,
                      }}
                      onChange={([date]) => {
                        setDayWelcome(date as any);
                      }}
                      placeholder="dd/mm/yyyy"
                      name="day_welcome"
                    ></Flatpickr>
                    <div className="absolute top-0 right-0">
                      <img src={IconCalendar} alt="icon" />
                    </div>
                  </div>
                </Field>
              </Row>
            </div>

            <div className="p-5 bg-white rounded-xl">
              <div className="flex flex-col ">
                <Heading>Kết luận</Heading>
                <Row className="grid-cols-1 gap-y-5">
                  <Field>
                    <Label className="font-semibold" htmlFor="conclude">
                      Kết luận chính
                    </Label>
                    <Textarea
                      control={control}
                      className="outline-none input-primary"
                      name="conclude"
                      placeholder="Nhập kết luận"
                      onChange={(e: any) => {
                        setData({
                          ...data,
                          conclude: e.target.value,
                        });
                      }}
                      value={data?.conclude || ""}
                    />
                  </Field>
                  <Field>
                    <Label className="font-semibold" htmlFor="diagnostic">
                      Chuẩn đoán
                    </Label>
                    <Textarea
                      control={control}
                      className="outline-none input-primary"
                      name="diagnostic"
                      placeholder="Nhập chuẩn đoán"
                      onChange={(e: any) => {
                        setData({
                          ...data,
                          diagnostic: e.target.value,
                        });
                      }}
                      value={data?.diagnostic || ""}
                    />
                  </Field>

                  <Field>
                    <Label
                      className="font-semibold"
                      htmlFor="treatmentInstructions"
                    >
                      Hướng đẫn điều trị
                    </Label>
                    <Textarea
                      control={control}
                      className="outline-none input-primary"
                      name="treatmentInstructions"
                      placeholder="Nhập hướng dẫn"
                      onChange={(e: any) => {
                        setData({
                          ...data,
                          treatmentInstructions: e.target.value,
                        });
                      }}
                      value={data?.treatmentInstructions || ""}
                    />
                  </Field>
                  <Field>
                    <Label className="font-semibold" htmlFor="advice">
                      Dặn dò
                    </Label>
                    <Textarea
                      control={control}
                      className="outline-none input-primary"
                      name="advice"
                      placeholder="Nhập dặn dò"
                      onChange={(e: any) => {
                        setData({
                          ...data,
                          advice: e.target.value,
                        });
                      }}
                      value={data?.advice || ""}
                    />
                  </Field>
                </Row>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-y-10 w-1/2">
            <div className="p-5 bg-white rounded-xl">
              <div className="flex flex-col">
                <Heading>Thông tin khám bệnh</Heading>
                <Row className="grid-cols-1 gap-y-5">
                  <Field>
                    <Label className="font-semibold" htmlFor="note">
                      Triệu chứng
                    </Label>
                    <Textarea
                      control={control}
                      className="outline-none input-primary"
                      name="symptom"
                      placeholder="Triệu chứng (nếu có)"
                      onChange={(e: any) => {
                        setData({
                          ...data,
                          symptom: e.target.value,
                        });
                      }}
                      value={data?.symptom || ""}
                    />
                  </Field>
                  <Field>
                    <Label className="font-semibold" htmlFor="note">
                      Bệnh sử
                    </Label>
                    <Textarea
                      control={control}
                      className="outline-none input-primary"
                      name="medicalHistory"
                      onChange={(e: any) => {
                        setData({
                          ...data,
                          medicalHistory: e.target.value,
                        });
                      }}
                      placeholder="Nhập bệnh sử (nếu có)"
                      value={data?.medicalHistory || ""}
                    />
                  </Field>
                </Row>
                <Row className="grid-cols-1 mb-10 ">
                  <Field>
                    <Label className="font-semibold" htmlFor="note">
                      Ghi chú
                    </Label>
                    <Textarea
                      control={control}
                      className="outline-none input-primary"
                      name="note"
                      onChange={(e: any) => {
                        setData({
                          ...data,
                          note: e.target.value,
                        });
                      }}
                      placeholder="Nhập ghi chú"
                      value={data?.note || ""}
                    />
                  </Field>
                </Row>
              </div>
            </div>
            <div className="p-5 bg-white rounded-xl">
              <div className="flex flex-col pointer-events-none">
                <Heading>Bác sĩ và Phòng khám</Heading>
                <Row className="grid-cols-1 gap-y-5">
                  <Field>
                    <Label className="font-semibold" htmlFor="note">
                      Bác sĩ
                    </Label>
                    <Textarea
                      control={control}
                      className="outline-none input-primary"
                      name="symptom"
                      placeholder="Bác sĩ"
                      value={data?.doctorId?.name || "---"}
                    />
                  </Field>
                  <Field>
                    <Label className="font-semibold" htmlFor="note">
                      Phòng khám thực hiện
                    </Label>
                    <Textarea
                      control={control}
                      className="outline-none input-primary"
                      name="medicalHistory"
                      placeholder="Phòng khám"
                      value={data?.clinicId?.name || "---"}
                    />
                  </Field>
                  <Field>
                    <Label className="font-semibold" htmlFor="note">
                      Ví trị phòng khám
                    </Label>
                    <Textarea
                      control={control}
                      className="outline-none input-primary"
                      name="medicalHistory"
                      placeholder="Phòng khám"
                      value={data?.clinicId?.description || "---"}
                    />
                  </Field>
                </Row>
              </div>
            </div>
          </div>
        </form>
        <div className="fixed bottom-0  py-5 bg-white left-[251px] shadowSidebar right-0 action-bottom">
          <div className="flex justify-end w-full px-5">
            <div className="flex items-center gap-x-5">
              <Button to="/examination">Đóng</Button>
              <Button
                type="submit"
                className="flex items-center justify-center px-10 py-3 text-base font-semibold leading-4 text-white rounded-md disabled:opacity-50 disabled:pointer-events-none bg-primary"
                onClick={handleSubmit(handleUpdate)}
              >
                Lưu
              </Button>
              {data?.status === "running" && (
                <Button
                  type="submit"
                  className="flex items-center justify-center px-10 py-3 text-base font-semibold leading-4 text-white rounded-md disabled:opacity-50 disabled:pointer-events-none bg-primary"
                  onClick={handleSubmit(handleDoneExamination)}
                >
                  Hoàn thành khám
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default ExaminationInfo;
