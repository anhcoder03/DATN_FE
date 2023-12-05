import moment from "moment";
import styled from "styled-components";
import Logo from "../../assets/logo-icon.png";
import React, { useState, useEffect } from 'react';
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

const Printprescription = ({ componentRef, dataPrint , check }: any) => {
  const [dataPrints, setDataPrints] = useState<any>();
  console.log(dataPrint, "dataPrintSSSS");
  useEffect(() => {
    if (check) {
      setDataPrints([dataPrint]);
    } else {
      setDataPrints(dataPrint);
    }
  }, [dataPrint, check]);
  const getFullAddress = () => {
    const address: any[] = [
      `${dataPrint?.customerId?.detailedAddress
        ? `${dataPrint?.customerId?.detailedAddress},`
        : ""
      }${dataPrint?.customerId?.commune
        ? `${dataPrint?.customerId?.commune?.name}, `
        : ""
      }${dataPrint?.customerId?.district
        ? `${dataPrint?.customerId?.district?.name}, `
        : ""
      }${dataPrint?.customerId?.province
        ? `${dataPrint?.customerId?.province?.name}`
        : ""
      }`,
    ];

    if (address.length > 0) {
      return address?.filter((e: any) => e != null)?.join(", ");
    } else {
      return "---";
    }
  };

  return (
    <div style={{ position: "relative" }} className="hidden">
      <div className="print-content reception-print" ref={componentRef}>
        <ReceptionPrint style={{ paddingLeft: 50, paddingRight: 50 }}>
          <div className="flex items-start justify-between my-4">
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
          {dataPrints?.map((data: any) => (
            <div>
              <div className="title-print">
                <h1 className="mb-3">ĐƠN ThUỐC {data?._id}</h1>
              </div>
              <div className="text-sm mb-3">
                <div>
                  <span>Họ và tên: </span>
                  <span className="uppercase font-semibold pl-3">
                    {data?.medicalExaminationSlipId?.customer?.name}
                  </span>
                </div>
                <div>
                  <span>Mã bệnh nhân: </span>
                  <span className="uppercase font-semibold pl-3">
                    {data?.medicalExaminationSlipId?.customer?._id}
                  </span>
                </div>
                <div>
                  <span>Số điện thoại: </span>
                  <span className="uppercase font-semibold pl-3">
                    {data?.medicalExaminationSlipId?.customer?.phone}
                  </span>
                </div>
                {/* <div>
                  <span>Ngày sinh: </span>
                  <span className="uppercase font-semibold pl-3">
                    {data?.customerId?.dateOfBirth &&
                      moment(data?.customerId?.dateOfBirth).format(
                        "DD/MM/YYYY"
                      )}
                  </span>
                </div> */}
                <div>
                  <span>Giới tính: </span>
                  <span className="uppercase font-semibold pl-3">
                    {data?.customerId?.gender}
                  </span>
                </div>
                <div>
                  <span>Địa chỉ: </span>
                  <span className="font-semibold">
                    {/* {`${data?.customerId?.detailedAddress} - ${data?.customerId?.commune?.name} - ${data?.customerId?.district?.name} - ${data?.customerId?.province?.name}`} */}
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
                  <span className="font-medium">{data?.medicalExaminationSlipId?.symptom || "---"}</span>
                </div>
                <br />
                <div>
                  <span>Bệnh sử: </span>
                  <span className="font-medium">
                    {data?.medicalExaminationSlipId?.medicalHistory || "---"}
                  </span>
                </div>
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
                    <span className="font-semibold">{data?.medicalExaminationSlipId?.note}</span>
                  </span>
                </div>
                <div>
                  <span>
                    Ghi chú :{" "}
                    <span className="font-semibold">{data?.diagnostic}</span>
                  </span>
                </div>
                <div>
                  <span>
                    Dặn dò:{" "}
                    <span className="font-semibold">
                      {data?.advice || "---"}
                    </span>
                  </span>
                </div>
                <div>
                  <span >
                    <span style={{ fontStyle: 'italic', fontWeight: "bold" }}>Kê đơn thuốc</span>:{
                      data?.medicines?.map((med: any, index: any) =>
                        <div className="mt-2" key={index + 1} >
                          <h2 style={{ fontWeight: "bold", fontStyle: 'italic' }} className="">{index + 1} / {med?.medicineId?.name}</h2>
                          <h4 className="mt-1">{med?.dosage + med?.unit_using}/lần - {med?.timesUsePerDay}lần/ngày - {med?.how_using}</h4>
                        </div>
                      )
                    }
                    {/* <span className="font-semibold">
                      {data?.advice || "---"}
                    </span> */}
                  </span>
                </div>
              </div>
              <div className="flex mt-10 my-3 justify-center">
                <div>
                  <h3 className="text-sm font-semibold ml-3">Ký xác nhận bác sĩ</h3>
                  <p className="text-sm text-center mt-5">
                    <span>{data?.doctorId?.name}</span> <br /> <br />
                  </p>
                </div>
              </div>
              <div style={{fontSize : "13px"}} className="text-sm text-center mt-5"><span>Xin cảm ơn Quý Khách đã lựa chọn dịch vụ y tế của chúng tôi!</span></div>
            </div>
          ))}
        </ReceptionPrint>
      </div>
    </div>
  );
};

export default Printprescription
