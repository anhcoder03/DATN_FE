import { useEffect, useState } from "react";
import { FilterReceptionBook } from "../../../components/filters";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import {
  UpdateExamination,
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
import { getAllByName } from "../../../services/role.service";

const ReceptionBook = () => {
  const optionsPagination = [
    { value: 25, label: "25 bản ghi" },
    { value: 50, label: "50 bản ghi" },
    { value: 100, label: "100 bản ghi" },
  ];
  const auth: any = useSelector((state: RootState) => state.auth.auth?.user);
  const [bookings, setBookings] = useState<any[]>();
  const [booking, setBooking] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [totalDocs, setTotalDocs] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [dataStaffs, setDataStaffs] = useState<any[]>([]);
  const urlParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const [query, setQuery] = useState({
    _page: 1,
    _limit: 25,
    _sort: "createdAt",
    _order: "desc",
    status: "booking",
    search: "",
    day_booking: null,
    staffId: null,
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
      selector: (row: { customerId: { gender: any } }) =>
        row?.customerId.gender,
    },
    {
      name: "Số điện thoại",
      selector: (row: { customerId: { phone: any } }) => row?.customerId?.phone,
    },
    {
      name: "Ngày đặt lịch",
      selector: (row: { day_booking: moment.MomentInput }) =>
        moment(row?.day_booking).format("DD/MM/YYYY"),
    },
    {
      name: "Nhân viên tiếp đón",
      selector: (row: { staffId: { name: any } }) => row?.staffId?.name,
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
    const now = new Date();
    const nowVietnam = new Date(
      now.getTime() + now.getTimezoneOffset() * 60000 + 7 * 60 * 60 * 1000
    );
    const day_welcome = nowVietnam.toISOString().slice(0, -1);
    const params = {
      status: "recetion",
      _id: id,
      day_welcome,
    };
    const response: any = await UpdateExamination(params);
    if (response?.examination) {
      toast.success("chuyển trạng thái thành công!");
      navigate(`/reception/${id}`);
    } else {
      toast.error(response?.message);
    }
  };

  const action = {
    name: "Thao tác",
    cell: (row: { _id: any }) => (
      <>
        {auth?.role?.roleNumber == 1 || auth?.role?.roleNumber == 3 ? null : (
          <div className="flex items-center gap-x-3">
            <button
              onClick={() =>
                handleUpdate({ type: "statusReception", data: row })
              }
              className="button-nutri text-[#585858]"
            >
              <img width={20} height={20} src={IconHand} alt="tiếp đón" />
            </button>
            <button
              onClick={() => handleUpdate({ type: "remove", data: row })}
              className="button-nutri text-[#585858]"
            >
              <IconTrash />
            </button>
            <button
              onClick={() => {
                if (
                  auth?.role?.roleNumber == 1 ||
                  auth?.role?.roleNumber == 3
                ) {
                  toast.warning("Bạn không có quyền thực hiện hành động này!");
                  return;
                }
                navigate(`/reception/booking/update/${row?._id}`);
              }}
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
        )}
      </>
    ),
  };
  const newHeading = [...deserializedHeadings, action];
  const handlePageClick = (event: any) => {
    const page = event.selected + 1;
    setQuery({ ...query, _page: page });
  };

  const onOk = async () => {
    if (booking?.type == "remove") {
      const res = await UpdateExamination({
        _id: booking?.data?._id,
        status: "cancel_schedule",
      });
      if (res?.examination) {
        toast.success("Huỷ đặt lịch thành công!");
        setOpenModal(false);
        handleGetExamination();
      } else {
        toast.error(res?.message);
        setOpenModal(false);
      }
      return;
    }
    if (booking?.type == "statusReception") {
      handleChangeStatus(booking?.data?._id);
      setOpenModal(false);
      return;
    }
  };

  const gotoDetail = (id: any) => {
    navigate(`/reception/booking/${id}`);
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
    setQuery({ ...query, day_booking: dateInUtcPlus7.format() as any });
    urlParams.set("day_booking", dateInUtcPlus7.format());
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

  return (
    <>
      <FilterReceptionBook
        handleSearch={handleSearch}
        columns={columns}
        handleDayChange={handleDayChange}
        dataStaffs={dataStaffs}
        handleSearchByStaffId={handleSearchByStaffId}
      ></FilterReceptionBook>
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
        {booking?.type == "remove" && (
          <div className="flex flex-col items-center justify-center py-4 text-sm">
            <p>Bạn có chắc muốn huỷ phiếu đặt lịch này?</p>
            <span className="text-center text-[#ff5c75] font-bold">
              {booking?.data?._id}
            </span>
          </div>
        )}
        {booking?.type == "statusReception" && (
          <div className="flex flex-col items-center justify-center py-4 text-sm">
            <p>Bạn có chắc muốn tiếp đón phiếu đặt lịch này?</p>
            <span className="text-center text-[#ff5c75] font-bold">
              {booking?.data?._id}
            </span>
          </div>
        )}
      </Modal>
    </>
  );
};

export default ReceptionBook;
