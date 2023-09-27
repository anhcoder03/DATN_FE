import { createSlice } from "@reduxjs/toolkit";
export const headingsSlice = createSlice({
  name: "headings",
  initialState: {
    selectedHeadings: [
      "Bệnh nhân",
      "Bác sĩ",
      "Triệu chứng bệnh",
      "Trạng thái",
      "Dịch vụ khám",
      "Phòng khám",
      "Hóa đơn",
      "Kết quả bệnh",
    ],
  },
  reducers: {
    setSelectedHeadings: (state, action) => {
      state.selectedHeadings = action.payload;
    },
  },
});
export const { setSelectedHeadings } = headingsSlice.actions;
export default headingsSlice.reducer;
