import { Col, Row, Spin } from 'antd';
import moment from 'moment';
import { startTransition, useCallback, useEffect, useState } from 'react';
import { Layout } from '../../components/layout';
import { statisticAll } from '../../services/dashboard.service';
import CancellationRateContainer from './component/cancellation-rate';
import OverviewContainer from './component/overview';
import { Wrapper } from './component/style';
import TotalUser from './component/total-user';
import TotalOrderRevenue from './component/total-order-revenue';
import TotalOrderByPrescription from './component/total-order-by-prescription';
import StatisticServiceUsage from './component/statistic-service-usage';
import LoadingPage from '../../components/common/LoadingPage';

type DashboardPageProps = object;

const DashboardPage: React.FC<DashboardPageProps> = () => {
  const [cancellationRate, setCancellationRate] = useState<
    { name: string; value: number }[]
  >([]);
  const [totalNewCustomer, setTotalNewCustomer] = useState<number>();
  const [totalRevenue, setTotalRevenue] = useState<{
    totalAmount: number;
    actualAmount: number;
  }>();
  const [totalRevenueOrder, setTotalRevenueOrder] = useState<any[]>([]);
  const [statisticServiceUsage, setStatisticServiceUsage] = useState<any[]>([]);

  const [totalRevenuePrescription, setTotalRevenuePrescription] = useState<
    any[]
  >([]);
  const [totalUser, setTotalUser] = useState<{ name: string; value: number }[]>(
    [],
  );
  const [loading, setLoading] = useState<boolean>(false);
  const fetch = useCallback(({ from, to }: { from: string; to: string }) => {
    setLoading(true);
    statisticAll({ from, to })
      .then((r) => {
        startTransition(() => {
          setCancellationRate(r?.statisticCancellationRate?.value);
          setTotalNewCustomer(r?.statisticTotalNewCustomer?.value);
          setTotalRevenue(r?.statisticTotalRevenue?.value);
          setTotalRevenueOrder(r?.statisticTotalRevenueOrder);
          setTotalUser(r?.statisticTotalUser?.value);
          setTotalRevenuePrescription(r?.statisticTotalPrescription);
          setStatisticServiceUsage(r?.statisticServiceUsage);
        });
      })
      .catch((err) => {
        throw new Error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetch({
      from: moment().startOf('month').utc().format(),
      to: moment().endOf('month').utc().format(),
    });
  }, [fetch]);

  return (
    <Spin spinning={loading} indicator={<LoadingPage />}>
      <Layout>
        <Wrapper>
          <OverviewContainer
            totalRevenue={totalRevenue}
            totalNewCustomer={totalNewCustomer}
          />
          <Row gutter={14}>
            <Col span={12}>
              <CancellationRateContainer data={cancellationRate} />
            </Col>
            <Col span={12}>
              <TotalUser data={totalUser} />
            </Col>
          </Row>
          <Row gutter={[10, 10]}>
            <Col span={24} xs={24} sm={24} md={24}>
              <TotalOrderRevenue totalRevenueOrder={totalRevenueOrder} />
            </Col>
            <Col span={24} xs={24} sm={24} md={24}>
              <TotalOrderByPrescription
                datarderByPrescription={totalRevenuePrescription}
              />
            </Col>
            <Col span={24} xs={24} sm={24} md={24}>
              <StatisticServiceUsage
                dataStatisticServiceUsage={statisticServiceUsage}
              />
            </Col>
          </Row>
        </Wrapper>
      </Layout>
    </Spin>
  );
};

export default DashboardPage;
