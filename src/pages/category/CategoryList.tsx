import { Layout } from "../../components/layout";
import React, { useEffect, useState } from "react";
import Heading from "../../components/common/Heading";
import { Table } from "../../components/table";
import {
  deleteCategory,
  getAllCategory,
} from "../../services/category.service";
import { useNavigate } from "react-router-dom";
import IconEdit from "../../assets/images/icon-edit.png";
import { IconTrash } from "../../components/icons";
import { Modal } from "antd";
import Pagination from "./../../components/pagination/Pagination";
import { toast } from "react-toastify";
import FilterCategory from "./components/FilterCategory";
import profilePic from "../../assets/images/users/no-img.jpg";
const optionsPagination = [
  { value: 25, label: "25 bản ghi" },
  { value: 50, label: "50 bản ghi" },
  { value: 100, label: "100 bản ghi" },
];

const CategoryList = () => {
  const [categorys, setCategorys] = useState<any>();
  const [category, setCategory] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [totalDocs, setTotalDocs] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const urlParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const [query, setQuery] = useState({
    _page: 1,
    _limit: 25,
    search: "",
  });

  const headings = ["Ảnh Danh Mục ", "Tên Danh Mục", "Thao tác"];
  const handlePageClick = (event: any) => {
    const page = event.selected + 1;
    setQuery({ ...query, _page: page });
  };

  const handleGetCategory = async () => {
    try {
      setLoading(true);
      const data = await getAllCategory(query);
      setLoading(false);
      setTotalPages(data.totalPages);
      setTotalDocs(data.totalDocs);
      setCategorys(data.docs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.title = "Danh sách danh mục";
    urlParams.set("page", query._page as any);
    urlParams.set("limit", query._limit as any);
    navigate(`?${urlParams}`);
    handleGetCategory();
  }, [query]);

  const handleLimitChange = (data: any) => {
    setQuery({ ...query, _limit: data.value });
  };
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
  const handleShowModel = (data: any) => {
    setOpenModal(true);
    setCategory(data);
  };

  const onOk = async () => {
    const res = await deleteCategory(category?._id);
    console.log("onOk", res);
    if (res?.message) {
      toast.success(res?.message);
      setOpenModal(false);
      handleGetCategory();
    } else {
      toast.error(res?.message);
    }
    setOpenModal(false);
  };

  const gotoDetail = (item: any) => {
    navigate(`/category/view/${item?._id}`);
  };

  return (
    <Layout>
      <Heading>Quản Lý Danh Mục</Heading>
      <FilterCategory handleSearch={handleSearch}></FilterCategory>
      <div className="bg-white">
        <Table headings={headings} loading={loading} length={categorys?.length}>
          {categorys?.map((item: any) => (
            <tr
              className="text-xs"
              key={item?._id}
              style={{ cursor: "pointer" }}
            >
              <td onClick={() => gotoDetail(item)}>
                {" "}
                <img
                  className="w-16 h-16 object-cover rounded"
                  src={item?.image ? item?.image : profilePic}
                  alt=""
                />{" "}
              </td>
              <td onClick={() => gotoDetail(item)}>{item?.name}</td>
              <td>
                <div className="table-action">
                  <div
                    className="button-nutri"
                    onClick={() => {
                      navigate(`/category/update/${item?._id}`);
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
      <Modal
        centered
        open={openModal}
        onOk={onOk}
        onCancel={() => setOpenModal(false)}
      >
        <h1 className="text-[#4b4b5a] pb-4 border-b border-b-slate-200 font-bold text-center text-[18px]">
          Thông Báo
        </h1>
        <div className="flex flex-col items-center justify-center py-4 text-sm">
          <p>Bạn có chắc muốn xoá danh mục</p>
          <span className="text-center text-[#ff5c75] font-bold">
            {category?.name}
          </span>
        </div>
      </Modal>
    </Layout>
  );
};

export default CategoryList;
