import React, { useState } from "react";
import { Layout } from "../../../components/layout";
import Heading from "../../../components/common/Heading";
import { Button } from "../../../components/button";
import { Row } from "../../../components/row";
import { Field } from "../../../components/field";
import { Label } from "../../../components/label";
import { Input } from "../../../components/input";
import { Radio } from "antd";
import { IconPhone, IconPlus } from "../../../components/icons";
import Flatpickr from "react-flatpickr";
import { Vietnamese } from "flatpickr/dist/l10n/vn";
import * as yup from "yup";
import moment from "moment";
import IconCalendar from "../../../assets/images/icon/ic_calendar-black.svg";
import CalcUtils from "../../../helpers/CalcULtils";
import Select from "react-select";
import { optionDoctor, optionNVTD } from "../../../constants/options";
import { useForm } from "react-hook-form";
import { IconTrash } from "../../../components/icons";
import { Table } from "../../../components/table";
import { cloneDeep } from "lodash";

type Props = {};

const ReceptionAdd = (props: Props) => {
  const headings = ["Tên dịch vụ", "Đơn giá", ""];
  const [dataServices, setDataServices] = useState([
    {
      service_id: "",
      price: "",
    },
  ]);
  const handleAddService = () => {
    const newData = {
      service_id: "",
      price: "",
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
        },
      ];
    }
    setDataServices(newServiceExam);
  };
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
      <div>
        <div className="relative-h-full">
          <Heading>Thêm mới tiếp đón</Heading>
          <form className="flex  justify-between gap-x-10 w-full">
            <div className="p-5 bg-white w-1/2 rounded-xl">
              <Heading>Thông tin khách hàng</Heading>
              <Row className="grid-cols-2 mb-10">
                <Field>
                  <Label htmlFor="_id">
                    <span className="star-field">*</span>
                    Chọn khách hàng
                  </Label>
                  <Input
                    control={control}
                    name="_id"
                    placeholder="Nhập mã khách hàng"
                  />
                </Field>
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
              </Row>
              <Row className="grid-cols-2 mb-10">
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
              </Row>
              <Row className="grid-cols-2 mb-10">
                <Field>
                  <Label htmlFor="">Địa chỉ</Label>
                  <Input
                    control={control}
                    className="border-none"
                    name="date"
                    value={"---"}
                  />
                </Field>
                <Field>
                  <Label htmlFor="">Giới tính</Label>
                  <Input
                    control={control}
                    className="border-none"
                    name="gender"
                    value={"---"}
                  />
                </Field>
              </Row>
              <Row className="grid-cols-2 mb-10">
                <Field>
                  <Label htmlFor="_id">Thời gian tiếp đón</Label>
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
              <Row className="grid-cols-1 mb-10 ">
                <Field>
                  <Label htmlFor="note">Ghi chú</Label>
                  <textarea
                    className="outline-none input-primary"
                    name="note"
                    placeholder="Nhập ghi chú"
                  />
                </Field>
              </Row>
              <Row className="grid-cols-1 ">
                <Field>
                  <Label htmlFor="note">Lý do khám bệnh</Label>
                  <textarea
                    className="outline-none input-primary"
                    name="note"
                    placeholder="Nhập lý do khám bệnh"
                  />
                </Field>
              </Row>
            </div>
            <div className="flex flex-col gap-y-10 w-1/2">
              <div className="p-5 bg-white rounded-xl">
                <div className="flex">
                  <Heading>Chọn bác sĩ(Phòng khám)</Heading>
                </div>
              </div>
              <div className="p-5 bg-white rounded-xl">
                <Heading>Chỉ định dịch vụ</Heading>
                <table className="w-full custom-table">
                  <thead className="bg-[#f4f6f8] text-sm">
                    <th>Tên dịch vụ</th>
                    <th>Đơn giá</th>
                    <th>Thao tác</th>
                  </thead>
                  <tbody>
                    {dataServices?.map((item, index) => (
                      <tr className="hover:bg-transparent" key={index}>
                        <td>
                          <Select
                            placeholder="Chọn dich vụ"
                            className="mb-2 react-select"
                            classNamePrefix="react-select"
                            options={optionNVTD}
                            onChange={(val: any) => {
                              // fetchDistrict(val?.code);
                              setValue("staffId", val);
                            }}
                          ></Select>
                        </td>
                        <td>0 đ</td>
                        <td>
                          <div className="flex items-center gap-x-2">
                            <button
                              type="button"
                              className="w-[40px] h-[40px] border border-gray-200 rounded-lg flex justify-center items-center"
                              onClick={() => handleRemoveService(index)}
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
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </form>
        </div>
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

export default ReceptionAdd;
