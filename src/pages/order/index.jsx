import { Col, Divider, InputNumber, Row } from 'antd'
import './order.scss'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteOutlined } from '@ant-design/icons';
import { doDeleteBookAction, onChangeQuantityAction } from '../../redux/order/orderSlice';

const OrderPage = () => {
    const orderContent = useSelector(state => state.order.cart);
    const dispatch = useDispatch();
    let totalPrice = 0;
    const onChange = (payload) => {
        console.log('changed', payload);
        dispatch(onChangeQuantityAction(payload));
    };

    const handleDeleteItemInCart = (id) => {
        dispatch(doDeleteBookAction(id));
    }
    return (
        <div className="order-container" >
            <Row gutter={[20, 20]}>
                <Col md={18} sm={24} xs={24}>
                    {orderContent && orderContent.length > 0 && orderContent.map((item) => {
                        totalPrice += item.detail.price * item.quantity;
                        return (
                            <div
                                className='order-left'
                            >
                                <img src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${item.detail.thumbnail}`} width={'100px'} height={'100px'} />
                                <div className='mainText' >
                                    {item.detail.mainText}
                                </div>
                                <div className='book-price' >
                                    {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.detail.price)}
                                </div>
                                <div className='book-quantity'>
                                    <InputNumber defaultValue={item.quantity} onChange={(value) => onChange({ _id: item._id, quantity: value })} />
                                </div>
                                <div className='book-totalPrice'>
                                    Tổng : {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.detail.price * item.quantity)}
                                </div>
                                <div>
                                    <DeleteOutlined
                                        style={{ fontSize: '20px', paddingRight: '10px', justifySelf: 'flex-end', color: 'red', cursor: 'pointer' }}
                                        onClick={() => handleDeleteItemInCart({ _id: item._id })}

                                    />
                                </div>
                            </div>
                        )
                    })}

                </Col>
                <Col md={6} sm={24} xs={24}>
                    <div className='order-right' >
                        <div className='price'>
                            <div>
                                Tạm tính :
                            </div>
                            <div>
                                {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice)}
                            </div>

                        </div>
                        <Divider />
                        <div className='price'>
                            <div>
                                Tổng tiền :
                            </div>
                            <div className='price-text'>
                                {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice)}
                            </div>

                        </div>
                        <Divider />
                        <button type="button" className="btn buyBtn"> {`Mua hàng (${orderContent.length})`}</button>

                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default OrderPage
