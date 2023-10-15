import React, { useEffect, useState } from "react";
import Heading from "../../components/common/Heading";
import { Table } from "../../components/table";
import { Layout } from "../../components/layout";
import FilterCustomer from "./components/FilterCustomer";
import {
  deleteCustomer,
  getAllCustomer,
} from "../../services/customer.service";
import { ICustomer } from "../../types/customer.types";
import CalcUtils from "../../helpers/CalcULtils";
import moment from "moment";
import IconEdit from "../../assets/images/icon-edit.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { IconTrash } from "../../components/icons";
import { Modal } from "antd";
import { Pagination } from "../../components/pagination";

const optionsPagination = [
  { value: 25, label: "25 bản ghi" },
  { value: 50, label: "50 bản ghi" },
  { value: 100, label: "100 bản ghi" },
];

const CustommerList = () => {
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [customer, setCustomer] = useState<ICustomer>();
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
    _gender: "",
    _createdAt: "",
    search: "",
  });
  // nếu muốn cho filter delay 500ms dùng useDebounce rồi bỏ nó vào dependence của useEffect
  // const debouncedValue = useDebounce<object>(query, 500);
  const headings = [
    "Mã khách hàng",
    "	Tên khách hàng",
    "	Tuổi",
    "Số điện thoại",
    "Giới tính",
    "Ngày tạo",
    "Thao tác",
  ];
  const handlePageClick = (event: any) => {
    const page = event.selected + 1;
    setQuery({ ...query, _page: page });
  };
  const handleGetCustomers = async () => {
    try {
      setLoading(true);
      const data = await getAllCustomer(query);
      setLoading(false);
      console.log(data);
      setTotalPages(data.totalPages);
      setTotalDocs(data.totalDocs);
      setCustomers(data.docs);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    urlParams.set("page", query._page as any);
    urlParams.set("limit", query._limit as any);
    navigate(`?${urlParams}`);
    handleGetCustomers();
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
  const handleGenderChange = (selectedOpiton: any) => {
    setQuery({ ...query, _gender: selectedOpiton.value });
    if (selectedOpiton.value !== "") {
      urlParams.set("gender", selectedOpiton.value);
      navigate(`?${urlParams}`);
    } else {
      urlParams.delete("gender");
      navigate(`?${urlParams}`);
    }
  };
  const handleDayChange = (date: any) => {
    setQuery({ ...query, _createdAt: date });
    urlParams.set("createdAt", date);
    navigate(`?${urlParams}`);
  };

  const handleLimitChange = (data: any) => {
    setQuery({ ...query, _limit: data.value });
  };

  const handleShowModel = (data: ICustomer) => {
    setOpenModal(true);
    setCustomer(data);
  };
  const onOk = async () => {
    const res = await deleteCustomer(customer?._id);
    if (res?.customer) {
      toast.success(res?.message);
      setOpenModal(false);
      handleGetCustomers();
    } else {
      toast.error(res?.message);
    }
    setOpenModal(false);
  };
  const gotoDetail = (item: any) => {
    navigate(`/customer/${item?._id}`);
  };

  return (
    <Layout>
      <Heading>Quản lý danh sách khách hàng</Heading>
      <FilterCustomer
        handleDayChange={handleDayChange}
        handleGenderChange={handleGenderChange}
        handleSearch={handleSearch}
      ></FilterCustomer>
      <div className="bg-white">
        <Table headings={headings} loading={loading} length={customers?.length}>
          {customers?.map((item) => (
            <tr className="text-xs" style={{ cursor: "pointer" }}>
              <td onClick={() => gotoDetail(item)}>{item._id}</td>
              <td onClick={() => gotoDetail(item)}>{item?.name}</td>
              <td onClick={() => gotoDetail(item)}>
                {CalcUtils.calculateAge(item?.dateOfBirth)}
              </td>
              <td onClick={() => gotoDetail(item)}>{item?.phone}</td>
              <td onClick={() => gotoDetail(item)}>{item?.gender}</td>
              <td onClick={() => gotoDetail(item)}>
                {moment(item?.createdAt).format("DD/MM/YYYY")}
              </td>
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
          <p>Bạn có chắc muốn xoá khách hàng</p>
          <span className="text-center text-[#ff5c75] font-bold">
            {customer?.name}
          </span>
        </div>
      </Modal>
    </Layout>
  );
};

export default CustommerList;
