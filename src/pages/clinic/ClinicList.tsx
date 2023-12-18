import { useEffect, useState } from "react";
import { Layout } from "../../components/layout";
import Heading from "../../components/common/Heading";
import { Pagination } from "../../components/pagination";
import IconEdit from "../../assets/images/icon-edit.png";
import { Table } from "../../components/table";
import { IconTrash } from "../../components/icons";
import { IClinic } from "../../types/clinic.type";
import { deleteClinic, getAllClinic } from "../../services/clinic.service";
import { useNavigate } from "react-router-dom";
import FilterClinic from "./components/FilterClinic";
import { toast } from "react-toastify";
import { Modal } from "antd";
import { Spin } from "antd";
import LoadingPage from "../../components/common/LoadingPage";

const ClinicList = () => {
  const [clinics, setClinics] = useState<IClinic[]>([]);
  const [clinic, setClinic] = useState<IClinic>();
  const [totalPages, setTotalPages] = useState(1);
  const [totalDocs, setTotalDocs] = useState(1);
  const [loading, setLoading] = useState(false);
  const urlParams = new URLSearchParams(location.search);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const headings = [
    "Mã Phòng",
    "Tên Phòng",
    "Mô tả",
    "Bác sỹ",
    "Trạng thái",
    "Thao Tác",
  ];

  const optionsPagination = [
    { value: 25, label: "25 bản ghi" },
    { value: 50, label: "50 bản ghi" },
    { value: 100, label: "100 bản ghi" },
  ];

  const [query, setQuery] = useState({
    _page: 1,
    _limit: 25,
    _sort: "createdAt",
    _order: "asc",
    search: "",
    _status: "",
  });

  const handlePageClick = (event: any) => {
    const page = event.selected + 1;
    setQuery({ ...query, _page: page });
  };

  const handleGetClinics = async () => {
    try {
      setLoading(true);
      const data = await getAllClinic(query);
      setLoading(false);
      setTotalPages(data.totalPages);
      setTotalDocs(data.totalDocs);
      setClinics(data.docs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    urlParams.set("page", query._page as any);
    urlParams.set("limit", query._limit as any);
    navigate(`?${urlParams}`);
    handleGetClinics();
  }, [query]);

  const handleSearch = (e: any) => {
    setQuery({ ...query, search: e });
    if (e !== "") {
      urlParams.set("name", e);
      navigate(`?${urlParams}`);
    } else {
      urlParams.delete("name", e);
      navigate(`?${urlParams}`);
    }
  };

  const handleLimitChange = (data: any) => {
    setQuery({ ...query, _limit: data.value });
  };

  const handleStatusChange = (selectedOpiton: any) => {
    setQuery({ ...query, _status: selectedOpiton.value });
    if (selectedOpiton.value != "") {
      urlParams.set("status", selectedOpiton.value);
      navigate(`?${urlParams}`);
    } else {
      urlParams.delete("status");
      navigate(`?${urlParams}`);
    }
  };

  const onOk = async () => {
    setLoading(true);
    const res = await deleteClinic(clinic?._id);
    setLoading(false)
    if (res?.clinic) {
      toast.success(res?.message);
      setOpenModal(false);
      handleGetClinics();
    } else {
      toast.error(res?.message);
    }
    setOpenModal(false);
  };
  
  const handleShowModel = (data: IClinic) => {
    setOpenModal(true);
    setClinic(data);
  };

  const gotoDetail = (item: any) => {
    navigate(`/configuration/clinic/${item?._id}`);
  };

  return (
      <Layout>
        <Heading>Quản Lý Phòng Khám</Heading>
        <div className="">
          <FilterClinic
            handleStatusChange={handleStatusChange}
            handleSearch={handleSearch}
          ></FilterClinic>
          <div className="bg-white">
            <Table headings={headings} loading={loading} length={clinics?.length}>
              {clinics?.map((item: IClinic) => (
                <tr
                  className="text-xs"
                  style={{ cursor: "pointer" }}
                  key={item._id}
                >
                  <td onClick={() => gotoDetail(item)}>{item?._id}</td>
                  <td onClick={() => gotoDetail(item)}>{item?.name}</td>
                  <td onClick={() => gotoDetail(item)}>{item?.description}</td>
                  <td onClick={() => gotoDetail(item)}>
                    {item?.doctorInClinic?.name}
                  </td>
                  <td
                    onClick={() => gotoDetail(item)}
                    style={{
                      cursor: "pointer",
                      color:
                        item?.status === "active"
                          ? "green"
                          : item?.status === "stop"
                          ? "red"
                          : "white",
                    }}
                  >
                    {item?.status === "active"
                      ? "Đang hoạt động"
                      : "Ngừng hoạt động"}
                  </td>
                  <td>
                    <div className="table-action">
                      <div
                        className="button-nutri"
                        onClick={() => {
                          navigate(`/configuration/clinic/update/${item?._id}`);
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
            <p>Bạn có chắc muốn xoá sản phẩm</p>
            <span className="text-center text-[#ff5c75] font-bold">
              {clinic?.name}
            </span>
          </div>
        </Modal>
      </Layout>
  );
};

export default ClinicList;
