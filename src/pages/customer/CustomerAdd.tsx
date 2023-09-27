import { Layout } from "../../components/layout";
import { Input } from "../../components/input";
import { useForm } from "react-hook-form";
import { Field } from "../../components/field";
import { Label } from "../../components/label";
import { Row } from "../../components/row";
import { useEffect, useState } from "react";
import type { RadioChangeEvent } from "antd";
import { Radio } from "antd";
import { IconPhone } from "../../components/icons";
import Heading from "../../components/common/Heading";
import Select from "react-select";
import axios from "axios";
import { Button } from "../../components/button";
import Flatpickr from "react-flatpickr";
import { Vietnamese } from "flatpickr/dist/l10n/vn";

type TDataCustomer = {
  _id?: string;
  name: string;
  gender: string;
  province: number;
  district: number;
  commune: number;
  dateOfBirth: Date;
};

const CustomerAdd = () => {
  const onChange = (e: RadioChangeEvent) => {
    setGender(e.target.value);
  };
  const [gender, setGender] = useState("nam");
  const [dataProvince, SetDataProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  // const [date, setDistrict] = useState([]);
  const [ward, setWard] = useState([]);
  const { control, handleSubmit, setValue } = useForm<TDataCustomer>({});
  const handleCreateCustomer = (values: TDataCustomer) => {
    console.log({ ...values, gender });
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
    console.log(ListArr);
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
  // const handleChangeDate = (date: any) => {
  //   console.log("datex", date);
  //   setData({
  //     ...data,
  //     birthday: date[0] ? moment(date[0]) : undefined,
  //   });
  // };
  return (
    <Layout>
      <div className="relative h-full">
        <Heading>Thêm hồ sơ khách hàng</Heading>
        <form
          className="max-w-[50%] w-full bg-white p-5"
          onSubmit={handleSubmit(handleCreateCustomer)}
        >
          <Heading>Thông tin khách hàng</Heading>

          <Row>
            <Field>
              <Label htmlFor="_id">Mã khách hàng</Label>
              <Input
                control={control}
                name="_id"
                placeholder="Nhập mã khách hàng"
              />
            </Field>
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
                <span className="star-field">*</span>
                Ngày sinh
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
          </Row>
          <Row>
            <Field>
              <Label htmlFor="gender">
                <span className="star-field">*</span>
                Giới tính
              </Label>
              <Radio.Group onChange={onChange} value={gender}>
                <div className="flex items-center">
                  <Radio className="flex items-center h-[34px]" value={"nam"}>
                    Nam
                  </Radio>
                  <Radio className="flex items-center h-[34px]" value={"nữ"}>
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
              <Input control={control} name="email" placeholder="Nhập Email" />
            </Field>
          </Row>
          <Row>
            <Field>
              <Label htmlFor="province">Tỉnh/ Thành phố</Label>
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
              <Label htmlFor="district">Quận/Huyện</Label>
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
              <Label htmlFor="commune">Xã/Phường</Label>
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
              <Input control={control} name="note" placeholder="Nhập ghi chú" />
            </Field>
          </Row>
        </form>
        <div className="fixed bottom-0  py-5 bg-white left-[251px] shadowSidebar right-0">
          <div className="flex justify-end w-full px-5">
            <div className="flex items-center gap-x-5">
              <Button to="/customer">Đóng</Button>
              <Button
                type="submit"
                className="flex items-center justify-center px-10 py-3 text-base font-semibold leading-4 text-white rounded-md disabled:opacity-50 disabled:pointer-events-none bg-primary"
                onClick={handleSubmit(handleCreateCustomer)}
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

export default CustomerAdd;
