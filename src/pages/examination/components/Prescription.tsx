import { useEffect, useRef, useState } from "react";
import { Table } from "../../../components/table";
import IconEdit from "../../../assets/images/icon-edit.png";
import { IconPlus, IconSearch, IconTrash } from "../../../components/icons";
import { Pagination } from "../../../components/pagination";
import {
  deletePrescription,
  getAllPrescription,
} from "../../../services/prescription.service";
import moment from "moment";
import { toast } from "react-toastify";
import { Modal } from "antd";
import IconPrint from "../../../assets/images/ic-print.svg";

import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useNavigate, useParams } from "react-router-dom";

import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import Printprescription from "../../../components/print/Printprescription";
const optionsPagination = [
  { value: 25, label: "25 bản ghi" },
  { value: 50, label: "50 bản ghi" },
  { value: 100, label: "100 bản ghi" },
];
const Prescription = (props: any) => {
  const auth: any = useSelector((state: RootState) => state.auth.auth?.user);
  const { id } = useParams();
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => {
      setOpenModal(false);
    },
    copyStyles: true,
  });
  const [prescriptions, setPrescriptions] = useState<any>();
  const [prescription, setPrescription] = useState<any>();
  const [totalPages, setTotalPages] = useState(1);
  const [totalDocs, setTotalDocs] = useState(1);
  const [action, setAction] = useState<any>()
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
      if (data != undefined) {
        setTotalPages(data.totalPages);
        const arr = data.docs?.filter((d: any) => d?.medicalExaminationSlipId?._id == id)
        setTotalDocs(arr?.length);
        setPrescriptions(arr);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(prescriptions, "prescriptions");

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
    const res = await deletePrescription(prescriptions?._id);
    if (res?.message) {
      toast.success(res?.message);
      setOpenModal(false);
      handleGetPrescription();
    } else {
      toast.error(res?.message);
    }
    setOpenModal(false);
  };
  const handleClickPrint = () => {
    setOpenModal(true);
    // setDataPrint(item);
    setAction({ type: "print" });
    setTimeout(() => {
      handlePrint();
    }, 500);
  };
  return (
    <div className="w-full">
      <div className="flex items-center justify-between bg-white border-b-gray-200 p-5 rounded-tr-md rounded-tl-md  w-full">
        <div className="filter-search flex items-center bg-transparent border border-gray-200 px-2 py-1 gap-2 rounded-lg h-[40px] min-w-[300px]">
          <IconSearch></IconSearch>
          <input
            type="text"
            className="w-full bg-transparent border-none outline-none"
            placeholder="Mã đơn"
          />
        </div>
        <Link
          to={`/prescription/add/${id}`}
          className="flex gap-2 px-3 py-2 rounded-lg bg-primary"
        >
          <div className="flex items-center p-1 bg-white rounded-lg text-primary">
            <IconPlus></IconPlus>
          </div>
          <span className="flex items-center text-sm text-white">Thêm</span>
        </Link>
      </div>
      <Printprescription
        componentRef={componentRef}
      // dataPrint={dataPrint}
      ></Printprescription>
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
                  (auth?.role?.roleNumber == 2 || auth?.role?.roleNumber == 3) ? null : (
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
                      <button
                        onClick={() => handleClickPrint()}
                        className="button-nutri text-[#585858]"
                      >
                        <img width={20} height={20} src={IconPrint} alt="print" />
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
        {
          action?.type !== "print" &&
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
        }
      </div>
    </div >
  );
};

export default Prescription;
