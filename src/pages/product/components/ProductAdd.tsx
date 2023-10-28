import Select from "react-select";
import Heading from "../../../components/common/Heading";
import { Field } from "../../../components/field";
import { Input } from "../../../components/input";
import { Label } from "../../../components/label";
import { Layout } from "../../../components/layout";
import { Row } from "../../../components/row";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import Flatpickr from "react-flatpickr";
import { Vietnamese } from "flatpickr/dist/l10n/vn";
import { dataTypeImportProduct, optionNVTD } from "../../../constants/options";
import IconCalendar from "../../../assets/images/icon/ic_calendar-black.svg";
import { Radio, RadioChangeEvent } from "antd";
import { useEffect, useState } from "react";
import { Button } from "../../../components/button";
import NotImage from "../../../assets/images/users/no-img.jpg";
import useUploadImage from "../../../hooks/useUploadImage";
import LoadingSpinner from "../../../components/common/LoadingSpinner";
import { Textarea } from "../../../components/textarea";
import { yupResolver } from "@hookform/resolvers/yup";
import { createMedicine } from "../../../services/medicine.service";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllCategory } from "../../../services/category.service";

const schema = yup.object({
  name: yup.string().trim().required("Tên sản phẩm không được để trống!"),
  categoryId: yup.string().required("Vui lòng chọn danh mục sản phẩm"),
  unit_selling: yup.string().required("Vui lòng chọn đơn vị bán"),
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

export type IDataProduct = {
  name: string;
  categoryId: string;
  unit_selling: string;
  dateOfManufacture: string;
  dateExpiry: string;
  ingredient: string;
  origin: string;
  quantity: string;
  how_using: string;
  uses: string;
  price_import: number;
  price: number;
  image?: string;
  status?: string;
};

function ProductAdd() {
  const [status, setStatus] = useState("work");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<IDataProduct>({
    resolver: yupResolver<any>(schema),
    mode: "onChange",
  });
  const { image, handleDeleteImage, handleSelectImage, loading } =
    useUploadImage();

  console.log(isValid);
  const handleCreateProduct = async (values: any) => {
    const data = { ...values, status, image };
    const res = await createMedicine(data);
    console.log(res);
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

  const onChange = (e: RadioChangeEvent) => {
    setStatus(e.target.value);
  };
  return (
    <Layout>
      <div className="relative h-full">
        <Heading>Tạo sản phẩm</Heading>
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
                <div className="text-red-500 text-xs h-5">
                  {errors.name && errors.name.message}
                </div>
              </Field>
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
                    setValue("categoryId", val?.value);
                  }}
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
                    setValue("unit_selling", val?.value);
                  }}
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
                    }}
                    placeholder="dd/mm/yyyy"
                    name="dateOfManufacture"
                  ></Flatpickr>
                  <div className="absolute top-0 right-0">
                    <img src={IconCalendar} alt="icon" />
                  </div>
                </div>
                <div className="text-red-500 text-xs h-5">
                  {errors.dateOfManufacture && errors.dateOfManufacture.message}
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
                    }}
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
              </Field>
              <div className="text-red-500 text-xs h-5">
                {errors.ingredient && errors.ingredient.message}
              </div>
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
                      Ẩn
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
                <Label htmlFor="how_using">Cách dùng</Label>
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
                <Label htmlFor="uses">Công dụng</Label>
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
                  <Label className="tee-file-preview relative" htmlFor="image">
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
                    {loading && (
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
                onClick={handleSubmit(handleCreateProduct)}
              >
                Lưu
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProductAdd;
