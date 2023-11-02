import React, { useEffect, useState } from "react";
import { Layout } from "../../components/layout";
import { useParams } from "react-router-dom";
import { getOneServiceByExam } from "../../services/designation.service";
import Heading from "../../components/common/Heading";
import { Label, LabelStatusDesignationDetail } from "../../components/label";
import { Row } from "../../components/row";
import { Field } from "../../components/field";
import { Input } from "../../components/input";
import { useForm } from "react-hook-form";
import moment from "moment";
import { Table } from "../../components/table";
import PriceUtils from "../../helpers/PriceUtils";
import { Textarea } from "../../components/textarea";
import { Button } from "../../components/button";

type Props = {};
const headings = ["Mã dịch vụ", "Tên dịch vụ", "Giá"];

const DesignationDetail = (props: Props) => {
  const { control } = useForm();
  const [designation, setDesignation] = useState<any>({});
  console.log(designation);
  const { id } = useParams();
  useEffect(() => {
    async function getOneService() {
      const response = await getOneServiceByExam(id);
      setDesignation(response);
    }
    getOneService();
  }, [id]);
  console.log(id);
  return (
    <Layout>
      <div className="relative-h-full">
        <Heading>Xem chi tiết đơn dịch vụ</Heading>
        <form className="flex  justify-between gap-x-10 w-full pb-16">
          <div className="flex flex-col gap-y-5 w-[60%]">
            <div className="p-5 bg-white w-full rounded-xl">
              <Heading>
                Thông tin chung{" "}
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
            <div className="p-5 bg-white w-full rounded-xl">
              <Heading>Thông tin dịch vụ</Heading>
              <table className="w-full custom-table">
                <thead className="bg-[#f4f6f8] text-sm">
                  <th>Tên dịch vụ</th>
                  <th>Đơn giá</th>
                  <th>Thao tác</th>
                </thead>
                <tbody>
                  <tr>
                    <td>{designation?.service_examination?.serviceId}</td>
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
            <div className="p-5 bg-white w-full rounded-xl">
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
            <div className="p-5 bg-white w-full rounded-xl">
              <Heading>Hình ảnh và tệp kết quả</Heading>
              <Row>
                <Field>
                  <Label htmlFor="mainResults">Chèn link</Label>
                  <Input
                    control={control}
                    placeholder="----"
                    className="!border-transparent font-semibold text-black"
                    value={
                      designation?.fileResult ? designation?.fileResult : "---"
                    }
                  ></Input>
                </Field>
              </Row>
            </div>
          </div>
          <div className="flex flex-col gap-y-5 w-[40%]">
            <div className="p-5 bg-white w-full rounded-xl">
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
            <div className="p-5 bg-white w-full rounded-xl">
              <Heading>
                Thông tin thanh toán
                <div className="inline-flex gap-x-3 items-center ml-10 ">
                  <span className="text-sm">Tổng tiền: </span>
                  <span className="text-[#eda119]">
                    {PriceUtils.format(
                      designation?.service_examination?.price
                    ) || "---"}
                  </span>
                </div>
              </Heading>
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
                      designation?.payment_method
                        ? designation?.payment_method
                        : "Tiền mặt"
                    }
                  ></Input>
                </Field>
                <Field className={"only-view"}>
                  <Label className="font-semibold" htmlFor="phone">
                    <span className="star-field">*</span>
                    Tài khoản quỹ
                  </Label>
                  <Input
                    control={control}
                    placeholder="----"
                    className="!border-transparent font-semibold text-black"
                    value={
                      designation?.payment_method
                        ? designation?.payment_method
                        : "Nguyễn Phi Anh - 03324222 - MB Bank"
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
            </div>
          </div>
        </form>
        <div className="fixed bottom-0  py-5 bg-white left-[251px] shadowSidebar right-0 action-bottom">
          <div className="flex justify-end w-full gap-x-2">
            <div className="flex items-center gap-x-2">
              <Button to="/examination">Đóng</Button>
              {designation?.paymentStatus == "paid" && (
                <Button
                  type="submit"
                  className="flex items-center justify-center px-5 py-3 text-base font-semibold leading-4 text-white rounded-md disabled:opacity-50 disabled:pointer-events-none bg-primary"
                >
                  In
                </Button>
              )}
              {designation?.paymentStatus === "unpaid" && (
                <Button
                  type="submit"
                  className="flex items-center justify-center px-5 py-3 text-base font-semibold leading-4 text-white rounded-md disabled:opacity-50 disabled:pointer-events-none btn-info"
                >
                  Thu tiền
                </Button>
              )}
              <Button
                type="submit"
                className="flex items-center justify-center px-5 py-3 text-base font-semibold leading-4 text-white rounded-md disabled:opacity-50 disabled:pointer-events-none btn-info"
                // onClick={handleSubmit(handleChangeStatus)}
              >
                Đang thực hiện
              </Button>
              <Button
                type="submit"
                className="flex items-center justify-center px-5 py-3 text-base font-semibold leading-4 text-[#fd4858] rounded-md disabled:opacity-50 disabled:pointer-events-none bg-[#fd485833]"
              >
                Hủy
              </Button>
              <Button
                type="submit"
                className="flex items-center justify-center px-5 py-3 text-base font-semibold leading-4 text-white rounded-md disabled:opacity-50 disabled:pointer-events-none btn-info"
              >
                Hoàn thành
              </Button>
              <Button
                type="submit"
                className="flex items-center justify-center px-5 py-3 text-base font-semibold leading-4 text-white rounded-md disabled:opacity-50 disabled:pointer-events-none bg-primary"
              >
                Chỉnh sửa
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DesignationDetail;
