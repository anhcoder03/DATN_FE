import { Card, Col, Statistic, StatisticProps, Typography } from 'antd';
import { startTransition, useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { formatMoney } from '../../../common/money';
import { statisticTotalCustomer } from '../../../services/dashboard.service';

type TotalCustomerProps = {};

const formatter: StatisticProps['formatter'] = (value) => (
  <CountUp end={Number(value)} formattingFn={(v) => formatMoney(v) || '0'} />
);

const TotalCustomer: React.FC<TotalCustomerProps> = () => {
  const [data, setData] = useState<number>();

  useEffect(() => {
    statisticTotalCustomer()
      .then((r) => {
        startTransition(() => {
          setData(r?.totalCustomer);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Card>
      <Statistic
        title={
          <Typography.Title level={4}>Số lượng khách hàng</Typography.Title>
        }
        value={data}
      />
    </Card>
  );
};

export default TotalCustomer;
