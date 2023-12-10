import { Card, Col, Statistic, StatisticProps, Typography } from 'antd';
import { startTransition, useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { formatMoney } from '../../../common/money';
import { statisticTotalRevenue } from '../../../services/dashboard.service';

type TotalRevenueProps = {
  data?: { totalAmount: number; actualAmount: number };
};

const formatter: StatisticProps['formatter'] = (value) => (
  <CountUp end={Number(value)} formattingFn={(v) => formatMoney(v) || '0'} />
);

const TotalRevenue: React.FC<TotalRevenueProps> = ({ data }) => {
  return (
    <>
      <Col xs={24} sm={24} md={8}>
        <Card>
          <Statistic
            title={
              <Typography.Title level={4}>
                Doanh thu dự kiến (VNĐ)
              </Typography.Title>
            }
            value={data?.totalAmount}
            formatter={formatter}
          />
        </Card>
      </Col>
      <Col xs={24} sm={24} md={8}>
        <Card>
          <Statistic
            title={
              <Typography.Title level={4}>
                Doanh thu thực tế (VNĐ)
              </Typography.Title>
            }
            value={data?.actualAmount}
            formatter={formatter}
          />
        </Card>
      </Col>
    </>
  );
};

export default TotalRevenue;
