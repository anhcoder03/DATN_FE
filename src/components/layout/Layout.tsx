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
      <div className="grid  grid-cols-[250px_minmax(0,1fr)] ">
        <div>
          <Sidebar></Sidebar>
        </div>
        <div className="w-full min-h-screen overflow-x-hidden  mt-[67px] px-5 pt-5 pb-10 bg-grayF3">
          {props.children}
        </div>
      </div>
    </>
  );
};

export default Layout;
