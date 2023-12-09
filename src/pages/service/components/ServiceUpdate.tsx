import { useEffect } from "react";
import { Layout } from "../../../components/layout";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../../components/button";
import Heading from "../../../components/common/Heading";
import { Row } from "../../../components/row";
import { Field } from "../../../components/field";
import { Label } from "../../../components/label";
import { Input } from "../../../components/input";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  getOneService,
  updateService,
} from "../../../services/service.service";

const ServiceUpdate = () => {
  const schema = yup.object({
    name: yup.string().trim().required("Tên danh mục không được để trống!"),
    price: yup.number().required("Giá dịch vụ không được để trống"),
  });
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver<any>(schema),
    mode: "onSubmit",
  });
  const { id } = useParams();
  useEffect(() => {
    async function handleGetService() {
      const res = await getOneService(id);
      if (res) {
        reset(res);
      }
    }
    handleGetService();
  }, [id]);

  const handleUpdateCategory = async (values: any) => {
    const res = await updateService({ ...values });
    if (res?.services) {
      toast.success(res?.message);
      navigate("/service/list");
    } else {
      toast.error(res?.message);
    }
  };

  useEffect(() => {
    const arrayError: any = Object.values(errors);
    if (arrayError.length > 0) {
      toast.warning(arrayError[0]?.message);
    }
  });

  return (
    <Layout>
      <div className="relative h-full">
        <Heading>Thêm dịch vụ </Heading>
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
              />
            </Field>
            <Field>
              <Label htmlFor="extract">
                <span className="star-field">*</span>
                Mô tả
              </Label>
              <Input
                control={control}
                name="extract"
                placeholder="Nhập mô tả"
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
                onClick={handleSubmit(handleUpdateCategory)}
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

export default ServiceUpdate;
