import React, { useEffect, useRef, useState } from 'react'
import { IconBell } from "../../icons";
import { getAllNotifications } from '../../../services/notifications.service';
import useClickOutSide from '../../../hooks/useClickOutSIde';
import moment from 'moment';
const Notification = () => {
    const [isOpenNoti, setIsOpenNoti] = useState(false);
    const dropdownRef = useRef<any>(null);
    const [dataNoti, setDataNoti] = useState<any>([]);

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
        loadData();
    },[])
    
    useEffect(() => {
        const handleClick = (event: any) => {
        handleClickOutside(event);
        };
    
        if (isOpenNoti) {
        document.addEventListener('mousedown', handleClick);
        } else {
        document.removeEventListener('mousedown', handleClick);
        }
    
        return () => {
        document.removeEventListener('mousedown', handleClick);
        };
    }, [isOpenNoti]);

    const loadData = async () => {
        const response = await getAllNotifications();
        if(response.docs) {
            setDataNoti(response.docs)
        }
    }

  console.log('dataNoti', dataNoti)
  
    return (
        <>
            <div style={{position: 'relative'}} ref={nodeRef}>
                <div className="relative cursor-pointer" onClick={() => {
                      setShowMenuNoti(!showMenuNoti);
                    }}
                >
                    <IconBell></IconBell>
                    <span className="items-center absolute w-[20px] h-[20px] rounded-full -top-2 -right-3 text-sm  flex justify-center bg-red-400 text-white">
                        {dataNoti?.length > 9 ? '9+' : dataNoti?.length}
                    </span>
                </div>
                    {notiMenu(dropdownRef, showMenuNoti, dataNoti)}
            </div>
            
        </>
        
    )
}

const notiMenu = (dropdownRef: any, showMenuNoti: any, dataNoti: any) => {

    return (
        <div ref={dropdownRef} className={`action-wrapper z-20 w-full max-w-sm bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-800 dark:divide-gray-700 ${showMenuNoti ? "" : "hidden"}`} style={{position: 'absolute', right: -13, width: '24rem', top: 32}}>
            <div className="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white">
                Thông báo
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {dataNoti?.map((item: any) => {
                    return (
                        <a href="#" className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700">
                            <div className="flex-shrink-0">
                                <img className="rounded-full w-14 h-14" src={'https://images.unsplash.com/photo-1695192413426-af217f0324e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1NXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60'} alt="Jese image" />
                            </div>
                            <div className="w-full ps-3">
                                <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">New message from <span className="font-semibold text-gray-900 dark:text-white">Jese Leos</span>: "Hey, what's up? All set for the presentation?"</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">{moment(item?.createdAt).format('DD/MM/YYYY')}</div>
                            </div>
                        </a>
                    )
                })}  
            </div>
        </div>
    )
}

export default Notification