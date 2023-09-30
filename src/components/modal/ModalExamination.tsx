import React, { useState, useEffect } from "react";
import { Button, Modal } from "antd";
import { IconRectangle } from "../icons";
import { useSelector, useDispatch } from "react-redux";
import {
  resetHeadings,
  setSelectedHeadings,
} from "../../redux/layout/headingExaminationSlice";
import { RootState } from "../../redux/store";
interface Column {
  label: any;
}
interface IModal {
  open: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  headings: Column[];
}
const ModalExamination = ({
  open,
  handleCancel,
  handleOk,
  headings,
}: IModal) => {
  const [checked, setChecked] = useState<boolean[]>(
    Array(headings?.length).fill(false)
  );
  const dispatch = useDispatch();
  const selectedHeading = useSelector(
    (state: RootState) => state.headingExamination.selectedHeadings
  );
  console.log("selectHẻading", selectedHeading);

  useEffect(() => {
    if (open) {
      try {
        if (selectedHeading) {
          dispatch(setSelectedHeadings(selectedHeading));
          const initialChecked = Array(headings?.length).fill(false);
          selectedHeading.forEach((selectedColumn: { label: any }) => {
            const columnIndex = headings.findIndex(
              (heading) => heading.label === selectedColumn.label
            );
            if (columnIndex !== -1) {
              initialChecked[columnIndex] = true;
            }
          });
          setChecked(initialChecked);
        }
        console.log("checkedok", checked);
      } catch (error) {
        console.error(error);
      }
    }
  }, [open, headings, dispatch, selectedHeading]);

  const handleCheckboxBodyChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedChecked = [...checked];
    updatedChecked[index] = event.target.checked;
    setChecked(updatedChecked);

    const heading = headings[index];
    if (event.target.checked) {
      dispatch(setSelectedHeadings([...selectedHeading, heading]));
    } else {
      dispatch(
        setSelectedHeadings(
          selectedHeading.filter(
            (selectedHeading: any) => selectedHeading.label !== heading.label
          )
        )
      );
    }
  };
  return (
    <>
      <Modal
        visible={open}
        title="Điều chỉnh cột hiển thị danh sách"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            className="bg-primary50 text-primary"
            key="back"
            onClick={handleCancel}
          >
            Đóng
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => dispatch(resetHeadings())}
            className="bg-primary50 text-primary"
          >
            Hoàn Tác
          </Button>,
        ]}
      >
        <h2 className="py-3 text-center border-b border-b-grayF3">
          Tích chọn cột để hiển thị. Kéo thả để thay đổi nhanh vị trí các cột
          hiển thị
        </h2>
        <div className="max-h-[300px] overflow-y-auto scrollbar">
          {headings?.map((item: any, index: number) => {
            return (
              <div
                className="flex items-center justify-between px-5 py-2 border-b border-b-grayF3"
                key={item}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={checked[index]}
                    onChange={(event) => handleCheckboxBodyChange(event, index)}
                    className="cursor-pointer"
                  />
                  <span className="pb-1">{item.label}</span>
                </div>
                <div className="">
                  <IconRectangle />
                </div>
              </div>
            );
          })}
        </div>
      </Modal>
    </>
  );
};

export default ModalExamination;
