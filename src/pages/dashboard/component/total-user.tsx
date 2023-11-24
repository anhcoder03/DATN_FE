import { Card, DatePicker, Typography } from 'antd';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
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

type KPIProps = {};

type DataType = {
  name: string;
  value: number;
};

const TotalUser: React.FC<KPIProps> = () => {
  const [data, setData] = useState<DataType[]>();

  const [day, setDay] = useState<Date[]>();

  const defaultDay = useMemo(() => {
    return [
      moment().startOf('month').toDate(),
      moment().endOf('month').toDate(),
    ];
  }, []);

  useEffect(() => {
    statisticTotalUser({
      from: moment(day?.[0] ?? defaultDay[0])
        .utc()
        .format(),
      to: moment(day?.[1] ?? defaultDay[1])
        .utc()
        .format(),
    }).then((r) => {
      setData(r.data ?? []);
    });
  }, [day, defaultDay]);

  return (
    <Card
      extra={
        <DatePicker.RangePicker
          format='DD-MM-YYYY'
          onChange={(e) => {
            if (e) {
              setDay([e[0]!.startOf('d').toDate(), e[1]!.endOf('d').toDate()]);
            }
            if (!e) {
              setDay(defaultDay);
            }
          }}
          style={{ width: '100%' }}
          allowClear
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
