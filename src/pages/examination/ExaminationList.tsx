import React from "react";
import { Table } from "../../components/table";
import { Layout } from "../../components/layout";
import Heading from "../../components/common/Heading";
import { Filter } from "../../components/filters";

const headings = [
  "Bệnh nhân",
  "Bác sĩ",
  "Triệu chứng bệnh",
  "Trạng thái",
  "Dịch vụ khám",
  "Phòng khám",
  "Hóa đơn",
  "Kết quả bệnh",
];
const ExaminationList = () => {
  return (
    <Layout>
      <Heading>Danh sách phiếu khám</Heading>
      <Filter></Filter>
      <Table headings={headings}>
        <tr>
          <td>Nguyễn Phi Anh</td>
          <td>Mr. Hồng Sơn</td>
          <td>Đau dít không ngồi được</td>
          <td>Chờ khám</td>
          <td>Khám trĩ giai đoạn 4</td>
          <td>P302</td>
          <td>Đang chờ khám</td>
          <td>Đang chờ khám</td>
        </tr>
        <tr>
          <td>Nguyễn Phi Anh</td>
          <td>Mr. Hồng Sơn</td>
          <td>Đau dít không ngồi được</td>
          <td>Chờ khám</td>
          <td>Khám trĩ giai đoạn 4</td>
          <td>P302</td>
          <td>Đang chờ khám</td>
          <td>Đang chờ khám</td>
        </tr>
      </Table>
    </Layout>
  );
};

export default ExaminationList;
