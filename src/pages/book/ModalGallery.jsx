import { Col, Image, Modal, Row } from "antd";
import "react-image-gallery/styles/scss/image-gallery.scss";
import ImageGallery from "react-image-gallery";
import { useRef } from "react";
import { useState } from "react";
import "./ViewDetail.scss"
const ModalGallery = (props) => {
    const { isModalOpen, handleCancel, handleOk, images, showModal, currentIndex, title } = props;
    const [activeIndex, setActiveIndex] = useState(0);
    const refGallery = useRef(null);
    return (



        <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={'60vw'} className="modal-gallery" footer={false}>
            <Row gutter={[20, 20]}>
                <Col md={16} xs={20}>
                    <div className="modal-image-gallery">
                        <ImageGallery
                            ref={refGallery}
                            items={images}
                            infinite={true}
                            additionalClass="images"
                            showBullets={false}
                            showFullscreenButton={false}
                            showNav={true}
                            showPlayButton={false}
                            disableThumbnailScroll={true}
                            showThumbnails={false}
                            startIndex={currentIndex}
                        />
                    </div>
                </Col>
                <Col md={8} xs={4}>
                    <div>
                        {title}
                    </div>
                    <div>
                        <Row gutter={[20, 20]}>
                            {images?.map((item, i) => {
                                return (
                                    <Col key={`image-${i}`}>
                                        <Image
                                            wrapperClassName={"img-normal"}
                                            width={100}
                                            height={100}
                                            src={item.original}
                                            preview={false}
                                            onClick={() => {
                                                refGallery.current.slideToIndex(i)
                                                setActiveIndex(i);
                                            }}
                                            style={{ cursor: 'pointer' }}
                                        />
                                        <div className={activeIndex === i ? "active" : ""}></div>
                                    </Col>
                                )
                            })}
                        </Row>
                    </div>

                </Col>
            </Row>


        </Modal>

    )
}

export default ModalGallery
