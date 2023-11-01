import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
const headings = [
    {
        name: "Mã bệnh nhân",
        selector: (row: any) => row?.customerId?._id,
    },
    {
        name: "Tên bệnh nhân",
        selector: (row: any) => row?.customerId.name,
    },

    {
        name: "Ngày tiếp đón",
        selector: (row: { day_welcome: moment.MomentInput }) =>
            moment(row?.day_welcome).format("DD/MM/YYYY"),
    },
    {
        name: "Phòng khám",
        selector: (row: { clinicId: { name: any } }) => row.clinicId?.name,
    },
    {
        name: "Bác sĩ",
        selector: (row: { doctorId: { name: any } }) => row?.doctorId.name,
    },
];
const serializedHeadings = headings.map((heading) => {
    return {
        name: heading.name,
        selector: heading.selector.toString(), // Chuyển đổi hàm thành chuỗi JSON
    };
});
export const headingDone = createSlice({
    name: "headingDone",
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
export const { setSelectedHeadings, resetHeadings } = headingDone.actions;
export default headingDone.reducer;
