import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "../../../components/layout";
import Heading from "../../../components/common/Heading";
import { Button } from "../../../components/button";
import ExaminationInfo from "./ExaminationInfo";
import AppTaps from "../../../components/tabs/Tabs";
import ExaminationSevicer from "../components/ExaminationSevicer";
import Prescription from "../components/Prescription";
import { getOneExamination } from "../../../services/examination.service";
import { toast } from 'react-toastify'
import { getServiceByIdExam } from "../../../services/designation.service";
import { getAllService } from "../../../services/service.service";

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
const ExaminationUpdate = () => {
  const [data, setData] = useState<any>([]);
  const [serviceExam, setServiceExam] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [dataServices, setDataServices] = useState([
    {
      service_id: "",
      price: "",
    },
  ]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id !== undefined) {
      loadData();
    }
  }, [id]);

  useEffect(() => {
    getService();
    getServices();
  },[]);

  async function loadData() {
    try {
      const response = await getOneExamination(id);
      const resData = response?.examination;
      setData({
        ...resData,
      });
    } catch (error) {
      toast.error("Đã có lỗi sảy ra!!!");
    }
  }

  async function getService() {
    try {
      const response = await getServiceByIdExam(id);
      const resData = response?.docs;
      setServiceExam(resData);
    } catch (error) {
      toast.error("Đã có lỗi sảy ra!!!");
    }
  }

  async function getServices() {
    const response = await getAllService({ _limit: 3000, _status: 1 });
    const ListArr: any = [];
    response?.docs?.map((e: any) => {
      ListArr?.push({
        ...e,
        value: e?._id,
        label: e?.name,
      });
    });
    setServices(ListArr);
  }

  const dataTabs: IDataTabs[] = [
    {
      title: "THÔNG TIN KHÁM",
      children: <ExaminationInfo
        data={data} 
        setData = {setData}
       />,
      id: "1",
      name: "info",
    },
    {
      title: "CHỈ ĐỊNH DỊCH VỤ",
      children: <ExaminationSevicer
        data={serviceExam} 
        services={services}
        dataServices={dataServices}
        setDataServices={setDataServices}
       />,
      id: "2",
      name: "designation",
    },
    {
      title: "KÊ ĐƠN",
      children: <Prescription id={id} />,
      id: "3",
      name: "prescription",
    },
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
      <div className="relative-h-full">
        <Heading>
          Chỉnh sửa phiếu khám: <span>{id}</span>
        </Heading>
      </div>
      <AppTaps
        keyActive="1"
        className="p-0 custom-tab"
        data={dataTabs}
        selectTab={handleSelectTab}
      ></AppTaps>
    </Layout>
  );
};

export default ExaminationUpdate;
