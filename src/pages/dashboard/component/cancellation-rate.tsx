import { Card, DatePicker, Typography } from 'antd';
import moment from 'moment';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { statisticCancellationRate } from '../../../services/dashboard.service';
import DatePickerCustomSelect from '../../../components/custom-picker';

type KPIProps = {
  data?: DataType[];
};

type DataType = {
  name: string;
  value: number;
};

const COLORS = ['#54B2FE', '#F391C6'];

const RADIAN = Math.PI / 180;

const CancellationRateContainer: React.FC<KPIProps> = ({ data: prev }) => {
  const [data, setData] = useState<DataType[]>();

  const [loading, setLoading] = useState<boolean>(false);

  const fetch = useCallback(({ from, to }: { from: string; to: string }) => {
    setLoading(true);
    statisticCancellationRate({
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

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill='white'
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline='central'>
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

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
      title={<Typography.Title level={4}>Tỉ lệ hủy lịch</Typography.Title>}>
      <ResponsiveContainer aspect={2 / 1}>
        <PieChart width={100}>
          <Pie
            data={data}
            dataKey='value'
            nameKey='name'
            cx='50%'
            cy='50%'
            outerRadius={80}
            fill='#8884d8'
            labelLine={false}
            label={renderCustomizedLabel}>
            {data?.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend key='name' />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default CancellationRateContainer;
