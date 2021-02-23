import { useState } from 'react';

import { Upload, message, Progress } from 'antd';
// import { Container } from './styles';

import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;
const fileProps = {
  name: 'file',
  accept: '.pdf',
  multiple: true,
  action: 'http://localhost:3333/import',
}

function UploadModal() {
  return (
    <Dragger {...fileProps}
      onChange={(info) => {
        const { status } = info.file;

        if (status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (status === 'done') {
          message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      }}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Click or drag file to this area to upload</p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
        band files
    </p>
    </Dragger>
  );
}

export default UploadModal;
