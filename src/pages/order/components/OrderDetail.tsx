import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "../../../components/layout";
import Heading from "../../../components/common/Heading";
import { getOneOrder } from "../../../services/order.service";
import { Row } from "../../../components/row";
import { Field } from "../../../components/field";
import { Label } from "../../../components/label";
import { Input } from "../../../components/input";
import { useForm } from "react-hook-form";
import { PAYMENT_METHOD } from "../../../constants/define";
import { Spin } from "antd";
import LoadingPage from "../../../components/common/LoadingPage";

type Props = {};

const OrderDetail = () => {
  const { control, setValue, reset } = useForm<any>({});
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [order, setOrders] = useState<any>();

  useEffect(() => {
    loadData(id);
  }, [id]);

  const loadData = async (id: any) => {
    try {
      setLoading(true);
      const data: any = await getOneOrder(id);
      setLoading(false);
      // reset(data);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Hàm chuyển đổi số thành chuỗi tiền tệ Việt Nam
  function formatCurrency(number: any) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(number);
  }

  const totalPrice = order?.medicines?.reduce(
    (accumulator: any, currentValue: any) => {
      return accumulator + currentValue.price;
    },
    0
  );
  return (
    <Spin spinning={loading} indicator={<LoadingPage />}>
      <Layout>
        <div className="relative h-full">
          <Heading>Xem chi tiết đơn hàng #{id}</Heading>
          <div className="flex space-x-10">
            <div className="w-1/2 p-4 bg-white rounded-lg">
              <Heading>Thông tin khách hàng</Heading>
              <Row>
                <Field className={"only-view"}>
                  <Label className="font-semibold" htmlFor="phone">
                    <span className="star-field">*</span>
                    Khách hàng
                  </Label>
                  <Input
                    control={control}
                    placeholder=""
                    className="!border-transparent font-semibold text-black "
                    value={order?.customerId?.name}
                  ></Input>
                </Field>
                <Field>
                  <Label className="font-semibold" htmlFor="_id">
                    <span className="star-field">*</span>
                    Mã khách hàng
                  </Label>
                  <Input
                    control={control}
                    className="border-none font-semibold text-black"
                    value={order?.customerId?._id}
                  />
                </Field>
                <Field>
                  <Label className="font-semibold" htmlFor="_id">
                    <span className="star-field">*</span>
                    Số điện thoại
                  </Label>
                  <Input
                    control={control}
                    className="border-none font-semibold text-black"
                    value={order?.customerId?._id}
                  />
                </Field>
              </Row>
            </div>

            <div className="w-1/2 p-4 bg-white rounded-lg ">
              <Heading>Thông tin thanh toán</Heading>
              <Row>
                <Field className={"only-view"}>
                  <Label className="font-semibold" htmlFor="phone">
                    <span className="star-field w-80">*</span>
                    Trạng thái thanh toán
                  </Label>
                  <Input
                    control={control}
                    placeholder=""
                    className="!border-transparent font-semibold text-black "
                    value={
                      order?.paymentMethod == 1 ? "Chuyển khoản" : "Tiền mặt"
                    }
                  ></Input>
                </Field>
                <Field>
                  <Label className="font-semibold" htmlFor="_id">
                    <span className="star-field">*</span>
                    Tổng tiền đơn hàng
                  </Label>
                  <Input
                    control={control}
                    className="border-none font-semibold text-black"
                    value={formatCurrency(order?.totalAmount)}
                  />
                </Field>
              </Row>
            </div>
          </div>
          <div className="w-full mt-5 p-4 bg-white rounded-lg ">
            <Heading>Sản Phẩm</Heading>
            <table className="w-full custom-table">
              <thead className="bg-[#f4f6f8] text-sm">
                <th style={{ width: "5%" }}>STT</th>
                <th style={{ width: "20%" }}>Tên thuốc</th>
                <th style={{ width: "10%" }}>Ảnh</th>
                <th style={{ width: "10%" }}>Số lượng</th>
                <th style={{ width: "20%" }}>Đơn vị bán</th>
                <th style={{ width: "20%" }}>Thành tiền</th>
                <th style={{ width: "20%" }}>Ghi chú</th>
              </thead>
              <tbody>
                {order?.medicines?.map((item: any, index: any) => (
                  <tr className="hover:bg-transparent">
                    <td>{index + 1}</td>
                    <td>
                      <Input
                        control={control}
                        placeholder="0"
                        value={item?.medicineId?.name}
                        className="border font-semibold text-black rounded-md px-3 mb-1"
                      />
                    </td>
                    <td>
                      <img src={item?.medicineId?.image} alt="" />
                    </td>
                    <td>
                      <Input
                        control={control}
                        placeholder="0"
                        value={item?.quantity}
                        className="w-20 border font-semibold text-black rounded-md px-3 mb-1"
                      />
                    </td>
                    <td>
                      <Input
                        control={control}
                        placeholder="0"
                        value={formatCurrency(item?.medicineId?.price)}
                        className="border font-semibold text-black rounded-md px-3 mb-1"
                      />
                    </td>
                    <td>
                      <Input
                        control={control}
                        placeholder="0"
                        value={formatCurrency(item?.price)}
                        className="border-none font-semibold text-black"
                      />
                    </td>
                    <td>
                      <Input
                        control={control}
                        value={item?.note ?? "---"}
                        className="border-none font-semibold text-black"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    </Spin>
  );
};

export default OrderDetail;
