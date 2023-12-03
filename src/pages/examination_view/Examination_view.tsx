import React from "react";
import Logo from "../../assets/logo-icon.png";
import styled from "styled-components";
import { useParams } from "react-router-dom";
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
  const { id } = useParams();

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

          <div className="flex mt-10 my-3 justify-end pb-10">
            <div>
              <h3 className="text-sm font-semibold">Ký xác nhận bác sĩ</h3>
              <p className="text-sm text-center">
                {/* {dataPrint?.doctorId?.name} */}
                Nguyễn Hồng Sơn
              </p>
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
                  <span>MÃ PHIẾU: PK_200122313</span>
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
                    Nguyễn Hồng Sơn
                  </span>
                </div>
                <div>
                  <span>Mã chứng từ: </span>
                  <span className="uppercase font-semibold pl-3">
                    PK-00000004
                  </span>
                </div>
              </div>
              <div>
                <span>Phòng Khám: </span>
                <span className="uppercase font-semibold pl-3">433</span>
              </div>
              <div>
                <span>Bác sỹ: </span>
                <span className="uppercase font-semibold pl-3">
                  Nguyễn Hồng Sơn
                </span>
              </div>
              <div>
                <span>Ngày tạo: </span>
                <span className="uppercase font-semibold pl-3">04/06/2003</span>
              </div>
              <div>
                <span>Giới tính: </span>
                <span className="uppercase font-semibold pl-3">Nam</span>
              </div>
              <div>
                <span>Địa chỉ: </span>
                <span className="font-semibold">
                  Hưng Đạo, Đông Lỗ, Hiệp Hòa, Bắc Giang
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
                    <td>Khám cổ</td>
                    <td>250.000đ</td>
                  </tr>
                  <tr className="border border-black">
                    <td>Khám cổ</td>
                    <td>250.000đ</td>
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
                <span className="font-medium">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Id
                  quos, ullam facere debitis et inventore natus ratione? Fuga
                  minus totam vel excepturi libero, ad tenetur sapiente et
                  blanditiis, eos cupiditate fugit adipisci provident nulla!
                  Error fugit perferendis, ut, totam itaque quae quam labore,
                  sapiente eum aliquid ipsa autem ipsam? Illo cumque ea
                  distinctio nemo asperiores facilis iure sit excepturi totam
                  tenetur quibusdam, omnis at quae? Quod necessitatibus
                  inventore accusamus omnis hic cum quia iure deserunt ea
                  facilis enim eum quis consequatur ipsa, distinctio, delectus
                  voluptas dolor fugiat quasi eaque repellendus tenetur labore?
                  Hic fugiat, corporis commodi deserunt reprehenderit id atque.
                </span>
              </div>
            </div>
            <div className="text-sm border-t-[2px]">
              <div className="py-5">
                <span className="font-medium text-red-600">
                  Tổng tiền: 150.000đ
                </span>
              </div>
            </div>
            <div className="flex mt-10 my-3 justify-end pb-10">
              <div>
                <h3 className="text-sm font-semibold">Ký xác nhận bác sĩ</h3>
                <p className="text-sm text-center">Nguyễn Hồng Sơn</p>
              </div>
            </div>
          </ReceptionPrint>
        </div>
        {/* THÔNG TIN PHIẾU THUỐC */}\
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
          }}
          className=""
        >
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
                <span>Bác sỹ: </span>
                <span className="font-semibold">
                  {/* {`${dataPrint?.customerId?.detailedAddress} - ${dataPrint?.customerId?.commune?.name} - ${dataPrint?.customerId?.district?.name} - ${dataPrint?.customerId?.province?.name}`} */}
                  {/* {getFullAddress()} */}
                  Nguyễn Hồng Sơn
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
                <span>Chẩn đoán: </span>
                <span className="font-medium">Cảm cúm</span>
              </div>

              <div>
                <span>Lời dặn: </span>
                <span className="font-medium">
                  {/* {dataPrint?.medicalHistory || "---"} */}
                  Đau ốm suốt ngày
                </span>
              </div>
              <div>
                <span>Chú thích: </span>
                <span className="font-medium">
                  {/* {dataPrint?.medicalHistory || "---"} */}
                  Đau ốm suốt ngày
                </span>
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
                    <th>Đơn vị</th>
                    <th>Ngày, tháng</th>
                    <th>Đơn giá</th>
                    <th>Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border border-black">
                    <td>Thuốc ho</td>
                    <td>5</td>
                    <td>Gói</td>
                    <td>04/06/2023</td>
                    <td>40.000đ</td>
                    <td>200.000đ</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex mt-10 my-3 justify-end pb-10">
              <div>
                <h3 className="text-sm font-semibold">Ký xác nhận bác sĩ</h3>
                <p className="text-sm text-center">
                  {/* {dataPrint?.doctorId?.name} */}
                  Nguyễn Hồng Sơn
                </p>
              </div>
            </div>
          </ReceptionPrint>
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
                <span>Bác sỹ: </span>
                <span className="font-semibold">
                  {/* {`${dataPrint?.customerId?.detailedAddress} - ${dataPrint?.customerId?.commune?.name} - ${dataPrint?.customerId?.district?.name} - ${dataPrint?.customerId?.province?.name}`} */}
                  {/* {getFullAddress()} */}
                  Nguyễn Hồng Sơn
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
                <span>Chẩn đoán: </span>
                <span className="font-medium">Cảm cúm</span>
              </div>

              <div>
                <span>Lời dặn: </span>
                <span className="font-medium">
                  {/* {dataPrint?.medicalHistory || "---"} */}
                  Đau ốm suốt ngày
                </span>
              </div>
              <div>
                <span>Chú thích: </span>
                <span className="font-medium">
                  {/* {dataPrint?.medicalHistory || "---"} */}
                  Đau ốm suốt ngày
                </span>
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
                    <th>Đơn vị</th>
                    <th>Ngày, tháng</th>
                    <th>Đơn giá</th>
                    <th>Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border border-black">
                    <td>Thuốc ho</td>
                    <td>5</td>
                    <td>Gói</td>
                    <td>04/06/2023</td>
                    <td>40.000đ</td>
                    <td>200.000đ</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex mt-10 my-3 justify-end pb-10">
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
    </div>
  );
};

export default Examination_view;
