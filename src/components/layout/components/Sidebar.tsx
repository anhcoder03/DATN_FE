import React from "react";
import { NavLink } from "react-router-dom";
import {
  IconDate,
  IconDocument,
  IconFolder,
  IconProduct,
  IconUser,
} from "../../icons";

type TMenu = {
  path: string;
  title: string;
  icon?: React.ReactNode;
};

const menuExamination: TMenu[] = [
  {
    path: "/reception",
    title: "Tiếp đón",
    icon: <IconDate />,
  },
  {
    path: "/examination",
    title: "Phiếu khám",
    icon: <IconDocument />,
  },
];
const menuSell: TMenu[] = [
  { path: "/order", title: "Đơn hàng", icon: <IconDocument /> },
  { path: "/prescription", title: "Kê đơn", icon: <IconDocument /> },
  { path: "/sell", title: "Bán hàng", icon: <IconDocument /> },
];
const menuPartner: TMenu[] = [
  {
    path: "/customer",
    title: "Khách hàng",
    icon: <IconUser />,
  },
];

const menuProduct: TMenu[] = [
  {
    path: "/product",
    title: "Sản phẩm",
    icon: <IconProduct />,
  },
  {
    path: "/category",
    title: "Danh mục",
    icon: <IconFolder />,
  },
];

const menuConfiguration: TMenu[] = [
  {
    path: "/configuration/user",
    title: "Nhân viên",
    icon: <IconProduct />,
  },
  {
    path: "/configuration/title",
    title: "Chức danh",
    icon: <IconFolder />,
  },
  {
    path: "/configuration/department",
    title: "Phòng khám",
    icon: <IconFolder />,
  },
  {
    path: "/configuration/service",
    title: "Dịch vụ",
    icon: <IconFolder />,
  },
];

const Sidebar = () => {
  const NavLinkClass = "block font-medium py-3 pl-10  border-l-[5px] text-sm";
  return (
    <React.Fragment>
      <div className="shadowSidebar h-screen">
        <div>
          <div>
            <h4 className="font-medium px-5 py-3 text-xs">KHÁM BỆNH</h4>
            <div className="flex flex-col ">
              {menuExamination?.map((item) => (
                <NavLink
                  key={item.title}
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? ` text-primary bg-primary50 ${NavLinkClass} border-l-primary`
                      : `hover:text-primary ${NavLinkClass}`
                  }
                >
                  <div className="flex items-center gap-x-3">
                    <span>{item.icon}</span>
                    <span>{item.title}</span>
                  </div>
                </NavLink>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium px-5 py-3 text-xs">BÁN HÀNG</h4>
            <div className="flex flex-col ">
              {menuSell?.map((item) => (
                <NavLink
                  key={item.title}
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? ` text-primary bg-primary50 ${NavLinkClass}border-l-primary`
                      : `hover:text-primary ${NavLinkClass}`
                  }
                >
                  <div className="flex items-center gap-x-3">
                    <span>{item.icon}</span>
                    <span>{item.title}</span>
                  </div>
                </NavLink>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium px-5 py-3 text-xs">ĐỐI TÁC</h4>
            <div className="flex flex-col ">
              {menuPartner?.map((item) => (
                <NavLink
                  key={item.title}
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? ` text-primary bg-primary50 ${NavLinkClass}border-l-primary`
                      : `hover:text-primary ${NavLinkClass}`
                  }
                >
                  <div className="flex items-center gap-x-3">
                    <span>{item.icon}</span>
                    <span>{item.title}</span>
                  </div>
                </NavLink>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium px-5 py-3 text-xs">SẢN PHẨM</h4>
            <div className="flex flex-col ">
              {menuProduct?.map((item) => (
                <NavLink
                  key={item.title}
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? ` text-primary bg-primary50 ${NavLinkClass}border-l-primary`
                      : `hover:text-primary ${NavLinkClass}`
                  }
                >
                  <div className="flex items-center gap-x-3">
                    <span>{item.icon}</span>
                    <span>{item.title}</span>
                  </div>
                </NavLink>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium px-5 py-3 text-xs">CẤU HÌNH</h4>
            <div className="flex flex-col ">
              {menuConfiguration?.map((item) => (
                <NavLink
                  key={item.title}
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? ` text-primary bg-primary50 ${NavLinkClass}border-l-primary`
                      : `hover:text-primary ${NavLinkClass}`
                  }
                >
                  <div className="flex items-center gap-x-3">
                    <span>{item.icon}</span>
                    <span>{item.title}</span>
                  </div>
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Sidebar;
