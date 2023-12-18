import React, { useEffect, useState } from "react";
import { Layout } from "../../../components/layout";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../../components/button";
import Heading from "../../../components/common/Heading";
import { Row } from "../../../components/row";
import { Field } from "../../../components/field";
import { Label } from "../../../components/label";
import { Input } from "../../../components/input";
import IconCalendar from "../../../assets/images/icon/ic_calendar-black.svg";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useUploadImage from "../../../hooks/useUploadImage";
import NotImage from "../../../assets/images/users/no-img.jpg";
import LoadingSpinner from "../../../components/common/LoadingSpinner";
import Flatpickr from "react-flatpickr";
import { Radio, Spin } from "antd";
import { Vietnamese } from "flatpickr/dist/l10n/vn";
import {
  getOneProduct,
  updateMedicine,
} from "../../../services/medicine.service";
import Select from "react-select";
import { Textarea } from "../../../components/textarea";
import { getAllCategory } from "../../../services/category.service";
import { dataTypeImportProduct } from "../../../constants/options";
import { IDataProduct } from "./ProductAdd";
import LoadingPage from "../../../components/common/LoadingPage";

const ProductUpdate = () => {
  const schema = yup.object({
    name: yup.string().trim().required("Tên sản phẩm không được để trống!"),
    dateOfManufacture: yup.string().required("Vui lòng chọn ngày sản xuất"),
    dateExpiry: yup.string().required("Vui lòng chọn ngày hết hạn"),
    ingredient: yup.string().required("Thành phần không được để trống"),
    origin: yup.string().required("Nơi xuất xứ không được để trống"),
    quantity: yup.string().required("Số lượng nhập không được để trống"),
    how_using: yup.string().required("Cách dùng không được để trống!"),
    uses: yup.string().required("Công dụng không được để trống!"),
    price_import: yup
      .number()
      .typeError("Giá nhập không được để trống")
      .notRequired()
      .min(1, "Giá nhập vào phải lớn hơn 0"),
    price: yup
      .number()
      .typeError("Giá bán không được để trống")
      .notRequired()
      .min(1, "Giá bán vào phải lớn hơn 0"),
  });
  const navigate = useNavigate();
  const [data, setData] = useState<any>();
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState<any>();
  const [loading, setloading] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<IDataProduct>({
    resolver: yupResolver<any>(schema),
    mode: "onChange",
  });
  const {
    image,
    setImage,
    handleDeleteImage,
    handleSelectImage,
    loading: loadingImage,
  } = useUploadImage();
  const { id } = useParams();
  useEffect(() => {
    async function handleGetProduct() {
      setloading(true);
      const res = await getOneProduct(id);
      setloading(false);
      reset(res);
      setImage(res?.image);
      setData(res);
      setStatus(res?.status);
    }
    handleGetProduct();
  }, [id]);

  console.log("status", data);

  const handleUpdateProduct = async (values: any) => {
    const cloneValue = {
      ...values,
      categoryId: data?.categoryId?._id || data?.categoryId,
      unit_selling: data?.unit_selling,
      dateOfManufacture: data?.dateOfManufacture,
      dateExpiry: data?.dateExpiry,
      status: status,
    };
    setloading(true);
    const res = await updateMedicine({ ...cloneValue, image });
    setloading(false);
    if (res?.medicine) {
      toast.success(res?.message);
      navigate("/product/list");
    } else {
      toast.error(res?.message);
    }
  };

  useEffect(() => {
    async function getCategories() {
      const response = await getAllCategory();
      const ListArr: any = [];
      response?.docs?.map((e: any) => {
        ListArr?.push({
          ...e,
          value: e?._id,
          label: e?.name,
        });
      });
      setCategories(ListArr);
    }

    getCategories();
  }, []);

  const onChange = (e: any) => {
    setStatus(e.target.value);
  };

  return (
    <Spin spinning={loading} indicator={<LoadingPage />}>
      <Layout>
        <div className="relative h-full">
          <Heading>Cập nhật sản phẩm</Heading>
          <form className="flex  justify-between gap-x-10 w-full pb-[70px]">
            <div className="p-5 bg-white w-[60%] rounded-xl">
              <Heading>Thông tin chung</Heading>
              <Row className="grid-cols-1 mb-10">
                <Field>
                  <Label htmlFor="name">
                    <span className="star-field">*</span>
                    Tên sản phẩm
                  </Label>
                  <Input
                    control={control}
                    name="name"
                    placeholder="Nhập tên sản phẩm.."
                  />
                </Field>
                <div className="text-red-500 text-xs h-5">
                  {errors.name && errors.name.message}
                </div>
              </Row>
              <Row className="grid-cols-3 mb-10">
                <Field>
                  <Label htmlFor="categoryId">
                    <span className="star-field">*</span>
                    Danh mục sản phẩm
                  </Label>
                  <Select
                    placeholder="Chọn danh mục "
                    className="mb-2 react-select"
                    classNamePrefix="react-select"
                    options={categories}
                    onChange={(val: any) => {
                      setData({ ...data, categoryId: val?.value });
                    }}
                    value={categories.find(
                      (option: any) =>
                        option.value === data?.categoryId?._id ||
                        option.value == data?.categoryId
                    )}
                  ></Select>
                  <div className="text-red-500 text-xs h-5">
                    {errors.categoryId && errors.categoryId.message}
                  </div>
                </Field>
                <Field>
                  <Label htmlFor="unit_selling">
                    <span className="star-field">*</span>
                    Đơn vị bán
                  </Label>
                  <Select
                    placeholder="Chọn đơn vị bán"
                    className="mb-2 react-select"
                    classNamePrefix="react-select"
                    options={dataTypeImportProduct}
                    onChange={(val: any) => {
                      setData({ ...data, unit_selling: val?.value });
                    }}
                    value={dataTypeImportProduct.find(
                      (option: any) => option.value === data?.unit_selling
                    )}
                  ></Select>
                  <div className="text-red-500 text-xs h-5">
                    {errors.unit_selling && errors.unit_selling.message}
                  </div>
                </Field>
              </Row>
              <Row className="grid-cols-2 mb-10">
                <Field>
                  <Label htmlFor="dateOfManufacture">Ngày sản xuất</Label>
                  <div className="relative border-b border-b-gray-200 pb-3">
                    <Flatpickr
                      options={{
                        locale: Vietnamese,
                        allowInput: true,
                        dateFormat: "d/m/Y",
                        altInputClass: "date-range",
                      }}
                      onChange={([date]) => {
                        setValue("dateOfManufacture", date as any);
                        setData({ ...data, dateOfManufacture: date });
                      }}
                      value={data?.dateOfManufacture}
                      placeholder="dd/mm/yyyy"
                      name="dateOfManufacture"
                    ></Flatpickr>
                    <div className="absolute top-0 right-0">
                      <img src={IconCalendar} alt="icon" />
                    </div>
                  </div>
                  <div className="text-red-500 text-xs h-5">
                    {errors.dateOfManufacture &&
                      errors.dateOfManufacture.message}
                  </div>
                </Field>
                <Field>
                  <Label htmlFor="dateExpiry">Ngày hết hạn</Label>
                  <div className="relative border-b border-b-gray-200 pb-3">
                    <Flatpickr
                      options={{
                        locale: Vietnamese,
                        allowInput: true,
                        dateFormat: "d/m/Y",
                        altInputClass: "date-range",
                      }}
                      onChange={([date]) => {
                        setValue("dateExpiry", date as any);
                        setData({ ...data, dateExpiry: date });
                      }}
                      value={data?.dateExpiry}
                      placeholder="dd/mm/yyyy"
                      name="dateExpiry"
                    ></Flatpickr>
                    <div className="absolute top-0 right-0">
                      <img src={IconCalendar} alt="icon" />
                    </div>
                  </div>
                  <div className="text-red-500 text-xs h-5">
                    {errors.dateExpiry && errors.dateExpiry.message}
                  </div>
                </Field>
              </Row>
              <Row className="grid-cols-1 mb-10">
                <Field>
                  <Label htmlFor="ingredient">
                    <span className="star-field">*</span>
                    Thành phần
                  </Label>
                  <Textarea
                    name="ingredient"
                    placeholder="Nhập thành phần..."
                    control={control}
                  />
                  <div className="text-red-500 text-xs h-5">
                    {errors.ingredient && errors.ingredient.message}
                  </div>
                </Field>
              </Row>
              <Row className="grid-cols-3 mb-10">
                <Field>
                  <Label htmlFor="origin">
                    <span className="star-field">*</span>
                    Xuất xứ
                  </Label>
                  <Input
                    control={control}
                    name="origin"
                    placeholder="Nhập dữ liệu..."
                  />
                  <div className="text-red-500 text-xs h-5">
                    {errors.origin && errors.origin.message}
                  </div>
                </Field>
                <Field>
                  <Label htmlFor="status">Trạng thái</Label>
                  <Radio.Group onChange={onChange} value={status}>
                    <div className="flex items-center">
                      <Radio
                        className="flex items-center h-[34px]"
                        value={"work"}
                      >
                        Hoạt động
                      </Radio>
                      <Radio
                        className="flex items-center h-[34px]"
                        value={"hidden"}
                      >
                        Ngừng hoạt động
                      </Radio>
                    </div>
                  </Radio.Group>
                </Field>
                <Field>
                  <Label htmlFor="quantity">
                    <span className="star-field">*</span>
                    Số lượng nhập
                  </Label>
                  <Input
                    control={control}
                    name="quantity"
                    type="number"
                    placeholder="Nhập số lượng..."
                  />
                  <div className="text-red-500 text-xs h-5">
                    {errors.quantity && errors.quantity.message}
                  </div>
                </Field>
              </Row>
              <Row className="grid-cols-1 mb-10">
                <Field>
                  <Label htmlFor="how_using">
                    <span className="star-field">*</span>Cách dùng
                  </Label>
                  <Textarea
                    name="how_using"
                    placeholder="Nhập cách dùng..."
                    control={control}
                  />
                  <div className="text-red-500 text-xs h-5">
                    {errors.how_using && errors.how_using.message}
                  </div>
                </Field>
              </Row>
              <Row className="grid-cols-1 mb-10">
                <Field>
                  <Label htmlFor="uses">
                    <span className="star-field">*</span>Công dụng
                  </Label>
                  <Textarea
                    name="uses"
                    placeholder="Nhập công dụng..."
                    control={control}
                  />
                  <div className="text-red-500 text-xs h-5">
                    {errors.uses && errors.uses.message}
                  </div>
                </Field>
              </Row>
            </div>
            <div className="w-[40%] flex flex-col gap-y-10">
              <div className="p-5 bg-white rounded-xl">
                <Heading>Giá sản phẩm</Heading>
                <Row className="grid-cols-2 mb-10">
                  <Field>
                    <Label htmlFor="price_import">
                      <span className="star-field">*</span>
                      Giá nhập
                    </Label>
                    <Input
                      control={control}
                      name="price_import"
                      placeholder="Nhập giá trị..."
                      type="number"
                    />
                    <div className="text-red-500 text-xs h-5">
                      {errors.price_import && errors.price_import.message}
                    </div>
                  </Field>
                  <Field>
                    <Label htmlFor="price">
                      <span className="star-field">*</span>
                      Giá bán lẻ
                    </Label>
                    <Input
                      control={control}
                      name="price"
                      placeholder="Nhập giá trị..."
                      type="number"
                    />
                    <div className="text-red-500 text-xs h-5">
                      {errors.price && errors.price.message}
                    </div>
                  </Field>
                </Row>
              </div>
              <div className="p-5 bg-white rounded-xl">
                <Heading>Hình ảnh sản phẩm</Heading>
                <Row className="grid-cols-1">
                  <Field>
                    <Label
                      className="tee-file-preview relative"
                      htmlFor="image"
                    >
                      {!image && <img src={NotImage} />}
                      {image && <img src={image} />}

                      {image && (
                        <div
                          className="tee-file-hover absolute z-10"
                          onClick={() => handleDeleteImage()}
                        >
                          <span>
                            <i className="ti-reload" /> Xóa
                          </span>
                        </div>
                      )}
                      {!image && (
                        <input
                          onChange={handleSelectImage}
                          accept="image/png, image/gif, image/jpeg"
                          className="tee-file-input"
                          name="image"
                          type="file"
                          id="image"
                          multiple
                        />
                      )}
                      {loadingImage && (
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 ">
                          <LoadingSpinner />
                        </div>
                      )}
                      <small className="form-control-feedback" />
                    </Label>
                  </Field>
                </Row>
              </div>
            </div>
          </form>
          <div className="fixed bottom-0  py-5 bg-white left-[251px] shadowSidebar right-0">
            <div className="flex justify-end w-full px-5">
              <div className="flex items-center gap-x-5">
                <Button to="/product/list">Đóng</Button>
                <Button
                  type="submit"
                  className="flex items-center justify-center px-10 py-3 text-base font-semibold leading-4 text-white rounded-md disabled:opacity-50 disabled:pointer-events-none bg-primary"
                  onClick={handleSubmit(handleUpdateProduct)}
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

export default ProductUpdate;
