import { createSlice } from '@reduxjs/toolkit';
const headings = [
  { id: 'id', label: 'Mã đơn' },
  {
    id: 'customer',
    label: 'Khách hàng',
  },
  {
    id: 'date',
    label: 'Ngày kê',
  },
  {
    id: 'doctor',
    label: 'Bác sĩ',
  },
  {
    id: 'type',
    label: 'Loại đơn',
  },
];
const headingPrescriptionSlice = createSlice({
  name: 'headingPrescription',
  initialState: {
    selectedHeadingPrescription: [
      { id: 'id', label: 'Mã đơn' },
      {
        id: 'customer',
        label: 'Khách hàng',
      },
      {
        id: 'date',
        label: 'Ngày kê',
      },
      {
        id: 'doctor',
        label: 'Bác sĩ',
      },
      {
        id: 'type',
        label: 'Loại đơn',
      },
    ],
  },
  reducers: {
    setSelectedHeadingPrescription: (state, action) => {
      state.selectedHeadingPrescription = action.payload;
    },
    resetHeadingPrescription: (state) => {
      state.selectedHeadingPrescription = headings;
    },
  },
});
export const { setSelectedHeadingPrescription, resetHeadingPrescription } =
  headingPrescriptionSlice.actions;
export default headingPrescriptionSlice;
