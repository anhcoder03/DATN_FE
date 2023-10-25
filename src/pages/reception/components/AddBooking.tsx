import React, { useState } from "react";
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
import * as yup from "yup";
import moment from "moment";
import IconCalendar from "../../../assets/images/icon/ic_calendar-black.svg";
import CalcUtils from "../../../helpers/CalcULtils";
import Select from "react-select";
import { optionDoctor, optionNVTD } from "../../../constants/options";

type Props = {};

const AddBooking = (props: Props) => {
  const [gender, setGender] = useState("");
  const [dayBooking, setDayBooking] = useState(moment(new Date()).valueOf());
  const [data, setData] = useState<any>();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver<any>(schema),
    mode: "onSubmit",
  });

  return (
    <Layout>
      <div className="relative h-full">
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
                name="_id"
                placeholder="Nhập mã khách hàng"
              />
            </Field>
            <Field>
              <Label htmlFor="gender">Giới tính</Label>
              <Radio.Group value={gender}>
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
                  value={dayBooking}
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
                  }}
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
                className="mb-2 react-select"
                classNamePrefix="react-select"
                options={optionNVTD}
                onChange={(val: any) => {
                  // fetchDistrict(val?.code);
                  setValue("staffId", val);
                }}
              ></Select>
            </Field>
            <Field>
              <Label htmlFor="note">Ghi chú</Label>
              <Input control={control} name="note" placeholder="Nhập ghi chú" />
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
                // onClick={handleSubmit(handleCreateCustomer)}
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
