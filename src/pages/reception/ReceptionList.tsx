import React from "react";
import { Layout } from "../../components/layout";
import Heading from "../../components/common/Heading";
import AppTaps from "../../components/tabs/Tabs";
import ReceptionBook from "./components/ReceptionBook";
import ReceptionCustomer from "./components/ReceptionCustomer";
import ReceptionWaiting from "./components/ReceptionWaiting";

export interface IDataTabs {
  title: string;
  children: React.ReactNode;
  id: string;
}

const ReceptionList = () => {
  const headings = [
    "Tên bệnh nhân",
    "Mã bệnh nhân",
    "Ngày tiếp đón",
    "Phòng khám",
    "Dịch Vụ Khám",
    "Thao tác",
  ];

  const dataTabs: IDataTabs[] = [
    {
      title: "ĐẶT LICH (19)",
      children: <ReceptionBook headings={headings} />,
      id: "1",
    },
    {
      title: "TIẾP ĐÓN (2)",
      children: <ReceptionCustomer headings={headings} />,
      id: "2",
    },
    {
      title: "CHỜ KHÁM (0)",
      children: <ReceptionWaiting headings={headings} />,
      id: "3",
    },
    {
      title: "ĐANG KHÁM (3)",
      children: <ReceptionWaiting headings={headings} />,
      id: "4",
    },
    {
      title: "CHỜ HUỶ (0)",
      children: <ReceptionWaiting headings={headings} />,
      id: "5",
    },
    {
      title: "HUỶ (0)",
      children: <ReceptionWaiting headings={headings} />,
      id: "6",
    },
  ];
  const handleSelectTab = (key: string) => {
    console.log(key);
  };
  return (
    <Layout>
      <Heading>Danh sách tiếp đón bệnh nhân</Heading>
      <AppTaps
        keyActive="2"
        data={dataTabs}
        selectTab={handleSelectTab}
      ></AppTaps>
    </Layout>
  );
};

export default ReceptionList;
