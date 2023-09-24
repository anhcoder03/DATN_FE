import React from "react";
import { Tabs } from "antd";
import { IDataTabs } from "../../pages/reception/ReceptionList";
interface Props {
  selectTab: (key: string) => void;
  data: IDataTabs[];
  keyActive: string;
}

const AppTaps = ({ data, selectTab, keyActive }: Props) => {
  return (
    <Tabs
      onChange={selectTab}
      className="bg-white"
      defaultActiveKey={keyActive}
      type="card"
      items={data.map((item) => {
        return {
          label: `${item.title}`,
          key: item.id,
          children: item.children,
        };
      })}
    />
  );
};

export default AppTaps;
