import { useEffect, useState, useRef } from "react";
import { Layout } from "../../../components/layout";
import Heading from "../../../components/common/Heading";
import { Row } from "../../../components/row";
import { Field } from "../../../components/field";
import { Label } from "../../../components/label";
import { Input } from "../../../components/input";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import moment from "moment";
import { getOnePrescription } from "../../../services/prescription.service";
import { Button } from "../../../components/button";
import { Textarea } from "../../../components/textarea";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useReactToPrint } from "react-to-print";
import Printprescription from "../../../components/print/Printprescription";

const PrescriptionDetail = () => {
  const auth: any = useSelector((state: RootState) => state.auth.auth?.user);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>();
  const { control, setValue, reset } = useForm<any>({});
  const [openModal, setOpenModal] = useState(false);
  const [action, setAction] = useState<any>();

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => {
      setOpenModal(false);
    },
    copyStyles: true,
  });

  useEffect(() => {
    loadData(id);
  }, [id]);

  const loadData = async (id: any) => {
    try {
      setLoading(true);
      const data: any = await getOnePrescription(id);
      setLoading(false);
      reset(data);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickPrint = () => {
    setOpenModal(true);
    setAction({ type: "print" });
    setTimeout(() => {
      handlePrint();
    }, 500);
  };

  return (
    <Layout>
      <div className="relative h-full">
        <Heading>Xem chi tiết kê đơn</Heading>
        <div
          className="w-full p-5 bg-white "
          // onSubmit={handleSubmit(handleCreatePrescription)}
        >
          <Heading>Thông tin kê đơn</Heading>
          <Row>
            <Field className={"only-view"}>
              <Label className="font-semibold" htmlFor="phone">
                <span className="star-field">*</span>
                Khách hàng
              </Label>
              <Input
                control={control}
                placeholder=""
                className="!border-transparent font-semibold text-black"
                value={data?.medicalExaminationSlipId?.customer?.name}
              ></Input>
            </Field>
            <Field>
              <Label className="font-semibold" htmlFor="_id">
                Người bảo hộ
              </Label>
              <Input
                control={control}
                className="border-none font-semibold text-black"
                value={"---"}
              />
            </Field>
            <Field className={"only-view"}>
              <Label className="font-semibold" htmlFor="phone">
                <span className="star-field">*</span>
                Bác sỹ
              </Label>
              <Input
                control={control}
                placeholder=""
                className="!border-transparent font-semibold text-black"
                value={data?.doctorId?.name}
              ></Input>
            </Field>
          </Row>
          <Row>
            <Field>
              <Label className="font-semibold" htmlFor="_id">
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
                Hình thức khám
              </Label>
              <Input
                control={control}
                className="border-none font-semibold text-black"
                value={"Khám online"}
              />
            </Field>
            <Field className={"only-view"}>
              <Label className="font-semibold" htmlFor="phone">
                Thời gian kê đơn
              </Label>
              <Input
                control={control}
                placeholder=""
                className="!border-transparent font-semibold text-black"
                value={
                  data?.createdAt
                    ? moment(data?.createdAt).format("DD/MM/YYYY")
                    : "---"
                }
              ></Input>
            </Field>
          </Row>
          <Row>
            <Field className={"only-view"}>
              <Label className="font-semibold" htmlFor="phone">
                Chẩn đoán
              </Label>
              {/* <Textarea
                control={control}
                placeholder="----"
                className="!border-transparent font-semibold text-black"
                value={data?.diagnostic}
              /> */}
              <div className="!border-transparent font-semibold text-black">
                {data?.diagnostic || '---'}
              </div>
            </Field>
            <Field className={"only-view"}>
              <Label className="font-semibold" htmlFor="phone">
                Lời dặn
              </Label>
              {/* <Textarea
                control={control}
                placeholder="----"
                className="!border-transparent font-semibold text-black"
                value={data?.advice}
              /> */}
              <div className="!border-transparent font-semibold text-black">
                {data?.advice || '---'}
              </div>
            </Field>
            <Field className={"only-view"}>
              <Label className="font-semibold" htmlFor="phone">
                Trạng thái
              </Label>
              <Input
                control={control}
                placeholder="--"
                className="!border-transparent font-semibold text-black"
                value={data?.status}
              ></Input>
            </Field>
          </Row>

          <Field className={"only-view"}>
            <Label className="font-semibold" htmlFor="phone">
              Chú thích
            </Label>
            <Textarea
              control={control}
              placeholder="----"
              className="!border-transparent font-semibold text-black"
              value={data?.note}
            />
          </Field>
        </div>
        <div className="p-5 bg-white rounded-xl my-5">
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
              {/* <th style={{ width: "10%" }}>Hành động</th> */}
            </thead>
            <tbody>
              {data?.medicines?.map((item: any) => (
                <tr className="hover:bg-transparent">
                  <td>
                    <Input
                      control={control}
                      placeholder="0"
                      value={item?.medicineId?.name}
                      className="border font-semibold text-black rounded-md px-3 mb-1"
                    />
                  </td>
                  <td>
                    <Input
                      control={control}
                      placeholder="0"
                      value={item?.quantity}
                      className="border font-semibold text-black rounded-md px-3 mb-1"
                    />
                  </td>
                  <td>
                    <Input
                      control={control}
                      placeholder="0"
                      value={item?.unit_selling}
                      className="border font-semibold text-black rounded-md px-3 mb-1"
                    />
                  </td>
                  <td>
                    <Input
                      control={control}
                      placeholder="0"
                      value={item?.unit_using}
                      className="border font-semibold text-black rounded-md px-3 mb-1"
                    />
                  </td>
                  <td>
                    <Input
                      control={control}
                      placeholder="0"
                      value={item?.dosage}
                      className="border font-semibold text-black rounded-md px-3 mb-1"
                    />
                  </td>
                  <td>
                    <Input
                      control={control}
                      placeholder="0"
                      value={item?.timesUsePerDay}
                      className="border font-semibold text-black rounded-md px-3 mb-1"
                    />
                  </td>
                  <td>
                    <Input
                      control={control}
                      placeholder="0"
                      value={item?.how_using}
                      className="border font-semibold text-black rounded-md px-3 mb-1"
                    />
                  </td>
                  {/* <td>
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
                    </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="fixed bottom-0  py-5 bg-white left-[251px] shadowSidebar right-0">
          <div className="flex justify-end w-full px-5">
            <div className="flex items-center gap-x-5">
              <Button to="/prescription">Đóng</Button>
              <Button
                onClick={() => handleClickPrint()}
                to=""
                className="flex items-center justify-center px-10 py-3 text-base font-semibold leading-4 text-white rounded-md disabled:opacity-50 disabled:pointer-events-none bg-primary"
              >
                In đơn
              </Button>
              {auth?.role?.roleNumber == 2 ||
              auth?.role?.roleNumber == 3 ? null : (
                <>
                  <Button to="">Tạo đơn Offline</Button>
                  <Button
                    type="submit"
                    className="flex items-center justify-center px-10 py-3 text-base font-semibold leading-4 text-white rounded-md disabled:opacity-50 disabled:pointer-events-none bg-primary"
                    // onClick={handleSubmit(handleCreatePrescription)}
                  >
                    Tạo đơn Online
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {action?.type == "print" && (
        <Printprescription
          componentRef={componentRef}
          dataPrint={data}
          check={true}
        ></Printprescription>
      )}
    </Layout>
  );
};

export default PrescriptionDetail;
