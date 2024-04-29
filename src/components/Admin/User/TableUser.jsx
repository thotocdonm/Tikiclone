import { Badge, Button, Descriptions, Drawer, Popconfirm, Popover, Table, message, notification } from "antd";
import { delDeleteUser, getUserWithPaginate } from "../../../services/api";
import { useEffect, useState } from "react";
import InputSearch from "./InputSearch";
import { MdDeleteOutline } from "react-icons/md";
import DetailUser from "./DetailUser";
import { CiExport } from "react-icons/ci";
import { CiImport } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import { IoMdRefresh } from "react-icons/io";
import { DeleteOutlined, EditOutlined, ExportOutlined, FileAddOutlined, ImportOutlined, PlusOutlined, SyncOutlined } from "@ant-design/icons";
import ModalAddNewUser from "./ModalAddNewUser";
import ModalImportUser from "./ModalImportUser";
import * as XLSX from 'xlsx/xlsx.mjs';
import ModalUpdateUser from "./ModalUpdateUser";

const TableUser = () => {
    const content = (
        <div>
            <p>Bạn có chắc chắn muốn xóa user này ?</p>
        </div>
    );
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
            title: 'Tên hiển thị',
            dataIndex: 'fullName',
            sorter: true
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: true
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            sorter: true
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
                        onConfirm={() => handleDeleteUser(record._id)}
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


    const [listUser, setListUser] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [searchFilter, setSearchFilter] = useState();
    const [sortFilter, setSortFilter] = useState();
    const [open, setOpen] = useState(false);
    const [detailData, setDetailData] = useState({});
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState();


    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

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

    const fetchUserWithPaginate = async () => {
        setIsLoading(true);
        let query = `current=${current}&pageSize=${pageSize}`;
        if (searchFilter) {
            query += `&${searchFilter}`;
        }
        if (sortFilter) {
            query += `&${sortFilter}`;
        }
        const res = await getUserWithPaginate(query);
        if (res && res.data) {
            setListUser(res.data.result);
            setTotal(res.data.meta.total);
        }
        setIsLoading(false);
    };

    const handleSearch = (query) => {
        setSearchFilter(query)
        fetchUserWithPaginate()
    };

    const renderHeader = () => {
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Table List Users</span>
                <span style={{ display: 'flex', gap: 15 }}>
                    <Button icon={<ExportOutlined />} type="primary" onClick={() => downloadExcel(listUser)}>Export</Button>
                    <Button icon={<ImportOutlined />} type="primary" onClick={() => setIsImportModalOpen(true)}>Import</Button>
                    <Button icon={<PlusOutlined />} type="primary" onClick={() => setIsAddModalOpen(true)}>Thêm mới</Button>
                    <Button icon={<SyncOutlined />} type="ghost" onClick={() => {
                        setSortFilter('');
                        setSearchFilter('');
                    }}></Button>
                </span>
            </div>
        )
    }
    useEffect(() => {
        fetchUserWithPaginate();
    }, [current, pageSize, searchFilter, sortFilter])

    const downloadExcel = (data) => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
        //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
        XLSX.writeFile(workbook, "ExportUser.csv");
    };

    const handleDeleteUser = async (id) => {
        let res = await delDeleteUser(id);
        if (res && res.data) {
            message.success('Xóa user thành công');
            fetchUserWithPaginate();
        }
        else {
            notification.error({
                message: 'Đã có lỗi xảy ra',
                description: res?.message,
                duration: 5
            })
        }
    }
    return (
        <div>
            <InputSearch handleSearch={handleSearch} />
            <Table
                title={renderHeader}
                columns={columns}
                dataSource={listUser}
                onChange={onChange}
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
                <DetailUser
                    detailData={detailData}
                    setDetailData={setDetailData}
                />
            </Drawer>
            <ModalAddNewUser
                isAddModalOpen={isAddModalOpen}
                setIsAddModalOpen={setIsAddModalOpen}
                fetchUserWithPaginate={fetchUserWithPaginate}
            />
            <ModalImportUser
                isImportModalOpen={isImportModalOpen}
                setIsImportModalOpen={setIsImportModalOpen}
                fetchUserWithPaginate={fetchUserWithPaginate}
            />
            <ModalUpdateUser
                isUpdateModalOpen={isUpdateModalOpen}
                setIsUpdateModalOpen={setIsUpdateModalOpen}
                fetchUserWithPaginate={fetchUserWithPaginate}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
            />


        </div>
    )
}

export default TableUser
