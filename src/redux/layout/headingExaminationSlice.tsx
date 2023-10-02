import { createSlice } from "@reduxjs/toolkit";
const headings = [
  { id: "id", label: "ID" },
  { id: "name", label: "Tên bệnh nhân" },
  { id: "age", label: "Tuổi" },
  { id: "address", label: "Cơ sở khám" },
  { id: "status", label: "Trạng thái" },
];
export const headingExaminationSlice = createSlice({
  name: "headingExamination",
  initialState: {
    selectedHeadings: [
      { id: "id", label: "ID" },
      { id: "name", label: "Tên bệnh nhân" },
      { id: "age", label: "Tuổi" },
      { id: "address", label: "Cơ sở khám" },
      { id: "status", label: "Trạng thái" },
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
  headingExaminationSlice.actions;
export default headingExaminationSlice.reducer;
