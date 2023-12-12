import React from "react";
import { Tabs } from "antd";
import { IDataTabs } from "../../pages/reception/ReceptionList";
interface Props {
  selectTab?: (key: string) => void;
  data: IDataTabs[];
  keyActive: string;
  className?: string;
}

const AppTaps = ({
  data,
  selectTab,
  keyActive,
  className = "p-5 bg-white",
}: Props) => {
  return (
    <div className={className}>
      <Tabs
        onChange={selectTab}
        // className={"bg-white"}
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
    </div>
  );
};

export default AppTaps;
