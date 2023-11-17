import { Layout } from "../../components/layout";
import { Input } from "../../components/input";
import { useForm } from "react-hook-form";
import { Field } from "../../components/field";
import { Label } from "../../components/label";
import { Row } from "../../components/row";
import Heading from "../../components/common/Heading";
import { Button } from "../../components/button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Radio, RadioChangeEvent, Select } from "antd";
import { useEffect, useState } from "react";
import { createClinic } from "../../services/clinic.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getAllUser } from "../../services/user.service";

type TDataClinic = {
  _id: string;
  name: string;
  status: string;
  description: string;
  doctorInClinic: string;
};

const schema = yup.object({
  _id: yup.string().trim().required("Mã phòng khám đã tồn tại!"),
  name: yup.string().trim().required("Tên phòng khám không được để trống!"),
  description: yup
    .string()
    .trim()
    .required("Mô tả phòng khám không được để trống!"),
});

const ClinicAdd = () => {
  const [status, setStatus] = useState("active");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>([]);
  const navigate = useNavigate();

  const onChange = (e: RadioChangeEvent) => {
    setStatus(e.target.value);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver<any>(schema),
    mode: "onSubmit",
  });

  const handleGetUsers = async () => {
    try {
      setLoading(true);

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

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetUsers();
  }, []);

  const handleCreateClinic = async (values: TDataClinic) => {
    try {
      const data = {
        ...values,
        status,
        doctorInClinic: user.length > 0 ? user[0]._id : "",
      };
      const res = await createClinic(data);

      if (res?.clinic) {
        toast.success(res?.message);
        navigate("/configuration/clinic");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const arrayError = Object.values(errors);
    if (arrayError.length > 0) {
      toast.warning(arrayError[0]?.message);
    }
  }, [errors]);

  return (
    <Layout>
      <div className="relative h-full">
        <Heading>Thêm phòng khám</Heading>
        <form className="w-full p-5 bg-white">
          <Heading>Thông tin phòng khám</Heading>
          <Row>
            <Field>
              <Label htmlFor="_id">Mã phòng khám</Label>
              <Input
                control={control}
                name="_id"
                placeholder="PK + Mã phòng khám"
              />
            </Field>
            <Field>
              <Label htmlFor="name">
                <span className="star-field">*</span>
                Tên phòng khám
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
                placeholder="Chọn bác sỹ"
                className="mb-2 react-select"
                options={user}
              ></Select>
            </Field>
          </Row>
          <Row>
            <Field>
              <Label htmlFor="description">Mô tả</Label>
              <Input
                control={control}
                name="description"
                placeholder="Nhập mô tả"
              />
            </Field>
            <Field>
              <Label htmlFor="status">Trạng thái</Label>
              <Radio.Group onChange={onChange} value={status}>
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
        <div className="fixed bottom-0  py-5 bg-white left-[251px] shadowSidebar right-0">
          <div className="flex justify-end w-full px-5">
            <div className="flex items-center gap-x-5">
              <Button to="/configuration/clinic">Đóng</Button>
              <Button
                onClick={handleSubmit(handleCreateClinic)}
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

export default ClinicAdd;
