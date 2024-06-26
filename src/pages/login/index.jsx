import { Button, Checkbox, Divider, Form, Input, Typography, message, notification } from 'antd';
import "./login.scss"
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { callLogin } from '../../services/api';
import useMessage from 'antd/es/message/useMessage';
import { useDispatch } from 'react-redux';
import { doLoginAction } from '../../redux/account/accountSlice';

const Login = () => {

    const [isSubmit, setIsSubmit] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const onFinish = async (values) => {
        const { username, password } = values;
        setIsSubmit(true);
        const res = await callLogin(username, password, 3000);
        setIsSubmit(false);
        if (res?.data?.access_token) {
            localStorage.setItem('access_token', res.data.access_token)
            dispatch(doLoginAction(res.data.user));
            message.success('Đăng nhập thành công');
            navigate('/')
        }
        else {
            notification.error({
                message: 'Đã có lỗi xảy ra',
                description: res?.message,
                duration: 5
            })
        }

        console.log('check res', res)
    };


    return (
        <div className='login-page' >
            <Form
                className='login-form'
                name="basic"
                labelCol={{
                    span: 6,
                }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Typography.Title style={{ textAlign: "center" }}>Đăng nhập</Typography.Title>
                <Divider />

                <Form.Item
                    label="Email"
                    name="username"
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
                // wrapperCol={{
                //     offset: 6,
                //     span: 16,
                // }}
                >
                    <Button type="primary" htmlType="submit" loading={isSubmit}>
                        Đăng nhập
                    </Button>
                </Form.Item>
                <Divider>Or</Divider>
                <Form.Item>
                    <h3>Chưa có tài khoản ? <span><Link to="/register"> Đăng ký</Link></span></h3>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Login
