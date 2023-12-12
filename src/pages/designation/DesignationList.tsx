import { useEffect, useRef, useState } from "react";
import { Layout } from "../../components/layout";
import {
  deleteServiceByExamination,
  getAllServiceByExamination,
} from "../../services/designation.service";
import Heading from "../../components/common/Heading";
import { Table } from "../../components/table";
import { IconTrash } from "../../components/icons";
import IconEdit from "../../assets/images/icon-edit.png";
import PriceUtils from "../../helpers/PriceUtils";
import { Pagination } from "../../components/pagination";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "antd";
import Filter from "./components/Filter";
import { getAllByName } from "../../services/role.service";
import { getAllClinic } from "../../services/clinic.service";
import { LabelStatusDesignation } from "../../components/label";
import { toast } from "react-toastify";
import IconPrint from "../../assets/images/ic-print.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useReactToPrint } from "react-to-print";
import DesignationPrint from "./components/DesignationPrint";

const headings = [
  "Mã Phiếu",
  "Khách hàng",
  "Dịch Vụ",
  "Trạng thái thanh toán",
  "Thành tiền",
  "Trạng Thái thực hiện",
  "Thao tác",
];
const optionsPagination = [
  { value: 25, label: "25 bản ghi" },
  { value: 50, label: "50 bản ghi" },
  { value: 100, label: "100 bản ghi" },
];

