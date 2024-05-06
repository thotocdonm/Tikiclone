import "react-image-gallery/styles/scss/image-gallery.scss";
import ImageGallery from "react-image-gallery";
import "./ViewDetail.scss"
import { Rate } from "antd";
import { useState } from "react";
import Modal from "antd/es/modal/Modal";
import ModalGallery from "./ModalGallery";
import { useRef } from "react";
import { MinusOutlined, PlusOutlined, ShoppingCartOutlined } from "@ant-design/icons";
const images = [
    {
        original: "https://picsum.photos/id/1018/1000/600/",
        thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
        original: "https://picsum.photos/id/1015/1000/600/",
        thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
        original: "https://picsum.photos/id/1019/1000/600/",
        thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
    {
        original: "https://picsum.photos/id/1018/1000/600/",
        thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
        original: "https://picsum.photos/id/1015/1000/600/",
        thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
        original: "https://picsum.photos/id/1019/1000/600/",
        thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
    {
        original: "https://picsum.photos/id/1018/1000/600/",
        thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
        original: "https://picsum.photos/id/1015/1000/600/",
        thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
        original: "https://picsum.photos/id/1019/1000/600/",
        thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
];

const ViewDetail = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const refGallery = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleOnClickImage = () => {
        //get current index onClick
        // alert(refGallery?.current?.getCurrentIndex());
        setIsModalOpen(true);
        setCurrentIndex(refGallery?.current?.getCurrentIndex() ?? 0)
        // refGallery?.current?.fullScreen()
    }
    return (
        <div className="body-container">
            <div className="image-gallery">
                <ImageGallery
                    ref={refGallery}
                    items={images}
                    onClick={handleOnClickImage}
                    infinite={true}
                    additionalClass="images"
                    showBullets={true}
                    showFullscreenButton={false}
                    showNav={false}
                    showPlayButton={false}
                    slideOnThumbnailOver={true}
                />
            </div>
            <div className="content">
                <div>
                    <div className="author">
                        Tác giả: <a href="#" style={{ color: '#05a', textDecoration: 'none' }}>Jo Hemmings</a>
                    </div>
                    <div className="mainText">
                        How Psychology Works - Hiểu hết về tâm lý học
                    </div>
                    <div className="rating">
                        <Rate value={5} disabled style={{ color: '#ffce3d', fontSize: 20, marginRight: '15px' }} />
                        <div className="rating-content" style={{ borderLeft: "1px solid rgba(0,0,0,.14)" }}>
                            <div className="text1">
                                1k
                            </div>
                            <div className="text2">
                                Đã bán
                            </div>
                        </div>
                    </div>
                    <div className="price">
                        <div className="price-text">
                            {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(1000000)}
                        </div>

                    </div>
                    <div className="ship">
                        <div className="ship-text">Vận chuyển</div>
                        <div className="ship-content">Miễn phí vận chuyển</div>
                    </div>
                    <div className="quantity">
                        <div className="quantity-text">Số lượng</div>
                        <div className="quantity-input">
                            <button className="quantity-btn1"><MinusOutlined /></button>
                            <input type="text" value='1' className="quantity-btn1 quantity-btn2"></input>
                            <button className="quantity-btn1"><PlusOutlined /></button>
                        </div>
                    </div>
                    <div className="buy-group">
                        <button type="button" className="btn add-btn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                            <span> <ShoppingCartOutlined style={{ fontSize: '17px', marginRight: '5px' }} />Thêm vào giỏ hàng</span>
                        </button>
                        <button type="button" className="btn buy-btn"> Mua ngay</button>
                    </div>
                </div>
            </div>
            <ModalGallery
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                handleCancel={handleCancel}
                handleOk={handleOk}
                images={images}
                showModal={showModal}
                currentIndex={currentIndex}
                title={'Hardcode'}
            />
        </div>

    )
}

export default ViewDetail
