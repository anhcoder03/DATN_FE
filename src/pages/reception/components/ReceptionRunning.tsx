import { useSelector } from "react-redux";
import { FilterReceptionWaiting } from "../../../components/filters";
import { RootState } from "../../../redux/store";
import { useEffect, useState } from "react";
import { getAllExamination } from "../../../services/examination.service";
import { Table3 } from "../../../components/table";
import moment from "moment";
import CalcUtils from "../../../helpers/CalcULtils";
import { useNavigate } from "react-router-dom";
import { Pagination } from "../../../components/pagination";
import IconTrash2 from "../../../assets/images/icon-trash2.png";

const ReceptionRunning = () => {
  const [receptions, setReceptions] = useState<any[]>();
  // const [reception, setReception] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState({
    _page: 1,
    _limit: 25,
    _sort: "createdAt",
    _order: "desc",
    status: "running",
  });
  const [totalPages, setTotalPages] = useState(1);
  const [totalDocs, setTotalDocs] = useState(1);
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
        CalcUtils.calculateAge(row.customerId?.dateOfBirth),
    },
    {
      name: "Giới tính",
      selector: (row: { customerId: { gender: any } }) =>
        row?.customerId.gender,
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

  const selectedHeading = useSelector(
    (state: RootState) => state.headingWaiting.selectedHeadings
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

  const action = {
    name: "Thao tác",
    cell: (row: { _id: any }) => (
      <div className="flex items-center gap-x-[2px]">
        {/* <button
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
        </button> */}
      </div>
    ),
  };
  const newHeading = [...deserializedHeadings, action];

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

  const gotoDetail = (id: string) => {
    navigate(`/reception/${id}/view`);
  };
  return (
    <>
      <FilterReceptionWaiting columns={columns}></FilterReceptionWaiting>
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
    </>
  );
};

export default ReceptionRunning;
