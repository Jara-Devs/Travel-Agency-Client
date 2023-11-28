import { FC, useEffect, useState } from "react";
import {
  ExcursionFormType,
  Hotel,
  TouristActivity,
  TouristPlace,
} from "../../../types/services";
import { Form, Input, Modal, Select, Typography, message } from "antd";
import Title from "antd/es/typography/Title";
import { hotel, touristActivity, touristPlace } from "../../../api/services";
import { buildMessage } from "../../../common/functions";
import { Image } from "../../../types/api";
import UploadImage from "../../../common/UploadImage";

export interface ExcursionFormData {
  name: string;
  places: string[];
  activities: string[];
  hotels: string[];
  image: Image;
}
export interface ExcursionFormProps {
  onOk: (form: ExcursionFormType) => void;
  onCancel: () => void;
  values?: ExcursionFormData;
  open: boolean;
}

const ExcursionForm: FC<ExcursionFormProps> = ({
  onCancel,
  values,
  open,
  onOk,
}) => {
  const [form] = Form.useForm<ExcursionFormData>();

  const [places, setPlaces] = useState<TouristPlace[]>([]);
  const [activities, setActivities] = useState<TouristActivity[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);

  const [image, setImage] = useState<Image>();

  const load = async () => {
    const responsePlaces = await touristPlace().get({ select: ["id", "name"] });
    const responseActivities = await touristActivity().get({
      select: ["id", "name"],
    });
    const responseHotels = await hotel().get({
      select: ["id", "name"],
    });

    if (responsePlaces.ok && responseActivities.ok && responseActivities.ok) {
      setPlaces(responsePlaces.value!);
      setActivities(responseActivities.value!);
      setHotels(responseHotels.value!);
    } else {
      message.error(
        buildMessage([responseActivities, responseHotels, responsePlaces])
      );
    }
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (open) form.resetFields();
    if (values) {
      form.setFieldsValue({ ...values });
      setImage(values.image);
    } else setImage(undefined);
  }, [open, form, values]);

  return (
    <Modal
      open={open}
      title={
        <Typography>
          <Title level={3}>Excursion</Title>
        </Typography>
      }
      onOk={form.submit}
      onCancel={onCancel}
    >
      <Form
        layout="vertical"
        style={{ marginTop: "20px" }}
        form={form}
        onFinish={(values: ExcursionFormData) => {
          if (image) {
            onOk({
              name: values.name,
              places: values.places,
              activities: values.activities,
              hotels: values.hotels ?? [],
              imageId: image?.id,
            });
          } else message.error("You must upload an image");
        }}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Introduce the name" }]}
        >
          <Input placeholder="Introduce the name" />
        </Form.Item>

        <Form.Item label="Hotels" name="hotels">
          <Select
            mode="multiple"
            showSearch
            allowClear
            filterOption={(input, option) => option?.label === input}
            options={hotels.map((x) => ({
              value: x.id,
              label: x.name,
              key: x.id,
            }))}
            placeholder="Select the hotels"
          />
        </Form.Item>

        <Form.Item
          name="places"
          label="Places"
          rules={[{ required: true, message: "Select the places" }]}
        >
          <Select
            mode="multiple"
            allowClear
            filterOption={(input, option) => option?.label === input}
            options={places.map((x) => ({
              value: x.id,
              label: x.name,
              key: x.id,
            }))}
            placeholder="Select the places"
          />
        </Form.Item>

        <Form.Item
          name="activities"
          label="Activities"
          rules={[{ required: true, message: "Select the activities" }]}
        >
          <Select
            mode="multiple"
            allowClear
            filterOption={(input, option) => option?.label === input}
            options={activities.map((x) => ({
              value: x.id,
              label: x.name,
              key: x.id,
            }))}
            placeholder="Select the activities"
          />
        </Form.Item>
        <UploadImage image={image} setImage={setImage} />
      </Form>
    </Modal>
  );
};

export default ExcursionForm;
