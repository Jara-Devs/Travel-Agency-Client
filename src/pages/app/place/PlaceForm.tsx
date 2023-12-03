import { FC, useEffect, useState } from "react";
import { City, TouristPlaceFormType } from "../../../types/services";
import { Form, Input, Modal, Select, Typography, message } from "antd";
import Title from "antd/es/typography/Title";
import UploadImage from "../../../common/UploadImage";
import { ApiResponse, Image } from "../../../types/api";
import { city } from "../../../api/services";

export interface PlaceFormData {
  name: string;
  description: string;
  address: string;
  cityId: string;
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
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    if (open) form.resetFields();
    if (values) {
      form.setFieldsValue({ ...values });
      setImage(values.image);
    } else setImage(undefined);
  }, [open, form, values]);

  const [image, setImage] = useState<Image>();

  const load = async () => {
    const responsePlace = await city().get({ select: ["id", "name",'country'] });

    if (responsePlace.ok) {
      setCities(responsePlace.value!);
    } else {
      let msg = "";

      const aux = (response: ApiResponse<any>) => {
        if (!responsePlace.ok) {
          if (msg.length === 0) msg = response.message;
          else msg = `${message}, ${response.message}`;
        }
      };

      aux(responsePlace);

      message.error(msg);
    }
  };

  useEffect(() => {
    load();
  }, []);

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
        onFinish={(values: PlaceFormData) => {
          if (image)
            onOk({
              name: values.name,
              description: values.description,
              address: values.address,
              cityId: values.cityId,
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
          <Input.TextArea placeholder="Introduce the description" />
        </Form.Item>
        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: true, message: "Introduce the address" }]}
        >
          <Input placeholder="Introduce the address" />
        </Form.Item>

        <Form.Item
          name="cityId"
          label="City"
          rules={[{ required: true, message: "Select the city" }]}
        >
          <Select
            allowClear
            showSearch
            filterOption={(input, option) =>
              (option?.label
                ?.toString()
                ?.toLowerCase()
                ?.indexOf(input.toLowerCase()) ?? -1) >= 0
            }
            options={cities.map((x) => ({
              value: x.id,
              label: `${x.name}, ${x.country}`,
              key: x.id,
            }))}
            placeholder="Select the city"
          />
        </Form.Item>

        <UploadImage setImage={setImage} image={image} />
      </Form>
    </Modal>
  );
};

export default PlaceForm;
