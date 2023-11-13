import React, { useEffect, useState } from "react";
import { Layout } from "../../../components/layout";
import { useParams, useNavigate } from "react-router-dom";
import { getOneServiceByExam, updateServiceByExam } from "../../../services/designation.service";
import Heading from "../../../components/common/Heading";
import { Label, LabelStatusDesignationDetail } from "../../../components/label";
import { Row } from "../../../components/row";
import { Field } from "../../../components/field";
import { Input } from "../../../components/input";
import { useForm } from "react-hook-form";
import moment from "moment";
import PriceUtils from "../../../helpers/PriceUtils";
import { Textarea } from "../../../components/textarea";
import { Button } from "../../../components/button";
import Select from "react-select";
import { getAllService } from "../../../services/service.service";
import { cloneDeep } from "lodash";
import { toast } from "react-toastify";
import { IconTrash } from "../../../components/icons";
import { IconPlus } from "../../../components/icons";
import { Modal } from "antd";

const DesignationDetail = () => {
  const { control } = useForm();
  const [designation, setDesignation] = useState<any>({});
  const { id } = useParams();
  const [services, setServices] = useState<any>();
  const [openModal, setOpenModal] = useState(false);
  const [url, setUrl] = useState<any>([
    {
      url: ''
    }
  ]);
  useEffect(() => {
    getOneService();
  }, [id]);
  useEffect(() => {
    getServices();
  }, []);

  const navigate = useNavigate();

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

  async function getOneService() {
    const response = await getOneServiceByExam(id);
    setDesignation(response);
    if(response?.fileResult?.length > 0) {
      setUrl(response?.fileResult)
    }
  }

  const handleChangeInput = (event?: any) => {
    let { value, name } = event.target
    if (value === " ") return;
    setDesignation({
        ...designation,
        [name]: value
    })
  }
  // thêm url
  const handleAddUrl = () => {
    const newUrl = {
      url: "",
    };
    setUrl([...url, newUrl]);
  };
  // xoá url
  const handleRemoveUrl = (index: number) => {
    let newUrl = cloneDeep(url);
    newUrl.splice(index, 1);
    if (newUrl?.length === 0) {
      newUrl.push({
        url: "",
      });
    }
    setUrl(newUrl);
  };
  // Chỉnh sửa url
  const handleUpdateUrl = (dataRela: any, index: number) => {
    let newUrl = cloneDeep(url);
    newUrl[index] = dataRela;
    setUrl(newUrl);
  };

  const udpateDesignation = async () => {
    const params = {
      service_examination: designation?.service_examination?._id,
      _id: id,
      mainResults: designation?.mainResults,
      fileResult: url
    }
    const response: any = await updateServiceByExam(params);
    if(response?.designation) {
      toast.success('Cập nhât dịch vụ chỉ định thành công');
      navigate(`/designation/list`);
    }else {
      toast.error('Đã có lỗi sảy ra')
    }
  }

  // const handleDeleteService = async () => {
  //     const res = await deleteServiceByExamination(service?._id);
  //     if (res?.designation) {
  //       toast.success("Xóa dịch vụ khám thành công");
  //       await handleGetServiceByExam();
  //     } else {
  //       toast.error("Đã có lỗi xảy ra!");
  //     }
  //   setOpenModal(false);
  // };

  

  return (
    <Layout>
      <div className="relative-h-full">
        <Heading>Chỉnh sửa đơn dịch vụ</Heading>
        <form className="flex justify-between gap-x-10 w-full pb-16">
          <div className="flex flex-col gap-y-5 w-[60%]">
            <div className="p-5 bg-white w-full rounded-xl">
              <Heading>
                Thông tin chung{" "}
                <LabelStatusDesignationDetail type={designation?.status} />
              </Heading>
              <Row>
                <Field className={"only-view"}>
                  <Label className="font-semibold" htmlFor="phone">
                    Mã phiếu
                  </Label>
                  <Input
                    control={control}
                    placeholder="----"
                    className="!border-transparent font-semibold text-black"
                    value={designation?._id ? designation?._id : "---"}
                  ></Input>
                </Field>
                <Field className={"only-view"}>
                  <Label className="font-semibold" htmlFor="phone">
                    Mã chứng từ
                  </Label>
                  <Input
                    control={control}
                    placeholder="----"
                    className="!border-transparent font-semibold text-black"
                    value={
                      designation?.examinationId
                        ? designation?.examinationId
                        : "---"
                    }
                  ></Input>
                </Field>
                <Field className={"only-view"}>
                  <Label className="font-semibold" htmlFor="clinicId">
                    Phòng khám
                  </Label>
                  <Input
                    control={control}
                    placeholder="----"
                    className="!border-transparent font-semibold text-black"
                    value={
                      designation?.clinicId?._id
                        ? designation?.clinicId?.name
                        : "---"
                    }
                  ></Input>
                </Field>
                <Field className={"only-view"}>
                  <Label className="font-semibold" htmlFor="doctorId">
                    Bác sĩ
                  </Label>
                  <Input
                    control={control}
                    placeholder="----"
                    className="!border-transparent font-semibold text-black"
                    value={
                      designation?.doctorId?._id
                        ? designation?.doctorId?.name
                        : "---"
                    }
                  ></Input>
                </Field>
              </Row>
              <Row>
                <Field className={"only-view"}>
                  <Label className="font-semibold" htmlFor="doctorId">
                    Ngày tạo
                  </Label>
                  <Input
                    control={control}
                    placeholder="----"
                    className="!border-transparent font-semibold text-black"
                    value={
                      designation?.createdAt
                        ? moment(designation?.createdAt).format(
                            "HH:mm:ss DD/MM/YYYY"
                          )
                        : "---"
                    }
                  ></Input>
                </Field>
                <Field className={"only-view"}>
                  <Label className="font-semibold" htmlFor="doctorId">
                    Người tạo
                  </Label>
                  <Input
                    control={control}
                    placeholder="----"
                    className="!border-transparent font-semibold text-black"
                    value={
                      designation?.staffId?._id
                        ? designation?.staffId?.name
                        : "---"
                    }
                  ></Input>
                </Field>
                <Field className={"only-view"}>
                  <Label className="font-semibold" htmlFor="doctorId">
                    Ngày thực hiện
                  </Label>
                  <Input
                    control={control}
                    placeholder="----"
                    className="!border-transparent font-semibold text-black"
                    value={
                      designation?.day_done
                        ? moment(designation?.day_done).format(
                            "HH:mm:ss DD/MM/YYYY"
                          )
                        : "---"
                    }
                  ></Input>
                </Field>
              </Row>
            </div>
            <div className="p-5 bg-white w-full rounded-xl">
              <Heading>Thông tin dịch vụ</Heading>
              <table className="w-full custom-table">
                <thead className="bg-[#f4f6f8] text-sm">
                  <th style={{width: '60%'}}>Tên dịch vụ</th>
                  <th style={{width: '40%'}}>Đơn giá</th>
                </thead>
                <tbody>
                  <tr>
                    <td>
                    <Select
                      placeholder="Chọn dich vụ"
                      className="mb-2 react-select"
                      classNamePrefix="react-select"
                      options={services}
                      onChange={(val: any) => {
                        setDesignation({
                          ...designation,
                          service_examination: val
                        })
                      }}
                      value={services?.find((item: any) => item?.value == designation?.service_examination?._id)}
                      formatOptionLabel={(service: any) => {
                        return (
                          <div>
                            {`${service?.name}_${service?.serviceId}`}
                          </div>
                        )
                      }}
                    ></Select>
                    </td>
                    <td>
                      {PriceUtils.format(
                        designation?.service_examination?.price
                      ) || "---"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="p-5 bg-white w-full rounded-xl">
              <Heading>Kết quả và kết luận</Heading>
              <Field>
                <Label htmlFor="mainResults">Nội dung kết quả</Label>
                <Textarea
                  control={control}
                  placeholder="Nhập kết quả và kết luận"
                  className="outline-none input-primary"
                  name="mainResults"
                  value = {designation?.mainResults}
                  onChange={(val: any) => handleChangeInput(val)}
                ></Textarea>
              </Field>
            </div>
            <div className="p-5 bg-white w-full rounded-xl">
              <Heading>Tệp kết quả</Heading>
              <Label htmlFor="mainResults">Chèn link</Label>
              <table className="w-full custom-table">
                <tbody>
                    {url && url?.map((item: any, index: number) => {
                      return (
                        <tr>
                          <td>
                            <Input
                              control={control}
                              placeholder="Nhập link"
                              className="!border-transparent font-semibold text-black"
                              name="url"
                              value={item?.url}
                              onChange={(e: any) => handleUpdateUrl({[e?.target?.name] : e?.target?.value},index)}
                            ></Input>
                          </td>
                          <td style={{ borderBottom: "none" }}>
                            <div className="flex items-center gap-x-2">
                              {
                                <div
                                  className="w-[30px] h-[30px] border border-gray-200 rounded-lg flex justify-center items-center"
                                  onClick={() => {
                                    // if (item?.id) {
                                    //   // props?.handleActionModal({ data: item, index: index });
                                    // } else {
                                      handleRemoveUrl(index);
                                    // }
                                  }}
                                  style={{cursor: 'pointer'}}
                                >
                                  <IconTrash />
                                </div>
                              }
                              {url?.length == index + 1 && (
                                <div
                                  className="flex items-center w-[30px] h-[30px] bg-primary rounded-lg text-white justify-center"
                                  onClick={() => handleAddUrl()}
                                  style={{cursor: 'pointer'}}
                                >
                                  <IconPlus></IconPlus>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex flex-col gap-y-5 w-[40%]">
            <div className="p-5 bg-white w-full rounded-xl">
              <Heading>Thông tin khách hàng</Heading>
              <Row>
                <Field className={"only-view"}>
                  <Label className="font-semibold" htmlFor="phone">
                    Bệnh nhân
                  </Label>
                  <Input
                    control={control}
                    placeholder="----"
                    className="!border-transparent font-semibold text-black"
                    value={
                      designation?.customerId?.name
                        ? designation?.customerId?.name
                        : "---"
                    }
                  ></Input>
                </Field>
              </Row>
            </div>
            <div className="p-5 bg-white w-full rounded-xl">
              <Heading>
                Thông tin thanh toán
                <div className="inline-flex gap-x-3 items-center ml-10 ">
                  <span className="text-sm">Tổng tiền: </span>
                  <span className="text-[#eda119]">
                    {PriceUtils.format(
                      designation?.service_examination?.price
                    ) || "---"}
                  </span>
                </div>
              </Heading>
              <Row className="grid-cols-1 gap-y-5">
                <Field className={"only-view"}>
                  <Label className="font-semibold" htmlFor="phone">
                    <span className="star-field">*</span>
                    Hình thức
                  </Label>
                  <Input
                    control={control}
                    placeholder="----"
                    className="!border-transparent font-semibold text-black"
                    value={
                      designation?.payment_method
                        ? designation?.payment_method
                        : "Tiền mặt"
                    }
                  ></Input>
                </Field>
                <Field className={"only-view"}>
                  <Label className="font-semibold" htmlFor="phone">
                    <span className="star-field">*</span>
                    Tài khoản quỹ
                  </Label>
                  <Input
                    control={control}
                    placeholder="----"
                    className="!border-transparent font-semibold text-black"
                    value={
                      designation?.payment_method
                        ? designation?.payment_method
                        : "Nguyễn Phi Anh - 03324222 - MB Bank"
                    }
                  ></Input>
                </Field>
                <Field className={"only-view"}>
                  <Label className="font-semibold" htmlFor="phone">
                    <span className="star-field">*</span>
                    Số tiền
                  </Label>
                  <Input
                    control={control}
                    placeholder="----"
                    className="!border-transparent font-semibold text-black"
                    value={
                      PriceUtils.format(
                        designation?.service_examination?.price
                      ) || "---"
                    }
                  ></Input>
                </Field>
              </Row>
            </div>
          </div>
        </form>
        <div className="fixed bottom-0  py-5 bg-white left-[251px] shadowSidebar right-0 action-bottom">
          <div className="flex justify-end w-full gap-x-2">
            <div className="flex items-center gap-x-2">
              <Button to={`/designation/${id}/view`}>Đóng</Button>
              <Button
                type="submit"
                className="flex items-center justify-center px-10 py-3 text-base font-semibold leading-4 text-white rounded-md disabled:opacity-50 disabled:pointer-events-none bg-primary"
                onClick={() => udpateDesignation()}
              >
                Lưu
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* <Modal
        centered
        open={openModal}
        onOk={handleDeleteService}
        onCancel={() => setOpenModal(false)}
      >
        <h1 className="text-[#4b4b5a] pb-4 border-b border-b-slate-200 font-bold text-center text-[18px]">
          Thông Báo
        </h1>
        <div className="flex flex-col items-center justify-center py-4 text-sm">
          <p>Bạn có chắc muốn xoá dịch vụ này</p>
        </div>
      </Modal> */}
    </Layout>
  );
};

export default DesignationDetail;
