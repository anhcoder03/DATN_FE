import { Card, Col, Row, Typography } from "antd";
import React from "react";
import TotalRevenue from "./total-revenue";
import TotalCustomer from "./total-customer";

type OverviewContainerProps = {};

const OverviewContainer: React.FC<OverviewContainerProps> = ({}) => {
  return (
    <Card title={<Typography.Title level={3}>Tổng quan</Typography.Title>}>
      <Row gutter={24}>
        <TotalRevenue />
        <Col xs={24} sm={24} md={8}>
          <TotalCustomer />
        </Col>
      </Row>
    </Card>
  );
};

export default OverviewContainer;
