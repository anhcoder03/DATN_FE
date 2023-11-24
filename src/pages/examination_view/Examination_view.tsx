import React from "react";
import Logo from "../../assets/logo-icon.png";
import styled from "styled-components";
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
  return (
    <div style={{ position: "relative" }}>
      <div className="print-content reception-print">
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
                <span>MÃ SỐ PK: PK_200122313</span>
              </p>
            </div>
          </div>
          <div className="title-print">
            <h1 className="mb-3">PHIẾU KẾT QUẢ KHÁM BỆNH ONLINE</h1>
          </div>

          <div className="text-sm mb-3">
            <div>
              <span>Họ và tên: </span>
              <span className="uppercase font-semibold pl-3">
                Nguyễn Hồng Sơn
              </span>
            </div>
            <div>
              <span>Mã bệnh nhân: </span>
              <span className="uppercase font-semibold pl-3">PH20433</span>
            </div>
            <div>
              <span>Số điện thoại: </span>
              <span className="uppercase font-semibold pl-3">0384707136</span>
            </div>
            <div>
              <span>Ngày sinh: </span>
              <span className="uppercase font-semibold pl-3">
                {/* {dataPrint?.customerId?.dateOfBirth &&
                  moment(dataPrint?.customerId?.dateOfBirth).format(
                    "DD/MM/YYYY"
                  )} */}
                04/06/2003
              </span>
            </div>
            <div>
              <span>Giới tính: </span>
              <span className="uppercase font-semibold pl-3">
                {/* {dataPrint?.customerId?.gender} */}
                Nam
              </span>
            </div>
            <div>
              <span>Địa chỉ: </span>
              <span className="font-semibold">
                {/* {`${dataPrint?.customerId?.detailedAddress} - ${dataPrint?.customerId?.commune?.name} - ${dataPrint?.customerId?.district?.name} - ${dataPrint?.customerId?.province?.name}`} */}
                {/* {getFullAddress()} */}
                Hưng Đạo, Đông Lỗ, Hiệp Hòa, Bắc Giang
              </span>
            </div>
          </div>

          <div className="text-xs">
            <h1 className="uppercase mb-3 font-semibold text-sm">
              Thông tin khám bệnh
            </h1>
            <div>
              <span>Triệu chứng: </span>
              <span className="font-medium">Cảm cúm</span>
            </div>

            <div>
              <span>Bệnh sử: </span>
              <span className="font-medium">
                {/* {dataPrint?.medicalHistory || "---"} */}
                Đau ốm suốt ngày
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
              <tbody>
                <tr className="border border-black">
                  <td>Khám cổ</td>
                  <td>Khám tym</td>
                </tr>
                <tr className="border border-black">
                  <td>Khám cổ</td>
                  <td>Khám tym</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="my-3 flex flex-col gap-y-3 text-xs">
            <div>
              <span>
                Ngày giờ khám:{" "}
                <span className="font-semibold">
                  {/* {moment(dataPrint?.day_running)
                    .subtract(24, "hours")
                    .add(7, "hours")
                    .format("hh:mm DD/MM/yyyy")} */}
                  04/06/2003
                </span>
              </span>
            </div>
            <div>
              <span>
                Ngày giờ kết thúc:{" "}
                <span className="font-semibold">
                  {/* {moment(dataPrint?.day_done)
                    .add(7, "hours")
                    .format("hh:mm DD/MM/yyyy")} */}
                  04/06/2003
                </span>
              </span>
            </div>
            <div>
              <span>
                Chuẩn đoán:{" "}
                <span className="font-semibold">Ung thu giai đoạn cuối</span>
              </span>
            </div>
            <div>
              <span>
                Kết quả:{" "}
                <span className="font-semibold">
                  {/* {dataPrint?.conclude} */}
                  Ung thu thật
                </span>
              </span>
            </div>
            <div>
              <span>
                Dặn dò:{" "}
                <span className="font-semibold">
                  {/* {dataPrint?.advice || "---"} */}
                  Uống nhiều bia rượu lên
                </span>
              </span>
            </div>
          </div>

          <div className="flex mt-10 my-3 justify-center pb-10">
            <div>
              <h3 className="text-sm font-semibold">Ký xác nhận bác sĩ</h3>
              <p className="text-sm text-center">
                {/* {dataPrint?.doctorId?.name} */}
                Nguyễn Hồng Sơn
              </p>
            </div>
          </div>
        </ReceptionPrint>
      </div>
    </div>
  );
};

export default Examination_view;
