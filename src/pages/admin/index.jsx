import { Card } from "antd"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { getDashBoard } from "../../services/api";
import CountUp from 'react-countup';


const AdminPage = () => {
    const [totalUser, setTotalUser] = useState(0);
    const [totalOrder, setTotalOrder] = useState(0);

    const fetchDashBoard = async () => {
        const res = await getDashBoard();
        if (res && res.data) {
            setTotalOrder(res.data.countOrder);
            setTotalUser(res.data.countUser);
        }
    }

    useEffect(() => {
        fetchDashBoard();
    }, [])
    return (
        <div style={{ display: 'flex', gap: '20px', padding: "15px 15px" }}>
            <Card
                title="Tổng User"
                bordered={false}
                style={{
                    width: '40vw',
                }}
            >
                <CountUp
                    end={totalUser}
                    duration={2}
                    style={{
                        fontSize: '25px',
                        fontWeight: '600'
                    }}
                />
            </Card>

            <Card
                title="Tổng đơn hàng"
                bordered={false}
                style={{
                    width: '40vw',
                }}
            >
                <CountUp
                    end={totalOrder}
                    duration={2}
                    style={{
                        fontSize: '25px',
                        fontWeight: '600'
                    }}
                />
            </Card>
        </div>
    )
}

export default AdminPage
