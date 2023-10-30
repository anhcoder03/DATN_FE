import React, { useState, useEffect } from "react";
import { Button, Modal } from "antd";
import { IconRectangle } from "../icons";
import { useSelector, useDispatch } from "react-redux";
import {
  resetHeadings,
  setSelectedHeadings,
} from "../../redux/layout/headingBookingSlice";
import { RootState } from "../../redux/store";
interface Column {
  name: any;
}
interface IModal {
  open: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  headings: Column[];
}
const ModalBooking = ({ open, handleCancel, handleOk, headings }: IModal) => {
  const [checked, setChecked] = useState<boolean[]>(
    Array(headings?.length).fill(false)
  );
  const dispatch = useDispatch();
  const selectedHeading = useSelector(
    (state: RootState) => state.headingBooking.selectedHeadings
  );
  const deserializedHeadings = selectedHeading.map((heading) => {
    return {
      name: heading.name,
      selector: eval(heading.selector),
    };
  });

  useEffect(() => {
    if (open) {
      try {
        if (selectedHeading) {
          dispatch(setSelectedHeadings(selectedHeading));
          const initialChecked = Array(headings?.length).fill(false);
          selectedHeading.forEach((selectedColumn: { name: any }) => {
            const columnIndex = headings.findIndex(
              (heading) => heading.name === selectedColumn.name
            );
            if (columnIndex !== -1) {
              initialChecked[columnIndex] = true;
            }
          });
          setChecked(initialChecked);
        }
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

    const heading: any = headings[index];
    if (event.target.checked) {
      dispatch(
        setSelectedHeadings([
          ...selectedHeading,
          { name: heading.name, selector: heading.selector.toString() },
        ])
      );
    } else {
      dispatch(
        setSelectedHeadings(
          selectedHeading.filter(
            (selectedHeading: any) => selectedHeading.name !== heading.name
          )
        )
      );
    }
  };
  return (
    <>
      <Modal
        open={open}
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
                key={item?.name}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={checked[index]}
                    onChange={(event) => handleCheckboxBodyChange(event, index)}
                    className="cursor-pointer"
                  />
                  <span className="pb-1">{item.name}</span>
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

export default ModalBooking;
