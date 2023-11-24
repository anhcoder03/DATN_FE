import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/logo3.png";
import logoSmall from "../../../assets/logo-icon.png";
import { IconBell, IconMenu } from "../../icons";
import useClickOutSide from "../../../hooks/useClickOutSIde";
import { FiChevronsDown } from "react-icons/fi";
import { BiUser, BiLogOut } from "react-icons/bi";
import { authLogout } from "../../../redux/auth/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Notification from "./Notification";

const Topbar = ({ user }: { user: any }) => {
  const [show, setShow] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    show: showModal,
    setShow: setShowModal,
    nodeRef,
  } = useClickOutSide(".action-wrapper");
  const root = document.querySelector("#root");

  const handleSidebarShow = () => {
    if (show == true) {
      root?.classList.add("sidebar-menu");
      setShow(!show);
    } else {
      root?.classList.remove("sidebar-menu");
      setShow(!show);
    }
  };

  const handleLogout = () => {
    dispatch(authLogout());
    toast.success("Đăng xuất thành công!");
    navigate("/login");
  };

  return (
    <React.Fragment>
      <div className="fixed top-0 left-0 right-0 z-10 w-full bg-white">
        <div className="px-5 py-1 shadowCustom">
          <div className="flex items-center justify-between h-[58px]">
            <div className="flex items-center justify-between logo-wrapper max-w-[250px] w-full gap-x-7 ">
              <Link to="/" className="w-full">
                <span className="w-full logo">
                  <img src={logo} className="w-[250px] h-full" alt="" />
                </span>
                <span className="w-full logo-small">
                  <img src={logoSmall} className="w-[70px] h-full" alt="" />
                </span>
              </Link>
              <span className="cursor-pointer" onClick={handleSidebarShow}>
                <IconMenu></IconMenu>
              </span>
            </div>
            <div className="flex items-center gap-x-10">
              <Notification />
              <div
                className="flex items-center justify-between gap-x-2"
                ref={nodeRef}
              >
                <img
                  src={
                    user?.avatar ||
                    "https://images.unsplash.com/photo-1695192413426-af217f0324e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1NXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                  }
                  alt=""
                  className="w-[50px] h-[50px] rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <h4 className="font-bold text-gray4B">{user?.name}</h4>
                  <span className="text-sm">{user?.email}</span>
                </div>
                <div className="relative">
                  <span
                    onClick={() => {
                      setShowModal(!showModal);
                    }}
                    className="text-xl p-1 w-[30px] h-[30px] block cursor-pointer rounded-md bg-gray-200"
                  >
                    <FiChevronsDown />
                  </span>
                  <div
                    className={`action-wrapper absolute top-[50px] z-50 -left-[170px] bg-white rounded-md shadow-md flex-col w-[200px] ${
                      showModal ? "flex" : "hidden"
                    }`}
                  >
                    <Link
                      to="/account"
                      className="px-2 py-3 border-b border-b-gray-300 flex items-center gap-x-3 font-semibold"
                    >
                      <span className="text-xl font-semibold">
                        <BiUser />
                      </span>
                      <span>Tài khoản</span>
                    </Link>
                    <p
                      className="px-2 py-3 cursor-pointer flex items-center gap-x-3 font-semibold"
                      onClick={handleLogout}
                    >
                      <span className="text-xl font-semibold">
                        <BiLogOut />
                      </span>{" "}
                      <span>Đăng xuất</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Topbar;
