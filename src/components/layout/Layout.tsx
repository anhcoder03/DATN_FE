import React, { useEffect } from "react";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
interface Props {
  children: React.ReactNode;
}
import { toast } from "react-toastify";

const Layout = (props: Props) => {
  const auth: any = useSelector((state: RootState) => state.auth.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth?.user) {
      navigate("/login");
      toast.warning("Đăng nhập để vào trang quản trị!");
      return;
    }
  }, [auth]);
  return (
    <>
      <Topbar user={auth?.user}></Topbar>
      <div className="grid  grid-cols-[250px_minmax(0,1fr)] custom-layout">
        <div>
          <Sidebar></Sidebar>
        </div>
        <div className="w-full custom-height  overflow-x-hidden  mt-[67px] px-5 pt-5 pb-10 bg-grayF3">
          {props.children}
        </div>
      </div>
    </>
  );
};

export default Layout;
