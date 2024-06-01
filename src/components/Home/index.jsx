import { Col, Divider, Drawer, InputNumber, Pagination, Rate, Row, Spin } from "antd"
import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { FilterOutlined, SyncOutlined } from "@ant-design/icons";
import './home.scss'
import { Tabs } from 'antd';
import { getBookCategory, getBookWithPaginate } from "../../services/api";
import { useNavigate, useOutletContext } from "react-router-dom";

const Home = () => {
    const [searchTerm, setSearchTerm] = useOutletContext();
    const [category, setCategory] = useState([]);
    const [listBook, setListBook] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPageSize, setCurrentPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [sortQuery, setSortQuery] = useState('sort=-sold');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [rangeFilter, setRangeFilter] = useState('');
    const navigate = useNavigate();

    const [form] = Form.useForm();

    const [openSortDrawer, setOpenSortDrawer] = useState(false);
    const onCloseSortDrawer = () => {
        setOpenSortDrawer(false)
    }

    const onChange = (page, pageSize) => {
        if (page !== currentPage) {
            setCurrentPage(page);
        }
        if (pageSize !== currentPageSize) {
            setCurrentPageSize(pageSize);
            setCurrentPage(1);
        }
    };

    const onChangeTabs = (key) => {
        let query = `sort=${key}`;
        setSortQuery(query);
    };

    const handleChangeFilter = (changedValues, values) => {
        console.log(values);
        let query = `category=`;
        if (values.category && values.category.length > 0) {
            values.category.map(item => {
                query += `${item},`
            })
        } else {
            setCategoryFilter('');
        }
        setCategoryFilter(query);
    }
    const onFinish = (values) => {

        if (values.range.from > 0 && values.range.to > 0) {
            let query = `price>=${values.range.from}&price<=${values.range.to}`;
            setRangeFilter(query);
        } else {
            setRangeFilter('');
        }
        console.log(rangeFilter);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const fetchBookCategory = async () => {
        const res = await getBookCategory();
        if (res && res.data) {
            setCategory(res.data);
        }
        else {
            setCategory([]);
        }

    }
    const fetchBook = async () => {
        let query = `current=${currentPage}&pageSize=${currentPageSize}`
        if (sortQuery) {
            query += `&${sortQuery}`
        }
        if (categoryFilter) {
            query += `&${categoryFilter}`
        }
        if (rangeFilter) {
            query += `&${rangeFilter}`
        }
        if (searchTerm) {
            query += `&mainText=/${searchTerm}/i`;
        }
        setIsLoading(true);
        const res = await getBookWithPaginate(query);
        if (res && res.data) {
            setTotal(res.data.meta.total);
            setListBook(res.data.result);
        }
        else {
            setListBook([]);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        fetchBookCategory();
        fetchBook();
    }, [currentPage, currentPageSize, sortQuery, categoryFilter, rangeFilter, searchTerm])

    const items = [
        {
            key: '-sold',
            label: 'Phổ biến'

        },
        {
            key: '-updatedAt',
            label: 'Hàng mới'

        },
        {
            key: 'price',
            label: 'Giá Thấp Đến Cao'

        },
        {
            key: '-price',
            label: 'Giá Cao Đến Thấp'

        },
    ];

    const toNonAccentVietnamese = (str) => {
        str = str.replace(/A|Á|À|Ã|Ạ|Â|Ấ|Ầ|Ẫ|Ậ|Ă|Ắ|Ằ|Ẵ|Ặ/g, "A");
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/E|É|È|Ẽ|Ẹ|Ê|Ế|Ề|Ễ|Ệ/, "E");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/I|Í|Ì|Ĩ|Ị/g, "I");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/O|Ó|Ò|Õ|Ọ|Ô|Ố|Ồ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ỡ|Ợ/g, "O");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/U|Ú|Ù|Ũ|Ụ|Ư|Ứ|Ừ|Ữ|Ự/g, "U");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/Y|Ý|Ỳ|Ỹ|Ỵ/g, "Y");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/Đ/g, "D");
        str = str.replace(/đ/g, "d");
        // Some system encode vietnamese combining accent as individual utf-8 characters
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
        str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
        return str;
    }

    const convertToSlug = (Text) => {
        return Text.toLowerCase()
            .replace(/[^\w ]+/g, "")
            .replace(/ +/g, "-");
    }

    const handleRedirectBook = (book) => {
        let name = convertToSlug(toNonAccentVietnamese(book.mainText));
        navigate(`/book/${name}?id=${book._id}`)
    }

    return (
        <div className="home-container" style={{ maxWidth: 1920, margin: '0 auto' }}>
            <Row gutter={[20, 20]} style={{ display: 'flex', gap: '35px', paddingTop: '20px' }}>
                <Col xs={0} sm={0} md={4} style={{ borderRadius: '10px', background: 'white', marginLeft: '30px' }}>
                    <div>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '10px 10px' }}>
                            <span style={{ fontWeight: 'bold', fontSize: '15px' }}><FilterOutlined style={{ fontSize: '20px', color: 'rgb(22, 119, 255)' }} /> Bộ lọc tìm kiếm</span>
                            <Button
                                icon={<SyncOutlined />}
                                type="ghost"
                                onClick={() => {
                                    form.resetFields()
                                    setCategoryFilter('')
                                    setRangeFilter('')
                                    setSearchTerm('')
                                }}

                            ></Button>
                        </div>
                        <Divider />
                        <Form
                            name="basic"
                            form={form}
                            onFinish={onFinish}
                            onValuesChange={handleChangeFilter}
                        >
                            <Form.Item
                                name="category"
                                label="Danh mục sản phẩm"
                                labelCol={{ span: 24 }}
                                style={{ padding: '0 10px' }}
                            >
                                <Checkbox.Group
                                    style={{
                                        width: '100%',
                                    }}

                                >
                                    <Row>
                                        {category && category.length > 0 && category.map(item => {
                                            return (
                                                <Col span={24} style={{ padding: '5px 0' }}>
                                                    <Checkbox value={item}>{item}</Checkbox>
                                                </Col>
                                            )
                                        })}
                                    </Row>
                                </Checkbox.Group>

                            </Form.Item>
                            <Divider />
                            <Form.Item
                                label='Khoảng giá'
                                labelCol={{ span: 24 }}
                                style={{ padding: '0 10px' }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                    <Form.Item name={["range", 'from']}>
                                        <InputNumber

                                            width={'100%'}
                                            placeholder="Từ đ"
                                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
                                        />
                                    </Form.Item>

                                    <span> - </span>
                                    <Form.Item name={["range", 'to']}>
                                        <InputNumber

                                            width={'100%'}
                                            placeholder="Đến đ"
                                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
                                        />
                                    </Form.Item>

                                </div>

                            </Form.Item>

                            <Form.Item
                                style={{ padding: '0 10px' }}
                            >
                                <Button type="primary" onClick={() => form.submit()} block>
                                    Áp dụng
                                </Button>
                            </Form.Item>
                            <Form.Item

                                label="Đánh giá"
                                labelCol={{ span: 24 }}
                                style={{ padding: '0 10px' }}
                            >
                                <div>
                                    <Rate value={5} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                                    <span className="ant-rate-text"></span>
                                </div>
                                <div>
                                    <Rate value={4} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                                    <span className="ant-rate-text">trở lên</span>
                                </div>
                                <div>
                                    <Rate value={3} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                                    <span className="ant-rate-text">trở lên</span>
                                </div>
                                <div>
                                    <Rate value={2} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                                    <span className="ant-rate-text">trở lên</span>
                                </div>
                                <div>
                                    <Rate value={1} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                                    <span className="ant-rate-text">trở lên</span>
                                </div>
                            </Form.Item>
                        </Form>
                    </div>

                </Col>
                <Col xs={24} md={19} style={{ borderRadius: '10px', paddingLeft: '10px', background: 'white', height: 'fit-content' }}>
                    <Spin spinning={isLoading} tip="Loading...">
                        <Row>
                            <Tabs defaultActiveKey="1" items={items} onChange={onChangeTabs} />
                        </Row>
                        <Row className="phone-sorter">
                            <span onClick={() => setOpenSortDrawer(true)} style={{ fontWeight: 'bold', fontSize: '15px' }}><FilterOutlined style={{ fontSize: '20px', color: 'rgb(22, 119, 255)' }} />Lọc</span>
                        </Row>

                        <Row className="customize-row">
                            {listBook && listBook.length > 0 && listBook.map(item => {
                                return (
                                    <div className="column" onClick={() => handleRedirectBook(item)}>
                                        <div className="wrapper">
                                            <div className="thumbnail">
                                                <img src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${item.thumbnail}`}></img>
                                            </div>
                                            <div className="text">
                                                {item.mainText}
                                            </div>
                                            <div className="price">
                                                {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
                                            </div>
                                            <div className="rating">
                                                <Rate disabled defaultValue={5} />
                                                <span>Đã bán {item.sold}</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </Row>
                        <Divider />
                        <Row style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '10px', paddingBottom: '30px' }}>
                            <Pagination current={currentPage} total={total} pageSize={currentPageSize} showSizeChanger={true} onChange={onChange} responsive />
                        </Row>

                    </Spin>

                </Col>

            </Row>
            <Drawer
                title="Bộ lọc"
                placement={'right'}
                onClose={onCloseSortDrawer}
                open={openSortDrawer}
                width={'75vw'}
            >
                <div>
                    <Form
                        name="basic"
                        form={form}
                        onFinish={onFinish}
                        onValuesChange={handleChangeFilter}
                    >
                        <Form.Item
                            name="category"
                            label="Danh mục sản phẩm"
                            labelCol={{ span: 24 }}
                            style={{ padding: '0 10px' }}
                        >
                            <Checkbox.Group
                                style={{
                                    width: '100%',
                                }}

                            >
                                <Row>
                                    {category && category.length > 0 && category.map(item => {
                                        return (
                                            <Col span={24} style={{ padding: '5px 0' }}>
                                                <Checkbox value={item}>{item}</Checkbox>
                                            </Col>
                                        )
                                    })}
                                </Row>
                            </Checkbox.Group>

                        </Form.Item>
                        <Divider />
                        <Form.Item
                            label='Khoảng giá'
                            labelCol={{ span: 24 }}
                            style={{ padding: '0 10px' }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                <Form.Item name={["range", 'from']}>
                                    <InputNumber

                                        width={'100%'}
                                        placeholder="Từ đ"
                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
                                    />
                                </Form.Item>

                                <span> - </span>
                                <Form.Item name={["range", 'to']}>
                                    <InputNumber

                                        width={'100%'}
                                        placeholder="Đến đ"
                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
                                    />
                                </Form.Item>

                            </div>

                        </Form.Item>

                        <Form.Item
                            style={{ padding: '0 10px' }}
                        >
                            <Button type="primary" onClick={() => form.submit()} block>
                                Áp dụng
                            </Button>
                        </Form.Item>
                        <Form.Item

                            label="Đánh giá"
                            labelCol={{ span: 24 }}
                            style={{ padding: '0 10px' }}
                        >
                            <div>
                                <Rate value={5} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                                <span className="ant-rate-text"></span>
                            </div>
                            <div>
                                <Rate value={4} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                                <span className="ant-rate-text">trở lên</span>
                            </div>
                            <div>
                                <Rate value={3} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                                <span className="ant-rate-text">trở lên</span>
                            </div>
                            <div>
                                <Rate value={2} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                                <span className="ant-rate-text">trở lên</span>
                            </div>
                            <div>
                                <Rate value={1} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                                <span className="ant-rate-text">trở lên</span>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
            </Drawer>
        </div>
    )
}

export default Home
