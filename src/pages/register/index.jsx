import { Button, Checkbox, Divider, Form, Input, Typography, message, notification } from 'antd';
import "./register.scss"
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { callRegister } from '../../services/api';
import useMessage from 'antd/es/message/useMessage';

const Register = () => {

    const [isSubmit, setIsSubmit] = useState(false);
    const navigate = useNavigate();


    const onFinish = async (values) => {
        const { fullName, email, password, phone } = values;
        setIsSubmit(true);
        let res = await callRegister(fullName, email, password, phone);
        setIsSubmit(false);
        if (res?.data?._id) {
            message.success('Tạo mới người dùng thành công !');
            navigate('/login')
        } else
            notification.error({
                message: "Đã có lỗi xảy ra",
                description: res.message ?? Array.isArray(res.message) ? res.message[0] : res.message,
                duration: 5
            })

        console.log('check res:', res);
    };


    return (
        <div className='register-page' >
            <Form
                className='register-form'
                name="basic"
                labelCol={{
                    span: 6,
                }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Typography.Title>Đăng ký tài khoản</Typography.Title>
                <Divider />
                <Form.Item
                    label="Full Name"
                    name="fullName"
                    labelCol={{ span: 24 }}
                    rules={[
                        {
                            required: true,
                            message: 'Không được để trống họ tên',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    labelCol={{ span: 24 }}
                    rules={[
                        {
                            required: true,
                            message: 'Không được để trống email',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    labelCol={{ span: 24 }}
                    rules={[
                        {
                            required: true,
                            message: 'Không được để trống password',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Phone"
                    name="phone"
                    labelCol={{ span: 24 }}
                    rules={[
                        {
                            required: true,
                            message: 'Không được để trống số điện thoại',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                // wrapperCol={{
                //     offset: 6,
                //     span: 16,
                // }}
                >
                    <Button type="primary" htmlType="submit" loading={isSubmit}>
                        Đăng ký
                    </Button>
                </Form.Item>
                <Divider>Or</Divider>
                <Form.Item>
                    <h3>Đã có tài khoản ? <span><Link to="/login"> Đăng nhập</Link></span></h3>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Register
