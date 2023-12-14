import { Card, Col, Row, Statistic, StatisticProps, Typography } from "antd";
import React, {
  startTransition,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import TotalRevenue from "./total-revenue";
import TotalCustomer from "./total-customer";
import {
  statisticOverview,
  statisticTotalRevenueOrder,
} from "../../../services/dashboard.service";
import CountUp from "react-countup";
import { formatMoney } from "../../../common/money";
import DatePickerCustomSelect from "../../../components/custom-picker";
import { CustomCard } from "./style";
import * as echarts from "echarts";

const formatter: StatisticProps["formatter"] = (value) => (
  <CountUp end={Number(value)} formattingFn={(v) => formatMoney(v) || "0"} />
);
type TotalOrderRevenueProps = {
  totalRevenueOrder?: any[];
};

const lineStyle = {
  show: true,
  lineStyle: {
    type: "dashed",
    opacity: 0.3,
    width: 0.5,
  },
} as any;

const TotalOrderRevenue: React.FC<TotalOrderRevenueProps> = ({
  totalRevenueOrder: revenueOrderPrev,
}) => {
  const [totalRevenueOrder, setTotalRevenueOrder] = useState<any[]>([]);
  console.log(totalRevenueOrder);
  const [loading, setLoading] = useState<boolean>(false);
  const chartRef = useRef<HTMLDivElement | null>(null);

  const fetch = useCallback(({ from, to }: { from: string; to: string }) => {
    setLoading(true);
    statisticTotalRevenueOrder({ from, to })
      .then((r) => {
        startTransition(() => {
          setTotalRevenueOrder(r ?? []);
        });
      })
      .catch((err) => {
        throw new Error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setTotalRevenueOrder(revenueOrderPrev ?? []);
  }, [revenueOrderPrev]);

  useEffect(() => {
    if (!chartRef.current) return;

    const myChart = echarts.init(chartRef.current, "dark");
    myChart.setOption({
      backgroundColor: "#fff",
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          crossStyle: {
            color: "#999",
          },
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      legend: {
        type: "scroll",
        left: 0,
        orient: "horizontal",
        textStyle: {
          color: "#000000",
        },
      },
      toolbox: {
        top: 25,
        feature: {
          magicType: { show: true, type: ["line", "bar"] },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      xAxis: [
        {
          type: "category",
          data: totalRevenueOrder?.map((i) => i.name ?? "") ?? [],
          axisTick: {
            alignWithLabel: true,
          },
          axisLabel: { interval: 0, rotate: 30 },
          splitLine: lineStyle,
        },
      ],
      yAxis: [
        {
          type: "value",
          splitLine: lineStyle,
          boundaryGap: ["0%", "20%"],
        },
      ],
      series: {
        name: "Tổng",
        type: "bar",
        barMaxWidth: 30,
        data: totalRevenueOrder?.map((i) => i.value ?? 0) ?? [],
        tooltip: {
          valueFormatter: (value: any) => {
            return `${value ? formatMoney(value) : 0} đ`;
          },
        },
      },
      dataZoom: [
        {
          type: "inside",
          xAxisIndex: 0,
          filterMode: "none",
        },
      ],
      media: [
        {
          query: {
            maxWidth: 600,
            aspectRatio: 1,
          },
          option: {},
        },
      ],
    });

    return () => {
      myChart.dispose();
    };
  }, [totalRevenueOrder]);

  return (
    <CustomCard
      loading={loading}
      bodyStyle={{ flex: 1 }}
      style={{ flex: 1, display: "flex", flexDirection: "column" }}
      className="custom-aspect-ratio"
      extra={
        <DatePickerCustomSelect
          defaultPicker="month"
          onChangeTime={(s, e) =>
            fetch({
              from: s,
              to: e,
            })
          }
        />
      }
      title={
        <Typography.Title level={3}>
          Thống kê tổng doanh số bán hàng
        </Typography.Title>
      }
    >
      <div ref={chartRef} style={{ height: "100%" }} />
    </CustomCard>
  );
};

export default TotalOrderRevenue;
