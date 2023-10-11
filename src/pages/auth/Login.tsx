import { Lock, Phone } from "react-feather";
import bgLogin from "../../assets/images/bg-login.svg";
import { Field } from "../../components/field";
import { Input } from "../../components/input";
import { Label } from "../../components/label";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import logo from "../../assets/logo3.png";
import { Button } from "../../components/button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type TLogin = {
  phone: number;
  password: string;
};
const schema = yup.object({
  phone: yup
    .string()
    .required("* Số điện thoại không được để trống!")
    .matches(/^(0[0-9]+)$/, "* Số điện thoại không đúng định dạng")
    .min(10, "* Số điện thoại phải có ít nhất 10 chữ số")
    .max(11, "* Số điện thoại không được vượt quá 11 chữ số"),
  password: yup.string().required("* Mật khẩu không được để trống!"),
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
  const handleLogin = (values: TLogin) => {
    if (!isValid) return;
    console.log(values);
    // xử lý login ở đây || handle login here
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
              Số điện thoại
            </Label>
            <Input
              control={control}
              name="phone"
              type="number"
              placeholder="Nhập số điện thoại"
              className="h-[42px] px-2 border-b border-b-[#f0f0f3]"
            >
              <span className="input-group-text ">
                <Phone />
              </span>
            </Input>
            <div className="text-red-500 text-sm h-5">
              {errors.phone && errors.phone.message}
            </div>
          </Field>
          <Field>
            <Label htmlFor="password" className="text-base font-medium">
              Mật khẩu
            </Label>
            <Input
              control={control}
              name="password"
              placeholder="Nhập mật khẩu"
              className="h-[42px] px-2 border-b border-b-[#f0f0f3]"
            >
              <span className="input-group-text">
                <Lock />
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
            type="button"
            className=" bg-primary text-white rounded-md font-medium  h-[50px]"
            onClick={handleSubmit(handleLogin)}
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
      <div className="flex items-center justify-center w-full md:w-1/2 bg-primary50 min-h-[100vh]">
        <div className="login-right">
          <img src={bgLogin} alt="login-bg" />
        </div>
      </div>
    </div>
  );
};

export default Login;
