import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo-nutri.svg";
import { IconBell, IconMenu } from "../../icons";

const Topbar = () => {
  return (
    <React.Fragment>
      <div className="py-1 px-5 shadowCustom">
        <div className="flex items-center justify-between h-[58px]">
          <div className="flex items-center justify-between max-w-[200px] w-full gap-x-7 ">
            <Link to="/" className="w-full">
              <span className="w-full">
                <img src={logo} className="w-full" alt="" height="39" />
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
                <h4 className="text-gray4B font-bold">
                  BS Nguyễn Phi Anh Con Cặc
                </h4>
                <span className="text-sm">sonlabophianh03@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Topbar;
