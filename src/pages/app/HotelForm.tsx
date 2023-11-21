import { FC, useEffect, useState } from "react";
import {
  HotelCategory,
  HotelFormType,
  TouristPlace,
} from "../../types/services";
import { Form, Input, Modal, Typography, message, Select } from "antd";
import Title from "antd/es/typography/Title";
import { touristPlace } from "../../api/services";
import { ApiResponse } from "../../types/api";
import { Image } from "../../types/api";
import UploadImage from "../../common/UploadImage";
import { getCategory } from "../../common/functions";

export interface HotelFormData {
  name: string;
  category: number;
  touristPlaceId: number;
  image: Image;
}

export interface HotelFormProps {
  onOk: (form: HotelFormType) => void;
  onCancel: () => void;
  values?: HotelFormData;
  open: boolean;
}

const HotelForm: FC<HotelFormProps> = ({ onOk, onCancel, values, open }) => {
  const [place, setPlace] = useState<TouristPlace[]>([]);

  const [form] = Form.useForm<HotelFormData>();

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

  const load = async () => {
    const responsePlace = await touristPlace().get({ select: ["id", "name"] });

    if (responsePlace.ok) {
      setPlace(responsePlace.value!);
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
          <Title level={3}>Create Hotel</Title>
        </Typography>
      }
      onOk={form.submit}
      onCancel={onCancel}
    >
      <Form
        layout="vertical"
        style={{ marginTop: "20px" }}
        form={form}
        onFinish={(values: HotelFormData) => {
          if (image)
            onOk({
              name: values.name,
              category: values.category,
              touristPlaceId: values.touristPlaceId,
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
          name="category"
          label="Category"
          rules={[{ required: true, message: "Select the category" }]}
        >
          <Select
            allowClear
            options={[
              HotelCategory.OneStar,
              HotelCategory.TwoStars,
              HotelCategory.ThreeStars,
              HotelCategory.FourStars,
              HotelCategory.FiveStars,
            ].map((x) => ({
              value: x,
              label: getCategory(x),
              key: x,
            }))}
            placeholder="Select the category"
          />
        </Form.Item>

        <Form.Item
          name="touristPlaceId"
          label="Place"
          rules={[{ required: true, message: "Select the place" }]}
        >
          <Select
            allowClear
            filterOption={(input, option) => option?.label === input}
            options={place.map((x) => ({
              value: x.id,
              label: x.name,
              key: x.id,
            }))}
            placeholder="Select the place"
          />
        </Form.Item>
        <UploadImage setImage={setImage} image={image} />
      </Form>
    </Modal>
  );
};

export default HotelForm;
