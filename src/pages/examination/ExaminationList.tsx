import { Layout } from "../../components/layout";
import Heading from "../../components/common/Heading";
import { FilterExamination } from "../../components/filters";
import IconTrash2 from "../../assets/images/icon-trash2.png";
import IconExam from "../../assets/images/icon/ic_exam-gray.svg";
import IconExamDone from "../../assets/images/icon/ic_examdone-gray.svg";
import IconBack from "../../assets/images/icon/ic_back-gray.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useRef, useState } from "react";
import {
  UpdateExamination,
  getAllExamination,
} from "../../services/examination.service";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import CalcUtils from "../../helpers/CalcULtils";
import { Table3 } from "../../components/table";
import { LabelStatus } from "../../components/label";
import IconEdit from "../../assets/images/icon-edit.png";
import { Pagination } from "../../components/pagination";
import IconPrint from "../../assets/images/ic-print.svg";
import { useReactToPrint } from "react-to-print";
import { getServiceByIdExam } from "../../services/designation.service";
import { toast } from "react-toastify";
import { PrintExamination } from "../../components/print";
import { Button, Modal } from "antd";
import { getAllByName } from "../../services/role.service";
import { getAllClinic } from "../../services/clinic.service";

const ExaminationList = () => {
  const [examinations, setExamination] = useState<any[]>([]);
  const [itemExamination, setItemExamination] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [totalDocs, setTotalDocs] = useState(1);
  const [dataPrint, setDataPrint] = useState<any>();
  const [openModal, setOpenModal] = useState(false);
  const [dataDoctors, setDataDoctors] = useState<any[]>([]);
  const [clinics, setClinics] = useState<any[]>([]);

  const componentRef = useRef(null);
  const auth: any = useSelector((state: RootState) => state.auth.auth?.user);

  const optionsPagination = [
    { value: 25, label: "25 bản ghi" },
    { value: 50, label: "50 bản ghi" },
    { value: 100, label: "100 bản ghi" },
  ];

  const [status, setStatus] = useState([
    "waiting",
    "running",
    "done",
    "cancelling",
    "cancel",
  ]);

  const [query, setQuery] = useState({
    _page: 1,
    _limit: 25,
    // _sort: "day_waiting",
    // _order: "asc",
    status,
    day_welcome: null,
    search: null,
    clinicId: null,
    doctorId: null,
  });

  const urlParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  async function getService(row: any) {
    try {
      const response = await getServiceByIdExam(row?._id);
      const resData = await response?.docs;
      handleClickPrint(row, resData);
      setItemExamination({ type: "print" });
    } catch (error) {
      toast.error("Đã có lỗi sảy ra!!!");
    }
  }

  const handleGetExaminaton = async () => {
    try {
      setLoading(true);
      const data = await getAllExamination(query);
      setLoading(false);
      setTotalPages(data.totalPages);
      setTotalDocs(data.totalDocs);
      setExamination(data.docs);
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

  const columns = [
    {
      name: "Mã phiếu khám",
      selector: (row: any) => row?._id ?? "---",
    },
    {
      name: "Tên bệnh nhân",
      selector: (row: any) => row?.customerId.name ?? "---",
    },
    {
      name: "Tuổi",
      selector: (row: { customerId: { dateOfBirth: any } }) =>
        CalcUtils.calculateAge(row.customerId?.dateOfBirth) ?? "---",
    },
    {
      name: "Giới tính",
      selector: (row: { customerId: { gender: any } }) =>
        row?.customerId?.gender ?? "---",
    },
    {
      name: "Số điện thoại",
      selector: (row: { customerId: { phone: any } }) =>
        row.customerId.phone ?? "---",
    },
    {
      name: "Ngày tiếp đón",
      selector: (row: { day_welcome: moment.MomentInput }) =>
        moment(row?.day_welcome).format("DD/MM/YYYY") ?? "---",
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
      selector: (row: any) => row?.symptom ?? "---",
    },
    {
      name: "Ghi chú",
      selector: (row: any) => row?.note ?? "---",
    },
  ];

  const selectedHeading = useSelector(
    (state: RootState) => state.headingExamination.selectedHeadings
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
  const statusColumn = {
    name: "Trạng thái",
    cell: (row: any) => <LabelStatus type={row?.status} />,
  };

  const action = {
    name: "Thao tác",
    cell: (row: any) => (
      <div className="flex items-center gap-x-[2px]">
        {auth?.role?.roleNumber == 3 ? null : (
          <>
            {row?.status === "running" && (
              <>
                <button
                  onClick={() => navigate(`/examination/${row?._id}`)}
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
                <button
                  onClick={() => handleShowModel({ type: "done", data: row })}
                  className="button-nutri text-[#585858]"
                >
                  <img
                    style={{ border: "none" }}
                    src={IconExamDone}
                    width={20}
                    height={20}
                    alt=""
                  />
                </button>
              </>
            )}
            {row?.status === "done" && (
              <>
                <button
                  onClick={() => getService(row)}
                  className="button-nutri text-[#585858]"
                >
                  <img width={20} height={20} src={IconPrint} alt="print" />
                </button>
                <button
                  onClick={() => handleChangeStatus("running", row._id)}
                  className="button-nutri text-[#585858]"
                >
                  <img
                    style={{ border: "none" }}
                    src={IconBack}
                    width={20}
                    height={20}
                    alt=""
                  />
                </button>
              </>
            )}
            {row?.status === "waiting" && (
              <>
                <button
                  onClick={() => handleChangeStatus("running", row._id)}
                  className="button-nutri text-[#585858]"
                >
                  <img
                    style={{ border: "none" }}
                    src={IconExam}
                    width={20}
                    height={20}
                    alt=""
                  />
                </button>
                <button
                  onClick={() => navigate(`/examination/${row?._id}`)}
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
                <button
                  onClick={() => handleShowModel({ type: "cancel", data: row })}
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
              </>
            )}
          </>
        )}
        
      </div>
    ),
  };

  const newHeading = [...deserializedHeadings, statusColumn, action];

  const handlePageClick = (event: any) => {
    const page = event.selected + 1;
    setQuery({ ...query, _page: page });
  };

  const handleLimitChange = (data: any) => {
    setQuery({ ...query, _limit: data.value });
  };

  const gotoDetail = (id: any) => {
    navigate(`/examination/${id}/view`, { state: { action: "examination" } });
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => {
      setOpenModal(false);
    },
    copyStyles: true,
  });

  const handleClickPrint = (item: any, services: any) => {
    setOpenModal(true);
    setDataPrint({ ...item, services });
    setTimeout(() => {
      handlePrint();
    }, 500);
  };

  const handleChangeStatus = async (status: string, id: any) => {
    if (status === "cancel") {
      const now = new Date();
      const nowVietnam = new Date(
        now.getTime() + now.getTimezoneOffset() * 60000 + 7 * 60 * 60 * 1000
      );
      const day_cancel = nowVietnam.toISOString().slice(0, -1);
      const params = {
        status,
        day_cancel,
        _id: id,
      };
      const response: any = await UpdateExamination(params);
      if (response?.examination) {
        toast.success("chuyển trạng thái thành công!");
        handleGetExaminaton();
      } else {
        toast.error("Đã có lỗi sảy ra!!!");
      }
    } else {
      const now = new Date();
      const nowVietnam = new Date(
        now.getTime() + now.getTimezoneOffset() * 60000 + 7 * 60 * 60 * 1000
      );
      const day_running = nowVietnam.toISOString().slice(0, -1);
      const params = {
        status,
        day_running,
        _id: id,
      };
      const response: any = await UpdateExamination(params);
      if (response?.examination) {
        toast.success("Chuyển trạng thái thành công!");
        handleGetExaminaton();
      } else {
        toast.error("Đã có lỗi sảy ra!!!");
      }
    }
  };

  const handleShowModel = (data: any) => {
    setOpenModal(true);
    setItemExamination(data);
  };

  const onOk = async () => {
    if (itemExamination?.type == "cancel") {
      handleChangeStatus("cancel", itemExamination?.data?._id);
      setOpenModal(false);
      return;
    }
    if (itemExamination?.type == "done") {
      handleChangeStatus("done", itemExamination?.data?._id);
      setOpenModal(false);
      return;
    }
  };

  const handleStatusChange = (selectedOpiton: any) => {
    if (selectedOpiton.value !== "") {
      setQuery({ ...query, status: selectedOpiton.value });
      urlParams.set("status", selectedOpiton.value);
      navigate(`?${urlParams}`);
    } else {
      setQuery({ ...query, status: ["waiting", "running", "done", "cancel"] });
      urlParams.delete("status");
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
    setQuery({ ...query, day_welcome: date });
    urlParams.set("day", date);
    navigate(`?${urlParams}`);
  };

  return (
    <Layout>
      <Heading>Danh sách phiếu khám</Heading>
      <FilterExamination
        columns={columns}
        handleChangeStatus={handleStatusChange}
        handleDayChange={handleDayChange}
        handleSearch={handleSearch}
        handleSearchByDoctorId={handleSearchByDoctorId}
        handleClinicChange={handleSearchByClinic}
        clinics={clinics}
        dataDoctors={dataDoctors}
      ></FilterExamination>
      <Table3
        columns={newHeading}
        gotoDetail={gotoDetail}
        data={examinations}
        isLoading={loading}
      />
      <Pagination
        handlePageClick={handlePageClick}
        pageCount={totalPages}
        handleLimitChange={handleLimitChange}
        optionsPagination={optionsPagination}
        totalDocs={totalDocs}
        totalPages={totalPages}
      ></Pagination>
      {openModal && itemExamination?.type == "print" ? (
        <PrintExamination
          componentRef={componentRef}
          dataPrint={dataPrint}
        ></PrintExamination>
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
          {itemExamination?.type == "cancel" && (
            <div className="flex flex-col items-center justify-center py-4 text-sm">
              <p>Bạn có chắc hủy phiếu khám này không?</p>
              <span className="text-center text-[#ff5c75] font-bold">
                {itemExamination?.data?._id}
              </span>
            </div>
          )}
          {itemExamination?.type == "done" && (
            <div className="flex flex-col items-center justify-center py-4 text-sm">
              <p>Bạn có chắc hoàn thành phiếu khám này không?</p>
              <span className="text-center text-[#ff5c75] font-bold">
                {itemExamination?.data?._id}
              </span>
            </div>
          )}
        </Modal>
      )}
    </Layout>
  );
};

export default ExaminationList;
