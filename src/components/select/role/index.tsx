import React, { useCallback, useState } from 'react';
import Select, { Props } from 'react-select';
import { IRole } from '../../../types/role.type';
import { getAllRole } from '../../../services/role.service';

type RoleSelectProps = {} & Props;

const RoleSelect: React.FC<RoleSelectProps> = ({ ...p }) => {
  const [data, setData] = useState<IRole[]>([]);

  const fetch = useCallback((search: string) => {
    getAllRole({
      _page: 1,
      _limit: 500,
      _sort: 'createdAt',
      _order: 'asc',
      search,
    }).then((r) => {
      setData(r ?? []);
    });
  }, []);
  return (
    <Select
      {...p}
      options={data?.map((i) => ({
        label: i.name,
        value: i._id,
      }))}
      onFocus={() => {
        if (!data.length) {
          fetch('');
        }
      }}
      className='react-select'
      classNamePrefix='react-select'
      placeholder='-Chức danh-'></Select>
  );
};

export default RoleSelect;
