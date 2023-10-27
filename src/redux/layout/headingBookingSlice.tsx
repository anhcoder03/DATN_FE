import { createSlice } from "@reduxjs/toolkit";
import moment, { MomentInput } from "moment";
const headings = [
  {
    name: "Mã bệnh nhân",
    selector: (row: { customerId: { _id: any } }) => row.customerId._id,
  },
  {
    name: "Tên bệnh nhân",
    selector: (row: { customerId: { name: any } }) => row.customerId.name,
  },
  {
    name: "Ngày đặt lịch",
    selector: (row: { day_booking: MomentInput }) =>
      moment(row?.day_booking).format("DD/MM/YYYY"),
  },
  {
    name: "Nhân viên tiếp đón",
    selector: (row: { staffId: { name: any } }) => row.staffId.name,
  },
  {
    name: "Bác sĩ",
    selector: (row: { doctorId: { name: any } }) => row.doctorId.name,
  },
  {
    name: "Ngày tạo",
    selector: (row: { createdAt: MomentInput }) =>
      moment(row?.createdAt).format("DD/MM/YYYY"),
  },
];

const serializedHeadings = headings.map((heading) => {
  return {
    name: heading.name,
    selector: heading.selector.toString(), // Chuyển đổi hàm thành chuỗi JSON
  };
});
export const headingBookingSlice = createSlice({
  name: "headingBooking",
  initialState: {
    selectedHeadings: serializedHeadings,
  },
  reducers: {
    setSelectedHeadings: (state, action) => {
      state.selectedHeadings = action.payload;
    },
    resetHeadings: (state) => {
      state.selectedHeadings = serializedHeadings;
    },
  },
});
export const { setSelectedHeadings, resetHeadings } =
  headingBookingSlice.actions;
export default headingBookingSlice.reducer;
