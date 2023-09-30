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
// export const optionDoctor: IOption[] = [
//   { value: "", label: "-Bác sĩ-" },
//   { value: "bac", label: "Nguyễn Hồng Sơn" },
//   { value: "dfđ", label: "Nguyễn Phi Anh" },
//   { value: "dfsfssđ", label: "Chu Tuấn Phương" },
// ];
