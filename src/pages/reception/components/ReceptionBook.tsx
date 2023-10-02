import { FilterReceptionBook } from "../../../components/filters";
import CustomTable from "../../../components/table/Table2";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";

const ReceptionBook = () => {
  const columns = [
    { id: "_id", label: "Mã bệnh nhân" },
    { id: "name", label: "Tên bệnh nhân" },
    { id: "dateOfBirth", label: "Tuổi" },
    { id: "gender", label: "Giới tính" },
    { id: "phone", label: "Số điện thoại" },
    { id: "day_booking", label: "Ngày đặt lịch" },
    { id: "service_id", label: "Dịch vụ khám" },
    { id: "doctor_id", label: "Bác sĩ" },
    { id: "creator_id", label: "Người tạo" },
    { id: "createdAt", label: "Ngày tạo" },
  ];
  const rows = [
    {
      _id: "KH00002",
      name: "Nguyễn Phi Anh",
      dateOfBirth: "10 tuổi, 2 tháng, 12 ngày",
      gender: "Nam",
      phone: "0357984421",
      day_booking: "12:00 01/10/2023",
      service_id: "Khám chim",
      doctor_id: "Ngọc Trinh",
      creator_id: "Trần Minh Hiếu",
      createdAt: "30/09/2023",
    },
    {
      _id: "KH00003",
      name: "Nguyễn Phi Anh",
      dateOfBirth: "10 tuổi, 2 tháng, 12 ngày",
      gender: "Nam",
      phone: "0357984421",
      day_booking: "12:00 01/10/2023",
      service_id: "Khám chim",
      doctor_id: "Trần Hà Linh",
      creator_id: "Trần Minh Hiếu",
      createdAt: "30/09/2023",
    },
  ];
  const selectedHeading = useSelector(
    (state: RootState) => state.headingBooking.selectedHeadings
  );
  console.log(selectedHeading);
  return (
    <>
      <FilterReceptionBook columns={columns}></FilterReceptionBook>
      <CustomTable columns={selectedHeading} rows={rows} />
    </>
  );
};

export default ReceptionBook;
