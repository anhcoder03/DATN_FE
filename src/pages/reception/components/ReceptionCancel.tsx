import { useEffect, useState } from "react";
import CalcUtils from "../../../helpers/CalcULtils";
import moment from "moment";
import { Table3 } from "../../../components/table";
import { Pagination } from "../../../components/pagination";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useNavigate } from "react-router-dom";
import { getAllExamination } from "../../../services/examination.service";
import FilterReceptionCancel from "../../../components/filters/FilterReceptionCancel";
import { getAllByName } from "../../../services/role.service";
import { getAllClinic } from "../../../services/clinic.service";

const ReceptionCancel = () => {
  const [receptions, setReceptions] = useState<any[]>();
  //   const [reception, setReception] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<any>([
    'cancel', 
    'cancel_schedule'
  ])
  const [query, setQuery] = useState({
    _page: 1,
    _limit: 25,
    _sort: "createdAt",
    _order: "desc",
    status,
    doctorId: null,
    search: null,
    staffId: null,
    clinicId: null,
    day_cancel: null
  });
  const [totalPages, setTotalPages] = useState(1);
  const [totalDocs, setTotalDocs] = useState(1);
  const [dataStaffs, setDataStaffs] = useState<any[]>([]);
  const [dataDoctors, setDataDoctors] = useState<any[]>([]);
  const [clinics, setClinics] = useState<any[]>([]);
  //   const [openModal, setOpenModal] = useState(false);
  const urlParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const columns = [
    {
      name: "Mã bệnh nhân",
      selector: (row: any) => row?.customerId?._id ?? "---",
    },
    {
      name: "Tên bệnh nhân",
      selector: (row: any) => row?.customerId?.name ?? "---",
    },
    {
      name: "Tuổi",
      selector: (row: { customerId: { dateOfBirth: any } }) =>
        CalcUtils.calculateAge(row?.customerId?.dateOfBirth) ?? "---",
    },
    {
      name: "Giới tính",
      selector: (row: { customerId: { gender: any } }) =>
        row?.customerId?.gender ?? "---",
    },
    {
      name: "Số điện thoại",
      selector: (row: { customerId: { phone: any } }) =>
        row?.customerId?.phone ?? "---",
    },
    {
      name: "Ngày tiếp đón",
      selector: (row: { day_welcome: moment.MomentInput }) =>
        moment(row?.day_welcome).format("DD/MM/YYYY"),
    },
    {
      name: "Nhân viên tiếp đón",
      selector: (row: { staffId: { name: any } }) =>
        row?.staffId?.name ?? "---",
    },
    {
      name: "Bác sĩ",
      selector: (row: { doctorId: { name: any } }) =>
        row?.doctorId?.name ?? "---",
    },
    {
      name: "Phòng khám",
      selector: (row: { clinicId: { name: any } }) =>
        row?.clinicId?.name ?? "---",
    },
    {
      name: "Triệu chứng",
      selector: (row: any) => row?.symptom || "---",
    },
    {
      name: "Ghi chú",
      selector: (row: any) => row?.note || "---",
    },
  ];
  const optionsPagination = [
    { value: 25, label: "25 bản ghi" },
    { value: 50, label: "50 bản ghi" },
    { value: 100, label: "100 bản ghi" },
  ];

  const handleGetExaminaton = async () => {
    try {
      setLoading(true);
      const data = await getAllExamination(query);
      setLoading(false);
      setTotalPages(data.totalPages);
      setTotalDocs(data.totalDocs);
      setReceptions(data.docs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    urlParams.set("page", query._page as any);
    urlParams.set("limit", query._limit as any);
    navigate(`?${urlParams}`);
    handleGetExaminaton();
  }, [query]);

  useEffect(() => {
    handleGetDoctors();
    handleGetStaffs();
    handleGetClinic();
  }, []);

  async function handleGetStaffs() {
    const response = await getAllByName({ name: "Nhân viên tiếp đón" });
    const ListArr: any = [];
    response?.map((e: any) => {
      ListArr?.push({
        ...e,
        value: e?._id,
        label: e?.name,
      });
    });
    setDataStaffs([{ value: "", label: "-Nhân viên tiếp đón-" }, ...ListArr]);
  }

  async function handleGetDoctors() {
    const response = await getAllByName({ name: "Bác sĩ" });
    const ListArr: any = [];
    response?.map((e: any) => {
      ListArr?.push({
        ...e,
        value: e?._id,
        label: e?.name,
      });
    });
    setDataDoctors([{ value: "", label: "-Bác sĩ-" }, ...ListArr]);
  }

  async function handleGetClinic() {
    const response = await getAllClinic({ _status: "active", _limit: 100 });
    const ListArr: any = [];
    response?.docs?.map((e: any) => {
      ListArr?.push({
        ...e,
        value: e?._id,
        label: e?.name,
      });
    });
    setClinics([{ value: "", label: "-Phòng-" }, ...ListArr]);
  }

  const handleSearchByStaffId = (selectedOpiton: any) => {
    setQuery({ ...query, staffId: selectedOpiton.value });
    if (selectedOpiton.value !== "") {
      urlParams.set("staff", selectedOpiton.value);
      navigate(`?${urlParams}`);
    } else {
      urlParams.delete("staff");
      navigate(`?${urlParams}`);
    }
  };

  const handleSearchByDoctorId = (selectedOpiton: any) => {
    setQuery({ ...query, doctorId: selectedOpiton.value });
    if (selectedOpiton.value !== "") {
      urlParams.set("doctor", selectedOpiton.value);
      navigate(`?${urlParams}`);
    } else {
      urlParams.delete("doctor");
      navigate(`?${urlParams}`);
    }
  };

  const handleSearchByClinic = (selectedOpiton: any) => {
    setQuery({ ...query, clinicId: selectedOpiton.value });
    if (selectedOpiton.value !== "") {
      urlParams.set("clinic", selectedOpiton.value);
      navigate(`?${urlParams}`);
    } else {
      urlParams.delete("clinic");
      navigate(`?${urlParams}`);
    }
  };

  const handleSearch = (e: any) => {
    setQuery({ ...query, search: e });
    if (e !== "") {
      urlParams.set("s", e);
      navigate(`?${urlParams}`);
    } else {
      urlParams.delete("s");
      navigate(`?${urlParams}`);
    }
  };

  const handleDayChange = (date: any) => {
    setQuery({ ...query, day_cancel: date });
    urlParams.set("day_cancel", moment(date).toISOString());
    navigate(`?${urlParams}`);
  };

  const selectedHeading = useSelector(
    (state: RootState) => state.headingCancelling.selectedHeadings
  );

  const deserializedHeadings = selectedHeading.map((heading) => {
    return {
      name: heading.name,
      selector: eval(heading.selector),
    };
  });

  // const handleUpdate = (data: any) => {
  //   setOpenModal(true);
  //   setReception(data);
  // };

  const gotoDetail = (id: any) => {
    navigate(`/reception/${id}/view`);
  };

  const newHeading = [...deserializedHeadings];

  // const onOk = async () => {
  //   setOpenModal(false);
  // };

  const handlePageClick = (event: any) => {
    const page = event.selected + 1;
    setQuery({ ...query, _page: page });
  };

  const handleLimitChange = (data: any) => {
    setQuery({ ...query, _limit: data.value });
  };
  
  return (
    <>
      <FilterReceptionCancel 
        columns={columns}
        dataStaffs={dataStaffs}
        dataDoctors={dataDoctors}
        clinics={clinics}
        handleSearchByStaffId={handleSearchByStaffId}
        handleSearchByDoctorId={handleSearchByDoctorId}
        handleSearch={handleSearch}
        handleDayChange={handleDayChange}
        handleClinicChange={handleSearchByClinic}
        setQuery={setQuery}
        query={query}
        day_cancel={query?.day_cancel}
      ></FilterReceptionCancel>
      <Table3
        gotoDetail={gotoDetail}
        isLoading={loading}
        columns={newHeading}
        data={receptions}
      ></Table3>
      <Pagination
        handlePageClick={handlePageClick}
        pageCount={totalPages}
        handleLimitChange={handleLimitChange}
        optionsPagination={optionsPagination}
        totalDocs={totalDocs}
        totalPages={totalPages}
      ></Pagination>
    </>
  );
};

export default ReceptionCancel;
