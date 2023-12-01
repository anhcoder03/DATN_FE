import React, { useEffect, useState } from "react";
import { Layout } from "../../../components/layout";
import Heading from "../../../components/common/Heading";
import { Button } from "../../../components/button";
import { Row } from "../../../components/row";
import { Field } from "../../../components/field";
import { Label } from "../../../components/label";
import { Input } from "../../../components/input";
import { IconPhone, IconPlus } from "../../../components/icons";
import Flatpickr from "react-flatpickr";
import { Vietnamese } from "flatpickr/dist/l10n/vn";
import IconCalendar from "../../../assets/images/icon/ic_calendar-black.svg";
import CalcUtils from "../../../helpers/CalcULtils";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { IconTrash } from "../../../components/icons";
import { cloneDeep } from "lodash";
import { getAllCustomer } from "../../../services/customer.service";
import { getAllService } from "../../../services/service.service";
import { toast } from "react-toastify";
import PriceUtils from "../../../helpers/PriceUtils";
import { getAllClinic } from "../../../services/clinic.service";
import { Modal, Radio } from "antd";
import { Textarea } from "../../../components/textarea";
import { getAllStaff } from "../../../services/staff.service";
import {
  UpdateExamination,
  getOneExamination,
} from "../../../services/examination.service";
import { useNavigate, useParams } from "react-router-dom";
import {
  getServiceByIdExam,
  deleteServiceByExamination
} from "../../../services/designation.service";

