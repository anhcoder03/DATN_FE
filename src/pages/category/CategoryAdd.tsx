import { Layout } from "../../components/layout";
import { Input } from "../../components/input";
import { useForm } from "react-hook-form";
import { Field } from "../../components/field";
import { Label } from "../../components/label";
import { Row } from "../../components/row";
import { useEffect, useState } from "react";
import Heading from "../../components/common/Heading";
import { Button } from "../../components/button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { createCategory } from "../../services/category.service";
import { useNavigate } from "react-router-dom";
import NotImage from "../../assets/images/users/no-img.jpg";
import useUploadImage from "../../hooks/useUploadImage";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { Spin } from "antd";
import LoadingPage from "../../components/common/LoadingPage";
const schema = yup.object({
  name: yup.string().trim().required("Tên danh mục không được để trống!"),
});

const CategoryAdd = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver<any>(schema),
    mode: "onSubmit",
  });
  const {
    image,
    handleDeleteImage,
    handleSelectImage,
    loading: loadingImage,
  } = useUploadImage();
  const handleCreateCategory = async (values: any) => {
    setLoading(true);
    const res = await createCategory({ ...values, image });
    setLoading(false);
    if (res?.category) {
      toast.success(res?.message);
      navigate("/category/list");
    } else {
      toast.error(res.message);
    }
  };
  useEffect(() => {
    const arrayError: any = Object.values(errors);
    if (arrayError.length > 0) {
      toast.warning(arrayError[0]?.message);
    }
  });
  return (
    <Spin spinning={loading} indicator={<LoadingPage />}>
      <Layout>
        <div className="relative h-full">
          <Heading>Thêm danh mục </Heading>
          <form className="w-full p-5 bg-white ">
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
                      // accept="image/png, image/gif, image/jpeg"
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
                {/* <Input
                control={control}
                name="image"
                placeholder="Giúp mình nhé hehe "
              /> */}
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
                  onClick={handleSubmit(handleCreateCategory)}
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

export default CategoryAdd;
