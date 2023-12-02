import { FC, useEffect, useState } from "react";
import { CityFormType } from "../../../types/services";
import { Form, Input, Modal, Typography, message } from "antd";
import Title from "antd/es/typography/Title";
import UploadImage from "../../../common/UploadImage";
import { Image } from "../../../types/api";

export interface CityFormData {
  name: string;
  country: string;
  image: Image;
}
export interface CityFormProps {
  onOk: (form: CityFormType) => void;
  onCancel: () => void;
  values?: CityFormData;
  open: boolean;
}

const CityForm: FC<CityFormProps> = ({ onOk, onCancel, values, open }) => {
  const [form] = Form.useForm<CityFormData>();

  useEffect(() => {
    if (open) form.resetFields();
    if (values) {
      form.setFieldsValue({ ...values });
      setImage(values.image);
    } else setImage(undefined);
  }, [open, form, values]);

  const [image, setImage] = useState<Image>();

  return (
    <Modal
      open={open}
      title={
        <Typography>
          <Title level={3}>Place</Title>
        </Typography>
      }
      onOk={form.submit}
      onCancel={onCancel}
    >
      <Form
        layout="vertical"
        style={{ marginTop: "20px" }}
        form={form}
        onFinish={(values: CityFormData) => {
          if (image)
            onOk({
              name: values.name,
              country: values.country,
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

export default CityForm;
