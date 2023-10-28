import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Radio, RadioChangeEvent } from "antd";
import { Layout } from "../../../components/layout";
import Heading from "../../../components/common/Heading";
import { Row } from "../../../components/row";
import { Field } from "../../../components/field";
import { Label } from "../../../components/label";
import { Input } from "../../../components/input";
import { Button } from "../../../components/button";
import { toast } from "react-toastify";
import { getOneClinic, updateClinic } from "../../../services/clinic.service";
import { useNavigate, useParams } from "react-router-dom";

const schema = yup.object({
  name: yup.string().trim().required("Tên phòng khám không được để trống!"),
});

const ClinicUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<any>({
    resolver: yupResolver<any>(schema),
    mode: "onSubmit",
  });

  const [tempStatus, setTempStatus] = useState("active"); // Biến tạm thời

  const onChange = (e: RadioChangeEvent) => {
    setTempStatus(e.target.value); // Cập nhật giá trị tạm thời
  };

  useEffect(() => {
    async function handleGetClinic() {
      const res = await getOneClinic(id);
      reset(res);
      setTempStatus(res.status); // Cập nhật giá trị tạm thời từ dữ liệu đã có
    }
    handleGetClinic();
  }, [id, reset]);

  const handleUpdateClinic = async (values: any) => {
    const res = await updateClinic({ ...values, status: tempStatus }); // Sử dụng giá trị tạm thời

    if (res?.clinic) {
      toast.success(res?.message);
      navigate("/configuration/clinic");
    } else {
      toast.error(res?.message);
    }
  };

  useEffect(() => {
    const arrayError = Object.values(errors);

    if (arrayError.length > 0) {
      toast.warning(arrayError[0]?.message as any);
    }
  });

  return (
    <Layout>
      <div className="relative h-full">
        <Heading>Cập Nhật Phòng Khám</Heading>
        <form className="w-full p-5 bg-white">
          <Heading>Thông Tin Phòng Khám</Heading>
          <Row>
            <Field>
              <Label htmlFor="_id">Mã Phòng Khám</Label>
              <Input
                control={control}
                name="_id"
                placeholder="PK + Mã phòng khám"
              />
            </Field>
            <Field>
              <Label htmlFor="name">
                <span className="star-field">*</span>
                Tên Phòng Khám
              </Label>
              <Input
                control={control}
                name="name"
                placeholder="Nhập tên phòng khám"
              />
            </Field>
          </Row>
          <Row>
            <Field>
              <Label htmlFor="description">Mô Tả</Label>
              <Input
                control={control}
                name="description"
                placeholder="Nhập mô tả"
              />
            </Field>
            <Field>
              <Label htmlFor="status">Trạng Thái</Label>
              <Radio.Group onChange={onChange} value={tempStatus}>
                <div className="flex items-center">
                  <Radio
                    className="flex items-center h-[34px]"
                    value={"active"}
                  >
                    Active
                  </Radio>
                  <Radio className="flex items-center h-[34px]" value={"stop"}>
                    Stop
                  </Radio>
                </div>
              </Radio.Group>
            </Field>
          </Row>
        </form>
        <div className="fixed bottom-0 py-5 bg-white left-[251px] shadowSidebar right-0">
          <div className="flex justify-end w-full px-5">
            <div className="flex items-center gap-x-5">
              <Button to="/configuration/clinic">Đóng</Button>
              <Button
                onClick={handleSubmit(handleUpdateClinic)}
                type="submit"
                className="flex items-center justify-center px-10 py-3 text-base font-semibold leading-4 text-white rounded-md disabled:opacity-50 disabled:pointer-events-none bg-primary"
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

export default ClinicUpdate;
