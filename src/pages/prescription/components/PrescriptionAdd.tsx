import React, { useEffect, useState } from "react";
import { Layout } from "../../../components/layout";
import Heading from "../../../components/common/Heading";
import { Row } from "../../../components/row";
import { Field } from "../../../components/field";
import { Label } from "../../../components/label";
import Select from "react-select";
import { Input } from "../../../components/input";
import Flatpickr from "react-flatpickr";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Vietnamese } from "flatpickr/dist/l10n/vn";
import { Button } from "../../../components/button";
import {
  createPrescription,
  getOnePrescription,
} from "../../../services/prescription.service";
import { useNavigate, useParams } from "react-router-dom";
import { getAllCustomer } from "../../../services/customer.service";
import IconCalendar from "../../../assets/images/icon/ic_calendar-black.svg";
import { Textarea } from "../../../components/textarea";
import { cloneDeep } from "lodash";
import { dataTypeImportProduct } from "../../../constants/options";
import { IconPlus, IconTrash } from "../../../components/icons";
import { IMedicine } from "../../../types/menicine.type";
import { getAllProduct } from "../../../services/medicine.service";
import { getOneExamination } from "../../../services/examination.service";
import moment from "moment";
// const schema = yup.object({
//   customerId: yup.string().required("Khách hàng là trường bắt buộc"),
//   doctor: yup.string().required("Bác sỹ là trường bắt buộc"),
//   nextAppointment: yup.date().nullable(),
//   diagnostic: yup.string().required("Chẩn đoán là trường bắt buộc"),
//   advice: yup.string().required("Lời dặn là trường bắt buộc"),
//   note: yup.string(),
// });

