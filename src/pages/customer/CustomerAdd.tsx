import { Layout } from "../../components/layout";
import { Input } from "../../components/input";
import { useForm } from "react-hook-form";
import { Field } from "../../components/field";
import { Label } from "../../components/label";
import { Row } from "../../components/row";
import { useEffect, useState } from "react";
import type { RadioChangeEvent } from "antd";
import { Radio, Spin } from "antd";
import { IconPhone } from "../../components/icons";
import Heading from "../../components/common/Heading";
import Select from "react-select";
import axios from "axios";
import { Button } from "../../components/button";
import Flatpickr from "react-flatpickr";
import { Vietnamese } from "flatpickr/dist/l10n/vn";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { createCustomer } from "../../services/customer.service";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import LoadingPage from "../../components/common/LoadingPage";

type TDataCustomer = {
  _id?: string;
  name: string;
  gender: string;
  province: number;
  district: number;
  commune: number;
  dateOfBirth: Date;
};

const schema = yup.object({
  name: yup.string().trim().required("Tên khách hàng không được để trống!"),
  dateOfBirth: yup.string().required("Ngày sinh không được để trống!"),
  phone: yup
    .string()
    .required("Số điện thoại không được để trống!")
    .matches(/^(0[0-9]+)$/, "Số điện thoại không đúng định dạng")
    .min(10, "Số điện thoại phải có ít nhất 10 chữ số")
    .max(11, "Số điện thoại không được vượt quá 11 chữ số"),
  citizenId: yup
    .string()
    .required("Số CCCD không được để trống!")
    .matches(/^(0[0-9]+)$/, "Căn cước công dân không hợp lệ!")
    .length(12, "Số CCCD phải là 12 chữ số"),
});

