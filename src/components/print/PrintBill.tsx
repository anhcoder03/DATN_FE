import styled from "styled-components";
import Logo from "../../assets/logo-icon.png";
import PriceUtils from "../../helpers/PriceUtils";
import {
  calculateTotalPrice,
  calculateTotalPriceNoFomat,
  readNumberToVietnameseWords,
} from "../../helpers/calculateTotalPrice";
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

const PrintBill = ({ componentRef, dataPrint }: any) => {
  const getFullAddress = () => {
    const address: any[] = [
      `${
        dataPrint?.customerId?.detailedAddress
          ? `${dataPrint?.customerId?.detailedAddress},`
          : ""
      }${
        dataPrint?.customerId?.commune
          ? `${dataPrint?.customerId?.commune?.name}, `
          : ""
      }${
        dataPrint?.customerId?.district
          ? `${dataPrint?.customerId?.district?.name}, `
          : ""
      }${
        dataPrint?.customerId?.province
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
            <div>
              <p className="text-sm">
                <span>MÃ SỐ: {dataPrint?._id}</span>
              </p>
            </div>
          </div>
          <div className="title-print">
            <h1 className="mb-3">PHIẾU THU TIỀN KHÁM BỆNH</h1>
          </div>

          <div className="text-sm mb-3">
            <div>
              <span>Họ và tên: </span>
              <span className="uppercase font-semibold pl-3">
                {dataPrint?.customerId?.name}
              </span>
            </div>
            <div>
              <span>Mã bệnh nhân: </span>
              <span className="uppercase font-semibold pl-3">
                {dataPrint?.customerId?._id}
              </span>
            </div>
            <div>
              <span>Số điện thoại: </span>
              <span className="uppercase font-semibold pl-3">
                {dataPrint?.customerId?.phone}
              </span>
            </div>
            <div>
              <span>Địa chỉ: </span>
              <span className="font-semibold">
                {/* {`${dataPrint?.customerId?.detailedAddress} - ${dataPrint?.customerId?.commune?.name} - ${dataPrint?.customerId?.district?.name} - ${dataPrint?.customerId?.province?.name}`} */}
                {getFullAddress()}
              </span>
            </div>
          </div>
          <div>
            <table className="border border-black">
              <thead>
                <tr className="border border-black">
                  <th>STT</th>
                  <th>Tên dịch vụ</th>
                  <th>Đơn giá</th>
                  <th>Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                {dataPrint?.services?.length > 0 &&
                  dataPrint?.services?.map((item: any, index: number) => (
                    <tr className="border border-black">
                      <td>{index + 1}</td>
                      <td>{item?.service_examination?.name}</td>
                      <td>
                        {PriceUtils.format(item?.service_examination?.price)}
                      </td>
                      <td>
                        {PriceUtils.format(item?.service_examination?.price)}
                      </td>
                    </tr>
                  ))}
                <tr className="border border-black">
                  <td></td>
                  <td colSpan={2}>TỔNG CỘNG</td>
                  <td>{calculateTotalPrice(dataPrint?.services)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="my-3 flex flex-col gap-y-3 text-xs">
            <div className="flex items-center gap-x-5">
              <span>Số tiền bằng chữ:</span>
              <span className="font-semibold">
                {readNumberToVietnameseWords(
                  calculateTotalPriceNoFomat(dataPrint.services)
                )}
                đồng
              </span>
            </div>
            <div className="flex items-center gap-x-5">
              <span>Đã thanh toán:</span>
              <span className="font-semibold">
                {`( ${readNumberToVietnameseWords(
                  calculateTotalPriceNoFomat(dataPrint.services)
                )} đồng )`}
              </span>
            </div>
          </div>

          <div className="flex mt-10 my-3 justify-between">
            <div className="flex items-end justify-center">
              <h3 className="text-sm font-semibold">Bệnh nhân</h3>
              <p className="text-sm text-center">(Ký, họ tên)</p>
            </div>
            <div className="flex items-end justify-center">
              <h3 className="text-sm font-semibold">Nhân viên</h3>
              <p className="text-sm text-center">(Ký, họ tên)</p>
            </div>
            <div className="flex items-end justify-center">
              <h3 className="text-sm font-semibold">Ký xác nhận bác sĩ</h3>
              <p className="text-sm text-center">(Ký, họ tên)</p>
            </div>
          </div>
        </ReceptionPrint>
      </div>
    </div>
  );
};

export default PrintBill;
