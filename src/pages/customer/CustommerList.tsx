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
import { useDebounce } from "usehooks-ts";
import { useNavigate } from "react-router-dom";
import { IconTrash } from "../../components/icons";
import { Modal } from "antd";
const CustommerList = () => {
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [customer, setCustomer] = useState<ICustomer>();
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const urlParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const [query, setQuery] = useState({
    _page: 1,
    _limit: 10,
    _sort: "createdAt",
    _order: "asc",
    _gender: "",
    _createdAt: "",
    search: "",
  });
  const debouncedValue = useDebounce<object>(query, 500);
  const headings = [
    "Mã khách hàng",
    "	Tên khách hàng",
    "	Tuổi",
    "Số điện thoại",
    "Giới tính",
    "Ngày tạo",
    "Thao tác",
  ];

  const handleGetCustomers = async () => {
    try {
      setLoading(true);
      const data = await getAllCustomer(query);
      setLoading(false);
      setCustomers(data.docs);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetCustomers();
  }, [debouncedValue]);

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
      urlParams.delete("gender", selectedOpiton.value);
      navigate(`?${urlParams}`);
    }
  };
  const handleDayChange = (date: any) => {
    setQuery({ ...query, _createdAt: date });
    urlParams.set("createdAt", date);
    navigate(`?${urlParams}`);
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

  return (
    <Layout>
      <Heading>Quản lý danh sách khách hàng</Heading>
      <FilterCustomer
        handleDayChange={handleDayChange}
        handleGenderChange={handleGenderChange}
        handleSearch={handleSearch}
      ></FilterCustomer>
      <Table headings={headings} loading={loading} length={customers?.length}>
        {customers?.map((item) => (
          <tr className="text-xs">
            <td>{item._id}</td>
            <td>{item?.name}</td>
            <td>{CalcUtils.calculateAge(item?.dateOfBirth)}</td>
            <td>{item?.phone}</td>
            <td>{item?.gender}</td>
            <td>{moment(item?.createdAt).format("DD/MM/YYYY")}</td>
            <td>
              <div className="table-action">
                <div
                  className="button-nutri"
                  onClick={() => {
                    toast.warning("Bạn không có quyền thực hiện thao tác này");
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
