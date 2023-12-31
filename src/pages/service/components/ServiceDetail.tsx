import { Layout } from "../../../components/layout";
import { Input } from "../../../components/input";
import { useForm } from "react-hook-form";
import { Field } from "../../../components/field";
import { Label } from "../../../components/label";
import { Row } from "../../../components/row";
import { useEffect, useState } from "react";
import Heading from "../../../components/common/Heading";
import { Button } from "../../../components/button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { getOneService } from "../../../services/service.service";
import { Spin } from "antd";
import LoadingPage from "../../../components/common/LoadingPage";
import PriceUtils from "../../../helpers/PriceUtils";
const schema = yup.object({
  name: yup.string().trim().required("Tên danh mục không được để trống!"),
  price: yup.number().required("Giá dịch vụ không được để trống"),
});

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const {
    control,
    formState: { errors },
    reset,
  } = useForm<any>({
    resolver: yupResolver<any>(schema),
    mode: "onSubmit",
  });

  useEffect(() => {
    async function handleGetService() {
      setLoading(true);
      const res = await getOneService(id);
      setLoading(false);
      if (res) {
        setData(res)
      }
    }
    handleGetService();
  }, [id]);

  useEffect(() => {
    const arrayError: any = Object.values(errors);
    if (arrayError.length > 0) {
      toast.warning(arrayError[0]?.message);
    }
  });

  const handleGotoUpdate = () => {
    navigate(`/service/update/${id}`);
  };

  return (
    <Spin spinning={loading} indicator={<LoadingPage />}>
      <Layout>
        <div className="relative h-full only-view">
          <Heading>Chi tiết dịch vụ </Heading>
          <form className="w-full p-5 bg-white ">
            <Heading>Thông tin dịch vụ </Heading>
            <Row>
              <Field>
                <Label htmlFor="name">
                  <span className="star-field">*</span>
                  Tên dịch vụ
                </Label>
                <Input
                  control={control}
                  name="name"
                  placeholder="Nhập tên dịch vụ"
                  value={data?.name}
                />
              </Field>
              <Field>
                <Label htmlFor="price">
                  <span className="star-field">*</span>
                  Giá dịch vụ
                </Label>
                <Input
                  control={control}
                  name="price"
                  placeholder="Nhập giá trị..."
                  value={PriceUtils.format(data?.price)}
                />
              </Field>
              <Field>
                <Label htmlFor="extract">
                  Mô tả
                </Label>
                <Input
                  control={control}
                  name="extract"
                  placeholder="Nhập mô tả"
                  value={data?.extract}
                />
              </Field>
            </Row>
          </form>
          <div className="fixed bottom-0  py-5 bg-white left-[251px] shadowSidebar right-0">
            <div className="flex justify-end w-full px-5">
              <div className="flex items-center gap-x-5">
                <Button to="/service/list">Đóng</Button>
                <Button
                  type="submit"
                  className="flex items-center justify-center px-10 py-3 text-base font-semibold leading-4 text-white rounded-md disabled:opacity-50 disabled:pointer-events-none bg-primary"
                  onClick={() => handleGotoUpdate()}
                >
                  Chỉnh sửa
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </Spin>
  );
};

export default ServiceDetail;
