import React from "react";
import { Table } from "../../../components/table";
import { Filter } from "../../../components/filters";

interface Props {
  headings: string[];
}

const ReceptionWaiting = (props: Props) => {
  return (
    <>
      <Filter></Filter>
      <Table headings={props.headings} loading={true}>
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
    </>
  );
};

export default ReceptionWaiting;
