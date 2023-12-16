import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getOneCustomer } from "../../../services/customer.service";
import { Layout } from "../../../components/layout";
import { Input } from "../../../components/input";
import { Label } from "../../../components/label";
import { Row } from "../../../components/row";
import Heading from "../../../components/common/Heading";
import { Field } from "../../../components/field";
import { IconPhone } from "../../../components/icons";
import { Button } from "../../../components/button";
import { useForm } from "react-hook-form";
import moment from "moment";
import CalcUtils from "../../../helpers/CalcULtils";
import { getAllExamination } from "../../../services/examination.service";
const CustomerDetail = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>();
  const [date, setDate] = useState<any>();
  const [historyExams, setHistoryExams] = useState<any[]>([]);
  const { id } = useParams();
  useEffect(() => {
    loadData(id);
    handleGetHistoryExaminations();
  }, [id]);

  type TDataCustomer = {
    _id?: string;
    name: string;
    gender: string;
    province: number;
    district: number;
    commune: number;
    dateOfBirth: Date;
  };

  const loadData = async (id: any) => {
    try {
      setLoading(true);
      const data: any = await getOneCustomer(id);
      setLoading(false);
      reset(data);
      setValue("province", data?.province?.name);
      setValue("commune", data?.commune?.name);
      setValue("district", data?.district?.name);
      setDate(data?.dateOfBirth);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleGetHistoryExaminations = async () => {
    const data = await getAllExamination({ search: id, status: "done" });
    console.log(data);
    setHistoryExams(data?.docs);
  };
  const { control, setValue, reset } = useForm<TDataCustomer>({});
  return (
    <Layout>
      <div className="relative h-full only-view">
        <Heading>Chi tiết khách hàng</Heading>
        <div className="flex gap-x-5">
          <form className="w-1/2 flex flex-col gap-y-6 p-5 bg-white rounded-lg ">
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
                  value={moment(date).format("DD/MM/YYYY")}
                  name="dateOfBirth"
                />
              </Field>
              <Field>
                <Label htmlFor="">Tuổi</Label>
                <Input
                  control={control}
                  name="date"
                  value={CalcUtils.calculateAge(date)}
                />
              </Field>
            </Row>
            <Row>
              <Field>
                <Label htmlFor="gender">Giới tính</Label>
                <Input
                  control={control}
                  name="gender"
                  placeholder="Nhập gender"
                />
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
                <Input
                  control={control}
                  name="email"
                  placeholder="Nhập Email"
                />
              </Field>
            </Row>
            <Row>
              <Field>
                <Label htmlFor="province"><span className="star-field">*</span>Tỉnh/ Thành phố</Label>
                <Input
                  control={control}
                  name="province"
                  placeholder="Nhập province"
                />
              </Field>
              <Field>
                <Label htmlFor="district"><span className="star-field">*</span>Quận/Huyện</Label>
                <Input
                  control={control}
                  name="district"
                  placeholder="Nhập district"
                />
              </Field>
              <Field>
                <Label htmlFor="commune"><span className="star-field">*</span>Xã/Phường</Label>
                <Input
                  control={control}
                  name="commune"
                  placeholder="Nhập commune"
                />
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
            <Row className="grid-cols-3">
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
                <Input
                  control={control}
                  name="note"
                  placeholder="Nhập ghi chú"
                />
              </Field>
            </Row>
          </form>
          <div className="p-5 bg-white w-1/2 rounded-lg">
            <Heading>Lịch sử khám</Heading>
            <table className="w-full custom-table">
              <thead className="bg-[#f4f6f8] text-sm">
                <th>Thời gian</th>
                <th>Nhân viên tiếp đón</th>
                <th>Hành động</th>
              </thead>
              <tbody>
                {historyExams?.map((item, index) => (
                  <tr className="hover:bg-transparent" key={`active-${index}`}>
                    <td>
                      {moment(item?.createdAt).format("hh:mm DD/MM/YYYY")}
                    </td>
                    <td>{item?.staffId?.name}</td>
                    <td>
                      <Link
                        to={`/examination/${item?._id}`}
                        className="text-[#6f42c1] font-semibold"
                      >
                        Xem
                      </Link>
                    </td>
                  </tr>
                ))}
                {historyExams?.length == 0 ||
                  (!historyExams && (
                    <tr>
                      <td colSpan={3} className="hover:bg-white">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            minHeight: 40,
                          }}
                          className="flex-col p-16"
                        >
                          <img
                            src="https://nutricms.staging.zsolution.vn/static/media/ic_row-empty.80f5a3dd.svg"
                            alt=""
                            className="h-full min-h-[350px] "
                          />
                          Không có dữ liệu!
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
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
  );
};

export default CustomerDetail;
