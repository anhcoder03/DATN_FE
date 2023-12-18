import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "../../../../components/button";
import Heading from "../../../../components/common/Heading";
import { Field } from "../../../../components/field";
import { IconPhone } from "../../../../components/icons";
import { Input } from "../../../../components/input";
import { Label } from "../../../../components/label";
import { Layout } from "../../../../components/layout";
import { Row } from "../../../../components/row";
import RoleSelect from "../../../../components/select/role";
import { getOneUser, updateUser } from "../../../../services/user.service";
import { IUser } from "../../../../types/user.type";
import { Spin } from "antd";
import LoadingPage from "../../../../components/common/LoadingPage";
import Select from "react-select";
import { getAllRole } from "../../../../services/role.service";
import { IRole } from "../../../../types/role.type";
import * as yup from "yup";

const schemaConfigUser = yup.object({
  name: yup.string().trim().required("Tên người dùng không được để trống!"),
  phone: yup
    .string()
    .required("Số điện thoại không được để trống!")
    .matches(/^(0[0-9]+)$/, "Số điện thoại không đúng định dạng")
    .min(10, "Số điện thoại phải có ít nhất 10 chữ số")
    .max(11, "Số điện thoại không được vượt quá 11 chữ số"),
  email: yup
    .string()
    .email("Email không đúng định dạng")
    .required("Email không được để trống!"),
  role: yup.object().required("Chức danh không được để trống!"),
});

const ConfigUserUpdateContainer = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState<IUser>();
  const [role, setRole] = useState<IRole[]>();

  const { id } = useParams();
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IUser>({
    resolver: yupResolver<any>(schemaConfigUser),
  });
  const handleUpdateConfigUser = async (values: IUser) => {
    const input = {
      _id: id,
      email: values.email,
      name: values.name,
      phone: values.phone,
      role: data?.role?._id,
      avatar: "",
    };
    setLoading(true);
    const res = await updateUser(input);
    setLoading(false);
    if (res?.user) {
      toast.success(res?.message);
      navigate("/configuration/user");
    } else {
      toast.error(res.message);
    }
  };

  const loadData = useCallback(
    (id: string) => {
      setLoading(true);
      getOneUser(id)
        .then((r) => {
          reset(r);
          setData(r);
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    },
    [reset]
  );

  useEffect(() => {
    loadData(id ?? "");
  }, [id, loadData]);

  useEffect(() => {
    const arrayError = Object.values(errors);
    if (arrayError.length > 0) {
      toast.warning(arrayError[0]?.message as any);
    }
  });

  useEffect(() => {
    async function getRole() {
      const response = await getAllRole({ _limit: 100 });
      const ListArr: any = [];
      response?.docs?.map((e: any) => {
        ListArr?.push({
          ...e,
          value: e?._id,
          label: `${e?.name}`,
        });
      });
      setRole(ListArr);
    }

    getRole();
  }, []);

  return (
    <Spin spinning={loading} indicator={<LoadingPage />}>
      <Layout>
        <div className="relative h-full">
          <Heading>Chỉnh sửa thông tin người dùng</Heading>
          <form
            className="w-full p-5 bg-white min-h-[400px] "
            onSubmit={handleSubmit(handleUpdateConfigUser)}
          >
            <Heading>Thông tin người dùng</Heading>

            <Row>
              <Field>
                <Label htmlFor="name">
                  <span className="star-field">*</span>
                  Tên người dùng
                </Label>
                <Input
                  control={control}
                  name="name"
                  placeholder="Nhập tên người dùng"
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

              <Field>
                <Label htmlFor="email">
                  <span className="star-field">*</span>
                  Email
                </Label>
                <Input
                  control={control}
                  name="email"
                  placeholder="Nhập Email"
                />
              </Field>
            </Row>
            <Row>
              <Field>
                <Label htmlFor="role">
                  <span className="star-field">*</span>Chức danh
                </Label>
                <Select
                  options={role}
                  value={role?.filter(
                    (option: any) => data?.role?._id === option.value
                  )}
                  onChange={(val: any) => {
                    setData((s) => ({ ...s, role: val }));
                  }}
                  className="p-2 h-full react-select"
                  classNamePrefix="react-select"
                  placeholder="-Chức danh-"
                />
              </Field>
            </Row>
          </form>
          <div className="fixed bottom-0  py-5 bg-white left-[251px] shadowSidebar right-0">
            <div className="flex justify-end w-full px-5">
              <div className="flex items-center gap-x-5">
                <Button to="/configuration/user">Đóng</Button>
                <Button
                  type="submit"
                  className="flex items-center justify-center px-10 py-3 text-base font-semibold leading-4 text-white rounded-md disabled:opacity-50 disabled:pointer-events-none bg-primary"
                  onClick={handleSubmit(handleUpdateConfigUser)}
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

export default ConfigUserUpdateContainer;
