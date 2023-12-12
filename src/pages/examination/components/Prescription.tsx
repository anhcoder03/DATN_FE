import { useEffect, useRef, useState } from "react";
import { Table } from "../../../components/table";
import IconEdit from "../../../assets/images/icon-edit.png";
import { IconPlus, IconSearch, IconTrash } from "../../../components/icons";
import { Pagination } from "../../../components/pagination";
import {
  deletePrescription,
  getAllPrescription,
  getPrescriptionByExamination,
  updatePrescription,
} from "../../../services/prescription.service";
import moment from "moment";
import { toast } from "react-toastify";
import { Modal } from "antd";
import IconPrint from "../../../assets/images/ic-print.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import Printprescription from "../../../components/print/Printprescription";
import { renderStatus } from '../../../constants/label';
import { Field } from "../../../components/field";
import { Label } from "../../../components/label";
import { Textarea } from "../../../components/textarea";
import { useForm } from "react-hook-form";

const optionsPagination = [
  { value: 25, label: "25 bản ghi" },
  { value: 50, label: "50 bản ghi" },
  { value: 100, label: "100 bản ghi" },
];

const Prescription = ({ id }: any) => {
  const auth: any = useSelector((state: RootState) => state.auth.auth?.user);
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
  const [action, setAction] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const urlParams = new URLSearchParams(location.search);
  const [data, setData] = useState<any>({
    cancel_reason: ''
  })
  const {
    control
  } = useForm<any>()
  const [query, setQuery] = useState({
    _page: 1,
    _limit: 25,
    search: "",
    createdAt: null,
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
      const data = await getPrescriptionByExamination(id, query);
      setLoading(false);
      if (data != undefined) {
        setPrescriptions(data.docs);
        setTotalPages(data.totalPages);
        setTotalDocs(data.totalDocs);
      }
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

  const handlePageClick = (event: any) => {
    const page = event.selected + 1;
    setQuery({ ...query, _page: page });
  };

  const handleLimitChange = (data: any) => {
    setQuery({ ...query, _limit: data.value });
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

  const handleChangeInput = (event?: any) => {
    let { value, name } = event.target
    if (value === " ") return;
    setData({
        ...data,
        [name]: value
    })
  }

  const onOk = async () => {
    const params = {
      status: 3,
      _id: prescription?.data?._id,
      cancel_reason: data?.cancel_reason
    }
    const res = await updatePrescription(params);
    if (res?.message) {
      toast.success('Huỷ đơn thuốc thành công!');
      setOpenModal(false);
      handleGetPrescription();
    } else {
      toast.error(res?.message);
    }
    setOpenModal(false);
  };

  const handleClickPrint = () => {
    setOpenModal(true);
    setAction({ type: "print" });
    setTimeout(() => {
      handlePrint();
    }, 500);
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      setQuery({ ...query, search: e.target.value });
    }
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
            onKeyDown={(e: any) => handleKeyDown(e)}
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
        dataPrint={prescriptions}
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
              <td onClick={() => gotoDetail(item)}>{renderStatus(item?.status)}</td>
              <td>
                {auth?.role?.roleNumber == 2 ||
                auth?.role?.roleNumber == 3 ? null : (
                  <div className="table-action">
                    {
                      item?.status !== 3 && (
                        <div
                          className="button-nutri"
                          onClick={() => {
                            navigate(`/prescription/update/${item?._id}`);
                          }}
                        >
                          <img width={20} height={20} src={IconEdit} alt="edit" />
                        </div>
                      )
                    }
                    {
                      item?.status !== 3 && (
                        <button
                          className="button-nutri text-[#585858]"
                          onClick={() => {
                            if(item?.paymentStatus == 1) {
                              toast.warning('Không thể huỷ kê đơn đã thanh toán!');
                              return
                            }
                            handleShowModel({type: 'cancel', data: item})
                          } }
                        >
                          <IconTrash></IconTrash>
                        </button>
                      )
                    }
                    <button
                      onClick={() => handleClickPrint()}
                      className="button-nutri text-[#585858]"
                    >
                      <img width={20} height={20} src={IconPrint} alt="print" />
                    </button>
                  </div>
                )}
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
        {action?.type !== "print" && (
          <Modal
            centered
            open={openModal}
            onOk={onOk}
            onCancel={() => setOpenModal(false)}
          >
            {
              prescription?.type == 'cancel' && (
                <>
                  <h1 className="text-[#4b4b5a] pb-4 border-b border-b-slate-200 font-bold text-center text-[18px]">
                    Thông báo
                  </h1>
                  <div className="flex flex-col justify-center py-4 text-sm">
                    <p className="text-center">Bạn có chắc muốn huỷ đơn thuốc này không</p>
                    <span className="text-center text-[#ff5c75] font-bold">
                      {prescription?.data?._id}
                    </span>
                    <Field>
                      <Label className="font-semibold" htmlFor="note">
                        Lời dặn
                      </Label>
                      <Textarea
                        control={control}
                        className="outline-none input-primary"
                        name="cancel_reason"
                        placeholder="Nhập lời dặn cho khách hàng"
                        value={data?.cancel_reason}
                        onChange={(val: any) => {
                          handleChangeInput(val);
                        }}
                      />
                    </Field>
                  </div>
                </>
              )
            }
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Prescription;
