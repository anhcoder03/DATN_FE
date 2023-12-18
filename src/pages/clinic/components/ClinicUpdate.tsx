import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Radio } from "antd";
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
import Select from "react-select";
import { Spin } from "antd";
import LoadingPage from "../../../components/common/LoadingPage";

const schema = yup.object({
  name: yup.string().trim().required("Tên phòng khám không được để trống!"),
});

const ClinicUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<any[]>([]);
  const [data, setData] = useState<any>();
  const [tempStatus, setTempStatus] = useState("active");
  const [loading, setLoading] = useState<any>(false);
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
        setLoading(true);
        const res = await getOneClinic(id);
        setLoading(false);
        reset(res);
        setTempStatus(res.status);
        setData({
          ...res,
          doctorInClinic: res?.doctorInClinic?._id,
        });
      } catch (error) {
        console.error(error);
      }
    }
    handleGetClinic();
  }, [id, reset]);

  const handleGetUsers = async () => {
    try {
      const data = await getAllUser({ limit: 1000 });
      const roleDoctor = data?.docs;

      const filteredUsers = roleDoctor.filter(
        (user: any) => user.role._id === "VT-00000002"
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

  useEffect(() => {
    handleGetUsers();
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempStatus(e.target.value);
  };

  const handleUpdateClinic = async (values: any) => {
    try {
      setLoading(true);
      const res = await updateClinic({
        ...values,
        status: tempStatus,
        doctorInClinic: data?.doctorInClinic,
      });
      setLoading(false);
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
    <Spin spinning={loading} indicator={<LoadingPage />}>
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
                  readOnly
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
              <Field>
                <Label htmlFor="categoryId">
                  <span className="star-field">*</span>
                  Chọn bác sỹ
                </Label>
                <Select
                  placeholder="Chọn bác sĩ"
                  className="mb-2 react-select"
                  classNamePrefix="react-select"
                  options={user}
                  onChange={(val: any) => {
                    setData({
                      ...data,
                      doctorInClinic: val?.value,
                    });
                  }}
                  value={user?.find(
                    (item: any) => item?._id == data?.doctorInClinic
                  )}
                ></Select>
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
                <Radio.Group
                  onChange={(e: any) => onChange(e)}
                  value={tempStatus}
                >
                  <div className="flex items-center">
                    <Radio
                      className="flex items-center h-[34px]"
                      value={"active"}
                    >
                      Active
                    </Radio>
                    <Radio
                      className="flex items-center h-[34px]"
                      value={"stop"}
                    >
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
    </Spin>
  );
};

export default ClinicUpdate;
