import { Button, Checkbox, Divider, Form, Input, Modal, message, notification } from "antd";
import { useState } from "react";
import { postCreateUser } from "../../../services/api";


const ModalAddNewUser = (props) => {
    const { isAddModalOpen, setIsAddModalOpen } = props;
    const [form] = Form.useForm();
    const [isSubmit, setIsSubmit] = useState(false);
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
        setIsSubmit(true);
        console.log('Success:', values);
        const { fullName, password, email, phone } = values;
        const res = await postCreateUser(fullName, password, email, phone);
        setIsSubmit(false);
        if (res && res.data) {
            message.success('Tạo mới người dùng thành công');
            form.resetFields();
            setIsAddModalOpen(false);
            await props.fetchUserWithPaginate();

        }
        else {
            notification.error({
                message: 'Đã có lỗi xảy ra',
                description: res?.message,
                duration: 5
            })
        }
        console.log(res);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>
            <Modal title="Thêm mới người dùng" open={isAddModalOpen} onOk={handleOk} onCancel={handleCancel} okText={'Tạo mới'} cancelText={'Hủy'} confirmLoading={isSubmit}>

                <Divider />

                <Form
                    name="basic"
                    form={form}
                    style={{
                        maxWidth: 600,
                    }}
                    labelCol={{
                        span: 6,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Tên hiển thị"
                        name="fullName"
                        rules={[
                            {
                                required: true,
                                message: 'Không được để trống tên',
                            },
                        ]}
                        labelCol={{
                            span: 24
                        }}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Không được để trống mật khẩu',
                            },
                        ]}
                        labelCol={{
                            span: 24
                        }}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Không được để trống email',
                            },
                        ]}
                        labelCol={{
                            span: 24
                        }}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Số điện thoại"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: 'Không được để trống số điện thoại',
                            },
                        ]}
                        labelCol={{
                            span: 24
                        }}
                    >
                        <Input />
                    </Form.Item>

                </Form>
            </Modal>
        </>
    );
}

export default ModalAddNewUser
