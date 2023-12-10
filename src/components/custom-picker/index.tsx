import { DatePicker, DatePickerProps, Select, Flex } from 'antd';
import moment from 'moment';
import React, { useMemo, useState } from 'react';

type PickerProps = 'date' | 'week' | 'month' | 'quarter' | 'year';

type DatePickerCustomProps = {
  onChangeTime: (startTime: string, endTime: string) => void;
  defaultPicker?: PickerProps;
};

export type DatePickerCustomMethods = {};

const PICKER = [
  {
    id: '1',
    label: 'Ngày',
    value: 'date',
  },
  {
    id: '2',
    label: 'Tuần',
    value: 'week',
  },
  {
    id: '3',
    label: 'Tháng',
    value: 'month',
  },
  {
    id: '4',
    label: 'Quý',
    value: 'quarter',
  },
  {
    id: '5',
    label: 'Năm',
    value: 'year',
  },
];

const DatePickerCustomSelect = React.forwardRef<
  DatePickerCustomMethods,
  DatePickerCustomProps
>(({ onChangeTime, defaultPicker = 'month' }, ref) => {
  const [picker, setPicker] = useState<PickerProps>(defaultPicker);

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    switch (picker) {
      case 'date':
        onChangeTime(
          date
            ? moment(date.toDate()).startOf('d').utc().format()
            : moment().startOf('d').utc().format(),
          date
            ? moment(date.toDate()).endOf('d').utc().format()
            : moment().endOf('d').utc().format(),
        );
        break;
      case 'month':
        onChangeTime(
          date
            ? moment(date.toDate()).startOf('M').utc().format()
            : moment().startOf('M').utc().format(),
          date
            ? moment(date.toDate()).endOf('M').utc().format()
            : moment().endOf('M').utc().format(),
        );
        break;
      case 'week':
        onChangeTime(
          date
            ? moment(date.toDate()).startOf('w').utc().format()
            : moment().startOf('w').utc().format(),
          date
            ? moment(date.toDate()).endOf('w').utc().format()
            : moment().endOf('w').utc().format(),
        );
        break;
      case 'quarter':
        onChangeTime(
          date
            ? moment(date.toDate()).startOf('Q').utc().format()
            : moment().startOf('Q').utc().format(),
          date
            ? moment(date.toDate()).endOf('Q').utc().format()
            : moment().endOf('Q').utc().format(),
        );
        break;
      case 'year':
        onChangeTime(
          date
            ? moment(date.toDate()).startOf('y').utc().format()
            : moment().startOf('y').utc().format(),
          date
            ? moment(date.toDate()).endOf('y').utc().format()
            : moment().endOf('y').utc().format(),
        );
        break;
      default:
        onChangeTime(
          date
            ? moment(date.toDate()).startOf('d').utc().format()
            : moment().startOf('d').utc().format(),
          date
            ? moment(date.toDate()).endOf('d').utc().format()
            : moment().endOf('d').utc().format(),
        );
    }
  };

  const placeHolder = useMemo(() => {
    switch (picker) {
      case 'date':
        return 'Chọn ngày';
      case 'month':
        return 'Chọn tháng';
      case 'week':
        return 'Chọn tuần';
      case 'quarter':
        return 'Chọn Quý';
      case 'year':
        return 'Chọn năm';
      default:
        return 'Chọn ngày';
    }
  }, [picker]);

  return (
    <Flex align='center' gap={10}>
      Theo{' '}
      <Select
        defaultValue={defaultPicker}
        options={PICKER.map((i) => i)}
        onChange={setPicker}
      />
      <DatePicker
        placeholder={placeHolder}
        onChange={onChange}
        picker={picker}
      />
    </Flex>
  );
});

export default DatePickerCustomSelect;