const PrescriptionAdd = () => {
  const { id } = useParams();
  const [dataCustomers, setDataCustomers] = useState<any[]>([]);
  const [products, setProducts] = useState<IMedicine[]>([]);
  const [data, setData] = useState<any>();

  useEffect(() => {
    loadData(id);
  }, [id]);
  const loadData = async (id: any) => {
    try {
      setLoading(true);
      const data: any = await getOneExamination(id);
      setLoading(false);
      setData({
        customer: data?.examination?.customer,
        doctorId: data?.examination?.doctorId,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const [product, setProduct] = useState<any>([
    {
      medicineId: "",
      quantity: 1,
      unit_selling: "",
      unit_using: "",
      dosage: "",
      timesUsePerDay: 1,
      how_using: "",
      routeOfDrug: "",
    },
  ]);
  const [day_welcome, setDayWelcome] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(location.search);
  const [query, setQuery] = useState({
    _page: 1,
    _limit: 25,
    _sort: "createdAt",
    _order: "asc",
    search: "",
    _status: "",
  });
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    // resolver: yupResolver<any>(schema),
    mode: "onSubmit",
  });
  const handleAddMedicine = () => {
    const newData = {
      medicineId: "",
      quantity: 1,
      unit_selling: "",
      unit_using: "",
      dosage: "",
      timesUsePerDay: 1,
      how_using: "",
      routeOfDrug: "",
    };
    setProduct([...product, newData]);
  };
  const handleRemoveMedicine = (index: number) => {
    let newMedicineExam = cloneDeep(product);
    newMedicineExam.splice(index, 1);
    if (newMedicineExam?.length === 0) {
      newMedicineExam = [
        {
          medicineId: "",
          quantity: 1,
          unit_selling: "",
          unit_using: "",
          dosage: "",
          timesUsePerDay: 1,
          how_using: "",
          routeOfDrug: "",
        },
      ];
    }
    setProduct(newMedicineExam);
  };
  const handleGetProducts = async () => {
    try {
      setLoading(true);
      const data = await getAllProduct(query);
      const array: any = [];
      if (data.docs) {
        data.docs?.map((item: any) => {
          array.push({ ...item, label: item?.name, value: item?._id });
        });
      }
      setLoading(false);
      setProducts(array);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // document.title = "Danh sách sản phẩm";
    urlParams.set("page", query._page as any);
    urlParams.set("limit", query._limit as any);
    navigate(`?${urlParams}`);
    handleGetProducts();
  }, [query]);

  useEffect(() => {
    async function getCustomers() {
      try {
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
      } catch (error) {
        console.error("Error fetching customers:", error);
        toast.error("An error occurred while fetching customers.");
      }
    }

    getCustomers();
  }, []);
  const handleCreatePrescription = async (values: any) => {
    const params = {
      medicalExaminationSlipId: data?.customer?._id,
      doctorId: data?.doctorId?._id,
      diagnostic: data?.diagnostic,
      reExaminationDate: data?.reExaminationDate,
      advice: data?.advice,
      note: data?.note,
    };
    try {
      const res = await createPrescription(params);
      if (res?.customer) {
        toast.success(res?.message);
        navigate("/prescription");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error("Error creating prescription:", error);
      toast.error("An error occurred while creating the prescription.");
    }
  };
  const handleChangeInput = (event?: any) => {
    let { value, name } = event.target;
    if (value === " ") return;
    setData({
      ...data,
      [name]: value,
    });
  };
  console.log("data", data);

  return (
    <Layout>
      <div className="relative h-full">
        <Heading>Kê đơn</Heading>
        <form
          className="w-full"
          onSubmit={handleSubmit(handleCreatePrescription)}
        >
          <div className="p-5 bg-white rounded-xl">
            <Heading>Thông tin kê đơn</Heading>
            <Row>
              <Field>
                <Label className="font-semibold" htmlFor="_id">
                  <span className="star-field">*</span>
                  Khách hàng
                </Label>
                <Input
                  control={control}
                  name="customerId"
                  className="border-none font-semibold text-black"
                  value={data?.customer?.name}
                />
              </Field>
              <Field>
                <Label className="font-semibold" htmlFor="_id">
                  <span className="star-field">*</span>
                  Người bảo hộ
                </Label>
                <Input
                  control={control}
                  className="border-none font-semibold text-black"
                  value={"---"}
                />
              </Field>
              <Field>
                <Label className="font-semibold" htmlFor="_id">
                  <span className="star-field">*</span>
                  Bác sỹ
                </Label>
                <Input
                  control={control}
                  className="border-none font-semibold text-black"
                  name="doctorId"
                  value={data?.doctorId?.name}
                />
              </Field>
            </Row>
            <Row>
              <Field>
                <Label className="font-semibold" htmlFor="_id">
                  <span className="star-field">*</span>
                  Địa chỉ
                </Label>
                <Input
                  control={control}
                  className="border-none font-semibold text-black"
                  value={"---"}
                />
              </Field>
              <Field>
                <Label className="font-semibold" htmlFor="_id">
                  Thời gian tái khám
                </Label>
                <div className="relative border-b border-b-gray-200 pb-3">
                  <Flatpickr
                    value={data?.reExaminationDate}
                    options={{
                      locale: Vietnamese,
                      allowInput: true,
                      enableTime: true,
                      dateFormat: "d/m/Y H:i",
                      altInputClass: "date-range",
                      time_24hr: true,
                      minDate: "today",
                    }}
                    onChange={([date]) => {
                      setData({
                        ...data,
                        reExaminationDate: moment(date).format(),
                      });
                    }}
                    placeholder="dd/mm/yyyy"
                    name="reExaminationDate"
                  ></Flatpickr>
                  <div className="absolute top-0 right-0">
                    <img src={IconCalendar} alt="icon" />
                  </div>
                </div>
              </Field>
            </Row>
            <Row>
              <Field>
                <Label className="font-semibold" htmlFor="note">
                  Chẩn đoán
                </Label>
                <Textarea
                  control={control}
                  className="outline-none input-primary"
                  name="diagnostic"
                  placeholder="Nhập chẩn đoán bệnh"
                  value={data?.diagnostic}
                  onChange={(val: any) => {
                    handleChangeInput(val);
                  }}
                />
              </Field>
              <Field>
                <Label className="font-semibold" htmlFor="note">
                  Lời dặn
                </Label>
                <Textarea
                  control={control}
                  className="outline-none input-primary"
                  name="advice"
                  placeholder="Nhập lời dặn cho khách hàng"
                  value={data?.advice}
                  onChange={(val: any) => {
                    handleChangeInput(val);
                  }}
                />
              </Field>
            </Row>
            <Field>
              <Label className="font-semibold" htmlFor="_id">
                Chú thích
              </Label>
              <Textarea
                control={control}
                className="outline-none input-primary"
                name="note"
                placeholder="Nhập chú thích"
                value={data?.note}
                onChange={(val: any) => {
                  handleChangeInput(val);
                }}
              />
            </Field>
          </div>
          <div className="p-5 bg-white rounded-xl my-5">
            <Heading>Danh sách thuốc/thực phẩm chức năng</Heading>
            <table className="w-full custom-table">
              <thead className="bg-[#f4f6f8] text-sm">
                <th style={{ width: "20%" }}>Tên thuốc</th>
                <th style={{ width: "7%" }}>Số lượng</th>
                <th style={{ width: "13%" }}>Đơn vị bán</th>
                <th style={{ width: "13%" }}>Đơn vị sử dụng</th>
                <th style={{ width: "20%" }}>Liều lượng</th>
                <th>Số lần sử dụng/ngày</th>
                <th style={{ width: "20%" }}>Cách sử dụng</th>
                <th style={{ width: "10%" }}>Hoạt động</th>
              </thead>
              <tbody>
                {product.map((item: any, index: any) => (
                  <tr className="hover:bg-transparent">
                    <td>
                      <Select
                        placeholder="Chọn sản phẩm"
                        className="mb-2 react-select"
                        menuPlacement="top"
                        options={products}
                      ></Select>
                    </td>
                    <td>
                      <Input
                        control={control}
                        placeholder="0"
                        className="border font-semibold text-black rounded-md px-3"
                      />
                    </td>
                    <td>
                      <Select
                        placeholder="Chọn"
                        className="mb-2 react-select"
                        menuPlacement="top"
                        options={dataTypeImportProduct}
                        // onChange={(value: any) => {
                        //   handleChange(
                        //     {
                        //       target: { name: "service_id", value: value },
                        //     },
                        //     index
                        //   );
                        // }}
                        // value={
                        //   serviceByExam
                        //     ? services.find(
                        //         (option) => option.value === item?.service_id
                        //       )
                        //     : services?.filter(
                        //         (option: any) =>
                        //           item?.service_id === option.value
                        //       )
                        // }
                      ></Select>
                    </td>
                    <td>
                      <Select
                        placeholder="Chọn"
                        className="mb-2 react-select"
                        menuPlacement="top"
                        options={dataTypeImportProduct}
                        // onChange={(value: any) => {
                        //   handleChange(
                        //     {
                        //       target: { name: "service_id", value: value },
                        //     },
                        //     index
                        //   );
                        // }}
                        // value={
                        //   serviceByExam
                        //     ? services.find(
                        //         (option) => option.value === item?.service_id
                        //       )
                        //     : services?.filter(
                        //         (option: any) =>
                        //           item?.service_id === option.value
                        //       )
                        // }
                      ></Select>
                    </td>
                    <td>
                      <Input
                        control={control}
                        placeholder="Nhập thông tin liều lượng thuốc"
                        className="border font-semibold text-black rounded-md px-3"
                      />
                    </td>
                    <td>
                      <Input
                        control={control}
                        placeholder="0"
                        className="border font-semibold text-black rounded-md px-3"
                      />
                    </td>
                    <td>
                      <Input
                        control={control}
                        placeholder="Cách sử dụng"
                        className="border font-semibold text-black rounded-md px-3"
                      />
                    </td>
                    <td>
                      <div className="flex items-center gap-x-2">
                        <button
                          type="button"
                          className="w-[40px] h-[40px] border border-gray-200 rounded-lg flex justify-center items-center"
                          onClick={() => {
                            handleRemoveMedicine(index);
                          }}
                        >
                          <IconTrash />
                        </button>
                        {product?.length == index + 1 && (
                          <button
                            className="flex items-center w-[40px] h-[40px] bg-primary rounded-lg text-white justify-center"
                            onClick={handleAddMedicine}
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
          <div className="flex justify-end w-full">
            <div className="flex items-center gap-x-5">
              <Button to="/customer/list">Đóng</Button>
              <button
                type="submit"
                className="flex items-center justify-center px-10 py-3 text-base font-semibold leading-4 text-white rounded-md disabled:opacity-50 disabled:pointer-events-none bg-primary"
                onClick={handleSubmit(handleCreatePrescription)}
              >
                Lưu
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default PrescriptionAdd;
function setTotalPages(totalPages: any) {
  throw new Error("Function not implemented.");
}