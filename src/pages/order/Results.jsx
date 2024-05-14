import { SmileOutlined } from "@ant-design/icons"
import { Button, Result, Steps, message } from "antd"
import './order.scss'
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const ResultsPage = (props) => {
    const { currentStep } = props;
    const navigate = useNavigate();
    return (
        <div className="order-container">
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
            <Result
                icon={<SmileOutlined />}
                title="Đơn hàng đã được đặt thành công !"
                extra={<Button type="primary" onClick={() => navigate('/history')}>Xem lịch sử</Button>}
            />
        </div>
    )
}

export default ResultsPage
