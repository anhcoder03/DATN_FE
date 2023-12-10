import { useSelector } from "react-redux";
import { FilterReceptionWaiting } from "../../../components/filters";
import { RootState } from "../../../redux/store";
import { useEffect, useState } from "react";
import {
  UpdateExamination,
  getAllExamination,
} from "../../../services/examination.service";
import { Table3 } from "../../../components/table";
import moment from "moment";
import CalcUtils from "../../../helpers/CalcULtils";
import { useNavigate } from "react-router-dom";
import { Pagination } from "../../../components/pagination";
import IconTrash2 from "../../../assets/images/icon-trash2.png";
import { Button, Modal } from "antd";
import { toast } from "react-toastify";
import { getAllByName } from "../../../services/role.service";
import { getAllClinic } from "../../../services/clinic.service";

const ReceptionWaiting = () => {
  const auth: any = useSelector((state: RootState) => state.auth.auth?.user);
  const [receptions, setReceptions] = useState<any[]>();
  const [reception, setReception] = useState<any>();
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState({
    _page: 1,
    _limit: 25,
    _sort: "createdAt",
    _order: "desc",
    status: "waiting",
    doctorId: null,
    search: null,
    staffId: null,
    clinicId: null,
    day_waiting: moment()
  });
  const [totalPages, setTotalPages] = useState(1);
  const [totalDocs, setTotalDocs] = useState(1);
  const [dataStaffs, setDataStaffs] = useState<any[]>([]);
  const [dataDoctors, setDataDoctors] = useState<any[]>([]);
  const [clinics, setClinics] = useState<any[]>([]);
  // const [openModal, setOpenModal] = useState(false);
  const urlParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const columns = [
    {
      name: "Mã bệnh nhân",
      selector: (row: any) => row?.customerId?._id,
    },
    {
      name: "Tên bệnh nhân",
      selector: (row: any) => row?.customerId?.name,
    },
    {
      name: "Tuổi",
      selector: (row: { customerId: { dateOfBirth: any } }) =>
        CalcUtils.calculateAge(row?.customerId?.dateOfBirth),
    },
    {
      name: "Giới tính",
      selector: (row: { customerId: { gender: any } }) =>
        row?.customerId?.gender,
    },
    {
      name: "Số điện thoại",
      selector: (row: { customerId: { phone: any } }) => row?.customerId?.phone,
    },
    {
      name: "Ngày tiếp đón",
      selector: (row: { day_welcome: moment.MomentInput }) =>
        moment(row?.day_welcome).format("DD/MM/YYYY"),
    },
    {
      name: "Nhân viên tiếp đón",
      selector: (row: { staffId: { name: any } }) => row?.staffId?.name,
    },
    {
      name: "Bác sĩ",
      selector: (row: { doctorId: { name: any } }) => row?.doctorId?.name,
    },
    {
      name: "Phòng khám",
      selector: (row: { clinicId: { name: any } }) => row?.clinicId?.name,
    },
    {
      name: "Triệu chứng",
      selector: (row: any) => row?.symptom,
    },
    {
      name: "Ghi chú",
      selector: (row: any) => row?.note,
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
    const dateInUtcPlus7 = moment(date).tz("Asia/Bangkok");
    setQuery({ ...query, day_waiting: dateInUtcPlus7.format() as any });
    urlParams.set("day_waiting", dateInUtcPlus7.format());
    navigate(`?${urlParams}`);
  };

  const selectedHeading = useSelector(
    (state: RootState) => state.headingWaiting.selectedHeadings
  );

  const deserializedHeadings = selectedHeading.map((heading) => {
    return {
      name: heading.name,
      selector: eval(heading.selector),
    };
  });

  const handleModal = (data: any) => {
    setOpenModal(true);
    setReception(data);
  };

  const handleStatus = async () => {
    const params = {
      _id: reception?.data?._id,
      status: "cancel",
    };
    const res: any = await UpdateExamination(params);
    if (res?.examination) {
      handleGetExaminaton();
      toast.success(res?.message);
      return;
    }
  };

  const action = {
    name: "Thao tác",
    cell: (row: { _id: any }) => (
      <>
      {(auth?.role?.roleNumber == 2 || auth?.role?.roleNumber == 3) ? null : (
        <div className="flex items-center gap-x-[2px]">
          <button
            onClick={() => handleModal({ type: "cancel", data: row })}
            className="button-nutri text-[#585858]"
          >
            <img
              style={{ border: "none" }}
              src={IconTrash2}
              width={20}
              height={20}
              alt=""
            />
          </button>
        </div>
      )}
      
      </>
      
    ),
  };

  const newHeading = [...deserializedHeadings, action];

  const onOk = async () => {
    if (reception?.type == "cancel") {
      handleStatus();
      setOpenModal(false);
      return;
    }
  };

  const handlePageClick = (event: any) => {
    const page = event.selected + 1;
    setQuery({ ...query, _page: page });
  };

  const handleLimitChange = (data: any) => {
    setQuery({ ...query, _limit: data.value });
  };

  const gotoDetail = (id: string) => {
    navigate(`/reception/${id}/view`);
  };

  return (
    <>
      <FilterReceptionWaiting
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
        day_waiting={query?.day_waiting}
      ></FilterReceptionWaiting>
      <Table3
        isLoading={loading}
        columns={newHeading}
        data={receptions}
        gotoDetail={gotoDetail}
      ></Table3>
      <Pagination
        handlePageClick={handlePageClick}
        pageCount={totalPages}
        handleLimitChange={handleLimitChange}
        optionsPagination={optionsPagination}
        totalDocs={totalDocs}
        totalPages={totalPages}
      ></Pagination>
      <Modal
        centered
        open={openModal}
        footer={[
          <Button
            className="bg-primary50 text-primary"
            key="back"
            onClick={() => setOpenModal(false)}
          >
            Hủy
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={onOk}
            className="bg-primary50 text-primary"
          >
            Xác nhận
          </Button>,
        ]}
        onCancel={() => setOpenModal(false)}
      >
        <h1 className="text-[#4b4b5a] pb-4 border-b border-b-slate-200 font-bold text-center text-[18px]">
          Thông Báo
        </h1>
        {reception?.type == "cancel" && (
          <div className="flex flex-col items-center justify-center py-4 text-sm">
            <p>Bạn có chắc hủy phiếu khám này không?</p>
            <span className="text-center text-[#ff5c75] font-bold">
              {reception?.data?._id}
            </span>
          </div>
        )}
      </Modal>
    </>
  );
};

export default ReceptionWaiting;
