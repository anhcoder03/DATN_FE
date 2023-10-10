import React from 'react';
import { useSelector } from 'react-redux';
import Heading from '../../../components/common/Heading';
import { Layout } from '../../../components/layout';
import CustomTable from '../../../components/table/Table2';
import { RootState } from '../../../redux/store';
import FilterPrescription from '../components/filter';

type PrescriptionListProps = {};

const PrescriptionListContainer: React.FC<PrescriptionListProps> = () => {
  const columns = [
    {
      id: 'id',
      label: 'Mã đơn',
    },
    {
      id: 'customer',
      label: 'Khách hàng',
    },
    {
      id: 'date',
      label: 'Ngày kê',
    },
    {
      id: 'doctor',
      label: 'Bác sĩ',
    },
    {
      id: 'type',
      label: 'Loại đơn',
    },
  ];
  const rows = [
    {
      id: '1',
      customer: 'Minh Vương',
      date: '07/10/2023',
      doctor: 'Trần Minh Vương',
      type: 'Phiếu tư vấn',
    },
  ];

  const selectedHeadingPrescription = useSelector(
    (state: RootState) => state.headingPrescription.selectedHeadingPrescription,
  );

  return (
    <Layout>
      <Heading>Danh sách kê đơn</Heading>
      <FilterPrescription columns={columns}></FilterPrescription>
      <CustomTable columns={selectedHeadingPrescription} rows={rows} />
    </Layout>
  );
};

export default PrescriptionListContainer;
