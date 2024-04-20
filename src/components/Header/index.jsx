import Search from "antd/es/transfer/search";
import { FaReact } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import './header.scss'
import { useState } from "react";
import { Badge, Divider, Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
const Header = () => {

    const navigate = useNavigate();
    const items = [
        {
            label: <label style={{ cursor: 'pointer' }}>Quản lý tài khoản</label>,
            key: 'account',
        },
        {
            label: <label style={{ cursor: 'pointer' }}>Đăng xuất</label>,
            key: 'logout',
        },
    ];

    const isAuthenticated = useSelector(state => state.account.isAuthenticated)
    const user = useSelector(state => state.account.user)

    return (
        <div className="header-container">
            <div className="title">
                <div className="title-logo">
                    <FaReact size={35} className="icon" />
                    React Project
                </div>
                <div className="title-toggle">
                    <AiOutlineMenu size={30} />
                </div>

            </div>

            <div className="search-box">
                <Search placeholder="Bạn tìm gì hôm nay" loading />
            </div>

            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Badge count={5} size="small">
                    <LuShoppingCart size={30} style={{ color: '#1677ff' }} />
                </Badge>

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
                            <span>Welcome {user.fullName}</span>
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown>
            }


        </div>
    )
}

export default Header
