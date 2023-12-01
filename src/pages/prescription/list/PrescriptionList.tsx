import { useEffect, useState } from "react";
import { Layout } from "../../../components/layout";
import { Table } from "../../../components/table";
import IconEdit from "../../../assets/images/icon-edit.png";
import { useNavigate } from "react-router";
import { IconTrash } from "../../../components/icons";
import { Pagination } from "../../../components/pagination";
import Heading from "../../../components/common/Heading";
import {
  deletePrescription,
  getAllPrescription,
} from "../../../services/prescription.service";
import moment from "moment";
import { toast } from "react-toastify";
import { Modal } from "antd";
import FilterPrescription from "../components/filter/FilterPrescription";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
const optionsPagination = [
  { value: 25, label: "25 bản ghi" },
  { value: 50, label: "50 bản ghi" },
  { value: 100, label: "100 bản ghi" },
];
const PrescriptionList = () => {
  const auth: any = useSelector((state: RootState) => state.auth.auth?.user);
  const [prescriptions, setPrescriptions] = useState<any>();
  const [prescription, setPrescription] = useState<any>();
  const [totalPages, setTotalPages] = useState(1);
  const [totalDocs, setTotalDocs] = useState(1);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const urlParams = new URLSearchParams(location.search);
  const [query, setQuery] = useState({
    _page: 1,
    _limit: 25,
    search: "",
  });
  const navigate = useNavigate();
  const gotoDetail = (item: any) => {
    navigate(`/prescription/view/${item?._id}`);
  };
  const headings = [
    "Mã Đơn",
    "Khách Hàng",
    "Bác Sỹ",
    "Ngày Kê",
    "Trạng Thái Đơn Thuốc",
    "Hành Động",
  ];
  const handleGetPrescription = async () => {
    try {
      setLoading(true);
      const data = await getAllPrescription(query);
      setLoading(false);
      setTotalPages(data.totalPages);
      setTotalDocs(data.totalDocs);
      setPrescriptions(data.docs);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    document.title = "Danh sách đơn thuốc";
    urlParams.set("page", query._page as any);
    urlParams.set("limit", query._limit as any);
    navigate(`?${urlParams}`);
    handleGetPrescription();
  }, [query]);
  console.log("prescriptions", prescriptions);

  const handlePageClick = (event: any) => {
    const page = event.selected + 1;
    setQuery({ ...query, _page: page });
  };
  const handleLimitChange = (data: any) => {
    setQuery({ ...query, _limit: data.value });
  };
  const handleDayChange = (date: any) => {
    setQuery({ ...query, createdAt: date });
    urlParams.set("createdAt", date);
    navigate(`?${urlParams}`);
  };
  const handleShowModel = (data: any) => {
    setOpenModal(true);
    setPrescription(data);
  };
  const handleSearch = (e: any) => {
    setQuery({ ...query, search: e });
    if (e !== "") {
      urlParams.set("_id", e);
      navigate(`?${urlParams}`);
    } else {
      urlParams.delete("_id");
      navigate(`?${urlParams}`);
    }
  };
  const onOk = async () => {
    const res = await deletePrescription(prescription?._id);
    if (res?.message) {
      toast.success(res?.message);
      setOpenModal(false);
      handleGetPrescription();
    } else {
      toast.error(res?.message);
    }
    setOpenModal(false);
  };

  return (
    <Layout>
      <Heading>Danh sách đơn thuốc</Heading>
      <FilterPrescription
        handleSearch={handleSearch}
        handleDayChange={handleDayChange}
      ></FilterPrescription>
      <div className="bg-white">
        <Table
          headings={headings}
          loading={loading}
          length={prescriptions?.length}
        >
          {prescriptions?.map((item: any) => (
            <tr
              className="text-xs"
              style={{ cursor: "pointer" }}
              key={item?._id}
            >
              <td onClick={() => gotoDetail(item)}>{item?._id}</td>
              <td onClick={() => gotoDetail(item)}>
                {item?.medicalExaminationSlipId?.customer?.name}
              </td>
              <td onClick={() => gotoDetail(item)}>{item?.doctorId?.name}</td>
              <td onClick={() => gotoDetail(item)}>
                {moment(item?.createdAt).format("DD/MM/YYYY")}
              </td>
              <td onClick={() => gotoDetail(item)}>{item?.status}</td>
              <td>
                {
                  (auth?.role?.roleNumber == 2 || auth?.role?.roleNumber == 3 ) ? null : (
                    <div className="table-action">
                      <div
                        className="button-nutri"
                        onClick={() => {
                          navigate(`/product/update/${item?._id}`);
                        }}
                      >
                        <img width={20} height={20} src={IconEdit} alt="edit" />
                      </div>
                      <button
                        className="button-nutri text-[#585858]"
                        onClick={() => handleShowModel(item)}
                      >
                        <IconTrash></IconTrash>
                      </button>
                    </div>
                  )
                }
                
              </td>
            </tr>
          ))}
        </Table>
        <Pagination
          handlePageClick={handlePageClick}
          pageCount={totalPages}
          handleLimitChange={handleLimitChange}
          optionsPagination={optionsPagination}
          totalDocs={totalDocs}
          totalPages={totalPages}
        ></Pagination>
      </div>
      <Modal
        centered
        open={openModal}
        onOk={onOk}
        onCancel={() => setOpenModal(false)}
      >
        <h1 className="text-[#4b4b5a] pb-4 border-b border-b-slate-200 font-bold text-center text-[18px]">
          Thông Báo
        </h1>
        <div className="flex flex-col items-center justify-center py-4 text-sm">
          <p>Bạn có chắc muốn xoá đơn thuốc này không</p>
          <span className="text-center text-[#ff5c75] font-bold">
            {prescription?._id}
          </span>
        </div>
      </Modal>
    </Layout>
  );
};

export default PrescriptionList;
