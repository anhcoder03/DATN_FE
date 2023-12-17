import { useEffect, useState } from "react";
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
import { isEmpty } from "lodash";
import { Spin } from "antd";
import LoadingPage from "../../../components/common/LoadingPage";
import PriceUtils from "../../../helpers/PriceUtils";
import TextUtils from "../../../helpers/TextUtils";

const ServiceUpdate = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>();
  const { id } = useParams();

  const validate = () => {
    if(isEmpty(data?.name)) {
      toast.warning('Tên dịch vụ không được để trống!');
      return false
    }
    if(!data?.price) {
      toast.warning('Giá dịch vụ không được để trống!');
      return false
    }
    return true
  }

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

  const handleUpdateCategory = async () => {
    if(!validate()) return;
    setLoading(true);
    const res = await updateService({ ...data });
    setLoading(false);
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

  const handleChangeInput = (event?: any) => {
    let { value, name } = event.target
    if (value === " ") return;
    setData({
        ...data,
        [name]: value
    })
  }

  return (
    <Spin spinning={loading} indicator={<LoadingPage />}>
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
                  value={data?.name}
                  onChange={(val: any) =>handleChangeInput(val)}
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
                  value = {data?.price}
                  onChange={(e: any) => handleChangeInput({target:{ name: "price" ,value: TextUtils.onlyNumber(e.target.value) }})}
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
                  value = {data?.extract}
                  onChange={(val: any) =>handleChangeInput(val)}
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
    </Spin>
    
  );
};

export default ServiceUpdate;
