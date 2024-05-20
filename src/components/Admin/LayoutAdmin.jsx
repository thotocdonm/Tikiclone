import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Button, Dropdown, Layout, Menu, Space, message, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { AppstoreOutlined, DollarCircleOutlined, DownOutlined, ExceptionOutlined, HeartTwoTone, MenuFoldOutlined, MenuUnfoldOutlined, TeamOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Content, Footer, Header } from "antd/es/layout/layout";
import React from "react";
import './Layout.scss'
import { callLogout } from "../../services/api";
import { doLogoutAction } from "../../redux/account/accountSlice";



const items = [
    {
        label: <Link to='/admin'>Dashboard</Link>,
        key: 'dashboard',
        icon: <AppstoreOutlined />
    },
    {
        label: <span>Manage Users</span>,
        key: 'user',
        icon: <UserOutlined />,
        children: [
            {
                label: <Link to='/admin/user'>CRUD</Link>,
                key: 'crud',
                icon: <TeamOutlined />,
            },
        ]
    },
    {
        label: <Link to='/admin/book'>Manage Books</Link>,
        key: 'book',
        icon: <ExceptionOutlined />
    },
    {
        label: <Link to='/admin/order'>Manage Orders</Link>,
        key: 'order',
        icon: <DollarCircleOutlined />
    },

];



const LayoutAdmin = () => {

    const isAdminRoute = window.location.pathname.startsWith('/admin');
    const user = useSelector(state => state.account.user);
    const userRole = user.role;
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [activeMenu, setActiveMenu] = useState('dashboard');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        let res = await callLogout();
        if (res && res?.data) {
            dispatch(doLogoutAction());
            message.success('Đăng xuất thành công');
            navigate('/')
        }
    }

    const itemsDropdown = [
        {
            label: <label style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>Trang chủ</label>,
            key: 'home',
        },
        {
            label: <label
                style={{ cursor: 'pointer' }}
                onClick={() => handleLogout()}
            >Đăng xuất</label>,
            key: 'logout',
        },

    ];

    useEffect(() => {
        if (window.location.pathname.includes('/book')) {
            setActiveMenu('book')
        }
        if (window.location.pathname.includes('/order')) {
            setActiveMenu('order')
        }
        if (window.location.pathname.includes('/user')) {
            setActiveMenu('user')
        }
    }, [])

    return (
        <div className='layout-app'>
            <Layout
                style={{ minHeight: '100vh' }}
                className="layout-admin"
            >
                <Sider
                    theme='light'
                    collapsible
                    collapsed={collapsed}
                    onCollapse={(value) => setCollapsed(value)}>
                    <div style={{ height: 32, margin: 16, textAlign: 'center' }}>
                        Admin
                    </div>
                    <Menu
                        selectedKeys={[activeMenu]}
                        mode="inline"
                        items={items}
                        onClick={(e) => setActiveMenu(e.key)}
                    />
                </Sider>
                <Layout>
                    <div className='admin-header'>
                        <span>
                            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                className: 'trigger',
                                onClick: () => setCollapsed(!collapsed),
                            })}
                        </span>
                        <Dropdown menu={{ items: itemsDropdown }} trigger={['click']}>
                            <a onClick={(e) => e.preventDefault()}>
                                <Space>
                                    <div className="header-right">
                                        <img src={`http://localhost:8080/images/avatar/${user.avatar}`} width={'30px'} height={'30px'}></img>
                                        {user.fullName}
                                    </div>
                                    <DownOutlined />
                                </Space>
                            </a>
                        </Dropdown>
                    </div>
                    <Content>
                        <Outlet />
                    </Content>
                    <Footer style={{ padding: 0, maxWidth: '1703px' }}>
                        React Test Fresher &copy; Hỏi Dân IT - Made with <HeartTwoTone />
                    </Footer>
                </Layout>
            </Layout>
        </div>
    )
}

export default LayoutAdmin
