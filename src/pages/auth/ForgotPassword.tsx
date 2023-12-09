import { Mail, Eye } from "react-feather";
import bgLogin from "../../assets/images/bg-login.svg";
import { Field } from "../../components/field";
import { Input } from "../../components/input";
import { Label } from "../../components/label";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo3.png";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import {
  forgotPassword,
  resetPassword,
  verifyOTPForgotPassword,
} from "../../services/auth.service";
import OtpInput from "react-otp-input";
import { Button } from "antd";

type TForm = {
  email: string;
};

type TFormPassword = {
  password: string;
  rePassword: string;
};
const schema = yup.object({
  email: yup
    .string()
    .required("* Email không được để trống!")
    .email("Email không đúng định dạng"),
});

const shemaChangePass = yup.object({
  password: yup
    .string()
    .required("* Mật khẩu không được để trống!")
    .min(6, "Mật khẩu ít nhất 6 ký tự"),
  rePassword: yup
    .string()
    .oneOf([yup.ref("password")], "Mật khẩu nhập lại không khớp!"),
});

const inputStyle = {
  MozAppearance: "textfield",
  WebkitAppearance: "none",
  margin: 0,
};

const ForgotPassword = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isSendEmail, setIsSendEmail] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const [expirationTime, setExpirationTime] = useState<number>(0);
  const [isVerify, setIsVerify] = useState<boolean>(false);
  const [typePassWord, setTypePassWord] = useState("password");
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<any>({
    resolver: yupResolver<any>(isVerify ? shemaChangePass : schema),
    mode: "onSubmit",
  });

  const navigate = useNavigate();

  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (isSendEmail && expirationTime > 0) {
      timerId = setInterval(() => {
        setExpirationTime((prevTime) => prevTime - 1000);
      }, 1000);
    }

    return () => {
      clearInterval(timerId);
    };
  }, [isSendEmail, expirationTime]);

  const handleForgotPassword = async (values: TForm) => {
    if (!isValid) return;
    setLoading(true);
    const res = await forgotPassword(values);
    setLoading(false);
    if (res.success) {
      setIsSendEmail(true);
      setExpirationTime(60000);
      toast.success("Gửi mã OTP thành công!");
    } else {
      toast.error("Email không chính xác!");
    }
  };

  const handleVerifyOTP = async () => {
    setLoading(true);
    const res = await verifyOTPForgotPassword({ otp });
    setLoading(false);
    if (res.success) {
      toast.success(res.message);
      setIsVerify(true);
    } else {
      toast.error(res?.response?.data?.message);
    }
  };

  const handleChangePassword = async (values: TFormPassword) => {
    const newValue = {
      newPassword: values.password,
      otp,
    };
    setLoading(true);
    const res = await resetPassword(newValue);
    setLoading(false);
    if (res.success) {
      toast.success(res.message, { autoClose: 5000 });
      navigate("/login");
    } else {
      toast.error(res?.response?.data?.error);
    }
  };

  const handleChangeType = () => {
    typePassWord === "password"
      ? setTypePassWord("text")
      : setTypePassWord("password");
  };

  return (
    <div className="flex items-center justify-between min-h-screen h-full">
      <div className="flex items-center gap-y-12 flex-col justify-center w-full md:w-1/2 h-full max-w-[400px] mx-auto">
        <div className="mx-auto">
          <Link className="logo-login" to="/">
            <img src={logo} alt="" height="74" />
            <h3
              style={{ lineHeight: "36px" }}
              className="mt-4 mb-4 block align-middle ml-1 text-[22px] font-bold text-center"
            >
              Quên mật khẩu ?
            </h3>
          </Link>
        </div>
        <form className="w-full flex flex-col gap-y-5">
          {isVerify && isSendEmail ? (
            <>
              <Field>
                <Label htmlFor="password" className="text-base font-medium">
                  Mật khẩu mới
                </Label>
                <Input
                  type={typePassWord}
                  control={control}
                  name="password"
                  placeholder="Nhập mật khẩu"
                  className="h-[42px] px-2 border-b border-b-[#f0f0f3]"
                >
                  <span className="input-group-text">
                    <Eye onClick={handleChangeType} />
                  </span>
                </Input>
                <div className="text-red-500 text-sm h-5">
                  {errors.password && (errors.password.message as any)}
                </div>
              </Field>
              <Field>
                <Label htmlFor="rePassword" className="text-base font-medium">
                  Xác nhận mật khẩu mới
                </Label>
                <Input
                  type={typePassWord}
                  control={control}
                  name="rePassword"
                  placeholder="Nhập mật khẩu"
                  className="h-[42px] px-2 border-b border-b-[#f0f0f3]"
                >
                  <span className="input-group-text">
                    <Eye onClick={handleChangeType} />
                  </span>
                </Input>
                <div className="text-red-500 text-sm h-5">
                  {errors.rePassword && (errors.rePassword.message as any)}
                </div>
              </Field>

              <Button
                className="bg-primary text-white"
                key="submit"
                type="primary"
                onClick={handleSubmit(handleChangePassword)}
                loading={loading}
              >
                Xác nhận
              </Button>
            </>
          ) : isSendEmail ? (
            <>
              <Field>
                <p className="text-gray16 font-medium">Nhập mã OTP</p>
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
            w-10 h-10 text-center border hidden-action border-gray-500 text-primary font-medium ${inputStyle}`}
                    skipDefaultStyles
                  />
                </div>
                <p className="flex items-center gap-x-5 mt-4">
                  <span className="text-gray16 font-medium">
                    Mã OTP sẽ hết hạn sau:
                  </span>
                  <span className="text-red-500">
                    {Math.ceil(expirationTime / 1000)} giây
                  </span>
                </p>
              </Field>
              {expirationTime > 0 ? (
                <Button
                  className="bg-primary text-white"
                  key="submit"
                  type="primary"
                  onClick={() => handleVerifyOTP()}
                  disabled={otp.length < 6}
                  loading={loading}
                >
                  Tiếp tục
                </Button>
              ) : (
                <Button
                  className="bg-primary text-white"
                  onClick={() => {
                    setIsSendEmail(false);
                  }}
                  loading={loading}
                  key="submit"
                  type="primary"
                >
                  Gửi lại mã
                </Button>
              )}
              <div className="flex items-center justify-center">
                <span>Kiểm tra mã OTP đã gửi trong email của bạn.</span>
              </div>
            </>
          ) : (
            <>
              <Field>
                <Label htmlFor="phone" className="text-base font-medium">
                  Email
                </Label>
                <Input
                  control={control}
                  name="email"
                  type="text"
                  placeholder="Nhập địa chỉ email"
                  className="h-[42px] px-2 border-b border-b-[#f0f0f3]"
                >
                  <span className="input-group-text ">
                    <Mail />
                  </span>
                </Input>
                <div className="text-red-500 text-sm h-5">
                  {errors.email && (errors.email.message as any)}
                </div>
              </Field>
              <Button
                className="bg-primary text-white"
                onClick={handleSubmit(handleForgotPassword)}
                disabled={!isValid}
                loading={loading}
                key="submit"
                type="primary"
              >
                Tiếp tục
              </Button>
              <div className="flex items-center justify-center">
                <span>Nếu bạn đã có tài khoản.</span>
                <Link className="text-primary" to={"/login"}>
                  Đăng nhập
                </Link>
              </div>{" "}
            </>
          )}
          {/* {isSendEmail ? (
            <>
              <Field>
                <p className="text-gray16 font-medium">Nhập mã OTP</p>
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
            w-10 h-10 text-center border hidden-action border-gray-500 text-primary font-medium ${inputStyle}`}
                    skipDefaultStyles
                  />
                </div>
                <p className="flex items-center gap-x-5 mt-4">
                  <span className="text-gray16 font-medium">
                    Mã OTP sẽ hết hạn sau:
                  </span>
                  <span className="text-red-500">
                    {Math.ceil(expirationTime / 1000)} giây
                  </span>
                </p>
              </Field>
              {expirationTime > 0 ? (
                <Button
                  className=" bg-primary text-white rounded-md font-medium  h-[50px]"
                  onClick={() => handleVerifyOTP()}
                  disabled={otp.length < 6}
                  loading={loading}
                >
                  Tiếp tục
                </Button>
              ) : (
                <Button
                  className=" bg-primary text-white rounded-md font-medium  h-[50px]"
                  onClick={() => {
                    setIsSendEmail(false);
                  }}
                  loading={loading}
                >
                  Gửi lại mã
                </Button>
              )}
              <div className="flex items-center justify-center">
                <span>Kiểm tra mã OTP đã gửi trong email của bạn.</span>
              </div>
            </>
          ) : (
            <>
              <Field>
                <Label htmlFor="phone" className="text-base font-medium">
                  Email
                </Label>
                <Input
                  control={control}
                  name="email"
                  type="text"
                  placeholder="Nhập địa chỉ email"
                  className="h-[42px] px-2 border-b border-b-[#f0f0f3]"
                >
                  <span className="input-group-text ">
                    <Mail />
                  </span>
                </Input>
                <div className="text-red-500 text-sm h-5">
                  {errors.email && errors.email.message}
                </div>
              </Field>
              <Button
                className=" bg-primary text-white rounded-md font-medium  h-[50px]"
                onClick={handleSubmit(handleForgotPassword)}
                disabled={!isValid}
                loading={loading}
              >
                Tiếp tục
              </Button>
              <div className="flex items-center justify-center">
                <span>Nếu bạn đã có tài khoản.</span>
                <Link className="text-primary" to={"/login"}>
                  Đăng nhập
                </Link>
              </div>{" "}
            </>
          )} */}
        </form>
      </div>
      <div className="hidden items-center justify-center w-full md:w-1/2 bg-primary50 min-h-[100vh] md:flex">
        <div className="login-right">
          <img src={bgLogin} alt="login-bg" />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
