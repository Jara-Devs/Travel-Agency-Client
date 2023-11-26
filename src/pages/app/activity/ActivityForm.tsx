import { FC, useEffect, useState } from "react";
import { TouristActivityFormType } from "../../../types/services";
import { Form, Input, Modal, Typography, message } from "antd";
import Title from "antd/es/typography/Title";
import { Image } from "../../../types/api";
import UploadImage from "../../../common/UploadImage";

export interface TouristActivityFormData {
  name: string;
  description: string;
  image: Image;
}

export interface TouristActivityFormProps {
  onOk: (form: TouristActivityFormType) => void;
  onCancel: () => void;
  values?: TouristActivityFormData;
  open: boolean;
}

const TouristActivityForm: FC<TouristActivityFormProps> = ({
  onOk,
  onCancel,
  values,
  open,
}) => {
  const [form] = Form.useForm<TouristActivityFormData>();

  useEffect(() => {
    if (open) form.resetFields();
    if (values) {
      form.setFieldsValue({ ...values });
      setImage(values.image);
    } else {
      setImage(undefined);
    }
  }, [open, form, values]);
  const [image, setImage] = useState<Image>();

  return (
    <Modal
      open={open}
      title={
        <Typography>
          <Title level={3}>Create Tourist Activity</Title>
        </Typography>
      }
      onOk={form.submit}
      onCancel={onCancel}
    >
      <Form
        layout="vertical"
        style={{ marginTop: "20px" }}
        form={form}
        onFinish={(values: TouristActivityFormData) => {
          if (image)
            onOk({
              name: values.name,
              description: values.description,
              imageId: image.id,
            });
          else {
            message.error("You must upload an image");
          }
        }}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Introduce the name" }]}
        >
          <Input placeholder="Introduce the name" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Select the description" }]}
        >
          <Input placeholder="Introduce the description" />
        </Form.Item>

        <UploadImage setImage={setImage} image={image} />
      </Form>
    </Modal>
  );
};

export default TouristActivityForm;