const WelcomeUpdate = () => {
  const { id } = useParams();
  const [dataCustomers, setDataCustomers] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [clinics, setClinics] = useState<any[]>([]);
  const [staffs, setStaffs] = useState<any[]>([]);
  const [doctorId, setDoctorId] = useState<any>(null);
  const [clinicId, setClinicId] = useState<any>(null);
  const [serviceByExam, setServiceByExam] = useState<any>([]);
  const [openModal, setOpenModal] = useState(false);
  const [service, setService] = useState<any>(null);
  const [isPayment, setIsPayment] = useState(false);
  const [lengthService, setLengthService] = useState(0);
  const [deltail, setDeltail] = useState<any>();
  const navigate = useNavigate();
  const [dataServices, setDataServices] = useState([
    {
      service_id: "",
      price: "",
    },
  ]);
  console.log(dataServices, "dataServices");
  const [day_welcome, setDayWelcome] = useState(new Date());
  const [data, setData] = useState<any>();
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    async function getExamination() {
      const response = await getOneExamination(id);
      const resData = response.examination;
      setValue("customerId", resData?.customerId?._id);
      setValue("staffId", resData?.staffId?._id);
      setValue("clinicId", resData?.clinicId?._id);
      setDoctorId(resData?.doctorId?._id);
      setClinicId(resData?.clinicId?._id);
      setDayWelcome(resData?.day_welcome || new Date());
      setData(resData);
      reset(resData);
    }
    getExamination();
  }, []);

  const handleGetServiceByExam = async () => {
    const response = await getServiceByIdExam(id);
    if (response?.docs?.length > 0) {
      const ListArr: any = [];
      response?.docs?.map((e: any) => {
        ListArr?.push({
          price: e?.service_examination?.price,
          service_id: e?.service_examination?._id,
        });
      });
      setDataServices([...ListArr]);
      setServiceByExam(response?.docs);
      setLengthService(response?.docs?.length);
    } else {
      if (response?.docs?.length == 0) {
        if (dataServices.length > 1) {
          const newData = dataServices.splice(0);
          setServiceByExam(response?.docs);
          setLengthService(response?.docs?.length);
          setDataServices([...newData]);
          setServiceByExam(response?.docs);
          setLengthService(response?.docs?.length);
        } else {
          setDataServices([
            {
              service_id: "",
              price: "",
            },
          ]);
          setServiceByExam(response?.docs);
          setLengthService(response?.docs?.length);
        }
      }
    }
  };

  useEffect(() => {
    handleGetServiceByExam();
  }, []);

  useEffect(() => {
    async function getCustomers() {
      const response = await getAllCustomer({ _limit: 3000 });
      const ListArr: any = [];
      response?.docs?.map((e: any) => {
        ListArr?.push({
          ...e,
          value: e?._id,
          label: `${e?.name} - ${e?.phone}`,
        });
      });
      setDataCustomers(ListArr);
    }

    getCustomers();
  }, []);

  useEffect(() => {
    async function getClinics() {
      const response = await getAllClinic({ _limit: 3000 });
      const ListArr: any = [];
      response?.docs?.map((e: any) => {
        ListArr?.push({
          ...e,
          value: e?._id,
          label: e?.name,
        });
      });
      setClinics(ListArr);
    }

    getClinics();
  }, []);

  useEffect(() => {
    async function getStaffs() {
      const response = await getAllStaff({ name: "Nhân viên tiếp đón" });
      const ListArr: any = [];
      response?.map((e: any) => {
        ListArr?.push({
          ...e,
          value: e?._id,
          label: e?.name,
        });
      });
      setStaffs(ListArr);
    }
    getStaffs();
  }, []);

  useEffect(() => {
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

    getServices();
  }, []);

  const handleAddService = () => {
    const newData = {
      service_id: "",
      price: "",
    };
    setDataServices([...dataServices, newData]);
  };

  const handleRemoveService = (index: number) => {
    let newServiceExam = cloneDeep(dataServices);
    newServiceExam.splice(index, 1);
    if (newServiceExam?.length === 0) {
      newServiceExam = [
        {
          service_id: "",
          price: "",
        },
      ];
    }
    setDataServices(newServiceExam);
  };

  const handleUpdateService = (dataRela: any, index: number) => {
    let newServiceExam = cloneDeep(dataServices);
    newServiceExam[index] = dataRela;
    setDataServices(newServiceExam);
  };

  const handleChange = (e: any, index: any) => {
    const { name, value } = e?.target;
    if (name == "service_id") {
      const check = dataServices?.findIndex((e: any) => {
        return e?.service_id == value?._id;
      });
      if (check > -1) {
        toast.warning(
          "Không thể thêm hoặc chỉnh sửa dịch vụ đã có trong phiếu khám!"
        );
      } else {
        handleUpdateService(
          {
            price: value?.price,
            service_id: value?._id,
          },
          index
        );
      }
    } else {
      handleUpdateService(
        {
          price: value?.price,
          service_id: value?._id,
        },
        index
      );
    }
  };

  const handleUpdate = async (values: any) => {
    if (!doctorId) {
      return toast.warning("Vui lòng chọn bác sĩ phòng khám");
    }
    let checkService = false;
    dataServices.forEach((item) => {
      if (item.price === "" || item.service_id === "") {
        return (checkService = true);
      }
    });

    if (checkService) {
      return toast.warning("Dịch vụ không được được để trống");
    }
    const newService = dataServices.slice(lengthService);
    const examinationServiceId = newService.map(
      (service) => service?.service_id
    );
    const cloneData = {
      symptom: values.symptom,
      note: values.note,
      medicalHistory: values.medicalHistory,
      status: "recetion",
      clinicId,
      doctorId,
      examinationServiceId,
      day_welcome,
      _id: data?._id,
      customerId: data?.customerId?._id || data?.customerId,
      staffId: data?.staffId?._id || data?.staffId,
    };
    const res = await UpdateExamination(cloneData);
    if (res?.examination) {
      toast.success(res?.message);
      navigate(`/reception`);
    } else {
      toast.error(res?.message);
    }
  };

  const handleCreateWaiting = async (values: any) => {
    if (!doctorId) {
      return toast.warning("Vui lòng chọn bác sĩ phòng khám");
    }
    let checkService = false;
    dataServices.forEach((item) => {
      if (item.price === "" || item.service_id === "") {
        return (checkService = true);
      }
    });

    if (checkService) {
      return toast.warning("Dịch vụ không được được để trống");
    }
    const newService = dataServices.slice(lengthService);
    const examinationServiceId = newService.map(
      (service) => service?.service_id
    );
    const cloneData = {
      symptom: values.symptom,
      note: values.note,
      medicalHistory: values.medicalHistory,
      status: "waiting",
      clinicId,
      doctorId,
      examinationServiceId,
      day_welcome,
      _id: data?._id,
      customerId: data?.customerId?._id || data?.customerId,
      staffId: data?.staffId?._id || data?.staffId,
    };
    const res = await UpdateExamination(cloneData);
    if (res?.examination) {
      toast.success("Tạo phiếu khám thành công!");
      navigate(`/examination/${id}/view`);
    } else {
      toast.error(res?.message);
    }
  };

  useEffect(() => {
    const arrayError: any = Object.values(errors);
    if (arrayError.length > 0) {
      toast.warning(arrayError[0]?.message);
    }
  }, [errors]);

  const handleDeleteService = async () => {
    if (isPayment) {
      toast.error("Dịch vụ đã thanh toán không thể hủy!");
    } else {
      const res = await deleteServiceByExamination(service?._id);
      if (res?.designation) {
        toast.success("Huỷ dịch vụ khám thành công");
        await handleGetServiceByExam();
      } else {
        toast.error("Đã có lỗi xảy ra!");
      }
    }
    setOpenModal(false);
  };

  console.log('deltail', deltail)

  const handleCancelReception = async () => {
    const params = {
      status: 'cancel', 
      _id: deltail?.data?._id
    }
    const response : any = await UpdateExamination(params);
    if(response?.examination) {
      toast.success('Huỷ tiếp đón thành công!');
      navigate('/reception');
      setOpenModal(false);
    }else {
      toast.error(response?.message);
      setOpenModal(false);
    }
  }

  const handleShowModel = (serviceItem: any, paymentStatus: any) => {
    setService(serviceItem);
    if (paymentStatus === "paid") {
      setIsPayment(true);
    }
    setOpenModal(true);
  };

  const handleModal = (data: any) => {
    setDeltail(data);
    setOpenModal(true);
  };

  return (
    <Layout>
      <div>
        <div className="relative-h-full">
          <Heading>Chỉnh sửa tiếp đón</Heading>
          <form className="flex  justify-between gap-x-10 w-full pb-16">
            <div className="p-5 bg-white w-1/2 rounded-xl">
              <Heading>
                Thông tin khách hàng{" "}
                <span className="px-3 text-sm py-1 bg-[#25c2e3] text-white rounded-lg">
                  Tiếp đón
                </span>
              </Heading>
              <Row className="grid-cols-2 mb-10">
                <Field>
                  <Label className="font-semibold" htmlFor="_id">
                    <span className="star-field">*</span>
                    Chọn khách hàng
                  </Label>
                  <Select
                    placeholder=""
                    className="mb-2 !text-xs hover:!border-transparent react-select"
                    classNamePrefix="hover:!border-transparent  react-select"
                    options={dataCustomers}
                    onChange={(val: any) => {
                      setData({ ...data, customerId: val?.value });
                    }}
                    value={dataCustomers.find(
                      (option) =>
                        option.value === data?.customerId?._id ||
                        option.value === data?.customerId
                    )}
                  ></Select>
                </Field>
                <Field>
                  <Label className="font-semibold" htmlFor="staffId">
                    Nhân viên tiếp đón
                  </Label>
                  <Select
                    placeholder="Chọn nhân viên tiếp đón"
                    className="mb-2 !text-xs react-select"
                    classNamePrefix="react-select"
                    options={staffs}
                    onChange={(val: any) => {
                      setData({ ...data, staffId: val?.value });
                    }}
                    value={staffs.find(
                      (option) =>
                        option.value === data?.staffId?._id ||
                        option.value === data?.staffId
                    )}
                  ></Select>
                </Field>
              </Row>
              <Row className="grid-cols-2 mb-10">
                <Field>
                  <Label className="font-semibold" htmlFor="">
                    Tuổi
                  </Label>
                  <Input
                    control={control}
                    className="border-none font-semibold text-black"
                    value={
                      data?.customerId?.dateOfBirth
                        ? CalcUtils.calculateAge(data?.customerId?.dateOfBirth)
                        : "---"
                    }
                  />
                </Field>
                <Field className={"only-view"}>
                  <Label className="font-semibold" htmlFor="phone">
                    <span className="star-field">*</span>
                    Số điện thoại
                  </Label>
                  <Input
                    control={control}
                    placeholder="----"
                    className="!border-transparent font-semibold text-black"
                    value={
                      data?.customerId?.phone ? data?.customerId?.phone : "---"
                    }
                  >
                    <div className="p-2 bg-white">
                      <IconPhone></IconPhone>
                    </div>
                  </Input>
                </Field>
              </Row>
              <Row className="grid-cols-2 mb-10">
                <Field>
                  <Label className="font-semibold" htmlFor="">
                    Địa chỉ
                  </Label>
                  <Input
                    control={control}
                    className="border-none font-semibold text-black"
                    value={
                      data?.customerId?.province
                        ? `${data?.customerId?.commune.name}, ${data?.customerId?.district?.name}, ${data?.customerId?.province?.name}`
                        : "---"
                    }
                  />
                </Field>
                <Field className={"only-view"}>
                  <Label className="font-semibold" htmlFor="">
                    Giới tính
                  </Label>
                  <Input
                    control={control}
                    className="!border-transparent font-semibold text-black"
                    value={
                      data?.customerId?.gender
                        ? data?.customerId?.gender
                        : "---"
                    }
                  />
                </Field>
              </Row>
              <Row className="grid-cols-2 mb-10">
                <Field>
                  <Label className="font-semibold" htmlFor="_id">
                    Thời gian tiếp đón
                  </Label>
                  <div className="relative border-b border-b-gray-200 pb-3">
                    <Flatpickr
                      value={day_welcome}
                      options={{
                        locale: Vietnamese,
                        allowInput: true,
                        enableTime: true,
                        dateFormat: "d/m/Y H:i",
                        altInputClass: "date-range",
                        time_24hr: true,
                      }}
                      onChange={([date]) => {
                        setDayWelcome(date as any);
                      }}
                      placeholder="dd/mm/yyyy"
                      name="day_welcome"
                    ></Flatpickr>
                    <div className="absolute top-0 right-0">
                      <img src={IconCalendar} alt="icon" />
                    </div>
                  </div>
                </Field>
              </Row>
              <Row className="grid-cols-2 ">
                <Field>
                  <Label className="font-semibold" htmlFor="note">
                    Triệu chứng
                  </Label>
                  <Textarea
                    control={control}
                    className="outline-none input-primary"
                    name="symptom"
                    placeholder="Triệu chứng (nếu có)"
                  />
                </Field>
                <Field>
                  <Label className="font-semibold" htmlFor="note">
                    Bệnh sử
                  </Label>
                  <Textarea
                    control={control}
                    className="outline-none input-primary"
                    name="medicalHistory"
                    placeholder="Nhập bệnh sử (nếu có)"
                  />
                </Field>
              </Row>
              <Row className="grid-cols-1 mb-10 ">
                <Field>
                  <Label className="font-semibold" htmlFor="note">
                    Ghi chú
                  </Label>
                  <Textarea
                    control={control}
                    className="outline-none input-primary"
                    name="note"
                    placeholder="Nhập ghi chú"
                  />
                </Field>
              </Row>
            </div>
            <div className="flex flex-col gap-y-10 w-1/2">
              <div className="p-5 bg-white rounded-xl">
                <div className="flex flex-col">
                  <Heading>Chọn bác sĩ(Phòng khám)</Heading>
                  <Radio.Group value={clinicId}>
                    <div className="flex flex-col">
                      {clinics?.map((item) => (
                        <Radio
                          key={item?._id}
                          className="flex items-center h-[40px]"
                          value={item?._id}
                          onChange={(e) => {
                            setDoctorId(item?.doctorInClinic?._id);
                            setClinicId(e.target.value);
                          }}
                        >
                          <span className="font-semibold pr-2">
                            {item?.name}
                          </span>
                          -
                          <span className="text-[#6f42c1] pl-2 font-semibold">
                            {item?.doctorInClinic?.name}
                          </span>
                        </Radio>
                      ))}
                    </div>
                  </Radio.Group>
                </div>
              </div>
              <div className="p-5 bg-white rounded-xl">
                <Heading>Chỉ định dịch vụ</Heading>
                <table className="w-full custom-table">
                  <thead className="bg-[#f4f6f8] text-sm">
                    <th>Tên dịch vụ</th>
                    <th>Đơn giá</th>
                    <th>Thao tác</th>
                  </thead>
                  <tbody>
                    {dataServices?.map((item, index) => (
                      <tr
                        className="hover:bg-transparent"
                        key={`active-${index}`}
                      >
                        <td>
                          <Select
                            placeholder="Chọn dich vụ"
                            className="mb-2 react-select"
                            classNamePrefix="react-select"
                            options={services}
                            onChange={(value: any) => {
                              handleChange(
                                {
                                  target: { name: "service_id", value: value },
                                },
                                index
                              );
                            }}
                            value={services?.filter(
                              (option: any) => item?.service_id === option.value
                            )}
                          ></Select>
                        </td>
                        <td>{PriceUtils.format(item?.price || 0, "đ")}</td>
                        <td>
                          <div className="flex items-center gap-x-2">
                            <button
                              type="button"
                              className="w-[40px] h-[40px] border border-gray-200 rounded-lg flex justify-center items-center"
                              onClick={() => {
                                if (serviceByExam[index]?._id) {
                                  handleShowModel(
                                    serviceByExam[index],
                                    serviceByExam[index]?.paymentStatus
                                  );
                                } else {
                                  handleRemoveService(index);
                                }
                              }}
                            >
                              <IconTrash />
                            </button>
                            {dataServices?.length == index + 1 && (
                              <button
                                className="flex items-center w-[40px] h-[40px] bg-primary rounded-lg text-white justify-center"
                                onClick={handleAddService}
                              >
                                <IconPlus></IconPlus>
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </form>
        </div>
        <div className="fixed bottom-0  py-5 bg-white left-[251px] shadowSidebar right-0 action-bottom">
          <div className="flex justify-end w-full px-5">
            <div className="flex items-center gap-x-5">
              <Button to="/reception">Đóng</Button>
              <Button
                type="submit"
                className="flex items-center justify-center px-10 py-3 text-base font-semibold leading-4 text-white rounded-md disabled:opacity-50 disabled:pointer-events-none bg-primary"
                onClick={handleSubmit(handleUpdate)}
              >
                Lưu
              </Button>
              <Button
                type="button"
                className="flex items-center justify-center px-10 py-3 text-base font-semibold leading-4 text-white rounded-md disabled:opacity-50 disabled:pointer-events-none bg-primary"
                onClick={handleSubmit(handleCreateWaiting)}
              >
                Tạo phiếu khám
              </Button>
              <Button
                type="submit"
                className="flex items-center justify-center px-10 py-3 text-base font-semibold leading-4 text-[#fd4858] rounded-md disabled:opacity-50 disabled:pointer-events-none bg-[#fd485833]"
                onClick={() => {
                  handleModal({ type: "cancel", data: data });
                }}
              >
                Hủy
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        centered
        open={openModal}
        onOk={deltail?.type == 'cancel' ? handleCancelReception : handleDeleteService}
        onCancel={() => setOpenModal(false)}
      >
        <h1 className="text-[#4b4b5a] pb-4 border-b border-b-slate-200 font-bold text-center text-[18px]">
          Thông Báo
        </h1>
        {
          deltail?.type == 'cancel' ? (
            <div className="flex flex-col items-center justify-center py-4 text-sm">
              <p>Bạn có chắc muốn huỷ đặt lịch này không!</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-4 text-sm">
              <p>Bạn có chắc muốn huỷ dịch vụ này</p>
            </div>
          )
        }
      </Modal>
    </Layout>
  );
};

export default WelcomeUpdate;
