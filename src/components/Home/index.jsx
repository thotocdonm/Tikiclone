import { Col, Divider, InputNumber, Pagination, Rate, Row } from "antd"
import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { FilterOutlined, SyncOutlined } from "@ant-design/icons";
import './home.scss'
import { Tabs } from 'antd';

const Home = () => {
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };

    const items = [
        {
            key: '1',
            label: 'Phổ biến'

        },
        {
            key: '2',
            label: 'Hàng mới'

        },
        {
            key: '3',
            label: 'Giá Thấp Đến Cao'

        },
        {
            key: '4',
            label: 'Giá Cao Đến Thấp'

        },
    ];

    return (
        <div className="home-container" style={{ maxWidth: 1920, margin: '0 auto' }}>
            <Row gutter={[20, 20]} style={{ display: 'flex', gap: '35px', paddingTop: '20px' }}>
                <Col xs={0} sm={0} md={4} style={{ borderRadius: '10px', background: 'white' }}>
                    <div>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '0 10px' }}>
                            <span><FilterOutlined /> Bộ lọc tìm kiếm</span>
                            <span><SyncOutlined /></span>
                        </div>
                        <Form
                            name="basic"

                            onFinish={onFinish}
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
                                    onChange={onChange}
                                >
                                    <Row>
                                        <Col span={24}>
                                            <Checkbox value="A">A</Checkbox>
                                        </Col>
                                        <Col span={24}>
                                            <Checkbox value="B">B</Checkbox>
                                        </Col>
                                        <Col span={24}>
                                            <Checkbox value="C">C</Checkbox>
                                        </Col>
                                        <Col span={24}>
                                            <Checkbox value="D">D</Checkbox>
                                        </Col>
                                        <Col span={24}>
                                            <Checkbox value="E">E</Checkbox>
                                        </Col>
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
                                    <InputNumber
                                        width={'100%'}
                                        placeholder="Từ đ"
                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
                                    />
                                    <span> - </span>
                                    <InputNumber
                                        width={'100%'}
                                        placeholder="Đến đ"
                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
                                    />
                                </div>

                            </Form.Item>

                            <Form.Item
                                style={{ padding: '0 10px' }}
                            >
                                <Button type="primary" htmlType="submit" block>
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
                    <Row>
                        <Tabs defaultActiveKey="1" items={items} />
                    </Row>

                    <Row className="customize-row">
                        <div className="column">
                            <div className="wrapper">
                                <div className="thumbnail">
                                    <img src="http://localhost:8080/images/book/e_sAZTgQ66zalX7AKYXY~1j6bemb-06dca381834d365ed47ee611bd42f6e4.png"></img>
                                </div>
                                <div className="text">
                                    Umineko
                                </div>
                                <div className="price">
                                    1000
                                </div>
                                <div className="rating">
                                    <Rate disabled defaultValue={5} />
                                    <span>Đã bán 1k</span>
                                </div>
                            </div>
                        </div>
                        <div className="column">
                            <div className="wrapper">
                                <div className="thumbnail">
                                    <img src="http://localhost:8080/images/book/e_sAZTgQ66zalX7AKYXY~1j6bemb-06dca381834d365ed47ee611bd42f6e4.png"></img>
                                </div>
                                <div className="text">
                                    Umineko
                                </div>
                                <div className="price">
                                    1000
                                </div>
                                <div className="rating">
                                    <Rate disabled defaultValue={5} />
                                    <span>Đã bán 1k</span>
                                </div>
                            </div>
                        </div>
                        <div className="column">
                            <div className="wrapper">
                                <div className="thumbnail">
                                    <img src="http://localhost:8080/images/book/e_sAZTgQ66zalX7AKYXY~1j6bemb-06dca381834d365ed47ee611bd42f6e4.png"></img>
                                </div>
                                <div className="text">
                                    Umineko
                                </div>
                                <div className="price">
                                    1000
                                </div>
                                <div className="rating">
                                    <Rate disabled defaultValue={5} />
                                    <span>Đã bán 1k</span>
                                </div>
                            </div>
                        </div>
                        <div className="column">
                            <div className="wrapper">
                                <div className="thumbnail">
                                    <img src="http://localhost:8080/images/book/e_sAZTgQ66zalX7AKYXY~1j6bemb-06dca381834d365ed47ee611bd42f6e4.png"></img>
                                </div>
                                <div className="text">
                                    Umineko
                                </div>
                                <div className="price">
                                    1000
                                </div>
                                <div className="rating">
                                    <Rate disabled defaultValue={5} style={{ color: '#ffce3d', fontSize: 10 }} />
                                    <span>Đã bán 1k</span>
                                </div>
                            </div>
                        </div>
                        <div className="column">
                            <div className="wrapper">
                                <div className="thumbnail">
                                    <img src="http://localhost:8080/images/book/e_sAZTgQ66zalX7AKYXY~1j6bemb-06dca381834d365ed47ee611bd42f6e4.png"></img>
                                </div>
                                <div className="text">
                                    Umineko
                                </div>
                                <div className="price">
                                    1000
                                </div>
                                <div className="rating">
                                    <Rate disabled defaultValue={5} style={{ color: '#ffce3d', fontSize: 10 }} />
                                    <span>Đã bán 1k</span>
                                </div>
                            </div>
                        </div>
                        <div className="column">
                            <div className="wrapper">
                                <div className="thumbnail">
                                    <img src="http://localhost:8080/images/book/e_sAZTgQ66zalX7AKYXY~1j6bemb-06dca381834d365ed47ee611bd42f6e4.png"></img>
                                </div>
                                <div className="text">
                                    Umineko
                                </div>
                                <div className="price">
                                    1000
                                </div>
                                <div className="rating">
                                    <Rate disabled defaultValue={5} />
                                    <span>Đã bán 1k</span>
                                </div>
                            </div>
                        </div>
                        <div className="column">
                            <div className="wrapper">
                                <div className="thumbnail">
                                    <img src="http://localhost:8080/images/book/e_sAZTgQ66zalX7AKYXY~1j6bemb-06dca381834d365ed47ee611bd42f6e4.png"></img>
                                </div>
                                <div className="text">
                                    Umineko
                                </div>
                                <div className="price">
                                    1000
                                </div>
                                <div className="rating">
                                    <Rate disabled defaultValue={5} />
                                    <span>Đã bán 1k</span>
                                </div>
                            </div>
                        </div>
                    </Row>
                    <Divider />
                    <Row style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Pagination defaultCurrent={6} total={500} />
                    </Row>

                </Col>

            </Row>
        </div>
    )
}

export default Home
