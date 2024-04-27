import React, { useEffect, useState } from 'react';
import { Button, Modal, Checkbox, Form, Input, Divider, message, notification } from 'antd';
import { putUpdateUser } from '../../../services/api';



const ModalUpdateUser = (props) => {
    const { isUpdateModalOpen, setIsUpdateModalOpen, dataUpdate, setDataUpdate } = props;
    const [form] = Form.useForm();
    const handleOk = () => {
        form.submit();
    };
    const handleCancel = () => {
        setIsUpdateModalOpen(false);
        setDataUpdate(null)
    };
    const onFinish = async (values) => {
        const { fullName, email, phone } = values;
        let res = await putUpdateUser(dataUpdate._id, fullName, phone);
        if (res && res.data) {
            message.success('Cập nhật thành công');
            setIsUpdateModalOpen(false);
            await props.fetchUserWithPaginate();
        }
        else {
            notification.error({
                message: 'Đã có lỗi xảy ra',
                description: res?.message
            })
        }
        console.log(res)

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        form.setFieldsValue(dataUpdate);
    }, [dataUpdate])
    return (
        <>
            <Modal title="Cập nhật người dùng" open={isUpdateModalOpen} onOk={handleOk} onCancel={handleCancel} okText={'Cập nhật'} cancelText={'Hủy'}>
                <Divider />
                <Form
                    name="basic"
                    form={form}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Tên hiển thị"
                        name="fullName"
                        labelCol={{
                            span: 24
                        }}
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tên',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        labelCol={{
                            span: 24
                        }}
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập email',
                            },
                        ]}
                    >
                        <Input disabled />
                    </Form.Item>

                    <Form.Item
                        label="Số điện thoại"
                        name="phone"
                        labelCol={{
                            span: 24
                        }}
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập số điện thoại',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default ModalUpdateUser
