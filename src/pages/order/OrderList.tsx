import React, { useEffect, useState } from "react";
import { Layout } from "../../components/layout";
import Heading from "../../components/common/Heading";
import { Table } from "../../components/table";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllOrder } from "../../services/order.service";
import { Pagination } from "../../components/pagination";
import PriceUtils from "../../helpers/PriceUtils";
import { LabelOrder } from "../../components/label";
import Filter from "./components/Filter";
import { ORDERSTATUS } from "../../constants/define";
import IconTrash2 from "../../assets/images/icon-trash2.png";

const headings = [
  "Mã đơn",
  "Nguồn đơn",
  "Khách hàng",
  "Tổng tiền",
  "Trạng thái",
];

const optionsPagination = [
  { value: 25, label: "25 bản ghi" },
  { value: 50, label: "50 bản ghi" },
  { value: 100, label: "100 bản ghi" },
];

const OrderList = () => {
  const urlParams = new URLSearchParams(location.search);
  const [query, setQuery] = useState({
    _page: 1,
    _limit: 25,
    _sort: "createdAt",
    _order: "desc",
    search: "",
    sellerId: "",
    status: "",
    createdAt: "",
    paymentStatus: "",
    orderType: null,
  });
  const navigate = useNavigate();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [totalDocs, setTotalDocs] = useState(1);

  const handleGetAllOrder = async () => {
    try {
      setLoading(true);
      const data = await getAllOrder(query);
      setLoading(false);
      setOrders(data.docs);
      setTotalPages(data.totalPages);
      setTotalDocs(data.totalDocs);
    } catch (error) {
      toast.error("Đã xảy ra lỗi!");
    }
  };
  useEffect(() => {
    document.title = "Danh sách đơn dịch vụ";
    urlParams.set("page", query._page as any);
    urlParams.set("limit", query._limit as any);
    navigate(`?${urlParams}`);
    handleGetAllOrder();
  }, [query]);
  const gotoDetail = (item: any) => {
    navigate(`/order/${item?._id}/view`);
  };
  const handlePageClick = (event: any) => {
    const page = event.selected + 1;
    setQuery({ ...query, _page: page });
  };
  const handleLimitChange = (data: any) => {
    setQuery({ ...query, _limit: data.value });
  };
  const handleSearch = (e: any) => {
    setQuery({ ...query, search: e });
    if (e !== "") {
      urlParams.set("orderId", e);
      navigate(`?${urlParams}`);
    } else {
      urlParams.delete("orderId");
      navigate(`?${urlParams}`);
    }
  };
  const handleChangeOrderType = (selectedOpiton: any) => {
    setQuery({ ...query, orderType: selectedOpiton.value });
    if (selectedOpiton.value !== "") {
      urlParams.set("orderType", selectedOpiton.value);
      navigate(`?${urlParams}`);
    } else {
      urlParams.delete("orderType");
      navigate(`?${urlParams}`);
    }
  };
  const handleChangeStatusPayment = (selectedOpiton: any) => {
    setQuery({ ...query, paymentStatus: selectedOpiton.value });
    if (selectedOpiton.value !== "") {
      urlParams.set("paymentStatus", selectedOpiton.value);
      navigate(`?${urlParams}`);
    } else {
      urlParams.delete("paymentStatus");
      navigate(`?${urlParams}`);
    }
  };
  const handleChangeStatus = (selectedOpiton: any) => {
    setQuery({ ...query, paymentStatus: selectedOpiton.value });
    if (selectedOpiton.value !== "") {
      urlParams.set("status", selectedOpiton.value);
      navigate(`?${urlParams}`);
    } else {
      urlParams.delete("status");
      navigate(`?${urlParams}`);
    }
  };

  const handleDayChange = (date: any) => {
    setQuery({ ...query, createdAt: date });
    urlParams.set("createdAt", date);
    navigate(`?${urlParams}`);
  };

  return (
    <Layout>
      <Heading>Danh sách đơn hàng</Heading>
      <Filter
        handleChangeStatus={handleChangeStatus}
        handleChangeStatusPayment={handleChangeStatusPayment}
        handleChangeOrderType={handleChangeOrderType}
        handleSearch={handleSearch}
        handleDayChange={handleDayChange}
      ></Filter>
      <div className="bg-white">
        <Table headings={headings} loading={loading} length={orders?.length}>
          {orders?.map((item) => (
            <tr
              className="text-xs"
              key={item?._id}
              style={{ cursor: "pointer" }}
            >
              <td onClick={() => gotoDetail(item)}>{item._id}</td>
              <td onClick={() => gotoDetail(item)}>
                {item.orderType === 1 ? "Bán tại cửa hàng" : "Kê đơn"}
              </td>
              <td
                onClick={() => gotoDetail(item)}
              >{`${item?.customerId?.name}`}</td>
              <td onClick={() => gotoDetail(item)}>
                {PriceUtils.format(item?.totalAmount)}
              </td>
              <td onClick={() => gotoDetail(item)}>
                <LabelOrder type={item?.status} />
              </td>
              <td>
                <div>
                  {item?.status === ORDERSTATUS.PENDDING && (
                    <button className="button-nutri text-[#585858]">
                      <img
                        style={{ border: "none" }}
                        src={IconTrash2}
                        width={20}
                        height={20}
                        alt=""
                      />
                    </button>
                  )}
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
    </Layout>
  );
};

export default OrderList;
