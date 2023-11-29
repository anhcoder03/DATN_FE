import React, { useEffect, useRef, useState } from "react";
import { Layout } from "../../components/layout";
import Heading from "../../components/common/Heading";
import { Button } from "../../components/button";
import * as yup from "yup";
import AppTaps from "../../components/tabs/Tabs";
import ExaminationInfo from "./components/ExaminationInfo";
import ExaminationSevicer from "./components/ExaminationSevicer";
import Prescription from "./components/Prescription";
import { useNavigate, useParams } from "react-router-dom";
import {
  UpdateExamination,
  getOneExamination,
} from "../../services/examination.service";
import { toast } from "react-toastify";
import { useReactToPrint } from "react-to-print";
import { PrintExamination } from "../../components/print";
import { getServiceByIdExam } from "../../services/designation.service";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

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
const ExaminationDetail = (props: any) => {
  const auth: any = useSelector((state: RootState) => state.auth.auth?.user);
  const navigate = useNavigate();
  const [dataPrint, setDataPrint] = useState<any>();
  const [services, setServices] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => {
      setOpenModal(false);
    },
    copyStyles: true,
  });
  const [data, setData] = useState<any>({});
  const { id } = useParams();
  useEffect(() => {
    if (id !== undefined) {
      loadData();
      getService();
    }
  }, [id]);
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
      setServices(resData);
    } catch (error) {
      toast.error("Đã có lỗi sảy ra!!!");
    }
  }

  const dataTabs: IDataTabs[] = [
    {
      title: "THÔNG TIN KHÁM",
      children: <ExaminationInfo />,
      id: "1",
      name: "info",
    },
    {
      title: "CHỈ ĐỊNH DỊCH VỤ",
      children: <ExaminationSevicer />,
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
  const now = new Date();
  const nowVietnam = new Date(
    now.getTime() + now.getTimezoneOffset() * 60000 + 7 * 60 * 60 * 1000
  );
  const day_cancel = nowVietnam.toISOString().slice(0, -1);
  console.log(day_cancel);
  const handleChangeStatus = async (status: string) => {
    if (status === "cancel") {
      const now = new Date();
      const nowVietnam = new Date(
        now.getTime() + now.getTimezoneOffset() * 60000 + 7 * 60 * 60 * 1000
      );
      const day_cancel = nowVietnam.toISOString().slice(0, -1);
      const params = {
        status,
        day_cancel,
        _id: id,
      };
      const response: any = await UpdateExamination(params);
      if (response?.examination) {
        toast.success("chuyển trạng thái thành công!");
        navigate(`/examination/${id}`);
      } else {
        toast.error("Đã có lỗi sảy ra!!!");
      }
    } else {
      const now = new Date();
      const nowVietnam = new Date(
        now.getTime() + now.getTimezoneOffset() * 60000 + 7 * 60 * 60 * 1000
      );
      const day_running = nowVietnam.toISOString().slice(0, -1);
      const params = {
        status,
        day_running,
        _id: id,
      };
      const response: any = await UpdateExamination(params);
      if (response?.examination) {
        toast.success("Chuyển trạng thái thành công!");
        navigate(`/examination/${id}`);
      } else {
        toast.error("Đã có lỗi sảy ra!!!");
      }
    }
  };

  const handleClickPrint = (item: any) => {
    setOpenModal(true);
    setDataPrint({ ...item, services });
    setTimeout(() => {
      handlePrint();
    }, 500);
  };

  return (
    <Layout>
      <div>
        <div className="relative-h-full">
          <Heading>
            Chi tiết phiếu khám: <span>{id}</span>
          </Heading>
        </div>
        <AppTaps
          keyActive="1"
          className="p-0 custom-tab"
          data={dataTabs}
          selectTab={handleSelectTab}
        ></AppTaps>
        <div className="fixed bottom-0  py-5 bg-white left-[251px] shadowSidebar right-0 action-bottom">
          <div className="flex justify-end w-full px-5">
            <div className="flex items-center gap-x-5">
              <Button to="/examination">Đóng</Button>
              {data?.status === "waiting" && (
                <>
                {auth?.role?.roleNumber == 3 ? null : (
                  <>
                    <Button
                      type="submit"
                      className="flex items-center justify-center px-5 py-3 text-base font-semibold leading-4 text-[#fd4858] rounded-md disabled:opacity-50 disabled:pointer-events-none bg-[#fd485833]"
                      onClick={() => handleChangeStatus("cancel")}
                    >
                      Hủy khám
                    </Button>
                    <Button
                      type="submit"
                      className="flex items-center justify-center px-10 py-3 text-base font-semibold leading-4 text-white rounded-md disabled:opacity-50 disabled:pointer-events-none bg-primary"
                      onClick={() => handleChangeStatus("running")}
                    >
                      Khám
                    </Button>
                  </>
                )}
                </>
              )}
              {data?.status === "done" && (
                <>
                {auth?.role?.roleNumber == 3 ? null : (
                  <>
                    <Button
                      type="submit"
                      className="flex items-center justify-center px-10 py-3 text-base font-semibold leading-4 text-white rounded-md disabled:opacity-50 disabled:pointer-events-none btn-info"
                      onClick={() => handleChangeStatus("running")}
                    >
                      Đang khám
                    </Button>
                    <Button
                      type="submit"
                      className="flex items-center justify-center px-5 py-3 text-base font-semibold leading-4 text-white rounded-md disabled:opacity-50 disabled:pointer-events-none bg-primary"
                      onClick={() => handleClickPrint(data)}
                    >
                      In phiếu
                    </Button>
                  </>
                )}
                </>
              )}
              {data?.status === "running" && (
                <>
                {auth?.role?.roleNumber == 3 ? null : (
                  <Button
                    type="submit"
                    className="flex items-center justify-center px-10 py-3 text-base font-semibold leading-4 text-white rounded-md disabled:opacity-50 disabled:pointer-events-none bg-primary"
                    onClick={() => handleChangeStatus("done")}
                  >
                    Hoàn thành khám
                  </Button>
                )}
                </>
              )}
              {data?.status !== "done" && (
                <>
                  {auth?.role?.roleNumber == 3 ? null : (
                    <Button
                      type="submit"
                      className="flex items-center justify-center px-10 py-3 text-base font-semibold leading-4 text-white rounded-md disabled:opacity-50 disabled:pointer-events-none bg-primary"
                      onClick={() => navigate(`/examination/${id}`)}
                    >
                      Chỉnh sửa
                    </Button>
                  )}                
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {openModal && (
        <PrintExamination
          componentRef={componentRef}
          dataPrint={dataPrint}
        ></PrintExamination>
      )}
    </Layout>
  );
};

export default ExaminationDetail;
