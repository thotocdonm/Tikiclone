import React, { useEffect, useState } from 'react';
import { Button, Drawer, Popconfirm, Table } from 'antd';
import { getBookWithPaginate } from '../../../services/api';
import { DeleteOutlined, EditOutlined, ExportOutlined, ImportOutlined, PlusOutlined, SyncOutlined } from '@ant-design/icons';
import moment from "moment";
import InputSearchBook from './InputSearchBook';
import DetailBook from './DetailBook';
import ModalAddNewBook from './ModalAddNewBook';
import ModalUpdateBook from './ModalUpdateBook';

const TableBook = () => {
    const [listBook, setListBook] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [searchFilter, setSearchFilter] = useState('');
    const [sortFilter, setSortFilter] = useState('sort=-updatedAt');
    const [open, setOpen] = useState(false);
    const [detailData, setDetailData] = useState({});
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});

    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
        setDetailData([]);
    };


    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
            sorter: true,
            render: (text, record, index) => {
                return (
                    <a href="#" onClick={() => {
                        showDrawer();
                        setDetailData(record);
                    }}>{record._id}</a>
                )

            }
        },
        {
            title: 'Tên sách',
            dataIndex: 'mainText',
            sorter: true
        },
        {
            title: 'Thể loại',
            dataIndex: 'category',
            sorter: true
        },
        {
            title: 'Tác giả',
            dataIndex: 'author',
            sorter: true
        },
        {
            title: 'Giá tiền',
            dataIndex: 'price',
            sorter: true,
            render: (text, record, index) => {
                return (
                    <>
                        {`${text} đ`}
                    </>
                )
            }
        },
        {
            title: 'Ngày cập nhật',
            dataIndex: 'updatedAt',
            sorter: true,
            render: (text, record, index) => {
                return (
                    <>
                        {moment(text).format("DD-MM-YYYY hh:mm:ss")}
                    </>
                )
            }
        },
        {
            title: 'Action',
            render: (record) => {
                return <>
                    <Popconfirm
                        title="Xác nhận xóa User"
                        description="Bạn có chắc chắn muốn xóa user này ?"
                        okText="Xác nhận"
                        cancelText="Hủy"
                        placement="left"
                    >
                        <DeleteOutlined style={{ color: 'red', cursor: 'pointer', fontSize: '20px' }} />
                    </Popconfirm>
                    <EditOutlined
                        style={{ color: 'orange', cursor: 'pointer', fontSize: '20px', paddingLeft: '20px' }}
                        onClick={() => {
                            setIsUpdateModalOpen(true)
                            setDataUpdate(record);
                        }}
                    />

                </>
            }
        },
    ];
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
                <span>Table List Users</span>
                <span style={{ display: 'flex', gap: 15 }}>
                    <Button icon={<ExportOutlined />} type="primary" >Export</Button>
                    <Button icon={<ImportOutlined />} type="primary" >Import</Button>
                    <Button icon={<PlusOutlined />} type="primary" onClick={() => setIsAddModalOpen(true)} >Thêm mới</Button>
                    <Button icon={<SyncOutlined />} type="ghost" onClick={() => {
                        setSortFilter('');
                        setSearchFilter('');
                    }}></Button>
                </span>
            </div>
        )
    }

    const fetchBookWithPaginate = async () => {
        setIsLoading(true);
        let query = `current=${current}&pageSize=${pageSize}`;
        if (searchFilter) {
            query += `&${searchFilter}`;
        }
        if (sortFilter) {
            query += `&${sortFilter}`;
        }
        const res = await getBookWithPaginate(query);
        if (res && res.data) {
            setListBook(res.data.result);
            setTotal(res.data.meta.total);
        }
        setIsLoading(false);
    };

    const handleSearch = (query) => {
        setSearchFilter(query)
        fetchBookWithPaginate();
    };

    useEffect(() => {
        fetchBookWithPaginate();
    }, [current, pageSize, searchFilter, sortFilter])

    return (
        <>
            <InputSearchBook handleSearch={handleSearch} />
            <Table
                title={renderHeader}
                columns={columns}
                dataSource={listBook}
                onChange={onChange}
                showSorterTooltip={{
                    target: 'sorter-icon',
                }}
                style={{ padding: '0 15px' }}
                rowKey='_id'
                pagination={{
                    current: current, pageSize: pageSize, total: total, showSizeChanger: true,
                    showTotal: (total, range) => {
                        return (
                            <span>{range[0]} - {range[1]} trên {total}</span>
                        )
                    }
                }}
                loading={isLoading}
            />
            <Drawer title="Basic Drawer" onClose={onClose} open={open} width={'45vw'}>
                <DetailBook
                    detailData={detailData}
                />
            </Drawer>
            <ModalAddNewBook
                isAddModalOpen={isAddModalOpen}
                setIsAddModalOpen={setIsAddModalOpen}
                fetchBookWithPaginate={fetchBookWithPaginate}
            />
            <ModalUpdateBook
                isUpdateModalOpen={isUpdateModalOpen}
                setIsUpdateModalOpen={setIsUpdateModalOpen}
                fetchBookWithPaginate={fetchBookWithPaginate}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
            />

        </>
    )
}

export default TableBook
