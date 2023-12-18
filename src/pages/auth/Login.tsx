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
import { TDataResponse, handleLogin } from "../../redux/auth/handler";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useRef, useState } from "react";
import { ROLE } from "../../constants/define";
import ModalLoginOTP, {
  ModalLoginOTPMethods,
} from "./components/ModalLoginOTP";
import { socketIO } from "../../App";
import { RootState } from "../../redux/store";
import { Button } from "antd";

type TLogin = {
  email: string;
  password: string;
};
const schema = yup.object({
  email: yup
    .string()
    .required("* Email không được để trống!")
    .email("Email không đúng định dạng"),

  password: yup
    .string()
    .required("* Mật khẩu không được để trống!")
    .min(6, "Mật khẩu ít nhất 6 ký tự"),
});
const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TLogin>({
    resolver: yupResolver<any>(schema),
    mode: "onSubmit",
  });
  const loading = useSelector((state: RootState) => state.auth.isLoading);
  const [typePassWord, setTypePassWord] = useState("password");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modalRef = useRef<ModalLoginOTPMethods>(null);
  const handleSignin = async (values: TLogin) => {
    if (!isValid) return;
    try {
      const response: TDataResponse = await dispatch(
        handleLogin(values) as any
      ).unwrap();
      toast.success(response?.message);
      socketIO.emit("authenticate", response.user._id);

      if (response?.user?.role.roleNumber === ROLE.ADMIN) {
        return navigate("/dashboard");
      }
      return navigate("/");
    } catch (error: any) {
      toast.error(error);
    }
  };

  const handleChangeType = () => {
    typePassWord === "password"
      ? setTypePassWord("text")
      : setTypePassWord("password");
  };

  return (
    <div className="flex items-center justify-between h-full min-h-screen">
      <div className="flex items-center gap-y-12 flex-col justify-center w-full md:w-1/2 h-full max-w-[400px] mx-auto">
        <div className="mx-auto">
          <Link className="logo-login" to="/">
            <img src={logo} alt="" height="74" />
            <h3
              style={{ lineHeight: "36px" }}
              className="mt-4 mb-4 block align-middle ml-1 text-[22px] font-bold text-center"
            >
              Chào mừng bạn đến với CRM của chúng tôi. Đăng nhập để bắt đầu.
            </h3>
          </Link>
        </div>
        <form className="flex flex-col w-full gap-y-5">
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
            <div className="h-5 text-sm text-red-500">
              {errors.email && errors.email.message}
            </div>
          </Field>
          <Field>
            <Label htmlFor="password" className="text-base font-medium">
              Mật khẩu
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
            <div className="h-5 text-sm text-red-500">
              {errors.password && errors.password.message}
            </div>
          </Field>
          <Field>
            <div className="flex justify-end">
              <Link
                to={"/check-forget-password"}
                className="font-medium text-primary"
              >
                Quên mật khẩu?
              </Link>
            </div>
          </Field>

          <Button
            key={"submit"}
            type="primary"
            className=" bg-primary text-white rounded-md font-medium  h-[50px]"
            onClick={handleSubmit(handleSignin)}
            loading={loading}
          >
            Đăng nhập
          </Button>
          <Field>
            <div className="flex items-center justify-between mt-3 mb-3 text-center gap-x-5">
              <div className="w-full h-[1px] bg-[#22222226]"></div>
              <span>hoặc</span>
              <div className="w-full h-[1px] bg-[#22222226]"></div>
            </div>
          </Field>
          <Button
            className=" bg-white text-primary border border-primary rounded-md font-medium  h-[50px]"
            onClick={() => modalRef.current?.setOpen()}
          >
            Đăng nhập bằng OTP
          </Button>
        </form>
      </div>
      <div className="hidden items-center justify-center w-full md:w-1/2 bg-primary50 min-h-[100vh] md:flex">
        <div className="login-right">
          <img src={bgLogin} alt="login-bg" />
        </div>
      </div>
      <ModalLoginOTP ref={modalRef} />
    </div>
  );
};

export default Login;
