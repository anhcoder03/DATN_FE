import React, { useEffect, useState } from "react";
import { Layout } from "../../components/layout";
import Heading from "../../components/common/Heading";
import { Button } from "../../components/button";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
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
  const id: any = useParams();

  const dataTabs: IDataTabs[] = [
    {
      title: "THÔNG TIN BỆNH NHÂN",
      children: <ExaminationInfo id={id?.id} />,
      id: "1",
      name: "booking",
    },
    {
      title: "CHỈ ĐỊNH DỊCH VỤ",
      children: <ExaminationSevicer data={[]} />,
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
    //   title: "HUỶ KHÁM (0)",
    //   children: <ReceptionWaiting />,
    //   id: "6",
    //   name: "cancel",
    // },
  ];
  useEffect(() => {
    document.title = "Chi tiết phiếu khám";
  }, []);
  const handleSelectTab = (key: string) => {
    if (key === "1") {
    }
    if (key === "2") {
    }
  };
  return (
    <Layout>
      <div>
        <div className="relative-h-full">
          <Heading>Chi tiết phiếu khám</Heading>
        </div>
        <AppTaps
          keyActive="1"
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
