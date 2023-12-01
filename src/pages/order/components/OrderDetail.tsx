import React from "react";
import { useParams } from "react-router-dom";
import { Layout } from "../../../components/layout";

type Props = {};

const OrderDetail = (props: Props) => {
  const { id } = useParams();
  return <Layout>OrderDetail</Layout>;
};

export default OrderDetail;
