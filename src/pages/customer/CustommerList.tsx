import React, { useEffect, useState } from "react";
import Heading from "../../components/common/Heading";
import { Table } from "../../components/table";
import { Layout } from "../../components/layout";
import FilterCustomer from "./components/FilterCustomer";
import { getAllProduct } from "../../services/customer.service";
import { ICustomer } from "../../types/customer.types";

const CustommerList = () => {
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const headings = [
    "Mã khách hàng",
    "	Tên khách hàng",
    "	Tuổi",
    "Số điện thoại",
    "Giới tính",
    "Ngày tạo",
    "Thao tác",
  ];
  useEffect(() => {
    async function getAllCustomer() {
      try {
        const data = await getAllProduct();
        setCustomers(data.docs);
      } catch (error) {
        console.log(error);
      }
    }
    getAllCustomer();
  }, [customers]);
  return (
    <Layout>
      <Heading>Quản lý danh sách khách hàng</Heading>
      <FilterCustomer></FilterCustomer>
      <Table headings={headings}>
        {customers?.map((item) => (
          <tr className="text-xs">
            <td>{item._id}</td>
            <td>{item?.name}</td>
            <td>{item?.dateOfBirth}</td>
            <td>{item?.phone}</td>
            <td>{item?.gender}</td>
            <td>{item?.createdAt}</td>
            <td></td>
          </tr>
        ))}
      </Table>
    </Layout>
  );
};

export default CustommerList;
