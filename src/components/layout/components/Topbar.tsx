import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo3.png";
import { IconBell, IconMenu } from "../../icons";

const Topbar = () => {
  return (
    <React.Fragment>
      <div className="fixed top-0 left-0 right-0 z-10 w-full bg-white">
        <div className="px-5 py-1 shadowCustom">
          <div className="flex items-center justify-between h-[58px]">
            <div className="flex items-center justify-between max-w-[250px] w-full gap-x-7 ">
              <Link to="/" className="w-full">
                <span className="w-full">
                  <img src={logo} className="w-[250px] h-full" alt="" />
                </span>
              </Link>
              <span>
                <IconMenu></IconMenu>
              </span>
            </div>
            <div className="flex items-center gap-x-10">
              <div className="relative">
                <IconBell></IconBell>
                <span className=" items-center absolute w-[20px] h-[20px] rounded-full -top-2 -right-3 text-sm  flex      justify-center bg-red-400  text-white">
                  9+
                </span>
              </div>
              <div className="flex items-center justify-between gap-x-2">
                <img
                  src="https://images.unsplash.com/photo-1695192413426-af217f0324e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1NXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                  alt=""
                  className="w-[50px] h-[50px] rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <h4 className="font-bold text-gray4B">BS Nguyễn Phi Anh</h4>
                  <span className="text-sm">anhcoder03@gmail.com</span>
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
