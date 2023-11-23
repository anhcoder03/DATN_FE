import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Radio, Select } from "antd";
import { Layout } from "../../../components/layout";
import Heading from "../../../components/common/Heading";
import { Row } from "../../../components/row";
import { Field } from "../../../components/field";
import { Label } from "../../../components/label";
import { Input } from "../../../components/input";
import { Button } from "../../../components/button";
import { toast } from "react-toastify";
import { getOneClinic, updateClinic } from "../../../services/clinic.service";
import { getAllUser } from "../../../services/user.service";
import { useNavigate, useParams } from "react-router-dom";

const schema = yup.object({
  name: yup.string().trim().required("Tên Chức danh không được để trống!"),
});

const TitleUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>([]);
  const [doctor, setDoctor] = useState<any>();
  const [tempStatus, setTempStatus] = useState("active");
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm<any>({
    resolver: yupResolver<any>(schema),
    mode: "onSubmit",
  });

  useEffect(() => {
    async function handleGetClinic() {
      try {
        const res = await getOneClinic(id);
        console.log("res", res);
        reset(res);
        setTempStatus(res.status);
        setDoctor(res?.doctorInClinic?._id);
      } catch (error) {
        console.error(error);
      }
    }
    handleGetClinic();
  }, [id, reset]);

  const handleGetUsers = async () => {
    try {
      const data = await getAllUser();
      const roleDoctor = data?.docs;

      const filteredUsers = roleDoctor.filter(
        (user: any) => user.role === "VT-00000002"
      );

      if (filteredUsers.length > 0) {
        const array: any = [];
        filteredUsers.forEach((item: any) => {
          array.push({ ...item, label: item?.name, value: item?._id });
        });
        setUser(array);
      } else {
        console.log("Không có người dùng có quyền truy cập");
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log("ushfsdshgvds", user);

  useEffect(() => {
    handleGetUsers();
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempStatus(e.target.value);
  };

  const onChangeDoctor = (value: string) => {
    setDoctor(value);
    setValue("doctorInClinic", value);
  };

  const handleUpdateClinic = async (values: any) => {
    try {
      const res = await updateClinic({ ...values, status: tempStatus });
      if (res?.clinic) {
        toast.success(res?.message);
        navigate("/configuration/clinic");
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="relative h-full">
        <Heading>Cập Nhật chức danh</Heading>
        <form className="w-full p-5 bg-white">
          <Heading>Thông Tin chức danh</Heading>
          <Row>
            <Field>
              <Label htmlFor="_id">Mã chức danh</Label>
              <Input
                control={control}
                name="_id"
                placeholder="Mã chức danh"
                readOnly
              />
            </Field>
            <Field>
              <Label htmlFor="name">
                <span className="star-field">*</span>
                Tên chức danh
              </Label>
              <Input
                control={control}
                name="name"
                placeholder="Nhập tên chức danh"
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
              <Button to="/configuration/title">Đóng</Button>
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

export default TitleUpdate;