import { Card, DatePicker, Typography } from 'antd';
import moment from 'moment';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Bar,
  BarChart,
  Brush,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { statisticTotalUser } from '../../../services/dashboard.service';
import DatePickerCustomSelect from '../../../components/custom-picker';

type KPIProps = {
  data?: DataType[];
};

type DataType = {
  name: string;
  value: number;
};

const TotalUser: React.FC<KPIProps> = ({ data: prev }) => {
  const [data, setData] = useState<DataType[]>();

  const [loading, setLoading] = useState<boolean>(false);

  const fetch = useCallback(({ from, to }: { from: string; to: string }) => {
    setLoading(true);
    statisticTotalUser({
      from,
      to,
    }).then((r) => {
      setLoading(false);
      setData(r.value!);
    });
  }, []);

  useEffect(() => {
    setData(prev);
  }, [prev]);

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
      title={<Typography.Title level={4}>Số lượng nhân sự</Typography.Title>}>
      <ResponsiveContainer aspect={2 / 1}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip formatter={(value) => [value, 'Số lượng']} />
          <Legend
            formatter={() => <Typography.Text>Số lượng</Typography.Text>}
          />
          <Brush height={20} dataKey='name' stroke='#54B2FE' />
          <Bar dataKey='value' fill='#54B2FE' aria-labelledby='' />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default TotalUser;
