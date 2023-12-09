import { Button, Modal } from "antd";
import React, { useImperativeHandle, useState, useEffect } from "react";
import { Field } from "../../../components/field";
import { Label } from "../../../components/label";
import { Input } from "../../../components/input";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginOTP, verifyTokenOTP } from "../../../services/auth.service";
import { toast } from "react-toastify";
import OtpInput from "react-otp-input";
import { useDispatch } from "react-redux";
import { setLogin } from "../../../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { ROLE } from "../../../constants/define";

export type ModalLoginOTPProps = {};
export type ModalLoginOTPMethods = {
  setOpen: () => void;
};
type TLogin = {
  email: string;
};

const schema = yup.object({
  email: yup
    .string()
    .required("* Email không được để trống!")
    .email("Email không đúng định dạng"),
});
const ModalLoginOTP = React.forwardRef<
  ModalLoginOTPMethods,
  ModalLoginOTPProps
>((_, ref) => {
  const inputStyle = {
    MozAppearance: "textfield",
    WebkitAppearance: "none",
    margin: 0,
  };
  const [open, setOpen] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const [expirationTime, setExpirationTime] = useState<number>(0);
  const [hasOTP, setHasOTP] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useImperativeHandle(ref, () => ({
    setOpen: () => {
      setOpen(true);
    },
  }));

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TLogin>({
    resolver: yupResolver<any>(schema),
    mode: "onSubmit",
  });

  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (hasOTP && expirationTime > 0) {
      timerId = setInterval(() => {
        setExpirationTime((prevTime) => prevTime - 1000);
      }, 1000);
    }

    return () => {
      clearInterval(timerId);
    };
  }, [hasOTP, expirationTime]);

  const handleLoginOTP = async (values: TLogin) => {
    setLoading(true);
    const res: any = await loginOTP(values);
    setLoading(false);
    if (res.success) {
      toast.success("Gửi mã OTP thành công!");
      setExpirationTime(60000);
      setHasOTP(true);
    } else {
      toast.error("Email không chính xác!");
    }
  };

  const handleVerify = async () => {
    setLoading(true);
    const response = await verifyTokenOTP({ otp });
    setLoading(false);
    if (response.user) {
      toast.success(response.message);
      dispatch(setLogin(response));
      if (response?.user?.role?.roleNumber === ROLE.ADMIN) {
        return navigate("/dashboard");
      }
      return navigate("/");
    } else {
      toast.error(response?.response?.data?.error);
    }
  };
  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      title={
        <h1 className="text-xl text-center font-bold text text-primary">
          Đăng nhập bằng OTP
        </h1>
      }
      footer={null}
    >
      {hasOTP ? (
        <form className="max-w-[400px] mx-auto my-5">
          <Field>
            <Label htmlFor="email">Nhập mã OTP</Label>
            <div className="flex items-center justify-center mt-5">
              <OtpInput
                inputType="number"
                value={otp}
                containerStyle={"flex items-center gap-x-2"}
                onChange={(otp) => setOtp(otp)}
                numInputs={6}
                renderSeparator={<span>-</span>}
                renderInput={(props) => <input {...props} />}
                inputStyle={`
            w-10 h-10 text-center border hidden-action border-gray-500 text-black ${inputStyle}`}
                skipDefaultStyles
              />
            </div>
          </Field>
          <p className="flex items-center gap-x-5 mt-4">
            <span className="text-gray16 font-medium">
              Mã OTP sẽ hết hạn sau:
            </span>
            <span className="text-red-500">
              {Math.ceil(expirationTime / 1000)} giây
            </span>
          </p>
          <div className="flex items-center justify-center gap-x-5 mt-10">
            <Button
              className="bg-primary50 text-primary"
              key="back"
              onClick={() => setOpen(false)}
            >
              Đóng
            </Button>
            <Button
              onClick={
                expirationTime > 0
                  ? () => handleVerify()
                  : () => setHasOTP(false)
              }
              key="submit"
              type="primary"
              className="bg-primary50 text-primary disabled:text-primary disabled:bg-primary50"
              disabled={otp.length < 6}
              loading={loading}
            >
              {expirationTime > 0 ? "Gửi" : "Gửi lại mã"}
            </Button>
          </div>
        </form>
      ) : (
        <form className="max-w-[400px] mx-auto">
          <Field>
            <Label htmlFor="email">Email</Label>
            <Input
              placeholder="Nhập địa chỉ email"
              control={control}
              name="email"
            ></Input>
            <div className="text-red-500 text-sm h-5">
              {errors.email && errors.email.message}
            </div>
          </Field>
          <div className="flex items-center justify-center gap-x-5 mt-5">
            <Button
              className="bg-primary50 text-primary"
              key="back"
              onClick={() => setOpen(false)}
            >
              Đóng
            </Button>
            <Button
              onClick={handleSubmit(handleLoginOTP)}
              key="submit"
              type="primary"
              className="bg-primary50 text-primary"
              loading={loading}
            >
              Gửi
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
});

export default ModalLoginOTP;