const CustomerAdd = () => {
  const onChange = (e: RadioChangeEvent) => {
    setGender(e.target.value);
  };
  const auth = useSelector((state: RootState) => state.auth.auth?.user);
  const [gender, setGender] = useState("Nam");
  const [dataProvince, SetDataProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const navigate = useNavigate();
  const [ward, setWard] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TDataCustomer>({
    resolver: yupResolver<any>(schema),
    mode: "onSubmit",
  });
  const handleCreateCustomer = async (values: TDataCustomer) => {
    const data = { ...values, gender, creator: auth?._id };
    setLoading(true);
    const res = await createCustomer(data);
    setLoading(false);
    if (res?.customer) {
      toast.success(res?.message);
      navigate("/customer/list");
    } else {
      if (res?.message instanceof Array) {
        toast.error(res.message?.[0]);
      } else {
        console.log("siuRes", res);
        toast.error(res.message);
      }
    }
  };
  useEffect(() => {
    async function getProvince() {
      const response = await axios.get(
        "https://nutribackend.staging.zsolution.vn/address/provinces?page=1&limit=100"
      );
      const ListArr: any = [];
      response.data?.data?.map((e: any) => {
        ListArr?.push({
          ...e,
          value: Number(e?.code),
          label: e?.name,
        });
      });
      SetDataProvince(ListArr);
    }

    getProvince();
  }, []);

  const fetchDistrict = async (province_code: any) => {
    const response: any = await axios.get(
      `https://nutribackend.staging.zsolution.vn/address/districts?page=1&limit=500&province_code=${province_code}`
    );

    const ListArr: any = [];
    response.data?.data?.map((e: any) => {
      ListArr?.push({
        ...e,
        value: Number(e?.code),
        label: e?.name,
      });
    });
    setDistrict(ListArr);
  };

  const fetchWard = async (district_code: any) => {
    const response: any = await axios.get(
      `https://nutribackend.staging.zsolution.vn/address/wards?page=1&limit=500&district_code=${district_code}`
    );
    const ListArr: any = [];
    response.data?.data?.map((e: any) => {
      ListArr?.push({
        ...e,
        value: Number(e?.code),
        label: e?.name,
      });
    });
    setWard(ListArr);
  };

  useEffect(() => {
    const arrayError = Object.values(errors);
    if (arrayError.length > 0) {
      toast.warning(arrayError[0]?.message);
    }
  }, [errors]);

  return (
    <Spin spinning={loading} indicator={<LoadingPage />}>
      <Layout>
        <div className="relative h-full">
          <Heading>Thêm hồ sơ khách hàng</Heading>
          <form
            className="w-full p-5 bg-white "
            onSubmit={handleSubmit(handleCreateCustomer)}
          >
            <Heading>Thông tin khách hàng</Heading>
            <Row>
              <Field>
                <Label htmlFor="name">
                  <span className="star-field">*</span>
                  Tên khách hàng
                </Label>
                <Input
                  control={control}
                  name="name"
                  placeholder="Nhập tên khách hàng"
                />
              </Field>
              <Field>
                <Label htmlFor="_id">
                  <span className="star-field">*</span>Ngày sinh
                </Label>
                <Flatpickr
                  options={{
                    locale: Vietnamese,
                    allowInput: true,
                    dateFormat: "d/m/Y",
                    altInputClass: "date-range",
                    maxDate: "today",
                  }}
                  onChange={([date]) => {
                    setValue("dateOfBirth", date);
                  }}
                  placeholder="dd/mm/yyyy"
                  name="dateOfBirth"
                ></Flatpickr>
              </Field>
              <Field>
                <Label htmlFor="citizenId">
                  <span className="star-field">*</span>
                  Căn cước công dân
                </Label>
                <Input
                  control={control}
                  name="citizenId"
                  placeholder="Nhập số CCCD"
                />
              </Field>
            </Row>
            <Row>
              <Field>
                <Label htmlFor="gender">Giới tính</Label>
                <Radio.Group onChange={onChange} value={gender}>
                  <div className="flex items-center">
                    <Radio className="flex items-center h-[34px]" value={"Nam"}>
                      Nam
                    </Radio>
                    <Radio className="flex items-center h-[34px]" value={"Nữ"}>
                      Nữ
                    </Radio>
                  </div>
                </Radio.Group>
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
                <Label htmlFor="province">
                  <span className="star-field">*</span>Tỉnh/ Thành phố
                </Label>
                <Select
                  placeholder="Chọn Tỉnh/ Thành phố"
                  className="mb-2 react-select"
                  classNamePrefix="react-select"
                  options={dataProvince}
                  onChange={(val: any) => {
                    fetchDistrict(val?.code);
                    setValue("province", val);
                  }}
                ></Select>
              </Field>
              <Field>
                <Label htmlFor="district">
                  <span className="star-field">*</span>Quận/Huyện
                </Label>
                <Select
                  placeholder="Chọn Quận/ Huyện"
                  className="mb-2 react-select"
                  name="district"
                  classNamePrefix="react-select"
                  options={district}
                  onChange={(val: any) => {
                    fetchWard(val?.code);
                    setValue("district", val);
                  }}
                ></Select>
              </Field>
              <Field>
                <Label htmlFor="commune">
                  <span className="star-field">*</span>Xã/Phường
                </Label>
                <Select
                  placeholder="Chọn Xã/ Phường"
                  className="mb-2 react-select"
                  classNamePrefix="react-select"
                  name="commune"
                  options={ward}
                  onChange={(val: any) => {
                    setValue("commune", val);
                  }}
                ></Select>
              </Field>
              <Field>
                <Label htmlFor="detailedAddress">Địa chỉ chi tiết</Label>
                <Input
                  control={control}
                  name="detailedAddress"
                  placeholder="Nhập địa chỉ chi tiết"
                />
              </Field>
            </Row>
            <Row>
              <Field>
                <Label htmlFor="note">Ghi chú</Label>
                <Input
                  control={control}
                  name="note"
                  placeholder="Nhập ghi chú"
                />
              </Field>
            </Row>
          </form>
          <div className="fixed bottom-0  py-5 bg-white left-[251px] shadowSidebar right-0">
            <div className="flex justify-end w-full px-5">
              <div className="flex items-center gap-x-5">
                <Button to="/customer/list">Đóng</Button>
                <Button
                  type="submit"
                  className="flex items-center justify-center px-10 py-3 text-base font-semibold leading-4 text-white rounded-md disabled:opacity-50 disabled:pointer-events-none bg-primary"
                  onClick={handleSubmit(handleCreateCustomer)}
                  isLoading={loading}
                  disabled={loading}
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

export default CustomerAdd;
