import { FC, useEffect, useState } from "react";
import { TouristPlaceFormType } from "../../types/services";
import { Form, Input, Modal, Typography, message } from "antd";
import Title from "antd/es/typography/Title";
import UploadImage from "../../common/UploadImage";
import { Image } from "../../types/api";

export interface PlaceFormData {
  name: string;
  description: string;
  address: string;
  city: string;
  country: string;
  image: Image;
}
export interface PlaceFormProps {
  onOk: (form: TouristPlaceFormType) => void;
  onCancel: () => void;
  values?: PlaceFormData;
  open: boolean;
}

const PlaceForm: FC<PlaceFormProps> = ({ onOk, onCancel, values, open }) => {
  const [form] = Form.useForm<PlaceFormData>();

  useEffect(() => {
    if (open) form.resetFields();
    if (values) {
      form.setFieldsValue({ ...values });
      setImage(values.image);
    }
  }, [open, form, values]);

  const [image, setImage] = useState<Image>();

  return (
    <Modal
      open={open}
      title={
        <Typography>
          <Title level={3}>Create Place</Title>
        </Typography>
      }
      onOk={form.submit}
      onCancel={onCancel}
    >
      <Form
        layout="vertical"
        style={{ marginTop: "20px" }}
        form={form}
        onFinish={(values: PlaceFormData) => {
          if (image)
            onOk({
              name: values.name,
              description: values.description,
              address: {
                description: values.address,
                country: values.country,
                city: values.city,
              },
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
          rules={[{ required: true, message: "Introduce the description" }]}
        >
          <Input placeholder="Introduce the description" />
        </Form.Item>
        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: true, message: "Introduce the address" }]}
        >
          <Input placeholder="Introduce the address" />
        </Form.Item>
        <Form.Item
          name="city"
          label="City"
          rules={[{ required: true, message: "Introduce the city" }]}
        >
          <Input placeholder="Introduce the country" />
        </Form.Item>
        <Form.Item
          name="country"
          label="Country"
          rules={[{ required: true, message: "Introduce the country" }]}
        >
          <Input placeholder="Introduce the country" />
        </Form.Item>

        <UploadImage setImage={setImage} image={image} />
      </Form>
    </Modal>
  );
};

export default PlaceForm;
