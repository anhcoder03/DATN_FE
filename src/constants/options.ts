export interface IOption {
  value: string;
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
  { value: "phongkham1", label: "Phòng 1" },
  { value: "phongkham2", label: "Phòng 2" },
  { value: "phongkham3", label: "Phòng 3" },
];

export const optionDoctor: IOption[] = [
  { value: "bac", label: "Nguyễn Hồng Sơn" },
  { value: "dfđ", label: "Nguyễn Phi Anh" },
  { value: "dfsfssđ", label: "Chu Tuấn Phương" },
];
export const optionGender: IOption[] = [
  { value: "", label: "-Giới tính-" },
  { value: "Nam", label: "Nam" },
  { value: "Nữ", label: "Nữ" },
];

export const optionStatus: IOption[] = [
  { value: "", label: "-Trạng thái-" },
  { value: "work", label: "Còn hàng" },
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
// export const optionDoctor: IOption[] = [
//   { value: "", label: "-Bác sĩ-" },
//   { value: "bac", label: "Nguyễn Hồng Sơn" },
//   { value: "dfđ", label: "Nguyễn Phi Anh" },
//   { value: "dfsfssđ", label: "Chu Tuấn Phương" },
// ];
