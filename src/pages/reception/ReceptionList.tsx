import React, { useEffect } from "react";
import { Layout } from "../../components/layout";
import Heading from "../../components/common/Heading";
import AppTaps from "../../components/tabs/Tabs";
import ReceptionBook from "./components/ReceptionBook";
import ReceptionCustomer from "./components/ReceptionCustomer";
import ReceptionWaiting from "./components/ReceptionWaiting";
import { useNavigate } from "react-router-dom";
import ReceptionDone from "./components/ReceptionDone";
export interface IDataTabs {
  title: string;
  children: React.ReactNode;
  id: string;
  name: string;
}

const ReceptionList = () => {
  const dataTabs: IDataTabs[] = [
    {
      title: "ĐẶT LỊCH",
      children: <ReceptionBook />,
      id: "1",
      name: "booking",
    },
    {
      title: "TIẾP ĐÓN",
      children: <ReceptionCustomer />,
      id: "2",
      name: "recetion",
    },
    {
      title: "CHỜ KHÁM",
      children: <ReceptionWaiting />,
      id: "3",
      name: "waiting",
    },
    {
      title: "ĐANG KHÁM",
      children: <ReceptionWaiting />,
      id: "4",
      name: "running",
    },
    {
      title: "ĐÃ KHÁM",
      children: <ReceptionDone />,
      id: "5",
      name: "done",
    },
    {
      title: "ĐÃ HỦY",
      children: <ReceptionWaiting />,
      id: "6",
      name: "cancel",
    },
  ];
  const urlParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Danh sách tiếp đón bệnh nhân";
    urlParams.set("tab", dataTabs[1].name);
    navigate(`?${urlParams}`);
  }, []);
  const handleSelectTab = (key: string) => {
    if (key === "1") {
      urlParams.set("tab", dataTabs[0].name);
      navigate(`?${urlParams}`);
    }
    if (key === "2") {
      urlParams.set("tab", dataTabs[1].name);
      navigate(`?${urlParams}`);
    }
    if (key === "3") {
      urlParams.set("tab", dataTabs[2].name);
      navigate(`?${urlParams}`);
    }
    if (key === "4") {
      urlParams.set("tab", dataTabs[3].name);
      navigate(`?${urlParams}`);
    }
    if (key === "5") {
      urlParams.set("tab", dataTabs[4].name);
      navigate(`?${urlParams}`);
    }
    if (key === "6") {
      urlParams.set("tab", dataTabs[6].name);
      navigate(`?${urlParams}`);
    }
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
