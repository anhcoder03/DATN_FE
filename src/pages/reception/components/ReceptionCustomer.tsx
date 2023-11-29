import { useSelector } from "react-redux";
import { FilterReceptionCustomer } from "../../../components/filters";
import { RootState } from "../../../redux/store";
import { useEffect, useRef, useState } from "react";
import {
  UpdateExamination,
  getAllExamination,
} from "../../../services/examination.service";
import { Table3 } from "../../../components/table";
import moment from "moment";
import CalcUtils from "../../../helpers/CalcULtils";
import { useNavigate } from "react-router-dom";
import { Pagination } from "../../../components/pagination";
import IconEdit from "../../../assets/images/icon-edit.png";
import IconTrash2 from "../../../assets/images/icon-trash2.png";
import IconPhieuKham from "../../../assets/images/icon-phieukham.png";
import { useReactToPrint } from "react-to-print";
import { PrintCompoent } from "../../../components/print";
import { getAllByName } from "../../../services/role.service";
import { getAllClinic } from "../../../services/clinic.service";
import { Button, Modal } from "antd";
import { toast } from "react-toastify";
import IconPrint from "../../../assets/images/ic-print.svg";

const ReceptionCustomer = () => {
  const auth: any = useSelector((state: RootState) => state.auth.auth?.user);
  const [receptions, setReceptions] = useState<any[]>();
  const [reception, setReception] = useState<any>();
  const [dataPrint, setDataPrint] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [dataStaffs, setDataStaffs] = useState<any[]>([]);
  const [dataDoctors, setDataDoctors] = useState<any[]>([]);
  const [clinics, setClinics] = useState<any[]>([]);
  const [query, setQuery] = useState({
    _page: 1,
    _limit: 25,
    _sort: "createdAt",
    _order: "desc",
    status: "recetion",
    search: null,
    staffId: null,
    clinicId: null,
    day_welcome: null,
    doctorId: null,
  });
  const [totalPages, setTotalPages] = useState(1);
  const [totalDocs, setTotalDocs] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const urlParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => {
      setOpenModal(false);
    },
    copyStyles: true,
  });

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
      moment(row?.day_welcome).format("DD/MM/YYYY") == 'Invalid date' ? '---' : moment(row?.day_welcome).format("DD/MM/YYYY"),
    },
    {
      name: "Nhân viên tiếp đón",
      selector: (row: { staffId: { name: any } }) =>
        row?.staffId?.name ?? "---",
    },
    {
      name: "Phòng khám",
      selector: (row: { clinicId: { name: any } }) =>
        row?.clinicId?.name ?? "---",
    },
    {
      name: "Bác sĩ",
      selector: (row: { doctorId: { name: any } }) =>
        row?.doctorId?.name ?? "---",
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
    handleGetStaffs();
  }, []);

  useEffect(() => {
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
    handleGetDoctors();
  }, []);

  useEffect(() => {
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
    handleGetClinic();
  }, []);

  const selectedHeading = useSelector(
    (state: RootState) => state.headingReception.selectedHeadings
  );

  const deserializedHeadings = selectedHeading.map((heading) => {
    return {
      name: heading.name,
      selector: eval(heading.selector),
    };
  });

  const handleUpdate = (data: any) => {
    setOpenModal(true);
    setReception(data);
  };

  const handleChangeStatus = async () => {
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
      <div className="flex items-center gap-x-[2px]">
        <button
          onClick={() => handleClickPrint(row)}
          className="button-nutri text-[#585858]"
        >
          <img width={20} height={20} src={IconPrint} alt="print" />
        </button>
        {(auth?.role?.roleNumber == 1 || auth?.role?.roleNumber == 3) ? null : (
          <>
            <button
              onClick={() => handleUpdate({ type: "waiting", data: row })}
              className="button-nutri text-[#585858]"
            >
              <img
                style={{ border: "none" }}
                src={IconPhieuKham}
                width={20}
                height={20}
                alt=""
              />
            </button>
            <button
              onClick={() => {
                if(auth?.role?.roleNumber == 1 || auth?.role?.roleNumber == 3) {
                  toast.warning('Bạn không có quyền thực hiện hành động này!')
                  return
                }
                gotoDetail(row?._id)
              } }
              className="button-nutri text-[#585858]"
            >
              <img
                style={{ border: "none" }}
                src={IconEdit}
                width={20}
                height={20}
                alt=""
              />
            </button>
          </>
        )}
        {
          auth?.role?.roleNumber == 3 ? null : (
            <button
              onClick={() => handleUpdate({ type: "cancel", data: row })}
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
          )
        }
      </div>
    ),
  };

  const newHeading = [...deserializedHeadings, action];

  const handleClickPrint = (item: any) => {
    setOpenModal(true);
    setDataPrint(item);
    setReception({ type: "print" });
    setTimeout(() => {
      handlePrint();
    }, 500);
  };

  const handlePageClick = (event: any) => {
    const page = event.selected + 1;
    setQuery({ ...query, _page: page });
  };

  const handleLimitChange = (data: any) => {
    setQuery({ ...query, _limit: data.value });
  };

  const gotoDetail = (id: any) => {
    if(auth?.role?.roleNumber == 1 || auth?.role?.roleNumber == 3) {
      toast.warning('Bạn không có quyền thực hiện hành động này!')
      return
    }
    navigate(`/reception/${id}`);
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
    setQuery({ ...query, day_welcome: date });
    urlParams.set("day_welcome", date);
    navigate(`?${urlParams}`);
  };

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

  const onOk = () => {
    if (reception?.type == "cancel") {
      handleChangeStatus();
      setOpenModal(false);
      return;
    }
    if (reception?.type == "waiting") {
      return toast.warning("Tính năng đang phát triển");
    }
  };

  return (
    <>
      <FilterReceptionCustomer
        dataStaffs={dataStaffs}
        dataDoctors={dataDoctors}
        clinics={clinics}
        handleSearchByStaffId={handleSearchByStaffId}
        handleSearchByDoctorId={handleSearchByDoctorId}
        handleSearch={handleSearch}
        columns={columns}
        handleDayChange={handleDayChange}
        handleClinicChange={handleSearchByClinic}
      ></FilterReceptionCustomer>
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
      {openModal && reception?.type == "print" ? (
        <PrintCompoent
          componentRef={componentRef}
          dataPrint={dataPrint}
        ></PrintCompoent>
      ) : (
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
              <p>Bạn có chắc hủy tiếp đón này không?</p>
              <span className="text-center text-[#ff5c75] font-bold">
                {reception?.data?._id}
              </span>
            </div>
          )}
          {reception?.type == "waiting" && (
            <div className="flex flex-col items-center justify-center py-4 text-sm">
              <p>Bạn có chắc chuyển trạng thái của tiếp đón này không?</p>
              <span className="text-center text-[#ff5c75] font-bold">
                {reception?.data?._id}
              </span>
            </div>
          )}
        </Modal>
      )}
    </>
  );
};

export default ReceptionCustomer;
