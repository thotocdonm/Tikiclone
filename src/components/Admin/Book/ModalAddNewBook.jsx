import React, { useEffect, useState } from 'react';
import { Button, Divider, Form, Image, Input, InputNumber, Modal, Select, Upload } from 'antd';
import { Col, Row } from 'antd';
import { getBookCategory } from '../../../services/api';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};

const ModalAddNewBook = (props) => {
    const { isAddModalOpen, setIsAddModalOpen } = props;
    const [category, setCategory] = useState([]);
    const [form] = Form.useForm();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [loadingThumbnail, setLoadingThumbnail] = useState(false);
    const [loadingSlider, setLoadingSlider] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const showModal = () => {
        setIsAddModalOpen(true);
    };
    const handleOk = () => {
        form.submit();
    };
    const handleCancel = () => {
        setIsAddModalOpen(false);
    };
    const onFinish = async (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const onChange = (value) => {
        console.log(`selected ${value}`);
    };
    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
    const onSearch = (value) => {
        console.log('search:', value);
    };

    const fetchBookCategory = async () => {
        let res = await getBookCategory();
        let categoryArray = [];
        if (res && res.data) {
            res.data.map(item => {
                categoryArray.push({
                    value: item,
                    label: item
                })
            })
            setCategory(categoryArray);
        }
    };


    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    const handleChange = (info, type) => {
        if (info.file.status === 'uploading') {
            type ? setLoadingSlider(true) : setLoadingThumbnail(true);
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.

            getBase64(info.file.originFileObj, (url) => {
                type ? setLoadingSlider(false) : setLoadingThumbnail(false);
                setImageUrl(url);
            });
        }
        console.log(info)
    };

    const handleUploadFile = ({ file, onSuccess, onError }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 1000);
    };


    useEffect(() => {
        fetchBookCategory();
    }, [])
    return (
        <>
            <Modal title="Thêm mới book" open={isAddModalOpen} onOk={handleOk} onCancel={handleCancel} width={'35vw'} >
                <Divider />
                <Form
                    name="basic"
                    form={form}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Row gutter={15}>
                        <Col span={12}>
                            <Form.Item
                                label="Tên sách"
                                name="fullName"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không được để trống tên sách',
                                    },
                                ]}
                                labelCol={{
                                    span: 24
                                }}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Tác giả"
                                name="author"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không được để trống tên tác giả',
                                    },
                                ]}
                                labelCol={{
                                    span: 24
                                }}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label="Giá tiền"
                                name="price"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không được để trống giá tiền',
                                    },
                                ]}
                                labelCol={{
                                    span: 24
                                }}
                            >
                                <InputNumber
                                    addonAfter="VNĐ"
                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label="Thể loại"
                                name="category"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không được để trống thể loại',
                                    },
                                ]}
                                labelCol={{
                                    span: 24
                                }}
                            >
                                <Select
                                    showSearch
                                    placeholder="Chọn thể loại"
                                    onChange={onChange}
                                    onSearch={onSearch}
                                    filterOption={filterOption}
                                    options={category}
                                />

                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label="Số lượng"
                                name="quantity"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không được để trống số lượng',
                                    },
                                ]}
                                labelCol={{
                                    span: 24
                                }}
                            >
                                <InputNumber
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label="Đã bán"
                                name="sold"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không được để trống số lượng đã bán',
                                    },
                                ]}
                                labelCol={{
                                    span: 24
                                }}
                            >
                                <InputNumber
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Ảnh thumbnail"
                                name="thumbnail"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không được để trống thumbnail',
                                    },
                                ]}
                                labelCol={{
                                    span: 24
                                }}
                            >
                                <Upload
                                    name="thumbnail"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    maxCount={1}
                                    multiple={false}
                                    customRequest={handleUploadFile}
                                    beforeUpload={beforeUpload}
                                    onChange={handleChange}
                                >
                                    <div>
                                        {loadingThumbnail ? <LoadingOutlined /> : <PlusOutlined />}
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </div>
                                </Upload>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Ảnh slider"
                                name="slider"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không được để trống ảnh slider',
                                    },
                                ]}
                                labelCol={{
                                    span: 24
                                }}
                            >
                                <Upload
                                    multiple
                                    name="slider"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    customRequest={handleUploadFile}
                                    beforeUpload={beforeUpload}
                                    onChange={(info) => handleChange(info, 'slider')}
                                >
                                    <div>
                                        {loadingSlider ? <LoadingOutlined /> : <PlusOutlined />}
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </div>
                                </Upload>
                            </Form.Item>
                        </Col>
                    </Row>

                </Form>

            </Modal>
        </>
    )
}

export default ModalAddNewBook
