import React from "react";
import { Table } from "../../../components/table";
import { FilterReceptionCustomer } from "../../../components/filters";

interface Props {
  headings: string[];
}

const ReceptionCustomer = (props: Props) => {
  return (
    <>
      <FilterReceptionCustomer></FilterReceptionCustomer>
      <Table headings={props.headings} length={0} loading={false}>
        {" "}
      </Table>
    </>
  );
};

export default ReceptionCustomer;
