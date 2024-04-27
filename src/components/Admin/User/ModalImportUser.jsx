import React, { useState } from 'react';
import { Button, Modal, Table, notification } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import * as XLSX from 'xlsx/xlsx.mjs';
import { postCreateListUser } from '../../../services/api';
import TemplateFile from './Template/Template.xlsx?url'

const ModalImportUser = (props) => {
    const { isImportModalOpen, setIsImportModalOpen } = props;
    const [data, setData] = useState([]);
    const [fileList, setFileList] = useState([]);
    const showModal = () => {
        setIsImportModalOpen(true);
    };
    const handleOk = async () => {
        let handleData = data.map((x) => {
            x.password = '123456'
            return x
        })
        console.log(handleData);
        let res = await postCreateListUser(handleData);
        if (res && res.data) {
            notification.success({
                description: `Success: ${res.data.countSuccess}, Error: ${res.data.countError}`,
                message: 'Upload thành công',
                duration: 5
            })
            setIsImportModalOpen(false);
            await props.fetchUserWithPaginate();
        }
        else {
            notification.error({
                message: 'Đã có lỗi xảy ra',
                description: res?.message,
                duration: 5
            })
        }
        console.log(res);
    };
    const handleCancel = () => {
        setIsImportModalOpen(false);
        setData([]);
        setFileList([]);
    };

    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 1000);
    };

    const { Dragger } = Upload;
    const propsUpload = {
        name: 'file',
        multiple: false,
        maxCount: 1,
        fileList: fileList,
        accept: ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
        // action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
        customRequest: dummyRequest,
        beforeUpload: false,
        onChange(info) {
            setFileList(info.fileList)
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
                if (info.fileList && info.fileList.length > 0) {
                    const file = info.fileList[0].originFileObj;
                    const reader = new FileReader();
                    reader.readAsArrayBuffer(file);
                    reader.onload = function (e) {
                        let data = new Uint8Array(e.target.result);
                        let workbook = XLSX.read(data, { type: 'array' });
                        // find the name of your sheet in the workbook first
                        const sheet = workbook.Sheets[workbook.SheetNames[0]];
                        const json = XLSX.utils.sheet_to_json(sheet, {
                            header: ['fullName', 'email', 'phone'],
                            range: 1
                        });
                        if (json && json.length > 0) {
                            setData(json)
                        }

                    };
                }

            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    const columns = [
        {
            title: 'Tên hiển thị',
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
        },
    ];

    const renderTitle = () => {
        return (
            <>Dữ liệu Upload: </>
        )
    }
    return (
        <>
            <Modal
                title="Import data user"
                open={isImportModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={700}
                okButtonProps={{
                    disabled: data.length < 1
                }}
            >
                <Dragger {...propsUpload}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Support for a single upload. Only accept .csv, .xls, .xlsx. Or &nbsp;
                        <a href={TemplateFile} download id="download" onClick={(e) => e.stopPropagation()}>Download Sample File</a>
                    </p>
                </Dragger>

                <Table
                    columns={columns}
                    dataSource={data}
                    title={renderTitle}
                    style={{ paddingTop: '10px' }}
                />
            </Modal>

        </>
    );
}

export default ModalImportUser
