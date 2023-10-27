import React, { useEffect, useState } from "react";
import Heading from "../../components/common/Heading";
import { Table } from "../../components/table";
import { Layout } from "../../components/layout";
import IconEdit from "../../assets/images/icon-edit.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { IconTrash } from "../../components/icons";
import { Modal } from "antd";
import { Pagination } from "../../components/pagination";
import { getAllService, deleteService } from "../../services/service.service";
import PriceUtils from "../../helpers/PriceUtils";
import ServiceFillter from "./components/ServiceFillter";
const optionsPagination = [
  { value: 25, label: "25 bản ghi" },
  { value: 50, label: "50 bản ghi" },
  { value: 100, label: "100 bản ghi" },
];

const ServiceList = () => {
  const [services, setServices] = useState<any[]>([]);
  const [service, setservice] = useState<any>();
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
    _order: "asc",
    search: "",
    _status: "",
  });
  // nếu muốn cho filter delay 500ms dùng useDebounce rồi bỏ nó vào dependence của useEffect
  // const debouncedValue = useDebounce<object>(query, 500);
  const headings = [
    "Mã dịch vụ",
    "Tên dịch vụ",
    "Giá bán",
    "Trạng thái",
    "Thao tác",
  ];
  const handlePageClick = (event: any) => {
    const page = event.selected + 1;
    setQuery({ ...query, _page: page });
  };
  const handleGetservices = async () => {
    try {
      setLoading(true);
      const data = await getAllService(query);
      console.log('siuĐatâ', data);
      
      setLoading(false);
      setTotalPages(data.totalPages);
      setTotalDocs(data.totalDocs);
      setServices(data.docs);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    document.title = "Danh sách dịch vụ";
    urlParams.set("page", query._page as any);
    urlParams.set("limit", query._limit as any);
    navigate(`?${urlParams}`);
    handleGetservices();
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

  const handleLimitChange = (data: any) => {
    setQuery({ ...query, _limit: data.value });
  };

  const handleShowModel = (data: any) => {
    setOpenModal(true);
    setservice(data);
  };
  const onOk = async () => {
    const res = await deleteService(service?._id);
    console.log(res);
    if (res?.services) {
      toast.success(res?.message);
      setOpenModal(false);
      handleGetservices();
    } else {
      toast.error(res?.message);
    }
    setOpenModal(false);
  };
  const gotoDetail = (item: any) => {
    console.log(item?._id);
    // navigate(`/service/${item?._id}`);
    toast.warning("Tính năng đang phát triển");
  };
  console.log('servies',services);
  
  return (
    <Layout>
      <Heading>Quản lý danh sách dịch vụ</Heading>
      <div className="rounded-xl bg-white">
      <ServiceFillter
          handleStatusChange={handleStatusChange}
          handleSearch={handleSearch}
      ></ServiceFillter>
        <div className="bg-white">
          <Table
            headings={headings}
            loading={loading}
            length={services?.length}
          >
            {services?.map((item) => (
              <tr
                className="text-xs"
                style={{ cursor: "pointer" }}
                key={item?._id}
              >
                <td onClick={() => gotoDetail(item)}>{item._id}</td>
                <td onClick={() => gotoDetail(item)}>{item?.name}</td>
                <td onClick={() => gotoDetail(item)}>{PriceUtils.format(item?.price || 0, 'đ')}</td>
                <td onClick={() => gotoDetail(item)}>chưa có trạng thái</td>
                <td>
                  <div className="table-action">
                    <div
                      className="button-nutri"
                      onClick={() => {
                        navigate(`/customer/update/${item?._id}`);
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
          <p>Bạn có chắc muốn xoá dịch vụ</p>
          <span className="text-center text-[#ff5c75] font-bold">
            {service?.name}
          </span>
        </div>
      </Modal>
    </Layout>
  );
};

export default ServiceList;
