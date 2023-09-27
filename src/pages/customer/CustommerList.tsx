import React, { useEffect, useState } from "react";
import Heading from "../../components/common/Heading";
import { Table } from "../../components/table";
import { Layout } from "../../components/layout";
import FilterCustomer from "./components/FilterCustomer";
import { getAllProduct } from "../../services/customer.service";
import { ICustomer } from "../../types/customer.types";
import CalcUtils from '../../helpers/CalcULtils';
import moment from "moment";
import IconEdit from '../../assets/images/icon-edit.png';
import { toast } from "react-toastify";
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
  }, []);
  return (
    <Layout>
      <Heading>Quản lý danh sách khách hàng</Heading>
      <FilterCustomer></FilterCustomer>
      <Table headings={headings}>
        {customers?.map((item) => (
          <tr className="text-xs">
            <td>{item._id}</td>
            <td>{item?.name}</td>
            <td>{CalcUtils.calculateAge(item?.dateOfBirth)}</td>
            <td>{item?.phone}</td>
            <td>{item?.gender}</td>
            <td>{moment(item?.createdAt).format('DD/MM/YYYY')}</td>
            <td>
              <div className="table-action">
                  <div className="button-nutri" onClick={() => {toast.success('Bạn không có quyền thực hiện thao tác này');
                console.log('22');
                }}><img width={20} height={20} src={IconEdit} alt="edit" /></div>
                  <div className="button-nutri"><i className='uil-trash-alt'></i></div>
              </div>
            </td>
          </tr>
        ))}
      </Table>
      
    </Layout>
  );
};

export default CustommerList;
