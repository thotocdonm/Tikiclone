import { Col, Row, Skeleton } from "antd"
import SkeletonImage from "antd/es/skeleton/Image"
import SkeletonInput from "antd/es/skeleton/Input"


const BookLoader = () => {
    return (
        <>
            <div style={{ backgroundColor: 'white', margin: '0 20px', borderRadius: '10px', marginTop: '20px' }}>


                <Row gutter={[20, 20]} >
                    <Col md={10} xs={0} sm={0} style={{ marginTop: '15px', marginLeft: '15px' }}>
                        <SkeletonInput
                            style={{ width: '100%', height: '350px' }}
                            active
                            block
                        />
                        <div style={{ margin: '15px 0', display: 'flex', gap: '20px', justifyContent: 'center' }}>
                            <SkeletonImage />
                            <SkeletonImage />
                            <SkeletonImage />
                        </div>
                    </Col>
                    <Col md={13} sm={24}>
                        <Skeleton active />
                        <Skeleton active />
                        <div style={{ display: 'flex', gap: '30px' }}>
                            <SkeletonInput
                                style={{ width: '100%', height: '50px' }}
                                active
                            />
                            <SkeletonInput
                                style={{ width: '100%', height: '50px' }}
                                active
                            />
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default BookLoader
