import { Table } from "antd";
import { useEffect, useState } from "react";
import { getOrderWithPaginate } from "../../../services/api";
import moment from "moment";

const TableOrder = () => {
    const dataSource = [
        {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
        },
        {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
        },
    ];

    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
            key: '_id',
        },
        {
            title: 'Price',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (text, record, index) => {
                return (
                    <>
                        {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(text)}
                    </>
                )
            }
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Ngày cập nhật',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text, record, index) => {
                return (
                    <>
                        {moment(text).format("DD-MM-YYYY hh:mm:ss")}
                    </>
                )
            }
        },
    ];

    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [listOrder, setListOrder] = useState([]);

    const fetchOrderWithPaginate = async () => {
        let query = `current=${current}&pageSize=${pageSize}`;
        const res = await getOrderWithPaginate(query);
        if (res && res.data) {
            setTotal(res.data.meta.total);
            setListOrder(res.data.result);
        }
    }

    const onChange = async (pagination, filters, sorter, extra) => {
        console.log('check sorter', sorter);
        if (pagination && pagination.current !== current) {
            setCurrent(pagination.current);
        }
        if (pagination && pagination.pageSize !== pageSize) {
            setPageSize(pagination.pageSize);
            setCurrent(1);
        }
        if (Object.keys(sorter).length !== 0) {
            let sortQuery = sorter.order === 'ascend' ? `sort=${sorter.field}` : `sort=-${sorter.field}`;
            setSortFilter(sortQuery);
        }
    };

    const renderHeader = () => {
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Table List Order</span>
            </div>
        )
    }

    useEffect(() => {
        fetchOrderWithPaginate();
        console.log(listOrder)
    }, [current, pageSize])
    return (
        <div style={{ padding: '20px 20px' }}>
            <Table
                dataSource={listOrder}
                columns={columns}
                onChange={onChange}
                title={renderHeader}
                pagination={{
                    current: current, pageSize: pageSize, total: total, showSizeChanger: true,
                    showTotal: (total, range) => {
                        return (
                            <span>{range[0]} - {range[1]} trên {total}</span>
                        )
                    }
                }}
            />
        </div>
    )
}

export default TableOrder
