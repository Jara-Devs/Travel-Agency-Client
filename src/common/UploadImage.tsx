import { Button, Upload, message } from "antd";
import { upload } from "../api/image";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import { FC, useEffect, useState } from "react";
import { Image } from "../types/api";
import { UploadOutlined } from "@ant-design/icons";

const UploadImage: FC<{
  image?: Image;
  setImage: (image?: Image) => void;
}> = ({ image, setImage }) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (image) {
      setFileList([
        {
          uid: image.id.toString(),
          name: image.name,
          status: "done",
          url: image.url,
        } as UploadFile,
      ]);
    } else setFileList([]);
  }, [image]);

  const uploadProps = {
    action: upload(),
    accept: "image/*",
    fileList,
    onChange(info: UploadChangeParam) {
      try {
        if (info.file.status === "uploading") {
          setFileList([info.file]);
        }
        if (info.file.status === "removed") {
          setImage(undefined);
        }
        if (info.file.status === "done") {
          message.success(`${info.file.name} file uploaded successfully`);
          setImage(info.file.response.value);
        }
        if (info.file.status === "error") {
          message.error(`${info.file.response.message}`);
        }
      } catch {
        message.error("Connection error");
      }
    },
  };

  return (
    <Upload listType="picture" {...uploadProps}>
      <Button icon={<UploadOutlined />}>Upload Image</Button>
    </Upload>
  );
};

export default UploadImage;
