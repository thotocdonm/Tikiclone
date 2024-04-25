import { Descriptions } from "antd"
import DescriptionsItem from "antd/es/descriptions/Item";
import moment from "moment";

const DetailUser = (props) => {
    const { detailData } = props;
    console.log(detailData);

    return (
        <>
            <Descriptions title="User Info" bordered column={2} >
                <DescriptionsItem label="id" span={1}>{detailData._id}</DescriptionsItem>
                <DescriptionsItem label="Tên hiển thị" span={1}>{detailData.fullName}</DescriptionsItem>
                <DescriptionsItem label="email" span={1}>{detailData.email}</DescriptionsItem>
                <DescriptionsItem label="Số điện thoại" span={1}>{detailData.phone}</DescriptionsItem>
                <DescriptionsItem label="Role" span={2}>{detailData.role}</DescriptionsItem>
                <DescriptionsItem label="Created At" span={1}>{moment(detailData.createdAt).format("DD-MM-YYYY hh:mm:ss")}</DescriptionsItem>
                <DescriptionsItem label="Updated At" span={1}>{moment(detailData.updatedAt).format("DD-MM-YYYY hh:mm:ss")}</DescriptionsItem>
            </Descriptions>
        </>
    )
}

export default DetailUser
