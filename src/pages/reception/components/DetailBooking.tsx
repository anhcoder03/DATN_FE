import React, { useEffect, useState } from "react";
import { Layout } from "../../../components/layout";
import Heading from "../../../components/common/Heading";
import { Button } from "../../../components/button";
import { Row } from "../../../components/row";
import { Field } from "../../../components/field";
import { Label } from "../../../components/label";
import { Input } from "../../../components/input";
import { useForm } from "react-hook-form";
import { IconPhone } from "../../../components/icons";
import moment from "moment";
import IconCalendar from "../../../assets/images/icon/ic_calendar-black.svg";
import CalcUtils from "../../../helpers/CalcULtils";
import { getAllCustomer } from "../../../services/customer.service";
import { getAllStaff } from "../../../services/staff.service";
import { Textarea } from "../../../components/textarea";
import { getOneExamination } from "../../../services/examination.service";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const DetailBooking = () => {
  const [dataCustomers, setDataCustomers] = useState<any[]>([]);
  const [staffs, setStaffs] = useState<any[]>([]);
  const [data, setData] = useState<any>();
  const {
    control,
    handleSubmit
  } = useForm({});
  const {id} = useParams();
  useEffect(() => {
    getCustomers();
    getStaffs();
  }, [])
  useEffect(() => {
    if(id !== undefined) {
      loadData()
    }
  },[id])
  async function getCustomers() {
    const response = await getAllCustomer({ _limit: 3000 });
    const ListArr: any = [];
    response?.docs?.map((e: any) => {
      ListArr?.push({
        ...e,
        value: e?._id,
        label: `${e?.name} - ${e?.phone}`,
      });
    });
    setDataCustomers(ListArr);
  }
  async function getStaffs() {
    const response = await getAllStaff({ name: "Nhân viên tiếp đón" });
    const ListArr: any = [];
    response?.map((e: any) => {
      ListArr?.push({
        ...e,
        value: e?._id,
        label: e?.name,
      });
    });
    setStaffs(ListArr);
  }
  async function loadData() {
    try {
      const response = await getOneExamination(id);
      const resData = response.medicine;
      setData({
        customer: resData?.customer,
        dateOfBirth: resData?.customerId?.dateOfBirth,
        gender: resData?.customerId?.gender,
        phone: resData?.customerId?.phone,
        note: resData?.note,
        staffId: resData?.staffId,
        day_booking: resData?.day_booking
      });
    } catch (error) {
      toast.error('Đã có lỗi sảy ra!!!')
    }
  }
  const handleChangeStatus = async () => {
    const params = {
      status : 'reception'
    }

  }
  return (
    <Layout>
      <div className="relative h-full only-view">
        <Heading>Đặt trước lịch khám, Tư vấn</Heading>
        <form className="w-[70%] p-5 bg-white ">
          <Heading>Thông tin bệnh nhân</Heading>
          <Row className="grid-cols-2 ">
            <Field>
              <Label htmlFor="_id">
                <span className="star-field">*</span>
                Họ và tên khách hàng/bệnh nhân
              </Label>
              <Input
                control={control}
                placeholder="Nhập mã khách hàng"
                value={data?.customer?.name}
              />
            </Field>
            <Field>
              <Label htmlFor="gender">Giới tính</Label>
              <Input
                control={control}
                placeholder="Nhập giới tính"
                value={data?.gender}
              />
            </Field>
          </Row>
          <Row className="grid-cols-2 ">
            <Field>
              <Label htmlFor="phone">
                <span className="star-field">*</span>
                Số điện thoại
              </Label>
              <Input
                control={control}
                name="phone"
                value={data?.phone}
                placeholder="Nhập số điện thoại"
              >
                <div className="p-2 bg-white">
                  <IconPhone></IconPhone>
                </div>
              </Input>
            </Field>
            <Field>
              <Label htmlFor="_id">Ngày đặt lịch</Label>
              <div className="relative pb-3">
                <Input
                  control={control}
                  name="phone"
                  value={moment(data?.dateOfBirth).format('DD/MM/YYYY')}
                  placeholder="Nhập ngày đặt lịch"
                />
                <div className="absolute top-0 right-0">
                  <img src={IconCalendar} alt="icon" />
                </div>
              </div>
            </Field>
          </Row>
          <Row className="grid-cols-2 ">
            <Field>
              <Label htmlFor="_id">Năm sinh</Label>
              <div className="relative pb-3">
                <Input
                  control={control}
                  name="phone"
                  value={moment(data?.day_booking).format('DD/MM/YYYY')}
                  placeholder="Nhập năm sinh"
                />
                <div className="absolute top-0 right-0">
                  <img src={IconCalendar} alt="icon" />
                </div>
              </div>
            </Field>
            <Field>
              <Label htmlFor="">Tuổi</Label>
              <Input
                control={control}
                className="border-none"
                name="date"
                value={
                  data?.dateOfBirth
                    ? CalcUtils.calculateAge(data?.dateOfBirth)
                    : "---"
                }
              />
            </Field>
          </Row>
          <Row className="grid-cols-2 ">
            <Field>
              <Label htmlFor="staffId">Nhân viên tiếp đón</Label>
              <Input
                control={control}
                name="phone"
                value={data?.staffId?.name}
                placeholder="Chọn nhân viên"
              />
            </Field>
            <Field>
              <Label htmlFor="note">Ghi chú</Label>
              <Textarea
                control={control}
                className="outline-none input-primary"
                name="note"
                placeholder="Nhập ghi chú"
                onChange={(val: any) => {
                  setData({
                    ...data,
                    note: val
                  })
                }}
                value={data?.note}
              />
            </Field>
          </Row>
        </form>
        <div className="fixed bottom-0  py-5 bg-white left-[251px] shadowSidebar right-0">
          <div className="flex justify-end w-full px-5">
            <div className="flex items-center gap-x-5">
              <Button to="/reception">Đóng</Button>
              <Button
                type="submit"
                className="flex items-center justify-center px-10 py-3 text-base font-semibold leading-4 text-white rounded-md disabled:opacity-50 disabled:pointer-events-none bg-primary"
                // to={`/reception/booking/update/${id}`}
                onClick={() => toast.warning('BE chưa có làm:">>>')}
              >
                Chỉnh sửa
              </Button>
              <Button
                type="submit"
                className="flex items-center justify-center px-10 py-3 text-base font-semibold leading-4 text-white rounded-md disabled:opacity-50 disabled:pointer-events-none btn-info"
                // onClick={handleSubmit(handleChangeStatus)}
                onClick={() => toast.info('chờ leader')}
              >
                Tiếp đón
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DetailBooking;
