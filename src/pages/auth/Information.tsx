import { useState } from "react";
import { Layout } from "../../components/layout";
import Heading from "../../components/common/Heading";
import { Row } from "../../components/row";
import { Field } from "../../components/field";
import { Label } from "../../components/label";
import { Input } from "../../components/input";
import { useForm } from "react-hook-form";
import { Button } from "../../components/button";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Modal } from "antd";
import { Eye } from "react-feather";
import { changePassword } from "../../services/auth.service";
import * as yup from "yup";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { IUser } from "../../types/user.type";
export type TDataResponse = {
  user: IUser;
  message: string;
};
const schema = yup.object().shape({
  password: yup
    .string()
    .required("Mật khẩu hiện tại là bắt buộc")
    .min(6, "Mật khẩu phải chứa ít nhất 6 kí tự"),
  setpassword: yup
    .string()
    .required("Mật khẩu mới là bắt buộc")
    .min(6, "Mật khẩu phải chứa ít nhất 6 kí tự"),
});
const Information = () => {
  const [openModal, setOpenModal] = useState(false);
  const [typePassWord, setTypePassWord] = useState("password");
  const [typePassWord2, setTypePassWord2] = useState("password");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const auth: any = useSelector((state: RootState) => state.auth.auth);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });
  const onOk = async () => {
    setOpenModal(false);
  };

  const handleShowModel = () => {
    setOpenModal(true);
  };

  const handleChangeType = () => {
    setTypePassWord(typePassWord === "password" ? "text" : "password");
  };

  const handleChangeType2 = () => {
    setTypePassWord2(typePassWord2 === "password" ? "text" : "password");
  };

  const handleCurrentPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleChangePassword = async () => {
    try {
      const response: any = await changePassword(
        auth?.user?._id,
        currentPassword,
        newPassword,
        auth?.accessToken
      );
      if (response?.data?.message) {
        return toast.success(response?.data?.message);
      }
      return toast.error(response?.response?.data?.message);
    } catch (error) {
      console.log(error);
    }
    setOpenModal(false);
    setCurrentPassword("");
    setNewPassword("");
  };

  return (
    <Layout>
      {auth ? (
        <div className="relative h-full">
          <Heading>Thông tin cá nhân</Heading>
          <form className="w-full p-5 bg-white ">
            <Heading>Thông tin người dùng</Heading>
            <Row className="grid-cols-4 mb-10">
              <Field>
                <Label htmlFor="categoryId">
                  <span className="star-field">*</span>
                  Tên người dùng
                </Label>
                <Input
                  control={control}
                  placeholder=""
                  className="!border-transparent"
                  value={auth?.user?.name || "---"}
                ></Input>
              </Field>
              <Field>
                <Label htmlFor="unit_selling">
                  <span className="star-field">*</span>
                  Số điện thoại
                </Label>
                <Input
                  control={control}
                  placeholder=""
                  className="!border-transparent"
                  value={auth?.user?.phone || "---"}
                />
              </Field>
              <Field>
                <Label htmlFor="unit_selling">
                  <span className="star-field">*</span>
                  Email
                </Label>
                <Input
                  control={control}
                  name="unit_selling"
                  className="!border-transparent"
                  value={auth?.user?.email || "---"}
                />
              </Field>
            </Row>
            <Row className="grid-cols-4 mt-10">
              <Field>
                <Label htmlFor="unit_selling">Chức danh</Label>
                <Input
                  control={control}
                  name="unit_selling"
                  className="!border-transparent"
                  value={auth.user?.role?.name || "---"}
                />
              </Field>
              <Field>
                <Label htmlFor="unit_selling">Nhóm người dùng</Label>
                <Input
                  control={control}
                  name="unit_selling"
                  className="!border-transparent"
                  value={"---"}
                />
              </Field>
              <Field>
                <Label htmlFor="unit_selling">Nhóm quyền</Label>
                <Input
                  control={control}
                  name="unit_selling"
                  className="!border-transparent"
                  value={auth.user?.role?.name || "---"}
                />
              </Field>
              <Field>
                <Label htmlFor="unit_selling">Ghi chú</Label>
                <Input
                  control={control}
                  name="unit_selling"
                  className="!border-transparent"
                  value={"---"}
                />
              </Field>
            </Row>
            <div className="flex items-center gap-x-5">
              <Button
                type="button"
                onClick={() => handleShowModel()}
                className="flex items-center justify-center px-5 py-3 text-base font-semibold leading-4 text-white rounded-md disabled:opacity-50 disabled:pointer-events-none bg-primary"
              >
                Đổi mật khẩu
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <div>Loading or redirect to login...</div>
      )}
      <Modal
        centered
        open={openModal}
        onOk={onOk}
        onCancel={() => {
          setOpenModal(false);
          setCurrentPassword("");
          setNewPassword("");
        }}
        className="modal-change-password"
        footer={
          <div className="flex items-center justify-end mt-4">
            <Button
              type="button"
              onClick={handleChangePassword}
              disabled={newPassword.length < 6}
            >
              Xác nhận
            </Button>
          </div>
        }
      >
        <h1 className="text-[#4b4b5a] pb-4 border-b border-b-slate-200 font-bold text-center text-[18px]">
          Đổi mật khẩu
        </h1>
        <div className="py-4">
          <Row className="grid-cols-2 mt-2 gap-10">
            <Field>
              <Label htmlFor="unit_selling" className="">
                Mật khẩu hiện tại
              </Label>
              <Input
                type={typePassWord}
                control={control}
                name="password"
                placeholder="Nhập mật khẩu hiện tại"
                className="h-[42px] border-b border-b-[#f0f0f3]"
                value={currentPassword}
                onChange={handleCurrentPasswordChange}
              >
                <span className="input-group-text">
                  <Eye className="w-[15px]" onClick={handleChangeType} />
                </span>
              </Input>
            </Field>
            <Field>
              <Label htmlFor="unit_selling" className="">
                Mật khẩu mới
              </Label>
              <Input
                type={typePassWord2}
                control={control}
                name="setpassword"
                placeholder="Nhập mật khẩu mới"
                className="h-[42px] border-b border-b-[#f0f0f3]"
                value={newPassword}
                onChange={handleNewPasswordChange}
              >
                <span className="input-group-text">
                  <Eye className="w-[15px]" onClick={handleChangeType2} />
                </span>
              </Input>
            </Field>
          </Row>
          <div
            className="mt-2 text-xs"
            style={{ color: newPassword.length >= 6 ? "green" : "red" }}
          >
            Mật khẩu ít nhất phải đủ 6 kí tự
          </div>
        </div>
      </Modal>
    </Layout>
  );
};

export default Information;
