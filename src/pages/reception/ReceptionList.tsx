import React from "react";
import { Table } from "../../components/table";
import { Layout } from "../../components/layout";
import Heading from "../../components/common/Heading";
import { Filter } from "../../components/filters";

const headings = [
  "Tên bệnh nhân",
  "Mã bệnh nhân",
  "Ngày tiếp đón",
  "Phòng khám",
  "Dịch Vụ Khám",
  "Thao tác",
];

const ReceptionList = () => {
  return (
    <Layout>
      <Heading>Danh sách tiếp đón bệnh nhân</Heading>
      <Filter></Filter>
      <Table headings={headings}>
        <tr>
          <td>Nguyễn Phi Anh</td>
          <td>KH021321232</td>
          <td>12:00 24/09/2023</td>
          <td>Phòng khám 2</td>
          <td>Chụp X Quang</td>
          <td></td>
        </tr>
        <tr>
          <td>Nguyễn Phi Anh</td>
          <td>KH021321232</td>
          <td>12:00 24/09/2023</td>
          <td>Phòng khám 2</td>
          <td>Chụp X Quang</td>
          <td></td>
        </tr>
      </Table>
    </Layout>
  );
};

export default ReceptionList;
