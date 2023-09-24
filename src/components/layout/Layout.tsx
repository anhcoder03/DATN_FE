import React from "react";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";

interface Props {
  children: React.ReactNode;
}

const Layout = (props: Props) => {
  return (
    <>
      <Topbar></Topbar>
      <div className="grid  grid-cols-[250px_minmax(0,1fr)]">
        <Sidebar></Sidebar>
        <div className="p-5 bg-grayF3">{props.children}</div>
      </div>
    </>
  );
};

export default Layout;
