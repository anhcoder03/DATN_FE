import styled from "styled-components";
import Logo from "../../assets/logo2.png";
import moment from "moment";
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
      font-size: 50px;
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
`;
const PrintCompoent = ({ componentRef, dataPrint }: any) => {
  return (
    <div style={{ position: "relative" }} className="hidden">
      <div className="print-content reception-print" ref={componentRef}>
        <ReceptionPrint style={{ paddingLeft: 50, paddingRight: 50 }}>
          <div className="head">
            <div className="text-center flex items-center justify-center max-w-[300px] w-full mx-auto  mb-3 mt-10">
              <img src={Logo} alt="" height="80" />
            </div>
            <h3 className="text-center" style={{ textTransform: "uppercase" }}>
              Phòng khám Dr.Medipro
            </h3>
            <h3 className="text-center" style={{ marginTop: 5 }}>
              {dataPrint?.branch_id?.name}
            </h3>
          </div>
          <div className="title-print">
            <h1 className="mb-3">Phiếu đăng ký khám</h1>

            <div className="clinic" style={{ fontSize: 40 }}>
              Phòng Khám:
              {dataPrint?.clinicId?.name}
            </div>
          </div>
          <div className="line-head"></div>
          <div className="print-info">
            <div className="name">{dataPrint?.customerId?.name}</div>
          </div>
          <div className="list-info">
            <div className="item mb-4">
              <div className="label">Ngày tháng năm sinh:</div>
              <div className="value ml-5">
                {dataPrint?.customerId?.dateOfBirth &&
                  moment(dataPrint?.customerId?.dateOfBirth).format(
                    "DD/MM/YYYY"
                  )}
              </div>
            </div>
            <div className="item mb-4 ">
              <div className="label">Mã bệnh nhân:</div>
              <div className="value ml-5">{dataPrint?.customerId?._id}</div>
            </div>
            <div className="item mb-4">
              <div className="label">Ngày đăng ký:</div>
              <div className="value ml-5">
                {dataPrint?.day_welcome &&
                  moment(dataPrint?.day_welcome).format("HH:mm DD/MM/YYYY")}
              </div>
            </div>
            <div className="item mb-4">
              <div className="label">Thời gian khám dự kiến:</div>
              <div className="value ml-5">
                {dataPrint?.day_welcome &&
                  moment(dataPrint?.day_welcome)
                    .add(0.5, "hours")
                    .format("HH:mm DD/MM/YYYY")}
              </div>
            </div>
            <div className="item mb-5">
              <div className="label">Người đăng ký:</div>
              <div className="value ml-5">{dataPrint?.staffId?.name}</div>
            </div>
          </div>
          <div
            className="item text-center"
            style={{ fontStyle: "italic", fontSize: 16, marginTop: 20 }}
          >
            Quý Khách vui lòng chờ tới số thứ tự của mình.
            <br /> Xin chân thành cảm ơn Quý Khách!
          </div>
        </ReceptionPrint>
      </div>
    </div>
  );
};

export default PrintCompoent;
