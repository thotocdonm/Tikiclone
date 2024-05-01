import { Button, Input, Typography, Form, Checkbox } from "antd"
const { Title } = Typography
import './InputSearch.scss'
import { useState } from "react"
const InputSearchBook = (props) => {
    const [name, setName] = useState();
    const [author, setAuthor] = useState();
    const [category, setCategory] = useState();

    const handleSubmit = () => {
        let query = '';
        if (name) {
            query += `mainText=/${name}/i`;
        }
        if (author) {
            query += `author=/${email}/i`;
        }
        if (category) {
            query += `category=/${phone}/i`;
        }
        if (query) {
            props.handleSearch(query);
        }
    }
    const handleClear = () => {
        setName('');
        setAuthor('');
        setCategory('');
    }

    return (
        <div className="container">
            <div className='search-container'>
                <div className="search-input">
                    <Title level={5}>Tên sách</Title>
                    <Input value={name} onChange={(e) => setName(e.target.value)}></Input>
                </div>
                <div className="search-input">
                    <Title level={5}>Tác giả</Title>
                    <Input value={author} onChange={(e) => setAuthor(e.target.value)} ></Input>
                </div>
                <div className="search-input">
                    <Title level={5}>Thể loại       </Title>
                    <Input value={category} onChange={(e) => setCategory(e.target.value)} ></Input>
                </div>

            </div>
            <div className="button-container">
                <Button type="primary" onClick={() => handleSubmit()}>Search</Button>
                <Button onClick={() => handleClear()}>Clear</Button>
            </div>
        </div>
    )
}

export default InputSearchBook
