import React, { useEffect, useState } from "react";
import Heading from "../../../components/common/Heading";
import { Row } from "../../../components/row";
import { Field } from "../../../components/field";
import { Label, LabelStatus } from "../../../components/label";
import { Input } from "../../../components/input";
import { IconPhone, IconPlus } from "../../../components/icons";
import Flatpickr from "react-flatpickr";
import { Vietnamese } from "flatpickr/dist/l10n/vn";
import * as yup from "yup";
import moment from "moment";
import IconCalendar from "../../../assets/images/icon/ic_calendar-black.svg";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { cloneDeep, set } from "lodash";
import { getAllCustomer } from "../../../services/customer.service";
import { getAllService } from "../../../services/service.service";
import { toast } from "react-toastify";
import { getAllClinic } from "../../../services/clinic.service";
import { Textarea } from "../../../components/textarea";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { getAllStaff } from "../../../services/staff.service";
import {
  createExamination,
  getOneExamination,
} from "../../../services/examination.service";
import { useNavigate, useParams } from "react-router-dom";
import { Radio } from "antd";

type Props = {
  id: String | undefined;
};

const schema = yup.object({
  customerId: yup.string().required("Bệnh nhân không được để trống!"),
  staffId: yup.string().required("Nhân viên tiếp đón không được để trống!"),
});
const ExaminationInfo = () => {
  const { id } = useParams();
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
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver<any>(schema),
    mode: "onSubmit",
  });

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

  useEffect(() => {
    if (id !== undefined) {
      loadData();
    }
  }, [id]);
  async function loadData() {
    try {
      const response = await getOneExamination(id);
      const resData = response?.examination;
      console.log(resData, "resData");
      setData({
        ...resData,
      });
      setClinicId(resData?.clinicId?._id);
    } catch (error) {
      toast.error("Đã có lỗi sảy ra!!!");
    }
  }

  function calculateAge(dateOfBirth: any) {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = birthDate.getDate() - today.getDate();

    if (months < 0 || (months === 0 && days < 0)) {
      years--;
      months += 12;
    }

    return `${years} tuổi , ${months} tháng , ${days}ngày`;
  }

  const dateOfBirth = data?.customerId?.dateOfBirth;
  const ageWithDetails = dateOfBirth ? calculateAge(dateOfBirth) : "---";
  return (
    <form className="flex bg-grayF3  justify-between gap-x-10 w-full pb-16">
      <div className="flex flex-col gap-y-10 w-1/2">
        <div className="p-5 bg-white rounded-xl">
          <Heading>
            Thông tin bệnh nhân
            <span>
              <LabelStatus type={data?.status} />
            </span>
          </Heading>
          <Row className="grid-cols-3 mb-10 ">
            <Field>
              <Label className="font-semibold" htmlFor="_id">
                <span className="star-field">*</span>
                Chọn bệnh nhân
              </Label>
              <Input
                control={control}
                className="border-none font-semibold text-black"
                value={data?.customerId?.name || "---"}
              />
            </Field>
            <Field>
              <Label className="font-semibold" htmlFor="staffId">
                Nhân viên tiếp đón
              </Label>
              <Input
                control={control}
                className="border-none font-semibold text-black"
                value={data?.staffId?.name || "---"}
              />
            </Field>
            <Field>
              <Label className="font-semibold" htmlFor="staffId">
                Bác sĩ
              </Label>
              <Input
                control={control}
                className="border-none font-semibold text-black"
                value={data?.doctorId?.name || "---"}
              />
            </Field>
          </Row>
          <Row className="grid-cols-3 mb-10">
            <Field>
              <Label className="font-semibold" htmlFor="">
                Ngày sinh
              </Label>
              <Input
                control={control}
                className="border-none font-semibold text-black"
                value={moment(data?.customerId?.dateOfBirth).format(
                  "YYYY-MM-DD"
                )}
              />
            </Field>
            <Field>
              <Label className="font-semibold" htmlFor="">
                Tuổi
              </Label>
              <Input
                control={control}
                className="border-none font-semibold text-black"
                value={`${ageWithDetails}`}
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
            <Field className={"only-view"}>
              <Label className="font-semibold" htmlFor="">
                Giới tính
              </Label>
              <Input
                control={control}
                className="!border-transparent font-semibold text-black"
                value={
                  data?.customerId?.gender ? data?.customerId?.gender : "---"
                }
              />
            </Field>
            <Field>
              <Label className="font-semibold" htmlFor="">
                Địa chỉ
              </Label>
              <Input
                control={control}
                className="border-none font-semibold text-black"
                value={
                  data?.customerId
                    ? `${data?.customerId?.commune.name}, ${data?.customerId?.district?.name}, ${data?.customerId?.province?.name}`
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
        </div>

        <div className="p-5 bg-white rounded-xl">
          <div className="flex flex-col pointer-events-none">
            <Heading>Kết luận</Heading>
            <Row className="grid-cols-1 gap-y-5">
              <Field>
                <Label className="font-semibold" htmlFor="conclude">
                  Kết luận chính
                </Label>
                <Textarea
                  control={control}
                  className="outline-none input-primary"
                  name="conclude"
                  placeholder="Nhập kết luận"
                  value={data?.conclude || "---"}
                />
              </Field>
              <Field>
                <Label className="font-semibold" htmlFor="diagnostic">
                  Chuẩn đoán
                </Label>
                <Textarea
                  control={control}
                  className="outline-none input-primary"
                  name="diagnostic"
                  placeholder="Nhập chuẩn đoán"
                  value={data?.diagnostic || "---"}
                />
              </Field>

              <Field>
                <Label
                  className="font-semibold"
                  htmlFor="treatmentInstructions"
                >
                  Hướng đẫn điều trị
                </Label>
                <Textarea
                  control={control}
                  className="outline-none input-primary"
                  name="treatmentInstructions"
                  placeholder="Nhập hướng dẫn"
                  value={data?.treatmentInstructions || "---"}
                />
              </Field>
              <Field>
                <Label className="font-semibold" htmlFor="advice">
                  Dặn dò
                </Label>
                <Textarea
                  control={control}
                  className="outline-none input-primary"
                  name="advice"
                  placeholder="Nhập dặn dò"
                  value={data?.advice || "---"}
                />
              </Field>
            </Row>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-y-10 w-1/2">
        <div className="p-5 bg-white rounded-xl">
          <div className="flex flex-col pointer-events-none">
            <Heading>Thông tin khám bệnh</Heading>
            <Row className="grid-cols-1 gap-y-5">
              <Field>
                <Label className="font-semibold" htmlFor="note">
                  Triệu chứng
                </Label>
                <Textarea
                  control={control}
                  className="outline-none input-primary"
                  name="symptom"
                  placeholder="Triệu chứng (nếu có)"
                  value={data?.symptom || "---"}
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
                  value={data?.medicalHistory || "---"}
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
                  value={data?.note || "---"}
                />
              </Field>
            </Row>
          </div>
        </div>
        <div className="p-5 bg-white rounded-xl">
          <div className="flex flex-col pointer-events-none">
            <Heading>Bác sĩ và Phòng khám</Heading>
            <Row className="grid-cols-1 gap-y-5">
              <Field>
                <Label className="font-semibold" htmlFor="note">
                  Bác sĩ
                </Label>
                <Textarea
                  control={control}
                  className="outline-none input-primary"
                  name="symptom"
                  placeholder="Bác sĩ"
                  value={data?.doctorId?.name || "---"}
                />
              </Field>
              <Field>
                <Label className="font-semibold" htmlFor="note">
                  Phòng khám thực hiện
                </Label>
                <Textarea
                  control={control}
                  className="outline-none input-primary"
                  name="medicalHistory"
                  placeholder="Phòng khám"
                  value={data?.clinicId?.name || "---"}
                />
              </Field>
              <Field>
                <Label className="font-semibold" htmlFor="note">
                  Ví trị phòng khám
                </Label>
                <Textarea
                  control={control}
                  className="outline-none input-primary"
                  name="medicalHistory"
                  placeholder="Phòng khám"
                  value={data?.clinicId?.description || "---"}
                />
              </Field>
            </Row>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ExaminationInfo;
