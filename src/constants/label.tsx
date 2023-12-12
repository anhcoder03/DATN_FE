import { PRESCRIPTION_STATUS } from "./define";

export const renderStatus = (status: any) => {
  if (status == PRESCRIPTION_STATUS.PENDDING) {
    return <span className="text-[#EDA119]">Chưa thực hiện</span>;
  }
  if (status == PRESCRIPTION_STATUS.DONE) {
    return <span className="text-primary">Đã thực hiện</span>;
  }
  if (status == PRESCRIPTION_STATUS.CANCEL) {
    return <span className="text-[#FD4858]">Đã huỷ</span>;
  } else {
    return <span>---</span>;
  }
};
