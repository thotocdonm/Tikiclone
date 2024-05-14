import { Col, Divider, Empty, Form, Input, InputNumber, Radio, Row, Steps, message } from 'antd'
import './order.scss'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteOutlined } from '@ant-design/icons';
import { doDeleteBookAction, doPlaceOrderAction, onChangeQuantityAction } from '../../redux/order/orderSlice';
import { useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
import ResultsPage from './Results';
import { postCreateOrder } from '../../services/api';

const OrderPage = () => {
    const orderContent = useSelector(state => state.order.cart);
    const userContent = useSelector(state => state.account.user);
    const userFullName = userContent.fullName;
    const userPhone = userContent.phone;
    const dispatch = useDispatch();
    let totalPrice = 0;
    const [currentStep, setCurrentStep] = useState(0);
    const onChange = (payload) => {
        console.log('changed', payload);
        dispatch(onChangeQuantityAction(payload));
    };

    const handleDeleteItemInCart = (id) => {
        dispatch(doDeleteBookAction(id));
    }

    const [form] = Form.useForm();

    const onChangeStep = (type) => {
        if (type === "next" && orderContent.length > 0) {
            setCurrentStep(currentStep + 1);
        } else {
            message.error("Không có sản phẩm trong giỏ hàng")
        }
    }

    const onFinish = async (values) => {

        let detailArray = [];

        orderContent.map((item) => {
            detailArray.push({
                bookName: item.detail.mainText,
                quantity: item.quantity,
                _id: item._id
            })
        })

        let data = {
            name: values.username,
            address: values.address,
            phone: values.phone,
            totalPrice: totalPrice,
            detail: detailArray
        }

        const res = await postCreateOrder(data);
        if (res && res.data) {
            onChangeStep("next")
            message.success('Đơn hàng đã được đặt')
            dispatch(doPlaceOrderAction());
        }
        else {
            message.error(res.message);
        }


    };

    const init = {
        username: userFullName,
        phone: userPhone,
        payment: true
    }

    return (
        <>
            {currentStep === 0 || currentStep === 1 ?
                <div className="order-container" >
                    <div>
                        <Steps
                            className='steps'
                            current={currentStep}
                            items={[
                                {
                                    title: 'Đơn hàng',
                                },
                                {
                                    title: 'Đặt hàng',
                                },
                                {
                                    title: 'Thanh toán',
                                },
                            ]}
                        />
                    </div>
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
                            {orderContent && orderContent.length === 0 &&
                                <div className='empty'>
                                    <Empty description="Không có sản phẩm trong giỏ hàng" />;
                                </div>
                            }

                        </Col>
                        <Col md={6} sm={24} xs={24}>
                            {currentStep === 0 &&
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
                                    <button type="button" onClick={() => onChangeStep("next")} className="btn buyBtn"> {`Mua hàng (${orderContent.length})`}</button>
                                </div>
                            }
                            {form.setFieldsValue(init)}
                            {currentStep === 1 &&

                                <div className='order-right'>
                                    <Form
                                        name='basic'
                                        labelCol={{
                                            span: 8,
                                        }}
                                        onFinish={onFinish}
                                        form={form}

                                    >
                                        <Form.Item
                                            label="Tên người nhận"
                                            name="username"
                                            labelCol={{ span: 24 }}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng nhập tên người nhận',
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
                                            label="Địa chỉ"
                                            name="address"
                                            labelCol={{ span: 24 }}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng nhập địa chỉ',
                                                },
                                            ]}
                                        >
                                            <TextArea rows={4} />
                                        </Form.Item>

                                        <Form.Item
                                            label="Hình thức thanh toán"
                                            name="payment"
                                            labelCol={{ span: 24 }}
                                            valuePropName="checked"
                                        >
                                            <Radio defaultChecked >Thanh toán khi nhận hàng</Radio>
                                        </Form.Item>
                                    </Form>
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
                                    <button type="button"
                                        onClick={() => {
                                            form.submit()

                                        }}
                                        className="btn buyBtn">
                                        {`Đặt hàng (${orderContent.length})`}
                                    </button>
                                </div>
                            }
                        </Col>
                    </Row>
                </div>
                :
                <ResultsPage
                    currentStep={currentStep}
                />
            }
        </>

    )
}

export default OrderPage
