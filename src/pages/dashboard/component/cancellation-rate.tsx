import { Card, DatePicker, Typography } from "antd";
import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
import { statisticCancellationRate } from "../../../services/dashboard.service";

type KPIProps = {};

type DataType = {
  name: string;
  value: number;
};

const COLORS = ["#54B2FE", "#F391C6"];

const RADIAN = Math.PI / 180;

const CancellationRateContainer: React.FC<KPIProps> = () => {
  const [data, setData] = useState<DataType[]>();

  const [day, setDay] = useState<Date[]>();

  const defaultDay = useMemo(() => {
    return [
      moment().startOf("month").toDate(),
      moment().endOf("month").toDate(),
    ];
  }, []);

  useEffect(() => {
    statisticCancellationRate({
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
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card
      extra={
        <DatePicker.RangePicker
          format="DD-MM-YYYY"
          onChange={(e) => {
            if (e) {
              setDay([e[0]!.startOf("d").toDate(), e[1]!.endOf("d").toDate()]);
            }
            if (!e) {
              setDay(defaultDay);
            }
          }}
          style={{ width: "100%" }}
          allowClear
        />
      }
      title={<Typography.Title level={4}>Tỉ lệ hủy lịch</Typography.Title>}
    >
      <ResponsiveContainer aspect={2 / 1}>
        <PieChart width={100}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            labelLine={false}
            label={renderCustomizedLabel}
          >
            {data?.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend key="name" />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default CancellationRateContainer;
