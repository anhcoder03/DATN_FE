import { Layout } from "../../components/layout";
import Heading from "../../components/common/Heading";
import { FilterExamination } from "../../components/filters";
import IconTrash2 from "../../assets/images/icon-trash2.png";
import IconExam from "../../assets/images/icon/ic_exam-gray.svg";
import IconExamDone from "../../assets/images/icon/ic_examdone-gray.svg";
import IconBack from "../../assets/images/icon/ic_back-gray.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { getAllExamination } from "../../services/examination.service";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import CalcUtils from "../../helpers/CalcULtils";
import { Table3 } from "../../components/table";
import { LabelStatus } from "../../components/label";
import { BsPrinter } from "react-icons/bs";
import IconEdit from "../../assets/images/icon-edit.png";
import { Pagination } from "../../components/pagination";

const ExaminationList = () => {
  const [examinations, setExamination] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [totalDocs, setTotalDocs] = useState(1);
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
    _sort: "createdAt",
    _order: "desc",
    status,
  });
  const urlParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
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
  const columns = [
    {
      name: "Mã bệnh nhân",
      selector: (row: any) => row?.customerId?._id,
    },
    {
      name: "Tên bệnh nhân",
      selector: (row: any) => row?.customerId.name,
    },
    {
      name: "Tuổi",
      selector: (row: { customerId: { dateOfBirth: any } }) =>
        CalcUtils.calculateAge(row.customerId?.dateOfBirth),
    },
    {
      name: "Giới tính",
      selector: (row: { customerId: { gender: any } }) =>
        row?.customerId?.gender || "---",
    },
    {
      name: "Số điện thoại",
      selector: (row: { customerId: { phone: any } }) => row.customerId.phone,
    },
    {
      name: "Ngày tiếp đón",
      selector: (row: { day_welcome: moment.MomentInput }) =>
        moment(row?.day_welcome).format("DD/MM/YYYY"),
    },
    {
      name: "Nhân viên tiếp đón",
      selector: (row: { staffId: { name: any } }) => row?.staffId.name,
    },
    {
      name: "Bác sĩ",
      selector: (row: { doctorId: { name: any } }) => row?.doctorId.name,
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
        {row?.status === "waiting" && (
          <button
            onClick={() => console.log(row._id)}
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
        )}
        {row?.status === "running" && (
          <button
            onClick={() => console.log(row._id)}
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
        )}
        {row?.status === "running" && (
          <button
            onClick={() => console.log(row._id)}
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
        )}
        {row?.status === "done" && (
          <button
            onClick={() => console.log(row._id)}
            className="button-nutri text-[#585858]"
          >
            <span className="text-base">
              <BsPrinter />
            </span>
          </button>
        )}
        {row?.status === "done" && (
          <button
            onClick={() => console.log(row._id)}
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
        )}
        {row?.status === "waiting" && (
          <button
            onClick={() => console.log(row._id)}
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
        )}
        {row?.status === "waiting" && (
          <button
            onClick={() => console.log(row._id)}
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
    navigate(`/examination/${id}`)
  }
  return (
    <Layout>
      <Heading>Danh sách phiếu khám</Heading>
      <FilterExamination columns={columns}></FilterExamination>
      <Table3 columns={newHeading} gotoDetail = {gotoDetail} data={examinations} isLoading={loading} />
      <Pagination
        handlePageClick={handlePageClick}
        pageCount={totalPages}
        handleLimitChange={handleLimitChange}
        optionsPagination={optionsPagination}
        totalDocs={totalDocs}
        totalPages={totalPages}
      ></Pagination>
    </Layout>
  );
};

export default ExaminationList;
