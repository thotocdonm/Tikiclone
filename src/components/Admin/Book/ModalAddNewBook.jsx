import React, { useEffect, useState } from 'react';
import { Button, Divider, Form, Image, Input, InputNumber, Modal, Select, Upload, message, notification } from 'antd';
import { Col, Row } from 'antd';
import { callUploadBookImg, getBookCategory, postCreateBook } from '../../../services/api';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};

const getPreviewBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const ModalAddNewBook = (props) => {
    const { isAddModalOpen, setIsAddModalOpen } = props;
    const [category, setCategory] = useState([]);
    const [form] = Form.useForm();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [loadingThumbnail, setLoadingThumbnail] = useState(false);
    const [loadingSlider, setLoadingSlider] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const [dataThumbnail, setDataThumbnail] = useState([]);
    const [dataSlider, setDataSlider] = useState([]);
    const [isSubmit, setIsSubmit] = useState(false);
    const showModal = () => {
        setIsAddModalOpen(true);
    };
    const handleOk = () => {
        form.submit();
    };
    const handleCancel = () => {
        setIsAddModalOpen(false);
        form.resetFields();
    };
    const onFinish = async (values) => {
        console.log(values);

        if (dataThumbnail.length === 0) {
            notification.error({
                message: 'Đã có lỗi xảy ra',
                description: 'Không được để trống thumbnail',
                duration: 5
            })
            return;
        }
        if (dataSlider.length === 0) {
            notification.error({
                message: 'Đã có lỗi xảy ra',
                description: 'Không được để trống slider',
                duration: 5
            })
            return;
        }
        const { mainText, author, price, sold, quantity, category } = values;
        const thumbnail = dataThumbnail[0].name;
        const slider = dataSlider.map(item => item.name);
        setIsSubmit(true);
        let res = await postCreateBook(thumbnail, slider, mainText, author, price, sold, quantity, category);
        if (res && res.data) {
            message.success('Thêm mới sách thành công');
            handleCancel();
            await props.fetchBookWithPaginate();
        } else {
            notification.error({
                message: 'Đã có lỗi xảy ra',
                description: res.message,
                duration: 5
            })
        }
        setIsSubmit(false);

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

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getPreviewBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    const handleUploadFileThumbnail = async ({ file, onSuccess, onError }) => {
        let res = await callUploadBookImg(file);
        if (res && res.data) {
            setDataThumbnail([{
                name: res.data.fileUploaded,
                uid: file.uid
            }])
            onSuccess('ok')
        } else {
            onError('Đã có lỗi xảy ra')
        }
    };

    const handleUploadFileSlider = async ({ file, onSuccess, onError }) => {
        let res = await callUploadBookImg(file);
        if (res && res.data) {
            setDataSlider((dataSlider) => [...dataSlider, {
                name: res.data.fileUploaded,
                uid: file.uid
            }])
            onSuccess('ok')
        } else {
            onError('Đã có lỗi xảy ra')
        }
    };

    const handleRemoveFile = (file, type) => {
        if (type === 'thumbnail') {
            setDataThumbnail([]);
        }
        if (type === 'slider') {
            const newSlider = dataSlider.filter(x => x.uid !== file.uid);
            setDataSlider(newSlider)
        }
    }


    useEffect(() => {
        fetchBookCategory();
    }, [])
    return (
        <>
            <Modal title="Thêm mới book" open={isAddModalOpen} onOk={handleOk} onCancel={handleCancel} width={'35vw'} confirmLoading={isSubmit} okText={'Thêm mới'} cancelText={'Hủy'} >
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
                                name="mainText"
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
                                    customRequest={handleUploadFileThumbnail}
                                    beforeUpload={beforeUpload}
                                    onPreview={handlePreview}
                                    onChange={handleChange}
                                    onRemove={(file) => handleRemoveFile(file, 'thumbnail')}
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
                                    customRequest={handleUploadFileSlider}
                                    beforeUpload={beforeUpload}
                                    onPreview={handlePreview}
                                    onChange={(info) => handleChange(info, 'slider')}
                                    onRemove={(file) => handleRemoveFile(file, 'slider')}
                                >
                                    <div>
                                        {loadingSlider ? <LoadingOutlined /> : <PlusOutlined />}
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </div>
                                </Upload>
                            </Form.Item>
                            {previewImage && (
                                <Image
                                    wrapperStyle={{
                                        display: 'none',
                                    }}
                                    preview={{
                                        visible: previewOpen,
                                        onVisibleChange: (visible) => setPreviewOpen(visible),
                                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                                    }}
                                    src={previewImage}
                                />
                            )}
                        </Col>
                    </Row>

                </Form>

            </Modal>
        </>
    )
}

export default ModalAddNewBook
