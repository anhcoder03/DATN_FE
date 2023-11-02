import React, { useEffect, useState } from "react";
import { Layout } from "../../components/layout";
import Heading from "../../components/common/Heading";
import { Button } from "../../components/button";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import ReceptionWaiting from "../reception/components/ReceptionWaiting";
import ReceptionDone from "../reception/components/ReceptionDone";
import ReceptionCancelling from "../reception/components/ReceptionCancelling";
import AppTaps from "../../components/tabs/Tabs";
import ExaminationInfo from "./components/ExaminationInfo";
import ExaminationSevicer from "./components/ExaminationSevicer";

const schema = yup.object({
  customerId: yup.string().required("Bệnh nhân không được để trống!"),
  staffId: yup.string().required("Nhân viên tiếp đón không được để trống!"),
});
export interface IDataTabs {
  title: string;
  children: React.ReactNode;
  id: string;
  name: string;
}
const ExaminationAdd = (props: any) => {
  const navigate = useNavigate();
  const id = useParams()
  console.log(id?.id , "idNE");
  
    const dataTabs: IDataTabs[] = [
      {
        title: "THÔNG TIN BỆNH NHÂN",
        children: <ExaminationInfo id={id?.id} />,
        id: "1",
        name: "booking",
      },
      {
        title: "CHỈ ĐỊNH DỊCH VỤ",
        children: <ExaminationSevicer/>,
        id: "2",
        name: "recetion",
      },
      // {
      //   title: "CHỜ KHÁM (0)",
      //   children: <ReceptionWaiting />,
      //   id: "3",
      //   name: "waiting",
      // },
      // {
      //   title: "ĐANG KHÁM (3)",
      //   children: <ReceptionWaiting />,
      //   id: "4",
      //   name: "running",
      // },
      // {
      //   title: "ĐÃ KHÁM (3)",
      //   children: <ReceptionDone />,
      //   id: "5",
      //   name: "done",
      // },
      // {
      //   title: "CHỜ HUỶ (0)",
      //   children: <ReceptionCancelling />,
      //   id: "6",
      //   name: "cancelling",
      // },
      // {
      //   title: "HUỶ (0)",
      //   children: <ReceptionWaiting />,
      //   id: "7",
      //   name: "cancel",
      // },
    ];
    const urlParams = new URLSearchParams(location.search);
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
        urlParams.set("tab", dataTabs[5].name);
        navigate(`?${urlParams}`);
      }
      if (key === "7") {
        urlParams.set("tab", dataTabs[6].name);
        navigate(`?${urlParams}`);
      }
    };
  return (
    <Layout>
      <div>
        <div className="relative-h-full">
          <Heading>Chi tiết phiếu khám</Heading>
        </div>
        <AppTaps
          keyActive="2"
          data={dataTabs}
          selectTab={handleSelectTab}
        ></AppTaps>
        <div className="fixed bottom-0  py-5 bg-white left-[251px] shadowSidebar right-0 action-bottom">
          <div className="flex justify-end w-full px-5">
            <div className="flex items-center gap-x-5">
              <Button to="/examination">Đóng</Button>
              {/* <Button
                type="submit"
                className="flex items-center justify-center px-10 py-3 text-base font-semibold leading-4 text-white rounded-md disabled:opacity-50 disabled:pointer-events-none bg-primary"
                onClick={handleSubmit(handleCreateReception)}
              >
                Lưu
              </Button> */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ExaminationAdd;
