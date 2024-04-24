import { Button, Table } from "antd";
import { getUserWithPaginate } from "../../../services/api";
import { useEffect, useState } from "react";
import InputSearch from "./InputSearch";



const TableUser = () => {
    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
            sorter: true
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
            render: () => {
                return <>
                    <Button>Delete</Button>
                </>
            }

        },
    ];

    const [data, setData] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(2);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [searchFilter, setSearchFilter] = useState();
    const [sortFilter, setSortFilter] = useState();

    const onChange = async (pagination, filters, sorter, extra) => {
        console.log('check sorter', sorter);
        if (pagination && pagination.current !== current) {
            setCurrent(pagination.current);
        }
        if (pagination && pagination.pageSize !== pageSize) {
            setPageSize(pagination.pageSize);
            setCurrent(1);
        }
        if (sorter) {
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
            setData(res.data.result);
            setTotal(res.data.meta.total);
        }
        setIsLoading(false);
    };

    const handleSearch = (query) => {
        setSearchFilter(query)
        fetchUserWithPaginate()
    }
    useEffect(() => {
        fetchUserWithPaginate();
    }, [current, pageSize, searchFilter, sortFilter])
    return (
        <div>
            <InputSearch handleSearch={handleSearch} />
            <Table
                columns={columns}
                dataSource={data}
                onChange={onChange}
                style={{ padding: '0 15px' }}
                rowKey='_id'
                pagination={{ current: current, pageSize: pageSize, total: total, showSizeChanger: true }}
                loading={isLoading}
            />
        </div>
    )
}

export default TableUser
