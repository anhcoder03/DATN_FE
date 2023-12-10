import { Card, Col, Row, Statistic, StatisticProps, Typography } from 'antd';
import React, {
  startTransition,
  useCallback,
  useEffect,
  useState,
} from 'react';
import TotalRevenue from './total-revenue';
import TotalCustomer from './total-customer';
import { statisticOverview } from '../../../services/dashboard.service';
import CountUp from 'react-countup';
import { formatMoney } from '../../../common/money';
import DatePickerCustomSelect from '../../../components/custom-picker';

const formatter: StatisticProps['formatter'] = (value) => (
  <CountUp end={Number(value)} formattingFn={(v) => formatMoney(v) || '0'} />
);
type OverviewContainerProps = {
  totalRevenue?: { totalAmount: number; actualAmount: number };
  totalNewCustomer?: number;
  totalExaminationSlip?: number;
  totalRevenueOrder?: number;
  totalRevenuePrescription?: number;
};

const OverviewContainer: React.FC<OverviewContainerProps> = ({
  totalRevenue: revenuePrev,
  totalNewCustomer: newCustomerPrev,
  totalExaminationSlip: examinationPrev,
  totalRevenueOrder: revenueOrderPrev,
  totalRevenuePrescription: revenuePrescription,
}) => {
  const [totalExaminationSlip, setTotalExaminationSlip] = useState<number>();
  const [totalNewCustomer, setTotalNewCustomer] = useState<number>();
  const [totalRevenue, setTotalRevenue] = useState<{
    totalAmount: number;
    actualAmount: number;
  }>();
  const [totalRevenueOrder, setTotalRevenueOrder] = useState<number>();
  const [totalRevenuePrescription, setTotalRevenuePrescription] =
    useState<number>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetch = useCallback(({ from, to }: { from: string; to: string }) => {
    setLoading(true);
    statisticOverview({ from, to })
      .then((r) => {
        startTransition(() => {
          setTotalNewCustomer(r?.statisticTotalNewCustomer?.value);
          setTotalExaminationSlip(r?.statisticTotalExaminationSlip?.value);
          setTotalRevenue(r?.statisticTotalRevenue?.value);
          setTotalRevenueOrder(r?.statisticTotalRevenueOrder?.value);
          setTotalRevenuePrescription(r?.statisticTotalPrescription?.value);
        });
      })
      .catch((err) => {
        throw new Error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setTotalExaminationSlip(examinationPrev);
    setTotalNewCustomer(newCustomerPrev);
    setTotalRevenue(revenuePrev);
    setTotalRevenueOrder(revenueOrderPrev);
    setTotalRevenuePrescription(revenuePrescription);
  }, [
    examinationPrev,
    newCustomerPrev,
    revenueOrderPrev,
    revenuePrescription,
    revenuePrev,
  ]);
  return (
    <Card
      loading={loading}
      extra={
        <DatePickerCustomSelect
          defaultPicker='month'
          onChangeTime={(s, e) =>
            fetch({
              from: s,
              to: e,
            })
          }
        />
      }
      title={<Typography.Title level={3}>Tổng quan</Typography.Title>}>
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={24} md={8}>
          <Card>
            <Statistic
              title={
                <Typography.Title level={4}>
                  Doanh thu dự kiến (VNĐ)
                </Typography.Title>
              }
              value={totalRevenue?.totalAmount}
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
              value={totalRevenue?.actualAmount}
              formatter={formatter}
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={8}>
          <Card>
            <Statistic
              title={
                <Typography.Title level={4}>
                  Doanh thu bán hàng (VNĐ)
                </Typography.Title>
              }
              value={totalRevenueOrder}
              formatter={formatter}
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={8}>
          <Card>
            <Statistic
              title={
                <Typography.Title level={4}>
                  Doanh thu kê đơn (VNĐ)
                </Typography.Title>
              }
              value={totalRevenuePrescription}
              formatter={formatter}
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={8}>
          <Card>
            <Statistic
              title={
                <Typography.Title level={4}>
                  Số lượng phiếu khám
                </Typography.Title>
              }
              value={totalExaminationSlip}
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={8}>
          <Card>
            <Statistic
              title={
                <Typography.Title level={4}>
                  Số lượng khách hàng
                </Typography.Title>
              }
              value={totalNewCustomer}
            />
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default OverviewContainer;
