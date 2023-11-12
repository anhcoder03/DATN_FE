import React, { useCallback, useState } from "react";
import Select, { Props } from "react-select";
import { getAllRole } from "../../../services/role.service";

type RoleSelectProps = {} & Props;

const RoleSelect: React.FC<RoleSelectProps> = ({ ...p }) => {
  const [data, setData] = useState<any[]>([]);
  const fetch = useCallback((search: string) => {
    getAllRole({
      _page: 1,
      _limit: 500,
      _sort: "createdAt",
      _order: "asc",
      search,
    }).then((r) => {
      setData(r?.docs ?? []);
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
          fetch("");
        }
      }}
      className="p-2 h-full react-select"
      classNamePrefix="react-select"
      placeholder="-Chức danh-"
    ></Select>
  );
};

export default RoleSelect;