const DesignationList = () => {
  const auth: any = useSelector((state: RootState) => state.auth.auth?.user);
  const [totalPages, setTotalPages] = useState(1);
  const [openModal, setOpenModal] = useState(false);

  const [totalDocs, setTotalDocs] = useState(1);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [clinics, setClinics] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [designation, setDesignation] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState({
    _page: 1,
    _limit: 25,
    _sort: "createdAt",
    _order: "desc",
    search: "",
    status: "",
    doctorId: "",
    clinicId: "",
    createdAt: "",
    paymentStatus: "",
  });
  const urlParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const componentRef = useRef(null);
  const [dataPrint, setDataPrint] = useState<any>();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    copyStyles: true,
  });

  const handlePrintDes = (data: any) => {
    setOpenModal(true);
    setDataPrint(data);
    setTimeout(() => {
      handlePrint();
    }, 1000);
  };

  const handlegetAllDesignation = async () => {
    try {
      setLoading(true);
      const data = await getAllServiceByExamination(query);
      setLoading(false);
      setTotalPages(data.totalPages);
      setTotalDocs(data.totalDocs);
      setData(data.docs);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLimitChange = (data: any) => {
    setQuery({ ...query, _limit: data.value });
  };

  const handleSearch = (e: any) => {
    setQuery({ ...query, search: e });
    if (e !== "") {
      urlParams.set("id", e);
      navigate(`?${urlParams}`);
    } else {
      urlParams.delete("id", e);
      navigate(`?${urlParams}`);
    }
  };

  const handleSearchByDoctor = (selectedOpiton: any) => {
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

  const handleStatusChange = (selectedOpiton: any) => {
    setQuery({ ...query, status: selectedOpiton.value });
    if (selectedOpiton.value !== "") {
      urlParams.set("status", selectedOpiton.value);
      navigate(`?${urlParams}`);
    } else {
      urlParams.delete("status");
      navigate(`?${urlParams}`);
    }
  };

  const handlePaymentStatusChange = (selectedOpiton: any) => {
    setQuery({ ...query, paymentStatus: selectedOpiton.value });
    if (selectedOpiton.value !== "") {
      urlParams.set("payment_status", selectedOpiton.value);
      navigate(`?${urlParams}`);
    } else {
      urlParams.delete("payment_status");
      navigate(`?${urlParams}`);
    }
  };

  const handleDayChange = (date: any) => {
    setQuery({ ...query, createdAt: date });
    urlParams.set("createdAt", date);
    navigate(`?${urlParams}`);
  };

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
      setDoctors([{ value: "", label: "-Bác sĩ-" }, ...ListArr]);
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

  useEffect(() => {
    document.title = "Danh sách đơn dịch vụ";
    urlParams.set("page", query._page as any);
    urlParams.set("limit", query._limit as any);
    navigate(`?${urlParams}`);
    handlegetAllDesignation();
  }, [query]);

  const gotoDetail = (item: any) => {
    navigate(`/designation/${item?._id}/view`);
  };

  const handlePageClick = (event: any) => {
    const page = event.selected + 1;
    setQuery({ ...query, _page: page });
  };

  const handleShowModel = (data: any) => {
    setOpenModal(true);
    setDesignation(data);
  };

  const onOk = async () => {
    if (designation?.type == "cancel") {
      console.log("designation", designation);
      const res = await deleteServiceByExamination(designation?.data?._id);
      if (res?.designation) {
        toast.success("Huỷ dịch vụ thành công!");
        setOpenModal(false);
        handlegetAllDesignation();
      } else {
        toast.error(res?.message);
      }
    }
    setOpenModal(false);
  };

  return (
    <Layout>
      <Heading>Danh sách đơn dịch vụ</Heading>
      <Filter
        dataDoctor={doctors}
        dataClinic={clinics}
        handleSearch={handleSearch}
        handleDoctorChange={handleSearchByDoctor}
        handleClinicChange={handleSearchByClinic}
        handleDayChange={handleDayChange}
        handleStatusChange={handleStatusChange}
        handlePaymentStatusChange={handlePaymentStatusChange}
      ></Filter>
      <div className="bg-white">
        <Table headings={headings} loading={loading} length={data?.length}>
          {data?.map((item) => (
            <tr
              className="text-xs"
              key={item?._id}
              style={{ cursor: "pointer" }}
            >
              <td onClick={() => gotoDetail(item)}>{item._id}</td>
              <td
                onClick={() => gotoDetail(item)}
              >{`${item?.customerId?._id} - ${item?.customerId?.name}`}</td>
              <td onClick={() => gotoDetail(item)}>
                {item?.service_examination?.name}
              </td>
              <td onClick={() => gotoDetail(item)}>
                <LabelStatusDesignation type={item?.paymentStatus} />
              </td>
              <td onClick={() => gotoDetail(item)}>
                {PriceUtils.format(item?.service_examination?.price)}
              </td>
              <td onClick={() => gotoDetail(item)}>
                <LabelStatusDesignation type={item?.status} />
              </td>
              <td>
                <div className="table-action">
                  {item?.status == "done" && (
                    <div
                      className="button-nutri"
                      onClick={() => {
                        handlePrintDes(item);
                      }}
                    >
                      <img width={20} height={20} src={IconPrint} alt="print" />
                    </div>
                  )}
                  {auth?.role?.roleNumber == 2 ||
                  auth?.role?.roleNumber == 3 ? null : (
                    <>
                      {item?.status !== "done" && (
                        <div
                          className="button-nutri"
                          onClick={() => {
                            navigate(`/designation/update/${item?._id}`);
                          }}
                        >
                          <img
                            width={20}
                            height={20}
                            src={IconEdit}
                            alt="edit"
                          />
                        </div>
                      )}
                      {item?.status == "waiting" && (
                        <button
                          className="button-nutri text-[#585858]"
                          onClick={() =>
                            handleShowModel({ type: "cancel", data: item })
                          }
                        >
                          <IconTrash></IconTrash>
                        </button>
                      )}
                    </>
                  )}
                </div>
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
      {openModal && dataPrint !== undefined ? (
        <div style={{ height: 0, overflow: "hidden" }}>
          <DesignationPrint componentRef={componentRef} dataPrint={dataPrint} />
        </div>
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
          style={{ width: "80%", maxHeight: "70vh" }}
        >
          <h1 className="text-[#4b4b5a] pb-4 border-b border-b-slate-200 font-bold text-center text-[18px]">
            Thông Báo
          </h1>
          {designation?.type == "cancel" && (
            <div className="flex flex-col items-center justify-center py-4 text-sm">
              <p>Bạn có chắc hủy dịch vụ chỉ định này không?</p>
              <span className="text-center text-[#ff5c75] font-bold">
                {designation?.data?._id}
              </span>
            </div>
          )}
        </Modal>
      )}
    </Layout>
  );
};

export default DesignationList;
