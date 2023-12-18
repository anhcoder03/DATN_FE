import React, { useState } from "react";
import { Textarea } from "../../../components/textarea";
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
import { getOneProduct } from "../../../services/medicine.service";
import useUploadImage from "../../../hooks/useUploadImage";
import moment from "moment";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Spin } from "antd";
import LoadingPage from "../../../components/common/LoadingPage";

function ProductDetail() {
  const auth: any = useSelector((state: RootState) => state.auth.auth?.user);
  const { id } = useParams();
  const [status, setStatus] = useState();
  const [data, setData] = useState<any>();
  const { image, setImage } = useUploadImage();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function handleGetProduct() {
      setLoading(true);
      const res = await getOneProduct(id);
      setLoading(false);
      if (res) {
        reset(res);
        setImage(res?.image);
        setStatus(res?.status);
        setData({
          ...data,
          categoryId: res?.categoryId?.name,
          unit_selling: res?.unit_selling,
          dateOfManufacture: res?.dateOfManufacture,
          dateExpiry: res?.dateExpiry,
        });
      }
    }
    handleGetProduct();
  }, [id]);
  const { control, reset } = useForm<any>({});

  const handleGotoUpdate = () => {
    navigate(`/product/update/${id}`);
  };

  const renderStatus: any = (status: any) => {
    if (status == "work") {
      return (
        <span style={{ color: "#48A800", marginTop: 5 }}>Đang hoạt động</span>
      );
    }
    if (status == "hidden") {
      return (
        <span style={{ color: "#FD4858", marginTop: 5 }}>Ngừng kinh doanh</span>
      );
    }
    if (status == "empty") {
      return <span style={{ color: "#FD4858", marginTop: 5 }}>Hết hàng</span>;
    } else {
      return <span style={{ marginTop: 5 }}>---</span>;
    }
  };

  return (
    <Spin spinning={loading} indicator={<LoadingPage />}>
      <Layout>
        <div className="relative h-full only-view">
          <Heading>Chi tiết sản phẩm</Heading>
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
              </Row>
              <Row className="grid-cols-3 mb-10">
                <Field>
                  <Label htmlFor="categoryId">
                    <span className="star-field">*</span>
                    Danh mục sản phẩm
                  </Label>
                  <Input
                    control={control}
                    name="name"
                    value={data?.categoryId}
                  />
                </Field>
                <Field>
                  <Label htmlFor="unit_selling">
                    <span className="star-field">*</span>
                    Đơn vị bán
                  </Label>
                  <Input
                    control={control}
                    name="unit_selling"
                    type="text"
                    value={data?.unit_selling}
                  />
                </Field>
              </Row>
              <Row className="grid-cols-2 mb-10">
                <Field>
                  <Label htmlFor="dateOfManufacture">Ngày sản xuất</Label>
                  <Input
                    control={control}
                    type="text"
                    name="dateOfManufacture"
                    value={moment(data?.dateOfManufacture).format("DD/MM/yyyy")}
                  />
                </Field>
                <Field>
                  <Label htmlFor="dateExpiry">Ngày hết hạn</Label>
                  <Input
                    control={control}
                    type="text"
                    name="dateExpiry"
                    value={moment(data?.dateExpiry).format("DD/MM/yyyy")}
                  />
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
                </Field>
                <Field>
                  <Label htmlFor="status">Trạng thái</Label>
                  {renderStatus(status)}
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
              </div>
            </div>
          </form>
          <div className="fixed bottom-0  py-5 bg-white left-[251px] shadowSidebar right-0">
            <div className="flex justify-end w-full px-5">
              <div className="flex items-center gap-x-5">
                <Button to="/product/list">Đóng</Button>
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
    </Spin>
  );
}

export default ProductDetail;
