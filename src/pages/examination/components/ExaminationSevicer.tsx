import React, { useEffect, useState } from 'react'
import { Table } from '../../../components/table'
import { getServiceByIdExam } from '../../../services/designation.service'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { LabelStatusDesignation } from '../../../components/label'

type Props = {}

const ExaminationSevicer = (props: Props) => {
    const [data, setData] = useState<any>()
    const { id } = useParams()
    console.log();

    const headings = [
        "STT",
        "Mã dịch vụ - Tên dịch vụ",
        "Bác sỹ chỉ định", "Đơn giá",
        "Kết luận ", "Trạng thái thanh toán",
        "Trạng thái thực hiện"
    ]
    useEffect(() => {
        if (id) {
            loadData()
        }
    }, [id])
    async function loadData() {
        try {
            const response = await getServiceByIdExam(id);
            const resData = response?.docs;
            setData(resData)
        } catch (error) {
            toast.error('Đã có lỗi sảy ra!!!')
        }
    }

    console.log(data, "dataMMM");
    const checkpayment = (status : any) => {
        switch (status) {
            case "unpaid" : 
            return <span style={{color : "#ffa726"}}>Chưa thanh toán</span>
            case "paid" : 
            return <span style={{color : "green"}}>Chưa thanh toán</span>
        } 
    }
    return (
        <Table headings={headings}>
            {
                data?.map((item: any , index : any) => {
                    return (
                        <tr key={index}>
                          <td>{index+1}</td>
                          <td>{item?._id}</td>
                          <td>{item?.doctorId?.name}</td>
                          <td>{item?.service_examination?.price ? `${item.service_examination.price.toLocaleString()} đ` : '---'}</td>
                          <td><Link to={`/designation/${item?._id}/view`} style={{color :"blue" , textDecoration : 'underline'}}>Xem</Link></td>
                          <td>{checkpayment(item?.paymentStatus)}</td>
                          <td> <LabelStatusDesignation type={item?.status} /></td>
                        </tr>
                    )
                })

            }
        </Table>
    )
}

export default ExaminationSevicer