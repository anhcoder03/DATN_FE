import React, { useState, useEffect } from "react";
import { Button, Modal } from "antd";
import { IconRectangle } from "../icons";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedHeadings } from "../redux/headingSlice";
interface Column {}
interface IModal {
  open: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  loading: boolean;
  headings: Column[];
}

const AppModal = ({
  open,
  handleCancel,
  handleOk,
  loading,
  headings,
}: IModal) => {
  const [checked, setChecked] = useState<boolean[]>(
    Array(headings.length).fill(false)
  );
  const selectedHeading = useSelector(
    (state: any) => state.headings.selectedHeadings
  );
  console.log("selectedHeading", selectedHeading);
  const dispatch = useDispatch();
  useEffect(() => {
    if (open) {
      try {
        if (selectedHeading) {
          dispatch(setSelectedHeadings(selectedHeading));
          const initialChecked = Array(headings.length).fill(false);
          selectedHeading.forEach((column: any) => {
            const columnIndex = headings.findIndex(
              (heading) => heading === column
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
  }, [open, headings, dispatch]);

  const handleCheckboxBodyChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedChecked = [...checked];
    updatedChecked[index] = !updatedChecked[index];
    setChecked(updatedChecked);
    const heading = headings[index];
    if (updatedChecked[index]) {
      dispatch(setSelectedHeadings([...selectedHeading, heading]));
    } else {
      dispatch(
        setSelectedHeadings(
          selectedHeading.filter(
            (selectedHeading: any) => selectedHeading !== heading
          )
        )
      );
    }
  };
  const toSaveColumns = () => {
    try {
      dispatch(setSelectedHeadings(selectedHeading));
      handleOk();
    } catch (error) {
      console.error("Lỗi khi lưu vào Redux store:", error);
    }
  };
  // const resetToDefault = () => {
  //   const initialCheckedState = selectedHeading.map((column: any) =>
  //     column.label === "Bệnh nhân" ? true : false
  //   );
  //   setChecked(initialCheckedState);
  // };
  return (
    <>
      <Modal
        visible={open}
        title="Điều chỉnh cột hiển thị danh sách"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          // <Button
          //   key="submit"
          //   type="primary"
          //   loading={loading}
          //   onClick={resetToDefault}
          //   className="bg-primary50 text-primary"
          // >
          //   Quay lại mặc định
          // </Button>,
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
            loading={loading}
            onClick={toSaveColumns} // Gọi hàm toSaveColumns khi bấm "Lưu"
            className="bg-primary50 text-primary"
          >
            Lưu
          </Button>,
        ]}
      >
        <h2 className="text-center border-b border-b-grayF3 py-3">
          Tích chọn cột để hiển thị. Kéo thả để thay đổi nhanh vị trí các cột
          hiển thị
        </h2>
        <div className="max-h-[300px] overflow-y-auto">
          {headings.map((item: any, index: number) => {
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
                  <span className="pb-1">{item}</span>
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

export default AppModal;
