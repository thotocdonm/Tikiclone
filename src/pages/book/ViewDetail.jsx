import "react-image-gallery/styles/scss/image-gallery.scss";
import ImageGallery from "react-image-gallery";
import "./ViewDetail.scss"
import { Rate, message } from "antd";
import { useEffect, useState } from "react";
import Modal from "antd/es/modal/Modal";
import ModalGallery from "./ModalGallery";
import { useRef } from "react";
import { MinusOutlined, PlusOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { doAddBookAction } from "../../redux/order/orderSlice";
import { useNavigate } from "react-router-dom";
const ViewDetail = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const refGallery = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const { dataBook } = props;
    const [imageArr, setImageArr] = useState([]);
    const [currentQuantity, setCurrentQuantity] = useState(1);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleChangeButton = (type) => {
        if (type === 'MINUS') {
            if (currentQuantity - 1 <= 0) {
                return
            }
            setCurrentQuantity(currentQuantity - 1);
        }
        if (type === 'PLUS') {
            if (currentQuantity === +dataBook.quantity) {
                return
            }
            setCurrentQuantity(currentQuantity + 1);
        }
    }

    const handleChangeInput = (value) => {
        if (!isNaN(value)) {
            if (+value > 0 && +value < +dataBook.quantity) {
                setCurrentQuantity(+value);
            }
        }
    }
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleAddToCart = (quantity, book) => {
        dispatch(doAddBookAction({ quantity, detail: book, _id: book._id }))
    }

    const handleOnClickImage = () => {
        //get current index onClick
        // alert(refGallery?.current?.getCurrentIndex());
        setIsModalOpen(true);
        setCurrentIndex(refGallery?.current?.getCurrentIndex() ?? 0)
        // refGallery?.current?.fullScreen()
    }
    useEffect(() => {
        let thumbArr = [];
        let sliderArr = [];
        if (dataBook.thumbnail) {
            thumbArr.push({
                original: `${import.meta.env.VITE_BACKEND_URL}/images/book/${dataBook.thumbnail}`,
                thumbnail: `${import.meta.env.VITE_BACKEND_URL}/images/book/${dataBook.thumbnail}`
            })
        }
        if (dataBook.slider && dataBook.slider.length > 0) {
            dataBook.slider.map((item) => {
                sliderArr.push({
                    original: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
                    thumbnail: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`
                })
            })
        }
        setImageArr([...thumbArr, ...sliderArr]);
    }, [dataBook])
    return (
        <div className="body-container">
            <div className="image-gallery">
                <ImageGallery
                    ref={refGallery}
                    items={imageArr}
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
                        Tác giả: <a href="#" style={{ color: '#05a', textDecoration: 'none' }}>{dataBook?.author}</a>
                    </div>
                    <div className="mainText">
                        {dataBook?.mainText}
                    </div>
                    <div className="rating">
                        <Rate value={5} disabled style={{ color: '#ffce3d', fontSize: 20, marginRight: '15px' }} />
                        <div className="rating-content" style={{ borderLeft: "1px solid rgba(0,0,0,.14)" }}>
                            <div className="text1">
                                {dataBook?.sold}
                            </div>
                            <div className="text2">
                                Đã bán
                            </div>
                        </div>
                    </div>
                    <div className="price">
                        <div className="price-text">
                            {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(dataBook?.price)}
                        </div>

                    </div>
                    <div className="ship">
                        <div className="ship-text">Vận chuyển</div>
                        <div className="ship-content">Miễn phí vận chuyển</div>
                    </div>
                    <div className="quantity">
                        <div className="quantity-text">Số lượng</div>
                        <div className="quantity-input">
                            <button className="quantity-btn1" onClick={() => handleChangeButton('MINUS')}><MinusOutlined /></button>
                            <input value={currentQuantity} onChange={(event) => handleChangeInput(event.target.value)} className="quantity-btn1 quantity-btn2"></input>
                            <button className="quantity-btn1" onClick={() => handleChangeButton('PLUS')}><PlusOutlined /></button>
                        </div>
                    </div>
                    <div className="buy-group">
                        <button onClick={() => handleAddToCart(currentQuantity, dataBook)} type="button" className="btn add-btn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span> <ShoppingCartOutlined style={{ fontSize: '17px', marginRight: '5px' }} />Thêm vào giỏ hàng</span>
                        </button>
                        <button type="button" className="btn buy-btn"
                            onClick={() => {
                                handleAddToCart(currentQuantity, dataBook)
                                navigate('/order')
                            }

                            }> Mua ngay</button>
                    </div>
                </div>
            </div>
            <ModalGallery
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                handleCancel={handleCancel}
                handleOk={handleOk}
                images={imageArr}
                showModal={showModal}
                currentIndex={currentIndex}
                title={'Hardcode'}
            />
        </div>

    )
}

export default ViewDetail
