import { Mail, Eye } from "react-feather";
import bgLogin from "../../assets/images/bg-login.svg";
import { Field } from "../../components/field";
import { Input } from "../../components/input";
import { Label } from "../../components/label";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo3.png";
import { Button } from "../../components/button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TDataResponse, handleLogin } from "../../redux/auth/handler";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useState } from "react";
import { ROLE } from "../../constants/define";

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
  const [typePassWord, setTypePassWord] = useState("password");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignin = async (values: TLogin) => {
    if (!isValid) return;
    try {
      const response: TDataResponse = await dispatch(
        handleLogin(values) as any
      ).unwrap();
      console.log(response);
      toast.success(response?.message);
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
    <div className="flex items-center justify-between min-h-screen h-full">
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
        <form className="w-full flex flex-col gap-y-5">
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
            <div className="text-red-500 text-sm h-5">
              {errors.password && errors.password.message}
            </div>
          </Field>
          <Field>
            <div className="flex justify-end">
              <Link to={""} className="text-primary font-medium">
                Quên mật khẩu?
              </Link>
            </div>
          </Field>

          <Button
            type="submit"
            className=" bg-primary text-white rounded-md font-medium  h-[50px]"
            onClick={handleSubmit(handleSignin)}
          >
            Đăng nhập
          </Button>
          <Field>
            <div className="mt-3 mb-3 flex items-center justify-between text-center gap-x-5">
              <div className="w-full h-[1px] bg-[#22222226]"></div>
              <span>hoặc</span>
              <div className="w-full h-[1px] bg-[#22222226]"></div>
            </div>
          </Field>
          <Button className=" bg-white text-primary border border-primary rounded-md font-medium  h-[50px]">
            Đăng nhập bằng OTP
          </Button>
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

export default Login;
