import React from "react";
import { useEffect } from "react";
import { Button } from "../../../components/button";
import { Layout } from "../../../components/layout";
import { Input } from "../../../components/input";
import { useForm } from "react-hook-form";
import { Field } from "../../../components/field";
import { Label } from "../../../components/label";
import { Row } from "../../../components/row";
import NotImage from "../../../assets/images/users/no-img.jpg";
import Heading from "../../../components/common/Heading";
import { useNavigate, useParams } from "react-router-dom";
import { getOneCategory } from "../../../services/category.service";
import useUploadImage from "../../../hooks/useUploadImage";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
const CategoryDetail = () => {
  const auth: any = useSelector((state: RootState) => state.auth.auth?.user);
  const { id } = useParams();
  const { image, setImage } = useUploadImage();
  const navigate = useNavigate();
  useEffect(() => {
    async function handleGetCategory() {
      const res = await getOneCategory(id);
      if (res) {
        reset(res);
        setImage(res?.image);
      }
    }
    handleGetCategory();
  }, [id]);
  const { control, reset } = useForm<any>({});
  const handleGotoUpdate = () => {
    navigate(`/category/update/${id}`);
  };
  return (
    <Layout>
      <div className="relative h-full only-view">
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
                {!image && (
                  <input
                    className="tee-file-input"
                    name="image"
                    type="file"
                    id="image"
                    multiple
                  />
                )}
                <small className="form-control-feedback" />
              </Label>
            </Field>
          </Row>
        </form>
        <div className="fixed bottom-0  py-5 bg-white left-[251px] shadowSidebar right-0">
          <div className="flex justify-end w-full px-5">
            <div className="flex items-center gap-x-5">
              <Button to="/category/list">Đóng</Button>
              {auth?.role?.roleNumber == 2 ? null : (
                <Button
                  type="submit"
                  className="flex items-center justify-center px-10 py-3 text-base font-semibold leading-4 text-white rounded-md disabled:opacity-50 disabled:pointer-events-none bg-primary"
                  onClick={() => handleGotoUpdate()}
                >
                  Chỉnh sửa
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryDetail;
