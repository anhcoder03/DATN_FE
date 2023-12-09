import { useState } from "react";
import Heading from "../../../components/common/Heading";
import { Row } from "../../../components/row";
import { Field } from "../../../components/field";
import { Label, LabelStatus } from "../../../components/label";
import { Input } from "../../../components/input";
import { IconPhone } from "../../../components/icons";
import Flatpickr from "react-flatpickr";
import { Vietnamese } from "flatpickr/dist/l10n/vn";
import moment from "moment";
import IconCalendar from "../../../assets/images/icon/ic_calendar-black.svg";
import { useForm } from "react-hook-form";
import { Textarea } from "../../../components/textarea";

const ExaminationInfo = ({ data }: { data: any }) => {
  const [day_welcome, setDayWelcome] = useState(new Date());
  const { control } = useForm({
    mode: "onSubmit",
  });

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
              {/* <div className="relative border-b border-b-gray-200 pb-3">
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
              </div> */}
              <Input
                control={control}
                className="border-none font-semibold text-black"
                value={
                  day_welcome
                    ? moment(day_welcome).format('DD/MM/YYYY HH:mm')
                    : "---"
                }
              />
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
