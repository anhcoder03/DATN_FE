import { useEffect, useRef, useState } from "react";
import { IconBell } from "../../icons";
import {
  getAllNotifications,
  updateNotifications,
} from "../../../services/notifications.service";
import useClickOutSide from "../../../hooks/useClickOutSIde";
import moment from "moment";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  onSetNotifications,
  setLoadingNotification,
  updateTotalElements,
} from "../../../redux/notification/notificationSlice";
import { socketIO } from "../../../App";
import { message } from "antd";
import { store } from "../../../redux/store";
const Notification = () => {
  const dispatch = useDispatch();
  const [isOpenNoti, setIsOpenNoti] = useState(false);
  const dropdownRef = useRef<any>(null);
  const { notifications: dataNoti, totalElements } = useSelector(
    (state: any) => state.notification
  );

  const {
    show: showMenuNoti,
    setShow: setShowMenuNoti,
    nodeRef,
  } = useClickOutSide(".action-wrapper");

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpenNoti(false);
    }
  };

  useEffect(() => {
    socketIO.on("server_newNotify", (data) => {
      loadData();
      message.info(data);
    });

    return () => {
      socketIO.off("server_newNotify");
    };
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const handleClick = (event: any) => {
      handleClickOutside(event);
    };

    if (isOpenNoti) {
      document.addEventListener("mousedown", handleClick);
    } else {
      document.removeEventListener("mousedown", handleClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [isOpenNoti]);

  const loadData = async () => {
    const response = await getAllNotifications();
    if (response.docs) {
      dispatch(onSetNotifications(response.docs));
    }
  };

  return (
    <>
      <div style={{ position: "relative" }} ref={nodeRef}>
        <div
          className="relative cursor-pointer"
          onClick={() => {
            setShowMenuNoti(!showMenuNoti);
          }}
        >
          <IconBell></IconBell>
          <span className="items-center absolute w-[20px] h-[20px] rounded-full -top-2 -right-3 text-sm  flex justify-center bg-red-400 text-white">
            {totalElements > 9 ? "9+" : totalElements}
          </span>
        </div>
        {notiMenu(dropdownRef, showMenuNoti, dataNoti)}
      </div>
    </>
  );
};

const notiMenu = (dropdownRef: any, showMenuNoti: any, dataNoti: any) => {
  const imageUser = (item: any) => {
    const words = item?.customer?.name?.split(" ");
    if (words?.length < 2) {
      return "";
    }
    const lastTwoWords = words?.slice(-2); // Lấy 2 từ cuối cùng thành mảng mới
    const firstLetters = lastTwoWords?.map((word: any) => word?.charAt(0)); // Lấy chữ cái đầu của từng từ
    return firstLetters?.join("").toUpperCase(); // Ghép chữ cái đầu thành chuỗi kết quả
  };

  const checkOnClick = async (id: number) => {
    const params = {
      _id: id,
      status: 1,
    };

    const seenNotify = dataNoti.find((item: any) => item._id === id);
    if (seenNotify && seenNotify.status === 0) {
      await updateNotifications(params);
      store.dispatch(updateTotalElements(id));
    }
  };

  return (
    <div
      ref={dropdownRef}
      className={`action-wrapper z-20 w-full max-w-sm bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-800 dark:divide-gray-700 ${
        showMenuNoti ? "" : "hidden"
      }`}
      style={{ position: "absolute", right: -13, width: "24rem", top: 32 }}
    >
      <div className="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white text-base">
        Thông báo
      </div>
      <div
        className="divide-y divide-gray-100 dark:divide-gray-700"
        style={{ height: 400, overflow: "auto" }}
      >
        {dataNoti?.map((item: any) => {
          return (
            <Link
              to={item?.link}
              className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
              style={{
                background:
                  item?.status === 1 ? "#f8f9fa" : "rgba(72, 168, 0, 0.1)",
              }}
              onClick={() => checkOnClick(item?._id)}
            >
              <div className="flex-shrink-0">
                <div
                  className="rounded-full"
                  style={{ backgroundColor: "#25c2e3", width: 40, height: 40 }}
                >
                  <div
                    style={{
                      color: "white",
                      fontSize: 22,
                      marginTop: 7,
                      marginLeft: 6,
                      paddingTop: 4,
                    }}
                  >
                    {imageUser(item)}
                  </div>
                </div>
              </div>
              <div className="w-full ps-3">
                <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                  {item?.content}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {moment(item?.createdAt).format("DD/MM/YYYY")}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Notification;
