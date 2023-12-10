import { Col, Row } from 'antd';
import moment from 'moment';
import { startTransition, useCallback, useEffect, useState } from 'react';
import { Layout } from '../../components/layout';
import { statisticAll } from '../../services/dashboard.service';
import CancellationRateContainer from './component/cancellation-rate';
import OverviewContainer from './component/overview';
import { Wrapper } from './component/style';
import TotalUser from './component/total-user';

type DashboardPageProps = {};

const DashboardPage: React.FC<DashboardPageProps> = () => {
  const [cancellationRate, setCancellationRate] = useState<
    { name: string; value: number }[]
  >([]);
  const [totalExaminationSlip, setTotalExaminationSlip] = useState<number>();
  const [totalNewCustomer, setTotalNewCustomer] = useState<number>();
  const [totalRevenue, setTotalRevenue] = useState<{
    totalAmount: number;
    actualAmount: number;
  }>();
  const [totalRevenueOrder, setTotalRevenueOrder] = useState<number>();
  const [totalRevenuePrescription, setTotalRevenuePrescription] =
    useState<number>();
  const [totalUser, setTotalUser] = useState<{ name: string; value: number }[]>(
    [],
  );
  const fetch = useCallback(({ from, to }: { from: string; to: string }) => {
    statisticAll({ from, to })
      .then((r) => {
        startTransition(() => {
          setCancellationRate(r?.statisticCancellationRate?.value);
          setTotalNewCustomer(r?.statisticTotalNewCustomer?.value);
          setTotalExaminationSlip(r?.statisticTotalExaminationSlip?.value);
          setTotalRevenue(r?.statisticTotalRevenue?.value);
          setTotalRevenueOrder(r?.statisticTotalRevenueOrder?.value);
          setTotalUser(r?.statisticTotalUser?.value);
          setTotalRevenuePrescription(r?.statisticTotalPrescription?.value);
        });
      })
      .catch((err) => {
        throw new Error(err);
      });
  }, []);

  useEffect(() => {
    fetch({
      from: moment().startOf('month').utc().format(),
      to: moment().endOf('month').utc().format(),
    });
  }, [fetch]);

  return (
    <Layout>
      <Wrapper>
        <OverviewContainer
          totalRevenue={totalRevenue}
          totalNewCustomer={totalNewCustomer}
          totalRevenueOrder={totalRevenueOrder}
          totalExaminationSlip={totalExaminationSlip}
          totalRevenuePrescription={totalRevenuePrescription}
        />
        <Row gutter={14}>
          <Col span={12}>
            <CancellationRateContainer data={cancellationRate} />
          </Col>
          <Col span={12}>
            <TotalUser data={totalUser} />
          </Col>
        </Row>
      </Wrapper>
    </Layout>
  );
};

export default DashboardPage;
