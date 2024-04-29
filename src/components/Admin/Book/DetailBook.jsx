import { PlusOutlined } from "@ant-design/icons";
import { Descriptions, Divider, Image, Upload } from "antd"
import DescriptionsItem from "antd/es/descriptions/Item";
import moment from "moment";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const DetailBook = (props) => {
    const { detailData } = props;
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([]);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };
    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
    useEffect(() => {
        let imgThumbnail = {}
        let imgSlider = []
        if (detailData.thumbnail) {
            imgThumbnail = {
                uid: uuidv4(),
                name: detailData.thumbnail,
                status: 'done',
                url: `${import.meta.env.VITE_BACKEND_URL}/images/book/${detailData.thumbnail}`
            }
        }
        if (detailData.slider && detailData.slider.length > 0) {
            detailData.slider.map(item => {
                imgSlider.push({
                    uid: uuidv4(),
                    name: item,
                    status: 'done',
                    url: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`
                })
            })
        }
        setFileList([imgThumbnail, ...imgSlider])
    }, [detailData])
    console.log(detailData);

    return (
        <>
            <Descriptions title="Book Info" bordered column={2} >
                <DescriptionsItem label="id" span={1}>{detailData._id}</DescriptionsItem>
                <DescriptionsItem label="Tên sách" span={1}>{detailData.mainText}</DescriptionsItem>
                <DescriptionsItem label="Tác giả" span={1}>{detailData.author}</DescriptionsItem>
                <DescriptionsItem label="Giá tiền" span={1}>{`${detailData.price} đ`}</DescriptionsItem>
                <DescriptionsItem label="Thể loại" span={2}>{detailData.category}</DescriptionsItem>
                <DescriptionsItem label="Created At" span={1}>{moment(detailData.createdAt).format("DD-MM-YYYY hh:mm:ss")}</DescriptionsItem>
                <DescriptionsItem label="Updated At" span={1}>{moment(detailData.updatedAt).format("DD-MM-YYYY hh:mm:ss")}</DescriptionsItem>


            </Descriptions>
            <Divider orientation="left">Ảnh Book</Divider>
            <Upload
                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                showUploadList={
                    { showRemoveIcon: false }
                }
            >
            </Upload>
            {previewImage && (
                <Image
                    wrapperStyle={{
                        display: 'none',
                    }}
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                    }}
                    src={previewImage}
                />
            )}
        </>
    )
}

export default DetailBook
