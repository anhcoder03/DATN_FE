import { Vietnamese } from 'flatpickr/dist/l10n/vn';
import React, { useRef } from 'react';
import Flatpickr from 'react-flatpickr';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import IconCalendarBlack from '../../../../assets/images/icon/ic_calendar-black.svg';
import {
  IconPlus,
  IconSearch,
  IconSetting,
} from '../../../../components/icons';
import { FilterColumn } from '../../../../types/filter-column.types';
import ModalHeadingPrescription, { ModalPrescriptionMethods } from '../modal';

type FilterPrescriptionProps = {
  columns: FilterColumn[];
};

const FilterPrescription: React.FC<FilterPrescriptionProps> = ({ columns }) => {
  const modalAddHeadingRef = useRef<ModalPrescriptionMethods>(null);
  return (
    <div className=''>
      <div className='flex flex-wrap items-center justify-between p-5 bg-white rounded-tl-lg rounded-tr-lg'>
        <div className='flex items-center gap-2 filter-wrapper'>
          <div className='filter-search flex items-center bg-transparent border border-gray-200 px-2 py-1 gap-2 rounded-lg h-[40px] min-w-[250px]'>
            <IconSearch />
            <input
              type='text'
              className='bg-transparent border-none outline-none'
              placeholder='Mã đơn, tên khách hàng'
            />
          </div>
          <div className='filter-doctor'>
            <Select
              className='react-select'
              classNamePrefix='react-select'
              placeholder='-Cơ sở khám-'
              options={[
                {
                  label: 'Hà Nội',
                  value: 'Ha Noi',
                },
              ]}
              // onChange={(value: any) => {
              //     handleChange({ target: { name: 'status', value: value.value } })
              // }}
              // value={StatusList?.filter((option: any) => filter?.status === option.value)}
            ></Select>
          </div>
          <div className='filter-doctor'>
            <Select
              className='react-select'
              classNamePrefix='react-select'
              placeholder='-Loại đơn-'
              options={[
                {
                  label: 'loại 1',
                  value: '1',
                },
              ]}
              // onChange={(value: any) => {
              //     handleChange({ target: { name: 'status', value: value.value } })
              // }}
              // value={StatusList?.filter((option: any) => filter?.status === option.value)}
            ></Select>
          </div>
          <div className='filter-date flex items-center bg-transparent border border-gray-200 px-2 py-1 gap-2 rounded-lg h-[40px]'>
            <Flatpickr
              options={{
                locale: Vietnamese,
                allowInput: true,
                dateFormat: 'd/m/Y',
                altInputClass: 'date-range',
                maxDate: 'today',
              }}
              // onChange={([date]) => {
              //   setValue("dateOfBirth", date);
              // }}
              placeholder='-Ngày kê-'
              name='dateOfBirth'
            />
            <div className='flex items-center'>
              <img src={IconCalendarBlack} alt='icon' />
            </div>
          </div>
        </div>
        <div className='flex items-end gap-2'>
          <button
            className='px-3 py-2 rounded-lg bg-grayF3'
            onClick={() => modalAddHeadingRef.current.open()}>
            <IconSetting />
          </button>
          <Link to={'#'} className='flex gap-2 px-3 py-2 rounded-lg bg-primary'>
            <div className='flex items-center p-1 bg-white rounded-lg text-primary'>
              <IconPlus />
            </div>
            <span className='flex items-center text-sm text-white'>Thêm</span>
          </Link>
        </div>
      </div>
      <ModalHeadingPrescription ref={modalAddHeadingRef} headings={columns} />
    </div>
  );
};

export default FilterPrescription;
