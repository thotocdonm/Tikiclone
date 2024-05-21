import Search from "antd/es/transfer/search";
import { FaReact } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import './header.scss'
import { useEffect, useState } from "react";
import { Avatar, Badge, Button, Col, Divider, Drawer, Dropdown, Form, Input, Modal, Popover, Row, Space, Tabs, Upload, message, notification } from "antd";
import { DownOutlined, UploadOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { callLogout, postChangePassword, postUploadAvatar, putUpdateInfo } from "../../services/api";
import { doLogoutAction, doUpdateUserAction, doUploadAvatarAction } from "../../redux/account/accountSlice";
import '../../styles/global.scss'
import { useForm } from "antd/es/form/Form";
const Header = (props) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { searchTerm, setSearchTerm } = props;
    let items = [
        {
            label: <label style={{ cursor: 'pointer' }} onClick={() => setIsUpdateUserModalOpen(true)}>Quản lý tài khoản</label>,
            key: 'account',
        },
        {
            label: <label style={{ cursor: 'pointer' }} onClick={() => navigate('/history')}>Lịch sử mua hàng</label>,
            key: 'history',
        },
        {
            label: <label style={{ cursor: 'pointer' }} onClick={() => handleLogout()}>Đăng xuất</label>,
            key: 'logout',
        },
    ];

    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const user = useSelector(state => state.account.user);
    const [email, setEmail] = useState(user.email);
    const [fullName, setFullName] = useState(user.fullName);
    const [phone, setPhone] = useState(user.phone);
    const [_id, setId] = useState(user.id);
    const [isUpdateUserModalOpen, setIsUpdateUserModalOpen] = useState(false);
    const [form1] = Form.useForm();
    const [form2] = Form.useForm();
    const isAuthenticated = useSelector(state => state.account.isAuthenticated)
    const cartQuantity = useSelector(state => state.order.cart.length);
    const contentCart = useSelector(state => state.order.cart);
    const [userAvatar, setUserAvatar] = useState(user?.avatar ?? "");
    const srcAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${userAvatar}`;
    const contentPopover = (
        <div>
            {contentCart && contentCart.length > 0 && contentCart.map((item) => {
                return (
                    <div className="items-container">
                        <img src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${item.detail.thumbnail}`} width={'60px'} height={'60px'} className="items" />
                        <div className="items">
                            {item.detail.mainText}
                        </div>
                        <div className="items price">
                            {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.detail.price)}
                        </div>
                    </div>
                )
            })}
            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '10px' }}>
                <button type="button" className="btn checkCartBtn" onClick={() => navigate('/order')}>Xem giỏ hàng</button>
            </div>
        </div>
    );

    if (user?.role === 'ADMIN') {
        items.unshift({
            label: <label style={{ cursor: 'pointer' }} onClick={() => navigate('/admin')}>Trang quản trị</label>,
            key: 'admin',
        })
    }

    const handleLogout = async () => {
        let res = await callLogout();
        if (res && res?.data) {
            dispatch(doLogoutAction());
            message.success('Đăng xuất thành công');
            navigate('/login')
        }
    }

    const handleOk = () => {
        setIsUpdateUserModalOpen(false);
    };
    const handleCancel = () => {
        setIsUpdateUserModalOpen(false);
    };

    const onChangeUploadAvatar = (info) => {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
            info.file.status = 'done';
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    }

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

    const handleUploadAvatar = async ({ file, onSuccess, onError }) => {
        const res = await postUploadAvatar(file);
        if (res && res.data) {
            const newAvatar = res.data.fileUploaded;
            dispatch(doUploadAvatarAction({ avatar: newAvatar }));
            setUserAvatar(newAvatar);
            onSuccess('ok')
        } else {
            onError('Đã có lỗi xảy rá')
        }
    }
    const onFinishUpdateUser = async (values) => {
        const { fullName, phone } = values;

        const res = await putUpdateInfo(fullName, phone, userAvatar, _id);
        if (res && res.data) {
            dispatch(doUpdateUserAction({ avatar: userAvatar, fullName, phone }));
            message.success('Cập nhật thông tin user thành công');
            setIsUpdateUserModalOpen(false);
        } else {
            notification.error({
                message: 'Đã có lỗi xảy ra',
                description: res.message
            })
        }
    };

    const onFinishChangePassword = async (values) => {
        const { email, oldpass, newpass } = values;
        const res = await postChangePassword(email, oldpass, newpass);
        if (res && res.data) {
            message.success('Đổi mật khẩu thành công');
        } else {
            notification.error({
                description: res.message,
                message: 'Đã có lỗi xảy ra'
            })
        }
    }



    const modalItems = [
        {
            key: '1',
            label: 'Cập nhật thông tin',
            children:
                <>
                    <Row gutter={[20, 20]}>
                        <Col span={12}>
                            <Avatar
                                size={156}
                                icon={<UserOutlined />}
                                src={srcAvatar}
                                shape="circle"
                            />
                            <div style={{ paddingTop: '20px' }}>
                                <Upload
                                    name="file"
                                    onChange={onChangeUploadAvatar}
                                    beforeUpload={beforeUpload}
                                    maxCount={1}
                                    showUploadList={false}
                                    multiple={false}
                                    customRequest={handleUploadAvatar}

                                >
                                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                </Upload>
                            </div>
                        </Col>
                        <Col span={12}>
                            <Form
                                name="basic"
                                onFinish={onFinishUpdateUser}
                                form={form1}
                            >
                                <Form.Item
                                    label="Email"
                                    name="email"
                                    labelCol={{ span: 24 }}

                                >
                                    <Input disabled />
                                </Form.Item>

                                <Form.Item
                                    label="Tên hiển thị"
                                    name="fullName"
                                    labelCol={{ span: 24 }}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập tên hiển thị',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Số điện thoại"
                                    name="phone"
                                    labelCol={{ span: 24 }}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập số điện thoại',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    style={{ display: 'flex', justifyContent: 'left' }}
                                >
                                    <Button htmlType="submit">
                                        Cập nhật
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </>
        },
        {
            key: '2',
            label: 'Đổi mật khẩu',
            children:
                <>
                    <Form
                        name="basic"
                        onFinish={onFinishChangePassword}
                        form={form2}
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            labelCol={{ span: 24 }}
                        >
                            <Input disabled />
                        </Form.Item>

                        <Form.Item
                            label="Mật khẩu cũ"
                            name="oldpass"
                            labelCol={{ span: 24 }}
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập mật khẩu',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            label="Mật khẩu mới"
                            name="newpass"
                            labelCol={{ span: 24 }}
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập mật khẩu',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            style={{ display: 'flex', justifyContent: 'left' }}
                        >
                            <Button htmlType="submit">
                                Cập nhật
                            </Button>
                        </Form.Item>
                    </Form>
                </>
        },
    ];

    const onChangeTab = (key) => {
        console.log(key);
    };

    useEffect(() => {
        setEmail(user.email);
        setFullName(user.fullName);
        setPhone(user.phone);
        setUserAvatar(user.avatar);
        setId(user.id);
        form1.setFieldsValue({ email, fullName, phone });
        form2.setFieldsValue({ email });
    }, [user, email])


    return (
        <>
            <div className="header-container">
                <div className="title">
                    <div className="title-logo" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
                        <FaReact size={35} className="icon" />
                        React Project
                    </div>
                    <div className="title-toggle">
                        <AiOutlineMenu size={30} onClick={() => showDrawer()} />
                    </div>

                </div>

                <div className="search-box">
                    <Search value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Bạn tìm gì hôm nay" loading />
                </div>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Popover placement="bottomRight" title="Sản phẩm mới thêm" className="popover-carts" rootClassName="popover-carts" content={contentPopover} >
                        <Badge count={cartQuantity} size="small">
                            <LuShoppingCart size={30} style={{ color: '#1677ff' }} />
                        </Badge>
                    </Popover>


                </div>


                <Divider type="vertical" style={{ height: '35px' }} />

                {isAuthenticated === false ?
                    <span className="dropdown-menu" onClick={() => navigate('/login')} >Tài khoản</span>
                    :
                    <Dropdown
                        menu={{
                            items,
                        }}
                        trigger={['click']}
                        className="dropdown-menu"
                    >
                        <a onClick={(e) => e.preventDefault()}>
                            <Space size={10}>
                                <div className="header-right">
                                    <Avatar size={45} icon={<UserOutlined />} src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${user.avatar}`} />
                                    {user.fullName}
                                </div>
                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
                }


            </div>

            <Drawer
                title="Menu chức năng"
                placement={'left'}
                onClose={onClose}
                open={open}
            >
                <p onClick={() => navigate('/')}>Trang chủ</p>
                <p onClick={() => handleLogout()}>Đăng xuất</p>
            </Drawer>
            <Modal title="Quản lý tài khoản" width={'50vw'} footer={false} open={isUpdateUserModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Tabs defaultActiveKey="1" items={modalItems} onChange={onChangeTab} />

            </Modal>
        </>
    )
}

export default Header
