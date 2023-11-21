import React, { useEffect, useState } from "react";
import { Layout } from "../../../components/layout";
import Heading from "../../../components/common/Heading";
import { Button } from "../../../components/button";
import { Row } from "../../../components/row";
import { Field } from "../../../components/field";
import { Label } from "../../../components/label";
import { Input } from "../../../components/input";
import { useForm } from "react-hook-form";
import { Radio } from "antd";
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
import { createExamination } from "../../../services/examination.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const AddBooking = () => {
  const [dataCustomers, setDataCustomers] = useState<any[]>([]);
  const [staffs, setStaffs] = useState<any[]>([]);
  const [data, setData] = useState<any>(
    {
      day_booking: new Date(),
      gender: ''
    }
  );

  const schema = yup.object({
    customerId: yup.string().required("Bệnh nhân không được để trống!"),
    staffId: yup.string().required("Nhân viên tiếp đón không được để trống!"),
  })

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver<any>(schema),
    mode: "onSubmit",
  });

  const navigate = useNavigate();
  useEffect(() => {
    getCustomers();
    getStaffs();
  }, [])

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

  const handleCreateBooking = async () => {
    const params = {
      customerId: data?.customer,
      staffId: data?.staffId,
      note: data?.note,
      day_booking: data?.day_booking,
      status: 'booking'
    }
    
    const res = await createExamination(params);
    if (res?.examination) {
      toast.success('Tạo đặt lịch thành công!');
      navigate("/reception");
    } else {
      toast.error('Có lỗi sảy ra!!!');
    }
  }

  useEffect(() => {
    const arrayError: any = Object.values(errors);
    if (arrayError.length > 0) {
      toast.warning(arrayError[0]?.message);
    }
  }, [errors]);

  const handleChangeInput = (event?: any) => {
    let { value, name } = event.target
    if (value === " ") return;
    setData({
        ...data,
        [name]: value
    })
  }
  
  return (
    <Layout>
      <div className="relative h-full">
        <Heading>Đặt lịch khám, Tư vấn</Heading>
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
                    dateOfBirth: moment(val?.dateOfBirth).unix(),
                    gender: val?.gender,
                    phone: val?.phone
                  });
                }}
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
            <Field>
              <Label htmlFor="_id">Năm sinh</Label>
              <div className="relative border-b border-b-gray-200 pb-3">
                <Flatpickr
                  options={{
                    locale: Vietnamese,
                    allowInput: true,
                    dateFormat: "d/m/Y",
                    altInputClass: "date-range",
                    maxDate: "today",
                  }}
                  onChange={([date]) => {
                    setValue("dateOfBirth", date);
                    console.log('datên', date, data);
                    
                    setData({
                      ...data,
                      dateOfBirth: date
                    })
                  }}
                  value={data?.dateOfBirth}
                  placeholder="dd/mm/yyyy"
                  name="dateOfBirth"
                ></Flatpickr>
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
              <Label htmlFor="staffId">Nhân viên tiếp đón</Label>
              <Select
                placeholder="Chọn nhân viên tiếp đón"
                className="mb-2 !text-xs hover:!border-transparent react-select"
                classNamePrefix=" hover:!border-transparent react-select"
                options={staffs}
                onChange={(val: any) => {
                  setValue("staffId", val?._id);
                  setData({
                    ...data,
                    staffId: val?._id
                  })
                }}
                value = {data?.staffId?.id}
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
                  handleChangeInput(val)
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
              <Button
                type="submit"
                className="flex items-center justify-center px-10 py-3 text-base font-semibold leading-4 text-white rounded-md disabled:opacity-50 disabled:pointer-events-none bg-primary"
                onClick={handleSubmit(handleCreateBooking)}
              >
                Lưu
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddBooking;
