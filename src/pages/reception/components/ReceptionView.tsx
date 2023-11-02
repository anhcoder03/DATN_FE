import { useEffect, useState } from "react";
import { Layout } from "../../../components/layout";
import Heading from "../../../components/common/Heading";
import { Row } from "../../../components/row";
import { Field } from "../../../components/field";
import { Label, LabelStatus } from "../../../components/label";
import { Radio } from "antd";
import { Input } from "../../../components/input";
import { IconPhone } from "../../../components/icons";
import IconCalendar from "../../../assets/images/icon/ic_calendar-black.svg";
import { Textarea } from "../../../components/textarea";
import Flatpickr from "react-flatpickr";
import { Vietnamese } from "flatpickr/dist/l10n/vn";
import { Button } from "../../../components/button";
import { useParams } from "react-router-dom";
import { getOneExamination } from "../../../services/examination.service";
import { getServiceByIdExam } from "../../../services/designation.service";
import { useForm } from "react-hook-form";
import CalcUtils from "../../../helpers/CalcULtils";
import PriceUtils from "../../../helpers/PriceUtils";

const ReceptionView = () => {
  const [dataServices, setDataServices] = useState<any[]>([]);
  const [data, setData] = useState<any>({});
  const { id } = useParams();

  const { control, reset } = useForm({
    mode: "onChange",
  });

  console.log(">>>control:", control);

  useEffect(() => {
    async function getExamination() {
      const response = await getOneExamination(id);
      setData(response);
      reset(response);
    }
    getExamination();
  }, []);

  const handleGetServiceByExam = async () => {
    const response = await getServiceByIdExam(id);
    if (response?.docs) {
      setDataServices(response?.docs);
    }
  };
  useEffect(() => {
    handleGetServiceByExam();
  }, []);

  return (
    <Layout>
      <div>
        <div className="relative-h-full">
          <Heading>Chỉnh sửa tiếp đón</Heading>
          <form className="flex  justify-between gap-x-10 w-full pb-16">
            <div className="p-5 bg-white w-1/2 rounded-xl">
              <Heading>
                Thông tin khách hàng{" "}
                <LabelStatus type={data?.status}></LabelStatus>
                {/* <span className="px-3 text-sm py-1 bg-primary text-white rounded-lg">
                  Đã Khám
                </span> */}
              </Heading>
              <Row className="grid-cols-2 mb-10">
                <Field>
                  <Label className="font-semibold" htmlFor="_id">
                    <span className="star-field">*</span>
                    Chọn khách hàng
                  </Label>
                  <Input
                    placeholder="----"
                    className="!border-transparent font-semibold text-black"
                    control={control}
                    value={data?.customerId?.name}
                  ></Input>
                </Field>
                <Field>
                  <Label className="font-semibold" htmlFor="staffId">
                    Nhân viên tiếp đón
                  </Label>
                  <Input
                    placeholder="----"
                    className="!border-transparent font-semibold text-black"
                    control={control}
                    value={data?.staffId?.name}
                  ></Input>
                </Field>
              </Row>
              <Row className="grid-cols-2 mb-10">
                <Field>
                  <Label className="font-semibold" htmlFor="">
                    Tuổi
                  </Label>
                  <Input
                    control={control}
                    className="border-none font-semibold text-black"
                    value={
                      data?.customerId?.dateOfBirth
                        ? CalcUtils.calculateAge(data?.customerId?.dateOfBirth)
                        : "---"
                    }
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
                <Field>
                  <Label className="font-semibold" htmlFor="">
                    Địa chỉ
                  </Label>
                  <Input
                    control={control}
                    className="border-none font-semibold text-black"
                    value={
                      data?.customerId?.province
                        ? `${data?.customerId?.commune.name}, ${data?.customerId?.district?.name}, ${data?.customerId?.province?.name}`
                        : "---"
                    }
                  />
                </Field>
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
              </Row>
              <Row className="grid-cols-2 mb-10">
                <Field>
                  <Label className="font-semibold" htmlFor="_id">
                    Thời gian tiếp đón
                  </Label>
                  <div className="relative border-b border-b-gray-200 pb-3 pointer-events-none">
                    <Flatpickr
                      value={data?.day_welcome}
                      options={{
                        locale: Vietnamese,
                        allowInput: true,
                        enableTime: true,
                        dateFormat: "d/m/Y H:i",
                        altInputClass: "date-range",
                        time_24hr: true,
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
              <Row className="grid-cols-2 ">
                <Field>
                  <Label className="font-semibold" htmlFor="note">
                    Triệu chứng
                  </Label>
                  <Textarea
                    control={control}
                    className="outline-none input-primary pointer-events-none hover-border-none"
                    name="symptom"
                    placeholder="Không có triệu trứng"
                  />
                </Field>
                <Field>
                  <Label className="font-semibold" htmlFor="note">
                    Bệnh sử
                  </Label>
                  <Textarea
                    control={control}
                    className="outline-none input-primary pointer-events-none hover-border-none"
                    name="medicalHistory"
                    placeholder="Chưa có bệnh sử"
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
                    className="outline-none input-primary pointer-events-none hover-border-none"
                    name="note"
                    placeholder="Không có ghi chú"
                  />
                </Field>
              </Row>
            </div>
            <div className="flex flex-col gap-y-10 w-1/2">
              <div className="p-5 bg-white rounded-xl">
                <div className="flex flex-col">
                  <Heading>Phòng khám - Bác sĩ</Heading>

                  <Radio.Group>
                    <div className="flex flex-col">
                      <Radio className="flex items-center h-[40px]">
                        <span className="font-semibold pr-2">
                          {data?.clinicId?.name || "Phòng không xác định"}
                        </span>
                        -
                        <span className="text-[#6f42c1] pl-2 font-semibold">
                          {data?.doctorId?.name}
                        </span>
                      </Radio>
                    </div>
                  </Radio.Group>
                </div>
              </div>
              <div className="p-5 bg-white rounded-xl">
                <Heading>Chỉ định dịch vụ</Heading>
                {dataServices.length ? (
                  <table className="w-full custom-table">
                    <thead className="bg-[#f4f6f8] text-sm">
                      <th>Tên dịch vụ</th>
                      <th>Đơn giá</th>
                      <th>Trạng thái thanh toán</th>
                    </thead>
                    <tbody>
                      {dataServices?.map((item: any, index: any) => (
                        <tr
                          className="hover:bg-transparent"
                          key={`active-${index}`}
                        >
                          <td>{item?.service_examination?.name}</td>
                          <td>
                            {PriceUtils.format(
                              item?.service_examination?.price || 0,
                              "đ"
                            )}
                          </td>
                          <td>
                            <span
                              style={{
                                cursor: "pointer",
                                color:
                                  item?.paymentStatus === "paid"
                                    ? "green"
                                    : item?.paymentStatus === "unpaid"
                                    ? "red"
                                    : "white",
                              }}
                            >
                              {item?.paymentStatus === "paid"
                                ? "Đã thanh toán"
                                : "Chưa thanh toán"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p style={{ color: "#EDA119", fontSize: 15 }}>
                    Không tìm thấy dữ liệu dịch vụ
                  </p>
                )}
              </div>
            </div>
          </form>
        </div>
        <div className="fixed bottom-0  py-5 bg-white left-[251px] shadowSidebar right-0 action-bottom">
          <div className="flex justify-end w-full px-5">
            <div className="flex items-center gap-x-5">
              <Button to="/reception?tab=waiting">Đóng</Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReceptionView;
