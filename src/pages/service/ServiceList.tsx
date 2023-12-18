import { useEffect, useState } from "react";
import Heading from "../../components/common/Heading";
import { Table } from "../../components/table";
import { Layout } from "../../components/layout";
import IconEdit from "../../assets/images/icon-edit.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { IconTrash } from "../../components/icons";
import { Modal } from "antd";
import { Pagination } from "../../components/pagination";
import {
  getAllService,
  deleteService,
  updateService,
} from "../../services/service.service";
import PriceUtils from "../../helpers/PriceUtils";
import ServiceFillter from "./components/ServiceFillter";
import IconLock from "../../assets/images/icon-lock.png";
import IconUnLock from "../../assets/images/icon-unlock.png";
const optionsPagination = [
  { value: 25, label: "25 bản ghi" },
  { value: 50, label: "50 bản ghi" },
  { value: 100, label: "100 bản ghi" },
];

const ServiceList = () => {
  const [services, setServices] = useState<any[]>([]);
  const [service, setservice] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [totalDocs, setTotalDocs] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const urlParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const [query, setQuery] = useState({
    _page: 1,
    _limit: 25,
    _sort: "createdAt",
    _order: "asc",
    search: "",
    _status: "",
  });
  // nếu muốn cho filter delay 500ms dùng useDebounce rồi bỏ nó vào dependence của useEffect
  // const debouncedValue = useDebounce<object>(query, 500);
  const headings = [
    "Mã dịch vụ",
    "Tên dịch vụ",
    "Giá bán",
    "Trạng thái",
    "Thao tác",
  ];
  
  const handlePageClick = (event: any) => {
    const page = event.selected + 1;
    setQuery({ ...query, _page: page });
  };

  const handleGetservices = async () => {
    try {
      setLoading(true);
      const data = await getAllService(query);
      setLoading(false);
      setTotalPages(data.totalPages);
      setTotalDocs(data.totalDocs);
      setServices(data.docs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.title = "Danh sách dịch vụ";
    urlParams.set("page", query._page as any);
    urlParams.set("limit", query._limit as any);
    navigate(`?${urlParams}`);
    handleGetservices();
  }, [query]);

  const handleSearch = (e: any) => {
    setQuery({ ...query, search: e });
    if (e !== "") {
      urlParams.set("name", e);
      navigate(`?${urlParams}`);
    } else {
      urlParams.delete("name");
      navigate(`?${urlParams}`);
    }
  };

  const handleStatusChange = (selectedOpiton: any) => {
    setQuery({ ...query, _status: selectedOpiton.value });
    if (selectedOpiton.value != "") {
      urlParams.set("status", selectedOpiton.value);
      navigate(`?${urlParams}`);
    } else {
      urlParams.delete("status");
      navigate(`?${urlParams}`);
    }
  };

  const handleLimitChange = (data: any) => {
    setQuery({ ...query, _limit: data.value });
  };

  const handleShowModel = (data: any) => {
    setOpenModal(true);
    setservice(data);
  };

  const onOk = async () => {
    if (service?.type === "stop" || service?.type === "active") {
      const res = await updateService({
        ...service?.data,
        status: service?.data?.status == 1 ? 0 : 1,
      });
      if (res?.services) {
        toast.success(res?.message);
        setOpenModal(false);
        await handleGetservices();
      } else {
        toast.error(res?.message);
      }
    } else {
      const res = await deleteService(service?._id);
      if (res?.services) {
        toast.success(res?.message);
        setOpenModal(false);
        await handleGetservices();
      } else {
        toast.error(res?.message);
      }
    }
    setOpenModal(false);
  };

  const gotoDetail = (item: any) => {
    navigate(`/service/${item?._id}`);
  };

  const StatusServicePack = (status: any) => {
    if (status == 1) {
      return <span className="text-success">Đang hoạt động</span>;
    }
    if (status == 0) {
      return <span className="text-danger">Không hoạt động</span>;
    }
  };

  return (
    <Layout>
      <Heading>Quản lý danh sách dịch vụ</Heading>
      <div className="rounded-xl bg-white">
        <ServiceFillter
          handleStatusChange={handleStatusChange}
          handleSearch={handleSearch}
        ></ServiceFillter>
        <div className="bg-white">
          <Table
            headings={headings}
            loading={loading}
            length={services?.length}
          >
            {services?.map((item) => (
              <tr
                className="text-xs"
                style={{ cursor: "pointer" }}
                key={item?._id}
              >
                <td onClick={() => gotoDetail(item)}>{item?.serviceId}</td>
                <td onClick={() => gotoDetail(item)}>{item?.name}</td>
                <td onClick={() => gotoDetail(item)}>
                  {PriceUtils.format(item?.price || 0, "đ")}
                </td>
                <td onClick={() => gotoDetail(item)}>
                  {StatusServicePack(item?.status)}
                </td>
                <td>
                  <div className="table-action">
                    <div
                      className="button-nutri"
                      onClick={() =>
                        handleShowModel({
                          type: item?.status == 1 ? "stop" : "active",
                          data: item,
                        })
                      }
                    >
                      <img
                        style={{ border: "none" }}
                        src={item?.status == 1 ? IconLock : IconUnLock}
                        width={20}
                        height={20}
                        alt=""
                      />
                    </div>
                    <div
                      className="button-nutri"
                      onClick={() => {
                        navigate(`/service/update/${item?._id}`);
                      }}
                    >
                      <img width={20} height={20} src={IconEdit} alt="edit" />
                    </div>
                    <button
                      className="button-nutri text-[#585858]"
                      onClick={() => handleShowModel(item)}
                    >
                      <IconTrash></IconTrash>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </Table>
          <Pagination
            handlePageClick={handlePageClick}
            pageCount={totalPages}
            handleLimitChange={handleLimitChange}
            optionsPagination={optionsPagination}
            totalDocs={totalDocs}
            totalPages={totalPages}
          ></Pagination>
        </div>
      </div>
      <Modal
        centered
        open={openModal}
        onOk={onOk}
        onCancel={() => setOpenModal(false)}
      >
        <HandleRenderPopup service={service} />
      </Modal>
    </Layout>
  );
};
const HandleRenderPopup = (props: any) => {
  const { service } = props;
  if (service?.type == "active") {
    return (
      <>
        <h1 className="text-[#4b4b5a] pb-4 border-b border-b-slate-200 font-bold text-center text-[18px]">
          Kích hoạt dịch vụ
        </h1>
        <div className="flex flex-col items-center justify-center py-4 text-sm">
          <p>Bạn có chắc muốn kích hoạt dịch vụ không?</p>
          <span className="text-center text-[#ff5c75] font-bold">
            {service?.data?.name}
          </span>
        </div>
      </>
    );
  }
  if (service?.type == "stop") {
    return (
      <>
        <h1 className="text-[#4b4b5a] pb-4 border-b border-b-slate-200 font-bold text-center text-[18px]">
          Vô hiệu hoá dịch vụ
        </h1>
        <div className="flex flex-col items-center justify-center py-4 text-sm">
          <p>Bạn có chắc muốn vô hiệu hoá dịch vụ này không</p>
          <span className="text-center text-[#ff5c75] font-bold">
            {service?.data?.name}
          </span>
        </div>
      </>
    );
  }
  return (
    <>
      <h1 className="text-[#4b4b5a] pb-4 border-b border-b-slate-200 font-bold text-center text-[18px]">
        Thông Báo
      </h1>
      <div className="flex flex-col items-center justify-center py-4 text-sm">
        <p>Bạn có chắc muốn xoá dịch vụ</p>
        <span className="text-center text-[#ff5c75] font-bold">
          {service?.name}
        </span>
      </div>
    </>
  );
};

export default ServiceList;
