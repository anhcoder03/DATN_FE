import { useEffect, useState } from "react";
import { Layout } from "../../components/layout";
import Heading from "../../components/common/Heading";
import { Pagination } from "../../components/pagination";
import IconEdit from "../../assets/images/icon-edit.png";
import { Table } from "../../components/table";
import { IconTrash } from "../../components/icons";
import { deleteClinic, getAllClinic } from "../../services/clinic.service";
import { useNavigate } from "react-router-dom";
import FilterClinic from "../configuration/user/components/filter/index";
import { toast } from "react-toastify";
import { Modal } from "antd";
import FilterTitle from "./components/FilterTitle";
import { deleteRole, getAllRole } from "../../services/role.service";

const TitleList = () => {
  const [title, setTitle] = useState<any[]>([]);
  const [role, setRole] = useState<any>();
  const [totalPages, setTotalPages] = useState(1);
  const [totalDocs, setTotalDocs] = useState(1);
  const [loading, setLoading] = useState(false);
  const urlParams = new URLSearchParams(location.search);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const headings = [
    "Mã Chức danh",
    "Tên Chức danh",
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
  const handleGetTitle = async () => {
    try {
      setLoading(true);
      const data = await getAllRole(query);
      setLoading(false);
      setTotalPages(data.totalPages);
      setTotalDocs(data.totalDocs);
      setTitle(data.docs);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    urlParams.set("page", query._page as any);
    urlParams.set("limit", query._limit as any);
    navigate(`?${urlParams}`);
    handleGetTitle();
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
    const res = await deleteRole(role?._id);
    if (res?.message == "Xóa Vai trò thành công!") {
      toast.success(res?.message);
      setOpenModal(false);
      handleGetTitle();
      setLoading(true);
    } else {
      toast.error(res?.message);
    }
    setOpenModal(false);
  };
  const handleShowModel = (data: any) => {
    setOpenModal(true);
    setRole(data);
  };
  
  return (
    <Layout>
      <Heading>Quản Lý Chức Danh</Heading>
      <div className="">
        <FilterTitle
          handleStatusChange={handleStatusChange}
          handleSearch={handleSearch}
        ></FilterTitle>
        <div className="bg-white">
          <Table headings={headings} loading={loading} length={title?.length}>
            {title?.map((item : any ) => (
              <tr
                className="text-xs"
                style={{ cursor: "pointer" }}
                key={item._id}
              >
                <td>{item?._id}</td>
                <td>{item?.name}</td>
                <td
                  className={item?.status !== 1 ? "text-danger" : "text-success" }
                  style={{
                    cursor: "pointer",
                  }}
                >
                  {item?.status ===1
                    ? "Đang hoạt động"
                    : "Ngừng hoạt động"}
                </td>
                <td>
                  <div className="table-action">
                    <div
                      className="button-nutri"
                      onClick={() => {
                        navigate(`/configuration/title/update/${item?._id}`);
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
            {role?.name}
          </span>
        </div>
      </Modal>
    </Layout>
  );
};

export default TitleList;
