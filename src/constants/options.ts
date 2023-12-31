export interface IOption {
  value: string | number;
  label: string;
}
export interface IDataAddress {
  code: number;
  codename: string;
  districts: [];
  division_type: string;
  name: string;
  phone_code: number;
}

export const optionClinic: IOption[] = [
  { value: "", label: "-Trạng thái-" },
  { value: "active", label: "Đang hoạt động" },
  { value: "stop", label: "Ngừng hoạt động" },
];

export const examinationStatus: IOption[] = [
  { value: "", label: "-Trạng thái-" },
  { value: "waiting", label: "Chờ khám" },
  { value: "running", label: "Đang khám" },
  { value: "done", label: "Đã khám" },
  { value: "cancel", label: "Đã hủy" },
];

export const optionDoctor: IOption[] = [
  { value: "bac", label: "Nguyễn Hồng Sơn" },
  { value: "dfđ", label: "Nguyễn Phi Anh" },
  { value: "dfsfssđ", label: "Chu Tuấn Phương" },
];

export const optionOrderType: IOption[] = [
  { value: "", label: "Loại đơn" },
  { value: 0, label: "Kê đơn" },
  {
    value: 1,
    label: "Bán tại cửa hàng",
  },
];

export const optionOrderPaymentStatus: IOption[] = [
  { value: "", label: "Trạng thái thanh toán" },
  { value: 1, label: "Đã thanh toán" },
  { value: 0, label: "Chưa thanh oán" },
];

export const optionOrderStatus: IOption[] = [
  { value: "", label: "Trạng thái thực hiện" },
  {
    value: 0,
    label: "Đang chờ",
  },
  { value: 1, label: "Đã thực hiện" },
  { value: 2, label: "Đã hủy" },
];

export const optionGender: IOption[] = [
  { value: "", label: "-Giới tính-" },
  { value: "Nam", label: "Nam" },
  { value: "Nữ", label: "Nữ" },
];

export const optionStatus: IOption[] = [
  { value: "", label: "-Trạng thái-" },
  { value: "work", label: "Đang hoạt động" },
  { value: "hidden", label: "Ngừng hoạt động" },
  { value: "empty", label: "Hết hàng" },
];

export const optionNVCS: IOption[] = [
  { value: "", label: "-Nhân viên chăm sóc-" },
  { value: "bac", label: "Nguyễn Hồng Sơn" },
  { value: "dfđ", label: "Nguyễn Phi Anh" },
  { value: "dfsfssđ", label: "Chu Tuấn Phương" },
];

export const optionNVTD: IOption[] = [
  { value: "bac", label: "Nguyễn Hồng Sơn" },
  { value: "dfđ", label: "Nguyễn Phi Anh" },
  { value: "dfsfssđ", label: "Chu Tuấn Phương" },
];

export const dataTypeImportProduct: IOption[] = [
  { value: "Miếng", label: "Miếng" },
  { value: "Gói", label: "Gói" },
  { value: "Bịch", label: "Bịch" },
  { value: "Cái", label: "Cái" },
  { value: "Hộp", label: "Hộp" },
  { value: "Vỉ", label: "Vỉ" },
  { value: "Viên", label: "Viên" },
];

export const optionStatusDesignation: IOption[] = [
  { value: "", label: "-Trạng thái thực hiên-" },
  { value: "waiting", label: "Chờ thực hiện" },
  { value: "done", label: "Đã thực hiện" },
  { value: "canceled", label: "Đã hủy" },
];

export const optionPaymentStatus: IOption[] = [
  { value: "", label: "-Trạng thái thanh toán-" },
  { value: "paid", label: "Đã thanh toán" },
  { value: "unpaid", label: "Chưa thanh toán" },
];

export const optionService: IOption[] = [
  { value: "", label: "-Trạng thái-" },
  { value: "1", label: "Đang hoạt động" },
  { value: "0", label: "Không hoạt động" },
];

export const Status_cancel: IOption[] = [
  {
    value: "",
    label: "-Trạng thái huỷ-",
  },
  {
    value: "cancel",
    label: "Huỷ phiếu khám",
  },
  {
    value: "cancel_schedule",
    label: "Huỷ đặt lịch",
  },
];
