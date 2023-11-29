import { useEffect, useState } from "react";
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

const PrescriptionDetail = () => {
  const auth: any = useSelector((state: RootState) => state.auth.auth?.user);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>();
  const { control, setValue, reset } = useForm<any>({});
  useEffect(() => {
    loadData(id);
  }, [id]);
  const loadData = async (id: any) => {
    try {
      setLoading(true);
      const data: any = await getOnePrescription(id);
      console.log("datafataaa", data);
      setLoading(false);
      reset(data);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("data", data);

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
                Thời gian tái khám
              </Label>
              <Input
                control={control}
                placeholder=""
                className="!border-transparent font-semibold text-black"
                value={
                  data?.createdAt
                    ? moment(data?.createdAt).format("HH:mm:ss DD/MM/YYYY")
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
                {data?.diagnostic}
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
                {data?.advice}
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
        <div className="fixed bottom-0  py-5 bg-white left-[251px] shadowSidebar right-0">
          <div className="flex justify-end w-full px-5">
            <div className="flex items-center gap-x-5">
              <Button to="/prescription">Đóng</Button>
              <Button
                to=""
                className="flex items-center justify-center px-10 py-3 text-base font-semibold leading-4 text-white rounded-md disabled:opacity-50 disabled:pointer-events-none bg-primary"
              >
                In đơn
              </Button>
              {
                (auth?.role?.roleNumber == 2 || auth?.role?.roleNumber == 3) ? null : (
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
                )
              }
              
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrescriptionDetail;
