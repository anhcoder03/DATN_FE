import React, { useEffect, useState } from "react";
import { Layout } from "../../../components/layout";
import Heading from "../../../components/common/Heading";
import { Button } from "../../../components/button";
import { Row } from "../../../components/row";
import { Field } from "../../../components/field";
import { Label } from "../../../components/label";
import { Input } from "../../../components/input";
import { useForm } from "react-hook-form";
import { Radio, Spin } from "antd";
import { IconPhone } from "../../../components/icons";
import Flatpickr from "react-flatpickr";
import { Vietnamese } from "flatpickr/dist/l10n/vn";
import moment from "moment";
import IconCalendar from "../../../assets/images/icon/ic_calendar-black.svg";
import CalcUtils from "../../../helpers/CalcULtils";
import Select from "react-select";
import { getAllCustomer } from "../../../services/customer.service";
import { getAllStaff } from "../../../services/staff.service";
import { Textarea } from "../../../components/textarea";
import {
  UpdateExamination,
  getOneExamination,
} from "../../../services/examination.service";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { isEmpty } from "lodash";
import LoadingPage from "../../../components/common/LoadingPage";

const UpdateBooking = () => {
  const [dataCustomers, setDataCustomers] = useState<any[]>([]);
  const [staffs, setStaffs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>({
    day_booking: new Date(),
    gender: "",
  });
  const validate = () => {
    if (isEmpty(data?.customer)) {
      toast.warning("Bệnh nhân không được để trống!");
      return false;
    }
    if (isEmpty(data?.staffId)) {
      toast.warning("Nhân viên tiếp đón không được để trống!");
      return false;
    }
    return true;
  };
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getCustomers();
    getStaffs();
  }, []);

  useEffect(() => {
    if (id !== undefined) {
      loadData();
    }
  }, [id]);

  async function loadData() {
    try {
      setLoading(true);
      const response = await getOneExamination(id);
      setLoading(false);
      const resData = response?.examination;
      setData({
        customer: resData?.customerId?._id,
        dateOfBirth: moment(resData?.customerId?.dateOfBirth).unix(),
        gender: resData?.customerId?.gender,
        phone: resData?.customerId?.phone,
        note: resData?.note,
        staffId: resData?.staffId?._id,
        day_booking: resData?.day_booking,
      });
    } catch (error) {
      toast.error("Đã có lỗi sảy ra!!!");
    }
  }

  async function getCustomers() {
    const response = await getAllCustomer({ _limit: 3000 });
    const ListArr: any = [];
    response?.docs?.map((e: any) => {
      ListArr?.push({
        ...e,
        value: e?._id,
        label: `${e?.name} - ${e?.phone}`,
      });
    });
    setDataCustomers(ListArr);
  }

  async function getStaffs() {
    const response = await getAllStaff({ name: "Nhân viên tiếp đón" });
    const ListArr: any = [];
    response?.map((e: any) => {
      ListArr?.push({
        ...e,
        value: e?._id,
        label: e?.name,
      });
    });
    setStaffs(ListArr);
  }

  const handleUpdateBooking = async () => {
    if (!validate()) return;
    const params = {
      customerId: data?.customer,
      staffId: data?.staffId,
      note: data?.note,
      day_booking: data?.day_booking,
      status: "booking",
      _id: id,
    };
    setLoading(true);
    const res = await UpdateExamination(params);
    setLoading(false);
    if (res?.examination) {
      toast.success("Cập nhật đặt lịch thành công!");
      navigate("/reception");
    } else {
      toast.error("Có lỗi sảy ra!!!");
    }
  };

  useEffect(() => {
    const arrayError: any = Object.values(errors);
    if (arrayError.length > 0) {
      toast.warning(arrayError[0]?.message);
    }
  }, [errors]);

  const handleChangeInput = (event?: any) => {
    let { value, name } = event.target;
    if (value === " ") return;
    setData({
      ...data,
      [name]: value,
    });
  };

  return (
    <Spin spinning={loading} indicator={<LoadingPage />}>
      <Layout>
        <div className="relative h-full">
          <Heading>Chỉnh sửa lịch khám, Tư vấn</Heading>
          <form className="w-[70%] p-5 bg-white ">
            <Heading>Thông tin bệnh nhân</Heading>
            <Row className="grid-cols-2 ">
              <Field>
                <Label htmlFor="_id">
                  <span className="star-field">*</span>
                  Họ và tên khách hàng/bệnh nhân
                </Label>
                <Select
                  placeholder=""
                  className="mb-2 !text-xs hover:!border-transparent react-select"
                  classNamePrefix="hover:!border-transparent  react-select"
                  name="customerId"
                  options={dataCustomers}
                  onChange={(val: any) => {
                    setValue("customerId", val?._id);
                    setData({
                      ...data,
                      customer: val?._id,
                      dateOfBirth: val?.dateOfBirth,
                      gender: val?.gender,
                      phone: val?.phone,
                    });
                  }}
                  value={dataCustomers?.find(
                    (item: any) => item?._id == data?.customer
                  )}
                ></Select>
              </Field>
              <Field>
                <Label htmlFor="gender">Giới tính</Label>
                <Radio.Group value={data?.gender}>
                  <div className="flex items-center gap-x-10">
                    <Radio className="flex items-center h-[34px]" value={"Nam"}>
                      Nam
                    </Radio>
                    <Radio className="flex items-center h-[34px]" value={"Nữ"}>
                      Nữ
                    </Radio>
                  </div>
                </Radio.Group>
              </Field>
            </Row>
            <Row className="grid-cols-2 ">
              <Field className="only-view">
                <Label htmlFor="phone">
                  <span className="star-field">*</span>
                  Số điện thoại
                </Label>
                <Input
                  control={control}
                  name="phone"
                  value={data?.phone || "---"}
                  placeholder="Nhập số điện thoại"
                >
                  <div className="p-2 bg-white">
                    <IconPhone></IconPhone>
                  </div>
                </Input>
              </Field>
              <Field>
                <Label htmlFor="_id">Ngày đặt lịch</Label>
                <div className="relative border-b border-b-gray-200 pb-3">
                  <Flatpickr
                    value={data?.day_booking}
                    options={{
                      locale: Vietnamese,
                      allowInput: true,
                      enableTime: true,
                      dateFormat: "d/m/Y H:i",
                      altInputClass: "date-range",
                      time_24hr: true,
                    }}
                    onChange={([date]) => {
                      setValue("day_booking", date);
                    }}
                    placeholder="dd/mm/yyyy"
                    name="day_booking"
                  ></Flatpickr>
                  <div className="absolute top-0 right-0">
                    <img src={IconCalendar} alt="icon" />
                  </div>
                </div>
              </Field>
            </Row>
            <Row className="grid-cols-2 ">
              <Field className="only-view">
                <Label htmlFor="_id">Năm sinh</Label>
                <Input
                  control={control}
                  type="text"
                  value={
                    data?.dateOfBirth
                      ? moment(data?.dateOfBirth).format("DD/MM/YYYY")
                      : "---"
                  }
                />
                <div className="absolute top-0 right-0">
                  <img src={IconCalendar} alt="icon" />
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
                <Select
                  placeholder="Chọn nhân viên tiếp đón"
                  className="mb-2 react-select"
                  classNamePrefix="react-select"
                  options={staffs}
                  onChange={(val: any) => {
                    setValue("staffId", val?._id);
                    setData({
                      ...data,
                      staffId: val?._id,
                    });
                  }}
                  value={staffs?.find(
                    (item: any) => item?._id == data?.staffId
                  )}
                ></Select>
              </Field>
              <Field>
                <Label htmlFor="note">Ghi chú</Label>
                <Textarea
                  control={control}
                  className="outline-none input-primary"
                  name="note"
                  placeholder="Nhập ghi chú"
                  onChange={(val: any) => {
                    handleChangeInput(val);
                  }}
                  value={data?.note}
                />
              </Field>
            </Row>
          </form>
          <div className="fixed bottom-0  py-5 bg-white left-[251px] shadowSidebar right-0">
            <div className="flex justify-end w-full px-5">
              <div className="flex items-center gap-x-5">
                <Button to={`/reception/booking/${id}`}>Đóng</Button>
                <Button
                  type="submit"
                  className="flex items-center justify-center px-10 py-3 text-base font-semibold leading-4 text-white rounded-md disabled:opacity-50 disabled:pointer-events-none bg-primary"
                  onClick={handleSubmit(handleUpdateBooking)}
                >
                  Lưu
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </Spin>
  );
};

export default UpdateBooking;
