import { createSlice } from "@reduxjs/toolkit";
const headings = [
  { id: "_id", label: "Mã bệnh nhân" },
  { id: "name", label: "Tên bệnh nhân" },
  { id: "dateOfBirth", label: "Tuổi" },
  { id: "gender", label: "Giới tính" },
  { id: "day_booking", label: "Ngày đặt lịch" },
  { id: "doctor_id", label: "Bác sĩ" },
  { id: "creator_id", label: "Người tạo" },
];
export const headingBookingSlice = createSlice({
  name: "headingBooking",
  initialState: {
    selectedHeadings: [
      { id: "_id", label: "Mã bệnh nhân" },
      { id: "name", label: "Tên bệnh nhân" },
      { id: "dateOfBirth", label: "Tuổi" },
      { id: "gender", label: "Giới tính" },
      { id: "day_booking", label: "Ngày đặt lịch" },
      { id: "doctor_id", label: "Bác sĩ" },
      { id: "creator_id", label: "Người tạo" },
    ],
  },
  reducers: {
    setSelectedHeadings: (state, action) => {
      state.selectedHeadings = action.payload;
    },
    resetHeadings: (state) => {
      state.selectedHeadings = headings;
    },
  },
});
export const { setSelectedHeadings, resetHeadings } =
  headingBookingSlice.actions;
export default headingBookingSlice.reducer;
