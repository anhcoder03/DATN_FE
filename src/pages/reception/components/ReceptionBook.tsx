import { useEffect, useState } from "react";
import { FilterReceptionBook } from "../../../components/filters";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import {
  UpdateExamination,
  deleteExamination,
  getAllExamination,
} from "../../../services/examination.service";
import { Table3 } from "../../../components/table";
import moment from "moment";
import { IconTrash } from "../../../components/icons";
import IconEdit from "../../../assets/images/icon-edit.png";
import CalcUtils from "../../../helpers/CalcULtils";
import { Pagination } from "../../../components/pagination";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
import IconHand from "../../../assets/images/icon-hand.png";
import { toast } from "react-toastify";

const ReceptionBook = () => {
  const optionsPagination = [
    { value: 25, label: "25 bản ghi" },
    { value: 50, label: "50 bản ghi" },
    { value: 100, label: "100 bản ghi" },
  ];
  const [bookings, setBookings] = useState<any[]>();
  const [booking, setBooking] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [totalDocs, setTotalDocs] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const urlParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const [query, setQuery] = useState({
    _page: 1,
    _limit: 25,
    _sort: "createdAt",
    _order: "desc",
    status: "booking",
  });
  const columns = [
    {
      name: "Tên bệnh nhân",
      selector: function (row: any) {
        return row.customerId._id;
      },
    },
    {
      name: "Tuổi",
      selector: (row: { customerId: { dateOfBirth: any } }) =>
        CalcUtils.calculateAge(row.customerId?.dateOfBirth),
    },
    {
      name: "Giới tính",
      selector: (row: { customerId: { gender: any } }) => row.customerId.gender,
    },
    {
      name: "Số điện thoại",
      selector: (row: { customerId: { phone: any } }) => row.customerId.phone,
    },
    {
      name: "Ngày đặt lịch",
      selector: (row: { day_booking: moment.MomentInput }) =>
        moment(row?.day_booking).format("DD/MM/YYYY"),
    },
    {
      name: "Nhân viên tiếp đón",
      selector: (row: { staffId: { name: any } }) => row.staffId.name,
    },
    {
      name: "Ngày tạo",
      selector: (row: { createdAt: moment.MomentInput }) =>
        moment(row?.createdAt).format("DD/MM/YYYY"),
    },
  ];
  const handleUpdate = (data: any) => {
    setOpenModal(true);
    setBooking(data);
  };

  const handleGetExamination = async () => {
    try {
      setLoading(true);
      const data = await getAllExamination(query);
      setLoading(false);
      setTotalPages(data.totalPages);
      setTotalDocs(data.totalDocs);
      setBookings(data.docs);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    urlParams.set("page", query._page as any);
    urlParams.set("limit", query._limit as any);
    navigate(`?${urlParams}`);
    handleGetExamination();
  }, [query]);
  const handleLimitChange = (data: any) => {
    setQuery({ ...query, _limit: data.value });
  };
  const selectedHeading = useSelector(
    (state: RootState) => state.headingBooking.selectedHeadings
  );
  const deserializedHeadings = selectedHeading.map((heading: any) => {
    return {
      name: heading.name,
      selector: eval(heading.selector),
    };
  });

  const handleChangeStatus = async (id: any) => {
    const params = {
      status: "recetion",
      _id: id,
    };
    const response: any = await UpdateExamination(params);
    if (response?.examination) {
      toast.success("chuyển trạng thái thành công!");
      navigate(`/reception/${id}`);
    } else {
      toast.error("Đã có lỗi sảy ra!!!");
    }
  };

  const action = {
    name: "Thao tác",
    cell: (row: { _id: any }) => (
      <div className="flex items-center gap-x-3">
        <button
          onClick={() => handleChangeStatus(row?._id)}
          className="button-nutri text-[#585858]"
        >
          <img width={20} height={20} src={IconHand} alt="tiếp đón" />
        </button>
        <button
          onClick={() => handleUpdate(row)}
          className="button-nutri text-[#585858]"
        >
          <IconTrash />
        </button>
        <button
          onClick={() => navigate(`/reception/booking/update/${row?._id}`)}
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
      </div>
    ),
  };
  const newHeading = [...deserializedHeadings, action];
  const handlePageClick = (event: any) => {
    const page = event.selected + 1;
    setQuery({ ...query, _page: page });
  };
  const onOk = async () => {
    const res = await deleteExamination(booking?._id);
    if (res?.examination) {
      toast.success(res?.message);
      setOpenModal(false);
      handleGetExamination();
    } else {
      setOpenModal(false);
    }
  };
  const gotoDetail = (id: any) => {
    navigate(`/reception/booking/${id}`);
  };

  return (
    <>
      <FilterReceptionBook columns={columns}></FilterReceptionBook>
      <Table3
        isLoading={loading}
        columns={newHeading}
        data={bookings}
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
        onOk={onOk}
        onCancel={() => setOpenModal(false)}
      >
        <h1 className="text-[#4b4b5a] pb-4 border-b border-b-slate-200 font-bold text-center text-[18px]">
          Thông Báo
        </h1>
        <div className="flex flex-col items-center justify-center py-4 text-sm">
          <p>Bạn có chắc muốn xoá phiếu đặt lịch</p>
          <span className="text-center text-[#ff5c75] font-bold">
            {booking?._id}
          </span>
        </div>
      </Modal>
    </>
  );
};

export default ReceptionBook;
