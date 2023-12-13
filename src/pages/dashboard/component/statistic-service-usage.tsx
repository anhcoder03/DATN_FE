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
  statisticServiceUsage,
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
type StatisticServiceUsageProps = {
  dataStatisticServiceUsage?: any[];
};

const lineStyle = {
  show: true,
  lineStyle: {
    type: "dashed",
    opacity: 0.3,
    width: 0.5,
  },
} as any;

const StatisticServiceUsage: React.FC<StatisticServiceUsageProps> = ({
  dataStatisticServiceUsage: dataPrev,
}) => {
  const [statisticService, setStatisticService] = useState<any[]>([]);
  console.log(
    "🚀 ~ file: statistic-service-usage.tsx:42 ~ statisticService:",
    statisticService
  );
  const [loading, setLoading] = useState<boolean>(false);
  const chartRef = useRef<HTMLDivElement | null>(null);

  const fetch = useCallback(({ from, to }: { from: string; to: string }) => {
    setLoading(true);
    statisticServiceUsage({ from, to })
      .then((r) => {
        startTransition(() => {
          setStatisticService(r ?? []);
        });
      })
      .catch((err) => {
        throw new Error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setStatisticService(dataPrev ?? []);
  }, [dataPrev]);

  useEffect(() => {
    if (!chartRef.current) return;

    const myChart = echarts.init(chartRef.current, "dark");
    const newData = statisticService.map((item) => item?.data);
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
          data: statisticService?.map((i) => i.date ?? "") ?? [],
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
      series:
        statisticService?.[0]?.data?.map(
          (subItem: { label: any }, index: string | number) => ({
            name: subItem.label,
            type: "bar",
            barMaxWidth: 30,
            data: newData?.map((i) => (i && i[index].value) ?? 0) ?? [],
          })
        ) ?? [],
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
  }, [statisticService]);

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
          Thống kê số lượng sử dụng dịch vụ
        </Typography.Title>
      }
    >
      <div ref={chartRef} style={{ height: "100%" }} />
    </CustomCard>
  );
};

export default StatisticServiceUsage;
