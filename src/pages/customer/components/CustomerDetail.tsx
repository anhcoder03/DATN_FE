import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getOneCustomer } from '../../../services/customer.service';
import { Layout } from "../../../components/layout";
import { Input } from "../../../components/input";
import { Label } from "../../../components/label";
import { Row } from "../../../components/row";
import Heading from "../../../components/common/Heading";
import { Field } from "../../../components/field";
import { IconPhone } from "../../../components/icons";
import { Button } from "../../../components/button";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import moment from 'moment';
import CalcUtils from "../../../helpers/CalcULtils";
const CustomerDetail = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any>();
    const [date, setDate] = useState<any>();
    const {id} = useParams();
    useEffect(() => {
        loadData(id);
    },[id])

    type TDataCustomer = {
      _id?: string;
      name: string;
      gender: string;
      province: number;
      district: number;
      commune: number;
      dateOfBirth: Date;
    };
    const schema = yup.object({
      name: yup.string().trim().required("Tên khách hàng không được để trống!"),
      dateOfBirth: yup.string().required("Ngày sinh không được để trống!"),
      phone: yup
        .string()
        .required("Số điện thoại không được để trống!")
        .matches(/^(0[0-9]+)$/, "Số điện thoại không đúng định dạng")
        .min(10, "Số điện thoại phải có ít nhất 10 chữ số")
        .max(11, "Số điện thoại không được vượt quá 11 chữ số"),
      citizenId: yup
        .string()
        .required("Số CCCD không được để trống!")
        .matches(/^(0[0-9]+)$/, "Căn cước công dân không hợp lệ!")
        .min(9, "Số CCCD phải có ít nhất 9 chữ số")
        .max(12, "Số CCD không được vượt quá 12 chữ số"),
    });
    
    const loadData = async (id: any) => {
      try {
        setLoading(true);
        const data: any = await getOneCustomer(id);
        setLoading(false);
        reset(data);
        setValue('province', data?.province?.name);
        setValue('commune', data?.commune?.name);
        setValue('district', data?.district?.name);
        setDate(data?.dateOfBirth)
        setData(data);
      } catch (error) {
        console.log(error);
      }
    }
    const {
      control,
      handleSubmit,
      setValue,
      formState: { errors },
      reset
    } = useForm<TDataCustomer>({
      resolver: yupResolver<any>(schema),
    });
  return (
    <Layout>
      <div className="relative h-full only-view">
        <Heading>Chi tiết khách hàng</Heading>
        <form
          className="w-full p-5 bg-white "
          // onSubmit={handleSubmit(handleCreateCustomer)}
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
              <Label htmlFor="">Ngày sinh</Label>
              <Input
                control={control}
                value={moment(date).format('DD/MM/YYYY')}
                name="dateOfBirth"
              />
            </Field>
            <Field>
              <Label htmlFor="">Tuổi</Label>
              <Input 
                control={control}
                name='date'
                value={CalcUtils.calculateAge(date)}
              />
            </Field>
          </Row>
          <Row>
            <Field>
              <Label htmlFor="gender">Giới tính</Label>
              <Input control={control} name="gender" placeholder="Nhập gender" />
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
              <Input control={control} name="province" placeholder="Nhập province" />
            </Field>
            <Field>
              <Label htmlFor="district">Quận/Huyện</Label>
              <Input control={control} name="district" placeholder="Nhập district" />
            </Field>
            <Field>
              <Label htmlFor="commune">Xã/Phường</Label>
              <Input control={control} name="commune" placeholder="Nhập commune" />
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
              <Label htmlFor="citizenId">
                <span className="star-field">*</span>
                Căn cước công dân
              </Label>
              <Input
                control={control}
                name="citizenId"
                placeholder="Nhập số CCCD"
              />
            </Field>
            <Field>
              <Label htmlFor="note">Ghi chú</Label>
              <Input control={control} name="note" placeholder="Nhập ghi chú" />
            </Field>
          </Row>
        </form>
        <div className="fixed bottom-0  py-5 bg-white left-[251px] shadowSidebar right-0">
          <div className="flex justify-end w-full px-5">
            <div className="flex items-center gap-x-5">
              <Button to="/customer/list">Đóng</Button>
              <Button
                type="submit"
                className="flex items-center justify-center px-10 py-3 text-base font-semibold leading-4 text-white rounded-md disabled:opacity-50 disabled:pointer-events-none bg-primary"
                to={`/customer/update/${data?._id}`}
              >
                Chỉnh sửa
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CustomerDetail