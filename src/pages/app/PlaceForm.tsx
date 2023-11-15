import { FC, useEffect } from "react";
import { TouristPlaceFormType } from "../../types/sevice";
import { Form, Input, Modal, Typography } from "antd";
import Title from "antd/es/typography/Title";

export interface PlaceFormData {
  name: string;
  description: string;
  address: string;
  city: string;
  country: string;
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
    if (values) form.setFieldsValue({ ...values });
  }, [open, form, values]);

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
          onOk({
            Name: values.name,
            Description: values.description,
            Address: {
              Description: values.address,
              Country: values.country,
              City: values.city,
            },
          });
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
      </Form>
    </Modal>
  );
};

export default PlaceForm;
