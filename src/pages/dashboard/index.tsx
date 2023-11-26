import { Col, Row } from 'antd';
import { Layout } from '../../components/layout';
import CancellationRateContainer from './component/cancellation-rate';
import OverviewContainer from './component/overview';
import { Wrapper } from './component/style';
import TotalUser from './component/total-user';

type DashboardPageProps = {};

const DashboardPage: React.FC<DashboardPageProps> = () => {
  return (
    <Layout>
      <Wrapper>
        <OverviewContainer />
        <Row gutter={14}>
          <Col span={12}>
            <CancellationRateContainer />
          </Col>
          <Col span={12}>
            <TotalUser />
          </Col>
        </Row>
      </Wrapper>
    </Layout>
  );
};

export default DashboardPage;
