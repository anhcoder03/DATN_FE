import React from "react";
import { Table } from "../../../components/table";
import { FilterReceptionBook } from "../../../components/filters";

interface Props {
  headings: string[];
}

const ReceptionBook = (props: Props) => {
  return (
    <>
      <FilterReceptionBook></FilterReceptionBook>
      <Table headings={props.headings}>
        <tr>
          <td>Nguyễn Hồng Sơn</td>
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
    </>
  );
};

export default ReceptionBook;
