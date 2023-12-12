import React, { useEffect, useState } from "react";
import { Layout } from "../../../components/layout";
import Heading from "../../../components/common/Heading";
import { Row } from "../../../components/row";
import { Field } from "../../../components/field";
import { Label } from "../../../components/label";
import Select from "react-select";
import { Input } from "../../../components/input";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "../../../components/button";
import { createPrescription } from "../../../services/prescription.service";
import { useNavigate, useParams } from "react-router-dom";
import { getAllCustomer } from "../../../services/customer.service";
import { Textarea } from "../../../components/textarea";
import { cloneDeep } from "lodash";
import { dataTypeImportProduct } from "../../../constants/options";
import { IconPlus, IconTrash } from "../../../components/icons";
import { IMedicine } from "../../../types/menicine.type";
import { getAllProduct } from "../../../services/medicine.service";
import { getOneExamination } from "../../../services/examination.service";

const PrescriptionAdd = () => {
  const { id } = useParams();
  const [dataCustomers, setDataCustomers] = useState<any[]>([]);
  const [products, setProducts] = useState<IMedicine[]>([]);
  const [data, setData] = useState<any>();
  const [address, setAddress] = useState({});

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
        customerId: data?.examination?.customerId,
        doctorId: data?.examination?.doctorId,
        advice: data?.examination?.advice,
        diagnostic: data?.examination?.diagnostic,
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
      price: 0,
    },
  ]);

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
    reset,
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
      price: 0,
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

  const handleCreatePrescription = async () => {
    const totalAmount: number = product?.reduce((prev: any, item: any) => {
      prev = prev + item?.price * item?.quantity;
      return prev;
    }, 0);
    const converProduct = product?.map((item: any) => {
      return {
        medicineId: item?.medicineId,
        quantity: item?.quantity,
        unit_selling: item?.unit_selling,
        unit_using: item?.unit_using,
        dosage: item?.dosage,
        timesUsePerDay: item?.timesUsePerDay,
        how_using: item?.how_using,
      };
    });
    const params = {
      medicalExaminationSlipId: id,
      doctorId: data?.doctorId?._id,
      diagnostic: data?.diagnostic,
      advice: data?.advice,
      note: data?.note,
      medicines: converProduct,
      status: 1,
      paymentStatus: 0,
      totalAmount: totalAmount,
    };
    try {
      let checkMedicineId = false;
      product.forEach((item: any) => {
        if (item.medicineId === "") {
          return (checkMedicineId = true);
        }
      });

      if (checkMedicineId) {
        return toast.warning("Thuốc không được được để trống");
      }
      let checkUnitSelling = false; // đơn vị bán
      product.forEach((item: any) => {
        if (item.unit_selling === "") {
          return (checkUnitSelling = true);
        }
      });

      if (checkUnitSelling) {
        return toast.warning("Đơn vị bán không được được để trống");
      }

      let checkUnitUsing = false;
      product.forEach((item: any) => {
        if (item.unit_using === "") {
          return (checkUnitUsing = true);
        }
      });

      if (checkUnitUsing) {
        return toast.warning("Đơn vị sử dụng không được được để trống");
      }

      setLoading(true);
      const res = await createPrescription(params);
      setLoading(false);
      if (res?.prescription) {
        toast.success(res?.message);
        navigate(`/examination/${id}/view`);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error("Error creating prescription:", error);
      toast.error("An error occurred while creating the prescription.");
    }
  };

  const handleChangeInput = (event?: any) => {
    const { value, name } = event.target;
    if (value === " ") return;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleChange = (value: any, fieldName: any, index: any) => {
    const updatedProduct = [...product];
    if (fieldName === "quantity" || fieldName === "timesUsePerDay") {
      const parsedValue = isNaN(Number(value)) ? value : Number(value);
      updatedProduct[index][fieldName] = parsedValue;
    } else if (fieldName == "medicineId") {
      updatedProduct[index]["medicineId"] = value?._id;
      updatedProduct[index]["price"] = value?.price;
    } else {
      updatedProduct[index][fieldName] = value;
    }
    setProduct(updatedProduct);
  };

  const communeName = data?.customerId?.commune?.name ?? "";
  const districtName = data?.customerId?.district?.name ?? "";
  const provinceName = data?.customerId?.province?.name ?? "";
  const combinedNames = `${communeName}, ${districtName}, ${provinceName}`;

  return (
    <Layout>
      <div className="relative h-full">
        <Heading>Thêm mới kê đơn</Heading>
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
                  className="font-semibold text-black border-none"
                  value={data?.customerId?.name}
                />
              </Field>
              <Field>
                <Label className="font-semibold" htmlFor="_id">
                  <span className="star-field">*</span>
                  Bác sỹ
                </Label>
                <Input
                  control={control}
                  className="font-semibold text-black border-none"
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
                  className="font-semibold text-black border-none"
                  value={
                    data?.customerId
                      ? `${data?.customerId?.commune.name}, ${data?.customerId?.district?.name}, ${data?.customerId?.province?.name}`
                      : "---"
                  }
                />
              </Field>
            </Row>
            <Row>
              <Field>
                <Label className="font-semibold" htmlFor="note">
                  Chẩn đoán
                </Label>
                <div className="!border-transparent font-semibold text-black">
                  {data?.diagnostic || "---"}
                </div>
              </Field>
              <Field>
                <Label className="font-semibold" htmlFor="note">
                  Lời dặn
                </Label>
                <div className="!border-transparent font-semibold text-black">
                  {data?.advice || "---"}
                </div>
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
          <div className="p-5 my-5 bg-white rounded-xl">
            <Heading>Danh sách thuốc/thực phẩm chức năng</Heading>
            <table className="w-full custom-table">
              <thead className="bg-[#f4f6f8] text-sm">
                <th style={{ width: "20%" }}>Tên thuốc</th>
                <th style={{ width: "8%" }}>Số lượng</th>
                <th style={{ width: "13%" }}>Đơn vị bán</th>
                <th style={{ width: "13%" }}>Đơn vị sử dụng</th>
                <th style={{ width: "8%" }}>Liều lượng</th>
                <th>Số lần sử dụng/ngày</th>
                <th style={{ width: "20%" }}>Cách sử dụng</th>
                <th style={{ width: "10%" }}>Hành động</th>
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
                        onChange={(selectedOption: any) =>
                          handleChange(selectedOption, "medicineId", index)
                        }
                        value={products?.filter(
                          (option: any) => item?.medicineId == option.value
                        )}
                      ></Select>
                    </td>
                    <td>
                      <Input
                        control={control}
                        placeholder="0"
                        value={item?.quantity}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          const regex = /^\d*$/;
                          if (regex.test(inputValue) || inputValue === "") {
                            handleChange(inputValue, "quantity", index);
                          }
                        }}
                        className="px-3 mb-1 font-semibold text-black border rounded-md"
                      />
                    </td>
                    <td>
                      <Select
                        placeholder="Chọn"
                        className="mb-2 react-select"
                        menuPlacement="top"
                        options={dataTypeImportProduct}
                        onChange={(value: any) =>
                          handleChange(value?.value, "unit_selling", index)
                        }
                      ></Select>
                    </td>
                    <td>
                      <Select
                        placeholder="Chọn"
                        className="mb-2 react-select"
                        menuPlacement="top"
                        options={dataTypeImportProduct}
                        onChange={(value: any) =>
                          handleChange(value?.value, "unit_using", index)
                        }
                      ></Select>
                    </td>
                    <td>
                      <Input
                        control={control}
                        placeholder="0"
                        value={item?.dosage}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          const regex = /^\d*$/;
                          if (regex.test(inputValue) || inputValue === "") {
                            handleChange(inputValue, "dosage", index);
                          }
                        }}
                        className="px-3 mb-1 font-semibold text-black border rounded-md"
                      />
                    </td>
                    <td>
                      <Input
                        control={control}
                        placeholder="0"
                        value={item?.timesUsePerDay}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          const regex = /^\d*$/;
                          if (regex.test(inputValue) || inputValue === "") {
                            handleChange(inputValue, "timesUsePerDay", index);
                          }
                        }}
                        className="px-3 mb-1 font-semibold text-black border rounded-md"
                      />
                    </td>
                    <td>
                      <Input
                        control={control}
                        placeholder="Cách sử dụng"
                        value={item?.how_using}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          handleChange(inputValue, "how_using", index);
                        }}
                        className="px-3 mb-1 font-semibold text-black border rounded-md"
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
        </form>
        <div className="fixed bottom-0  py-5 bg-white left-[251px] shadowSidebar right-0">
          <div className="flex justify-end w-full px-5">
            <div className="flex items-center gap-x-5">
              <Button to="/customer/list">Đóng</Button>
              <Button
                type="submit"
                className="flex items-center justify-center px-10 py-3 text-base font-semibold leading-4 text-white rounded-md disabled:opacity-50 disabled:pointer-events-none bg-primary"
                onClick={handleSubmit(handleCreatePrescription)}
                isLoading={loading}
                disabled={loading}
              >
                Lưu
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrescriptionAdd;
