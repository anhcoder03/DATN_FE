import { Layout } from "../../components/layout";
import { Input } from "../../components/input";
import { useForm } from "react-hook-form";
import { Field } from "../../components/field";
import { Label } from "../../components/label";
import { Row } from "../../components/row";
import { useEffect, useState } from "react";
import Heading from "../../components/common/Heading";
import axios from "axios";
import { Button } from "../../components/button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { createCategory } from "../../services/category.service";
import { useNavigate } from "react-router-dom";

const schema = yup.object({
  name: yup.string().trim().required("Tên danh mục không được để trống!"),
  image: yup.string().trim().required("Ảnh danh mục không được để trống!"),
});

const CategoryAdd = () => {
  
  const [gender, setGender] = useState("Nam");
  const [dataProvince, SetDataProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const navigate = useNavigate();
  const [ward, setWard] = useState([]);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver<any>(schema),
    mode: "onSubmit",
  });
  const handleCreateCustomer = async (values: any) => {
    const data = { ...values, gender, creator: "650835d91fa3c100012c83d6" };
    const res = await createCategory(data);
    if (res?.customer) {
      toast.success(res?.message);
      navigate("/category");
    } else {
      toast.error(res.message);
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

  useEffect(() => {
    const arrayError = Object.values(errors);
    if (arrayError.length > 0) {
      toast.warning(arrayError[0]?.message);
    }
  });

  return (
    <Layout>
      <div className="relative h-full">
        <Heading>Thêm danh mục </Heading>
        <form
          className="w-full p-5 bg-white "
          onSubmit={handleSubmit(handleCreateCustomer)}
        >
          <Heading>Thông tin danh mục </Heading>

          <Row>
            <Field>
              <Label htmlFor="name">
                <span className="star-field">*</span>
                Tên danh mục
              </Label>
              <Input
                control={control}
                name="name"
                placeholder="Nhập tên danh mục"
              />
            </Field>
            <Field>
            <Label htmlFor="image">
            <span className="star-field">*</span>
                Ảnh danh mục 
            </Label>
            <Input
                control={control}
                name="image"
                placeholder="Giúp mình nhé hehe "
              />
          </Field>
          </Row>
        </form>
        <div className="fixed bottom-0  py-5 bg-white left-[251px] shadowSidebar right-0">
          <div className="flex justify-end w-full px-5">
            <div className="flex items-center gap-x-5">
              <Button to="/category/list">Đóng</Button>
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

export default CategoryAdd