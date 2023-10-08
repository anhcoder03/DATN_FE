import React, {
  useState,
  useEffect,
  useImperativeHandle,
  startTransition,
} from 'react';
import { Button, Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../redux/store';
import {
  resetHeadingPrescription,
  setSelectedHeadingPrescription,
} from '../../../../redux/layout/headingPrescriptionSlice';
import { IconRectangle } from '../../../../components/icons';
import { FilterColumn } from '../../../../types/filter-column.types';
export type ModalPrescriptionProps = {
  headings: FilterColumn[];
};

export type ModalPrescriptionMethods = {
  open: () => void;
};

const ModalHeadingPrescription = React.forwardRef<
  ModalPrescriptionMethods,
  ModalPrescriptionProps
>(({ headings }, ref) => {
  const [open, setOpen] = useState<boolean>(false);

  useImperativeHandle(ref, () => ({
    open: () => {
      startTransition(() => {
        setOpen(true);
      });
    },
  }));

  const onClose = () => {
    setOpen(false);
  };

  const onFinish = () => {
    setOpen(false);
  };

  const [checked, setChecked] = useState<boolean[]>(
    Array(headings?.length).fill(false),
  );
  const dispatch = useDispatch();
  const selectedHeading = useSelector(
    (state: RootState) => state.headingPrescription.selectedHeadingPrescription,
  );

  useEffect(() => {
    if (open) {
      try {
        if (selectedHeading) {
          dispatch(setSelectedHeadingPrescription(selectedHeading));
          const initialChecked = Array(headings?.length).fill(false);
          selectedHeading.forEach((selectedColumn: { label: any }) => {
            const columnIndex = headings.findIndex(
              (heading) => heading.label === selectedColumn.label,
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
    index: number,
  ) => {
    const updatedChecked = [...checked];
    updatedChecked[index] = event.target.checked;
    setChecked(updatedChecked);

    const heading = headings[index];
    if (event.target.checked) {
      dispatch(setSelectedHeadingPrescription([...selectedHeading, heading]));
    } else {
      dispatch(
        setSelectedHeadingPrescription(
          selectedHeading.filter(
            (selectedHeading: any) => selectedHeading.label !== heading.label,
          ),
        ),
      );
    }
  };
  return (
    <>
      <Modal
        visible={open}
        title='Điều chỉnh cột hiển thị danh sách'
        onOk={onFinish}
        onCancel={onClose}
        footer={[
          <Button
            className='bg-primary50 text-primary'
            key='back'
            onClick={onClose}>
            Đóng
          </Button>,
          <Button
            key='submit'
            type='primary'
            onClick={() => dispatch(resetHeadingPrescription())}
            className='bg-primary50 text-primary'>
            Hoàn Tác
          </Button>,
        ]}>
        <h2 className='py-3 text-center border-b border-b-grayF3'>
          Tích chọn cột để hiển thị. Kéo thả để thay đổi nhanh vị trí các cột
          hiển thị
        </h2>
        <div className='max-h-[300px] overflow-y-auto scrollbar'>
          {headings?.map((item: any, index: number) => {
            return (
              <div
                className='flex items-center justify-between px-5 py-2 border-b border-b-grayF3'
                key={item}>
                <div className='flex items-center gap-3'>
                  <input
                    type='checkbox'
                    checked={checked[index]}
                    onChange={(event) => handleCheckboxBodyChange(event, index)}
                    className='cursor-pointer'
                  />
                  <span className='pb-1'>{item.label}</span>
                </div>
                <div className=''>
                  <IconRectangle />
                </div>
              </div>
            );
          })}
        </div>
      </Modal>
    </>
  );
});

export default ModalHeadingPrescription;
