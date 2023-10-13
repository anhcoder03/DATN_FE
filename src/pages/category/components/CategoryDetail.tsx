import React from 'react'
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createCategory } from "../../../services/category.service";
import { Button } from "../../../components/button";
import { Layout } from "../../../components/layout";
import { Input } from "../../../components/input";
import { useForm } from "react-hook-form";
import { Field } from "../../../components/field";
import { Label } from "../../../components/label";
import { Row } from "../../../components/row";
import NotImage from '../../../assets/images/users/no-img.jpg';
import Heading from "../../../components/common/Heading";
import { yupResolver } from '@hookform/resolvers/yup';
const CategoryDetail = () => {
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
      } = useForm<any>({
        resolver: yupResolver<any>(true),
        mode: "onSubmit",
      });
  return (
    <Layout>
      <div className="relative h-full">
        <Heading>Thêm danh mục </Heading>
        <form
          className="w-full p-5 bg-white "
          // onSubmit={handleSubmit(handleCreateCustomer)}
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
            <Label className="tee-file-preview" htmlFor="image">
              <img 
                src={NotImage}
              />
              <div className="tee-file-hover">
                  <span><i className="ti-reload" /> Thay đổi</span> 
              </div> 
              <input 
              // onChange={_onChangeImage}
               accept="image/png, image/gif, image/jpeg" className="tee-file-input" name="image" type="file" id="image" /> 
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
                // onClick={handleSubmit(handleCreateCustomer)}
              >
                Lưu
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CategoryDetail