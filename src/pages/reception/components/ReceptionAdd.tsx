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
import * as yup from "yup";
import moment from "moment";
import IconCalendar from "../../../assets/images/icon/ic_calendar-black.svg";
import CalcUtils from "../../../helpers/CalcULtils";
import Select from "react-select";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { IconTrash } from "../../../components/icons";
import { cloneDeep } from "lodash";
import { getAllCustomer } from "../../../services/customer.service";
import { getAllService } from "../../../services/service.service";
import { toast } from "react-toastify";
import PriceUtils from "../../../helpers/PriceUtils";
import { getAllClinic } from "../../../services/clinic.service";
import { Radio } from "antd";
import { Textarea } from "../../../components/textarea";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { getAllStaff } from "../../../services/staff.service";
import { createExamination } from "../../../services/examination.service";
import { useNavigate } from "react-router-dom";

const schema = yup.object({
  customerId: yup.string().required("Bệnh nhân không được để trống!"),
  staffId: yup.string().required("Nhân viên tiếp đón không được để trống!"),
});

const ReceptionAdd = () => {
  const auth = useSelector((state: RootState) => state.auth.auth);
  const [dataCustomers, setDataCustomers] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [clinics, setClinics] = useState<any[]>([]);
  const [staffs, setStaffs] = useState<any[]>([]);
  const [doctorId, setDoctorId] = useState<any>(null);
  const [clinicId, setClinicId] = useState<any>(null);
  const navigate = useNavigate();
  const [dataServices, setDataServices] = useState([
    {
      service_id: "",
      price: "",
    },
  ]);
  const [day_welcome, setDayWelcome] = useState(new Date());
  const [data, setData] = useState<any>();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver<any>(schema),
    mode: "onSubmit",
  });

  useEffect(() => {
    getClinics();
    getStaffs();
    getServices();
    getCustomers();
  }, []);

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
    console.log(dataRela);
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

  const handleCreateReception = async (values: any) => {
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

    const examinationServiceId = dataServices.map(
      (service) => service.service_id
    );
    const data = {
      ...values,
      status: "recetion",
      clinicId,
      doctorId,
      examinationServiceId,
      day_welcome,
    };
    console.log(data.day_welcome);
    const res = await createExamination(data);
    if (res?.examination) {
      toast.success(res?.message);
      navigate("/reception");
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

  return (
    <Layout>
      <div className="relative-h-full">
        <Heading>Thêm mới tiếp đón</Heading>
        <form className="flex  justify-between gap-x-10 w-full pb-16">
          <div className="p-5 bg-white w-1/2 rounded-xl">
            <Heading>Thông tin khách hàng</Heading>
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
                  name="customerId"
                  options={dataCustomers}
                  onChange={(val: any) => {
                    setValue("customerId", val?._id);
                    setData(val);
                  }}
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
                  name="staffId"
                  options={staffs}
                  onChange={(val: any) => {
                    setValue("staffId", val?.value);
                  }}
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
                    data?.dateOfBirth
                      ? CalcUtils.calculateAge(data?.dateOfBirth)
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
                  value={data?.phone ? data?.phone : "---"}
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
                    data?.province
                      ? `${data?.commune.name}, ${data?.district?.name}, ${data?.province?.name}`
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
                  value={data?.gender ? data?.gender : "---"}
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
                <Radio.Group>
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
                        <span className="font-semibold pr-2">{item?.name}</span>
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
                            onClick={() => handleRemoveService(index)}
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
      <div className="fixed bottom-0 py-5 bg-white left-[251px] shadowSidebar right-0 action-bottom">
        <div className="flex justify-end w-full px-5">
          <div className="flex items-center gap-x-5">
            <Button to="/reception">Đóng</Button>
            <Button
              type="submit"
              className="flex items-center justify-center px-10 py-3 text-base font-semibold leading-4 text-white rounded-md disabled:opacity-50 disabled:pointer-events-none bg-primary"
              onClick={handleSubmit(handleCreateReception)}
            >
              Lưu
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReceptionAdd;
