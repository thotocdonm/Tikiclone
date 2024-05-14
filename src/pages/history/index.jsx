import ReactJson from 'react-json-view'
import { getHistory } from '../../services/api';
import { useEffect, useState } from 'react';
import { Table, Tag } from 'antd';
import moment from 'moment';
import './history.scss'
const History = () => {

    const columns = [
        {
            title: 'STT',
            key: 'name',
            render: (text, record, index) => {
                return (
                    <>
                        {index + 1}
                    </>
                )
            }

        },
        {
            title: 'Id đơn hàng',
            dataIndex: '_id',
            key: 'name',

        },
        {
            title: 'Thời gian',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text, record, index) => {
                return (
                    <>
                        {moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss")}
                    </>
                )
            }
        },
        {
            title: 'Tổng số tiền',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (text, record, index) => {
                return (
                    <>
                        {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(record.totalPrice)}
                    </>
                )
            }
        },
        {
            title: 'Trạng thái',
            key: 'status',
            render: (text, record, index) => {
                return (
                    <Tag color="green"> Thành Công </Tag>
                )

            }

        },
        {
            title: 'Chi tiết',
            key: 'detail',
            render: (text, record, index) => {
                return (
                    <ReactJson displayObjectSize={false} displayDataTypes={false} name="Chi tiết đơn mua" src={record.detail} collapsed={true} />
                )

            }
        },
    ];

    const [data, setData] = useState([]);

    const handleGetHistory = async () => {
        let res = await getHistory();
        if (res && res.data) {
            setData(res.data);
        } else {
            setData({});
        }
    }

    useEffect(() => {
        handleGetHistory();
    })

    const renderHeader = () => {
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Lịch sử đặt hàng :</span>
            </div>
        )
    }
    return (
        <div className="history-container">
            <div>
                <Table title={renderHeader} columns={columns} dataSource={data} pagination={false} />
            </div>
        </div>
    )
}

export default History
