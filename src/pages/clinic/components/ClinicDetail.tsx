import React, { useEffect, useState } from "react";
import { Layout } from "../../../components/layout";
import Heading from "../../../components/common/Heading";
import { Row } from "../../../components/row";
import { Field } from "../../../components/field";
import { Label } from "../../../components/label";
import { Input } from "../../../components/input";
import { Button } from "../../../components/button";
import { Textarea } from "../../../components/textarea";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { getOneClinic } from "../../../services/clinic.service";

const ClinicDetail = () => {
  const { control, setValue, reset } = useForm<any>({});
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>();
  const { id } = useParams();
  useEffect(() => {
    loadData(id);
  }, [id]);
  const loadData = async (id: any) => {
    try {
      setLoading(true);
      const data: any = await getOneClinic(id);
      setLoading(false);
      reset(data);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(data, "data");

  return (
    <Layout>
      <div className="relative h-full">
        <Heading>Xem chi tiết phòng khám</Heading>
        <div className="w-full p-5 bg-white ">
          <Heading>Thông tin phòng khám</Heading>
          <Row>
            <Field className={"only-view"}>
              <Label className="font-semibold" htmlFor="phone">
                Mã phòng khám
              </Label>
              <Input
                control={control}
                placeholder=""
                className="!border-transparent font-semibold "
                value={data?._id}
              ></Input>
            </Field>
            <Field className={"only-view"}>
              <Label className="font-semibold" htmlFor="phone">
                <span className="star-field">*</span>
                Tên phòng khám
              </Label>
              <Input
                control={control}
                placeholder=""
                className="!border-transparent font-semibold "
                value={data?.name}
              ></Input>
            </Field>
          </Row>
          <Row>
            <Field className={"only-view"}>
              <Label className="font-semibold" htmlFor="phone">
                Bác sỹ
              </Label>
              <Input
                control={control}
                placeholder=""
                className="!border-transparent font-semibold"
                value={data?.doctorInClinic?.name}
              ></Input>
            </Field>
            <Field className={"only-view"}>
              <Label className="font-semibold" htmlFor="phone">
                <span className="star-field">*</span>
                Trạng thái hoạt động
              </Label>
              {data?.status === "active" ? (
                <span className="text-primary font-semibold">
                  Đang hoạt động
                </span>
              ) : (
                <span className="text-red-500 font-semibold">
                  Ngừng hoạt động
                </span>
              )}
            </Field>
          </Row>
          <Row className="">
            <Field className={"only-view"}>
              <Label className="font-semibold" htmlFor="phone">
                Mô tả
              </Label>
              <Textarea
                control={control}
                placeholder="----"
                className="!border-transparent font-semibold "
                value={data?.description}
              />
            </Field>
          </Row>
        </div>
        <div className="fixed bottom-0  py-5 bg-white left-[251px] shadowSidebar right-0">
          <div className="flex justify-end w-full px-5">
            <div className="flex items-center gap-x-5">
              <Button to="/configuration/clinic">Đóng</Button>
              <Button
                to={`/configuration/clinic/update/${id}`}
                className="flex items-center justify-center px-10 py-3 text-base font-semibold leading-4 text-white rounded-md disabled:opacity-50 disabled:pointer-events-none bg-primary"
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

export default ClinicDetail;
