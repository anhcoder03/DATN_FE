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
import { schemaConfigUser } from "../new";

const ConfigUserUpdateContainer = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState<IUser>();
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
    const data = {
      _id: id,
      email: values.email,
      name: values.name,
      password: values.password,
      phone: values.phone,
      role: values.role.value,
      avatar: "",
    };
    const res = await updateUser(data);
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
          setLoading(false);
          reset(r);
          setData(r);
        })
        .catch((error) => console.log(error));
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

  return (
    <Layout>
      <div className="relative h-full">
        <Heading>Chỉnh sửa thông tin người dùng</Heading>
        <form
          className="w-full p-5 bg-white "
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
              <Input control={control} name="email" placeholder="Nhập Email" />
            </Field>
            <Field>
              <Label htmlFor="password">
                <span className="star-field">*</span>
                password
              </Label>
              <Input
                type="password"
                control={control}
                name="password"
                placeholder="Nhập password"
              />
            </Field>
          </Row>
          <Row>
            <Field>
              <Label htmlFor="role">
                <span className="star-field">*</span>Chức danh
              </Label>
              <Controller
                name="role"
                control={control}
                render={({ field }) => <RoleSelect {...field} />}
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
  );
};

export default ConfigUserUpdateContainer;
