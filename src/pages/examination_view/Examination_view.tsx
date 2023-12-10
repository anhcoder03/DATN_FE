import React, { useEffect, useState } from "react";
import Logo from "../../assets/logo-icon.png";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { getOneExamination } from "../../services/examination.service";
import { toast } from "react-toastify";
import moment from "moment";
import { getServiceByIdExam } from "../../services/designation.service";
import {
  getAllPrescription,
  getOnePrescription,
} from "../../services/prescription.service";
import PriceUtils from "../../helpers/PriceUtils";
import { calculateTotalPricePrescription } from "../../helpers/calculateTotalPrice";
const ReceptionPrint = styled.div`
  /* padding: 50px 100px; */
  background: #fff;
  color: #000;
  /* max-width:500px; */
  font-size: 24px;
  .head {
    margin-bottom: 30px;
    h1 {
      text-transform: uppercase;
      margin: 0;
      color: #000;
      margin-bottom: 10px;
      font-size: 45px;
      font-weight: 600;
    }
    h3 {
      color: #000;
      margin: 0;
      font-size: 35px;
      font-weight: 600;
    }
  }
  .title-print {
    padding: 30px 0;
    text-align: center;
    h1 {
      font-weight: 600;
      color: #000;
      font-size: 30px;
      text-transform: uppercase;
    }
    .clinic {
      font-weight: 600;
      color: #000;
      font-size: 50px;
    }
  }
  .line-head {
    width: 100%;
    margin: 35px auto;
    height: 1px;
    border-top: 2px dashed #333;
  }
  .print-info {
    text-align: center;
    font-size: 32px;
    text-transform: uppercase;
    font-weight: 900;
    .count {
      margin-bottom: 5px;
      font-size: 100px;
    }
  }
  .list-info {
    margin-top: 40px;
    .item {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      font-size: 24px;
      .value {
        font-weight: 600;
        margin-left: 5px;
      }
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  table {
    width: 100%;
  }
  th,
  td {
    font-size: 14px;
    padding: 10px 0;
    text-align: center;
  }

  table,
  td,
  th {
    border: 1px solid black;
  }
`;
const Examination_view = () => {
  const [data, setData] = useState<any>({});
  const [services, setServices] = useState<any[]>([]);
  const [prescription, setPrescription] = useState<any[]>([]);
  const { id } = useParams();
  useEffect(() => {
    if (id !== undefined) {
      loadData();
      getService();
      getPrescription();
    }
  }, [id]);
  async function loadData() {
    try {
      const response = await getOneExamination(id);
      const resData = response?.examination;
      setData({
        ...resData,
      });
    } catch (error) {
      toast.error("Đã có lỗi sảy ra!!!");
    }
  }
  async function getService() {
    try {
      const response = await getServiceByIdExam(id);
      const resData = response?.docs;
      setServices(resData);
    } catch (error) {
      toast.error("Đã có lỗi sảy ra!!!");
    }
  }
  async function getPrescription() {
    try {
      const response = await getAllPrescription({ search: id, limit: 20 });
      setPrescription(response.docs);
    } catch (error) {
      toast.error("Đã có lỗi sảy ra!!!");
    }
  }
  const getFullAddress = () => {
    const address: any[] = [
      `${
        data?.customerId?.detailedAddress
          ? `${data?.customerId?.detailedAddress},`
          : ""
      }${
        data?.customerId?.commune ? `${data?.customerId?.commune?.name}, ` : ""
      }${
        data?.customerId?.district
          ? `${data?.customerId?.district?.name}, `
          : ""
      }${
        data?.customerId?.province ? `${data?.customerId?.province?.name}` : ""
      }`,
    ];

    if (address.length > 0) {
      return address?.filter((e: any) => e != null)?.join(", ");
    } else {
      return "---";
    }
  };
  function formatCurrency(number: any) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(number);
  }
  console.log("data", data);
  console.log("services", services);
  console.log("prescription", prescription);

  return (
    <div style={{ position: "relative" }}>
      <div className="print-content reception-print">
        {/* THÔNG TIN PHIẾU KHÁM */}
        <ReceptionPrint
          style={{
            paddingLeft: 50,
            paddingRight: 50,
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          <div className="flex items-start justify-between my-4 pt-10">
            <div className="w-[70%] flex items-start gap-x-2 text-xs">
              <div>
                <img src={Logo} alt="" height="50" width={50} />
              </div>
              <div className="text-sm">
                <h3
                  className="text-[18px] font-semibold"
                  style={{ textTransform: "uppercase" }}
                >
                  Phòng khám Dr.Medipro
                </h3>
                <p>
                  Địa chỉ:{" "}
                  <span>
                    Số 3, Nguyễn Trãi, KP Đông Tân, TP Dĩ An, Bình Dương
                  </span>
                </p>
                <p>
                  Điện thoại: <span>1900 57 15 48</span>
                </p>
                <p>
                  Email: <span>nvtdMedipro@gmail.com</span>
                </p>
                <p>
                  Website: <span>https://mediro.com.vn</span>
                </p>
              </div>
            </div>
            <div>
              <p className="text-sm">
                <span>MÃ SỐ PK: {data._id}</span>
              </p>
            </div>
          </div>
          <div className="title-print">
            <h1 className="mb-3">PHIẾU KẾT QUẢ KHÁM BỆNH</h1>
          </div>

          <div className="text-sm mb-3">
            <div>
              <span>Họ và tên: </span>
              <span className="uppercase font-semibold pl-3">
                {data?.customerId?.name}
              </span>
            </div>
            <div>
              <span>Mã bệnh nhân: </span>
              <span className="uppercase font-semibold pl-3">
                {data?.customerId?._id}
              </span>
            </div>
            <div>
              <span>Số điện thoại: </span>
              <span className="uppercase font-semibold pl-3">
                {data?.customerId?.phone}
              </span>
            </div>
            <div>
              <span>Ngày sinh: </span>
              <span className="uppercase font-semibold pl-3">
                {data?.customerId?.dateOfBirth &&
                  moment(data?.customerId?.dateOfBirth).format("DD/MM/YYYY")}
              </span>
            </div>
            <div>
              <span>Giới tính: </span>
              <span className="uppercase font-semibold pl-3">
                {data?.customerId?.gender}
              </span>
            </div>
            <div>
              <span>Địa chỉ: </span>
              <span className="font-semibold">
                {`${data?.customerId?.detailedAddress} - ${data?.customerId?.commune?.name} - ${data?.customerId?.district?.name} - ${data?.customerId?.province?.name}`}
                <br />
                {getFullAddress()}
              </span>
            </div>
          </div>

          <div className="text-xs">
            <h1 className="uppercase mb-3 font-semibold text-sm">
              Thông tin khám bệnh
            </h1>
            <div>
              <span>Triệu chứng: </span>
              <span className="font-medium">{data?.symptom || "---"}</span>
            </div>

            <div>
              <span>Bệnh sử: </span>
              <span className="font-medium">
                {data?.medicalHistory || "---"}
              </span>
            </div>
          </div>

          <div>
            <h1 className="uppercase my-3 font-semibold text-sm">
              Các dịch vụ
            </h1>
            <table className="border border-black">
              <thead>
                <tr className="border border-black">
                  <th>Tên dịch vụ</th>
                  <th>Kết quả</th>
                </tr>
              </thead>
              {services.map((item) => {
                return (
                  <tbody>
                    <tr>
                      <td>{item?.service_examination?.name}</td>
                      <td>{item?.mainResults || "---"}</td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>

          <div className="my-3 flex flex-col gap-y-3 text-xs">
            <div>
              <span>
                Ngày giờ khám:{" "}
                <span className="font-semibold">
                  {moment(data?.day_running)
                    .subtract(24, "hours")
                    .add(7, "hours")
                    .format("hh:mm DD/MM/yyyy")}
                </span>
              </span>
            </div>
            <div>
              <span>
                Ngày giờ kết thúc:{" "}
                <span className="font-semibold">
                  {moment(data?.day_done)
                    .add(7, "hours")
                    .format("hh:mm DD/MM/yyyy")}
                </span>
              </span>
            </div>
            <div>
              <span>
                Chuẩn đoán:{" "}
                <span className="font-semibold">{data?.diagnostic}</span>
              </span>
            </div>
            <div>
              <span>
                Kết quả:{" "}
                <span className="font-semibold">
                  {data?.conclude}
                  Ung thu thật
                </span>
              </span>
            </div>
            <div>
              <span>
                Dặn dò:{" "}
                <span className="font-semibold">{data?.advice || "---"}</span>
              </span>
            </div>
          </div>

          <div className="flex mt-10 my-3 justify-end pb-10">
            <div>
              <h3 className="text-sm font-semibold">Ký xác nhận bác sĩ</h3>
              <p className="text-sm text-center">{data?.doctorId?.name}</p>
            </div>
          </div>
        </ReceptionPrint>
        {/* THÔNG TIN DỊCH VỤ CHỈ ĐỊNH */}
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
          }}
          className=""
        >
          {services.map((item: any) => {
            return (
              <ReceptionPrint
                style={{
                  paddingLeft: 50,
                  paddingRight: 50,
                  maxWidth: "900px",
                  margin: "0 auto",
                }}
              >
                <div className="flex items-start justify-between my-4 pt-10">
                  <div className="w-[70%] flex items-start gap-x-2 text-xs">
                    <div>
                      <img src={Logo} alt="" height="50" width={50} />
                    </div>
                    <div className="text-sm">
                      <h3
                        className="text-[18px] font-semibold"
                        style={{ textTransform: "uppercase" }}
                      >
                        Phòng khám Dr.Medipro
                      </h3>
                      <p>
                        Địa chỉ:{" "}
                        <span>
                          Số 3, Nguyễn Trãi, KP Đông Tân, TP Dĩ An, Bình Dương
                        </span>
                      </p>
                      <p>
                        Điện thoại: <span>1900 57 15 48</span>
                      </p>
                      <p>
                        Email: <span>nvtdMedipro@gmail.com</span>
                      </p>
                      <p>
                        Website: <span>https://mediro.com.vn</span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm">
                      <span>MÃ PHIẾU: {item?._id}</span>
                    </p>
                  </div>
                </div>
                <div className="title-print">
                  <h1 className="mb-3">DỊCH VỤ CHỈ ĐỊNH</h1>
                </div>

                <div className="text-sm mb-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <span>Tên khách hàng: </span>
                      <span className="uppercase font-semibold pl-3">
                        {item?.customerId?.name}
                      </span>
                    </div>
                    <div>
                      <span>Mã chứng từ: </span>
                      <span className="uppercase font-semibold pl-3">
                        {item?.examinationId}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span>Phòng Khám: </span>
                    <span className="uppercase font-semibold pl-3">
                      {item?.clinicId?.name}
                    </span>
                  </div>
                  <div>
                    <span>Bác sỹ: </span>
                    <span className="uppercase font-semibold pl-3">
                      {item?.doctorId?.name}
                    </span>
                  </div>
                  <div>
                    <span>Ngày tạo: </span>
                    <span className="uppercase font-semibold pl-3">
                      {item?.createdAt &&
                        moment(item?.createdAt).format("DD/MM/YYYY")}
                    </span>
                  </div>
                  <div>
                    <span>Giới tính: </span>
                    <span className="uppercase font-semibold pl-3">
                      {item?.customerId?.gender}
                    </span>
                  </div>
                  <div>
                    <span>Địa chỉ: </span>
                    <span className="font-semibold">
                      {`${data?.customerId?.detailedAddress} - ${data?.customerId?.commune?.name} - ${data?.customerId?.district?.name} - ${data?.customerId?.province?.name}`}
                      <br />
                      {getFullAddress()}
                    </span>
                  </div>
                </div>
                <div>
                  <h1 className="uppercase my-3 font-semibold text-sm">
                    Thông tin dịch vụ
                  </h1>
                  <table className="border border-black">
                    <thead>
                      <tr className="border border-black">
                        <th>Tên dịch vụ</th>
                        <th>Đơn giá</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border border-black">
                        <td>{item?.service_examination?.name}</td>
                        <td>
                          {formatCurrency(item?.service_examination?.price)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="text-sm">
                  <h1 className="uppercase mb-3 font-semibold text-sm pt-5">
                    Thông tin khám bệnh
                  </h1>
                  <div className="pb-5">
                    <span className="pb-5 block">Kết quả và kết luận: </span>
                    <span className="font-medium">{item?.mainResults}</span>
                  </div>
                </div>
                <div className="text-sm border-t-[2px]">
                  <div className="py-5">
                    <span className="font-medium text-red-600">
                      Tổng tiền:{" "}
                      {formatCurrency(item?.service_examination?.price)}
                    </span>
                  </div>
                </div>
                <div className="flex mt-10 my-3 justify-end pb-10">
                  <div>
                    <h3 className="text-sm font-semibold">
                      Ký xác nhận bác sĩ
                    </h3>
                    <p className="text-sm text-center">
                      {item?.doctorId?.name}
                    </p>
                  </div>
                </div>
              </ReceptionPrint>
            );
          })}
        </div>
        {/* THÔNG TIN PHIẾU THUỐC */}\
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
          }}
          className=""
        >
          {prescription.map((item) => {
            return (
              <ReceptionPrint
                style={{
                  paddingLeft: 50,
                  paddingRight: 50,
                  maxWidth: "900px",
                  margin: "0 auto",
                }}
              >
                <div className="flex items-start justify-between my-4 pt-10">
                  <div className="w-[70%] flex items-start gap-x-2 text-xs">
                    <div>
                      <img src={Logo} alt="" height="50" width={50} />
                    </div>
                    <div className="text-sm">
                      <h3
                        className="text-[18px] font-semibold"
                        style={{ textTransform: "uppercase" }}
                      >
                        Phòng khám Dr.Medipro
                      </h3>
                      <p>
                        Địa chỉ:{" "}
                        <span>
                          Số 3, Nguyễn Trãi, KP Đông Tân, TP Dĩ An, Bình Dương
                        </span>
                      </p>
                      <p>
                        Điện thoại: <span>1900 57 15 48</span>
                      </p>
                      <p>
                        Email: <span>nvtdMedipro@gmail.com</span>
                      </p>
                      <p>
                        Website: <span>https://mediro.com.vn</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="title-print">
                  <h1 className="mb-3">PHIẾU CÔNG KHAI LẤY THUỐC</h1>
                </div>

                <div className="text-sm mb-3">
                  <div>
                    <span>Họ và tên: </span>
                    <span className="uppercase font-semibold pl-3">
                      {item?.customerId?.name}
                    </span>
                  </div>
                  <div>
                    <span>Mã bệnh nhân: </span>
                    <span className="uppercase font-semibold pl-3">
                      {item?.customerId?._id}
                    </span>
                  </div>
                  <div>
                    <span>Số điện thoại: </span>
                    <span className="uppercase font-semibold pl-3">
                      {item?.customerId?.phone}
                    </span>
                  </div>
                  <div>
                    <span>Ngày sinh: </span>
                    <span className="uppercase font-semibold pl-3">
                      {item?.customerId?.dateOfBirth &&
                        moment(item?.customerId?.dateOfBirth).format(
                          "DD/MM/YYYY"
                        )}
                    </span>
                  </div>
                  <div>
                    <span>Giới tính: </span>
                    <span className="uppercase font-semibold pl-3">
                      {item?.customerId?.gender}
                    </span>
                  </div>
                  <div>
                    <span>Bác sỹ: </span>
                    <span className="font-semibold">
                      {item?.doctorId?.name}
                    </span>
                  </div>
                  <div>
                    <span>Địa chỉ: </span>
                    <span className="font-semibold">
                      {`${item?.customerId?.detailedAddress} - ${item?.customerId?.commune?.name} - ${item?.customerId?.district?.name} - ${item?.customerId?.province?.name}`}
                      <br />
                      {getFullAddress()}
                    </span>
                  </div>
                </div>

                <div className="text-xs">
                  <h1 className="uppercase mb-3 font-semibold text-sm">
                    Thông tin khám bệnh
                  </h1>
                  <div>
                    <span>Chẩn đoán: </span>
                    <span className="font-medium">
                      {item?.diagnostic || "---"}
                    </span>
                  </div>

                  <div>
                    <span>Lời dặn: </span>
                    <span className="font-medium">{item?.advice || "---"}</span>
                  </div>
                  <div>
                    <span>Chú thích: </span>
                    <span className="font-medium">{item?.note || "---"}</span>
                  </div>
                </div>

                <div>
                  <h1 className="uppercase my-3 font-semibold text-sm">
                    Thông tin thuốc bệnh nhân
                  </h1>

                  <table className="border border-black">
                    <thead>
                      <tr className="border border-black">
                        <th>Tên thuốc</th>
                        <th>Số lượng</th>
                        <th>Đơn vị bán</th>
                        <th>Đơn vị sử dụng</th>
                        <th>Ngày, tháng</th>
                        <th>Đơn giá</th>
                        <th>Thành tiền</th>
                      </tr>
                    </thead>
                    {item?.medicines.map((item: any) => {
                      return (
                        <tbody>
                          <tr className="border border-black">
                            <td>{item?.medicineId?.name}</td>
                            <td>{item?.quantity}</td>
                            <td>{item?.unit_selling}</td>
                            <td>{item?.unit_using}</td>
                            <td>04/06/2023</td>
                            <td>{formatCurrency(item?.medicineId?.price)}</td>
                            <td>
                              {PriceUtils.format(
                                item?.medicineId?.price * item?.quantity
                              )}
                            </td>
                          </tr>
                        </tbody>
                      );
                    })}
                  </table>
                </div>
                <div className="text-sm border-t-[2px]">
                  <div className="py-5">
                    <span className="font-medium text-red-600">
                      Tổng tiền:{" "}
                      {formatCurrency(
                        calculateTotalPricePrescription(prescription)
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex mt-10 my-3 justify-end pb-10">
                  <div>
                    <h3 className="text-sm font-semibold">
                      Ký xác nhận bác sĩ
                    </h3>
                    <p className="text-sm text-center">
                      {item?.doctorId?.name}
                    </p>
                  </div>
                </div>
              </ReceptionPrint>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Examination_view;
