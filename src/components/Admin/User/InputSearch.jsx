import { Button, Input, Typography, Form, Checkbox } from "antd"
const { Title } = Typography
import './InputSearch.scss'
import { useState } from "react"
const InputSearch = (props) => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();

    const handleSubmit = () => {
        let query = '';
        if (name) {
            query += `fullName=/${name}/i`;
        }
        if (email) {
            query += `email=/${email}/i`;
        }
        if (phone) {
            query += `phone=/${phone}/i`;
        }
        if (query) {
            props.handleSearch(query);
        }
    }
    const handleClear = () => {
        setName('');
        setEmail('');
        setPhone('');
    }

    return (
        <div className="container">
            <div className='search-container'>
                <div className="search-input">
                    <Title level={5}>Name</Title>
                    <Input value={name} onChange={(e) => setName(e.target.value)}></Input>
                </div>
                <div className="search-input">
                    <Title level={5}>Email</Title>
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} ></Input>
                </div>
                <div className="search-input">
                    <Title level={5}>Số điện thoại</Title>
                    <Input value={phone} onChange={(e) => setPhone(e.target.value)} ></Input>
                </div>

            </div>
            <div className="button-container">
                <Button type="primary" onClick={() => handleSubmit()}>Search</Button>
                <Button onClick={() => handleClear()}>Clear</Button>
            </div>
        </div>
    )
}

export default InputSearch
