import { useSelector } from "react-redux";
import { FilterReceptionCustomer } from "../../../components/filters";
import { RootState } from "../../../redux/store";
import CustomTable from "../../../components/table/Table2";

const ReceptionWaiting = () => {
  const columns = [
    { id: "_id", label: "ID" },
    { id: "name", label: "Tên bệnh nhân" },
    { id: "age", label: "Tuổi" },
    { id: "address", label: "Cơ sở khám" },
    { id: "status", label: "Trạng thái" },
    { id: "dateofbirth", label: "Năm sinh" },
    { id: "gender", label: "Gioi tính" },
    { id: "doctor", label: "Bắc sỹ" },
    { id: "phoneNumber", label: "Số điện thoại" },
    { id: "description", label: "Mô tả bệnh án" },
    { id: "date", label: "Ngày khám" },
  ];
  const rows = [
    {
      id: 1,
      name: "John Doe",
      age: 30,
      address: "123 Main Street",
      status: "Active",
      dateofbirth: "1993-05-15",
      gender: "Male",
      doctor: "Dr. Smith",
      phoneNumber: "555-123-4567",
      description: "Common cold",
      date: "2023-09-28",
    },
    {
      id: 2,
      name: "Jane Smith",
      age: 25,
      address: "456 Elm Street",
      status: "Inactive",
      dateofbirth: "1998-08-20",
      gender: "Female",
      doctor: "Dr. Johnson",
      phoneNumber: "555-987-6543",
      description: "Fever and headache",
      date: "2023-09-29",
    },
  ];
  const selectedHeading = useSelector(
    (state: RootState) => state.headingReception.selectedHeadings
  );
  return (
    <>
      <FilterReceptionCustomer columns={columns}></FilterReceptionCustomer>
      <CustomTable columns={selectedHeading} rows={rows} />
    </>
  );
};

export default ReceptionWaiting;
