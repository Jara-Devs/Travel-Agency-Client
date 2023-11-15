import { FC, useEffect, useState } from "react";
import {
  ExcursionFormType,
  Hotel,
  OverNighExcursionFormType,
  TouristActivity,
  TouristPlace,
} from "../../types/sevice";
import { Form, Input, Modal, Select, Typography, message } from "antd";
import Title from "antd/es/typography/Title";
import { hotel, touristActivity, touristPlace } from "../../api/services";
import { ApiResponse } from "../../types/api";

export interface ExcursionFormData {
  name: string;
  places: number[];
  activities: number[];
  hotelId?: number;
}
export interface ExcursionFormProps {
  onOk: (form: ExcursionFormType, isOverNight: boolean) => void;
  onCancel: () => void;
  values?: ExcursionFormData;
  create: boolean;
  open: boolean;
}

const ExcursionForm: FC<ExcursionFormProps> = ({
  onCancel,
  values,
  open,
  create,
  onOk,
}) => {
  const [form] = Form.useForm<ExcursionFormData>();

  const [isOverNight, setIsOverNight] = useState<boolean>(false);

  const [places, setPlaces] = useState<TouristPlace[]>([]);
  const [activities, setActivities] = useState<TouristActivity[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);

  const load = async () => {
    const responsePlaces = await touristPlace().get({ select: ["Id", "Name"] });
    const responseActivities = await touristActivity().get({
      select: ["Id", "Name"],
    });
    const responseHotels = await hotel().get({
      select: ["Id", "Name"],
    });

    if (responsePlaces.ok && responseActivities.ok && responseActivities.ok) {
      setPlaces(responsePlaces.value!);
      setActivities(responseActivities.value!);
      setHotels(responseHotels.value!);
    } else {
      let msg = "";

      const aux = (response: ApiResponse<any>) => {
        if (!responseActivities.ok) {
          if (msg.length === 0) msg = response.message;
          else msg = `${message}, ${response.message}`;
        }
      };

      aux(responseActivities);
      aux(responsePlaces);
      aux(responseHotels);

      message.error(msg);
    }
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (open) form.resetFields();
    if (values) form.setFieldsValue({ ...values });
    if (values?.hotelId) setIsOverNight(true);
    else setIsOverNight(false);
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
        onFinish={(values: ExcursionFormData) => {
          onOk(
            isOverNight
              ? ({
                  Name: values.name,
                  Places: values.places,
                  Activities: values.activities,
                  HotelId: values.hotelId!,
                } as OverNighExcursionFormType)
              : {
                  Name: values.name,
                  Places: values.places,
                  Activities: values.activities,
                },
            isOverNight
          );
        }}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Introduce the name" }]}
        >
          <Input placeholder="Introduce the name" />
        </Form.Item>
        {create && (
          <Form.Item label="Type">
            <Select
              defaultValue={false}
              value={isOverNight}
              options={[
                { value: false, label: "Excursion" },
                { value: true, label: "OverNight Excursion" },
              ]}
              onChange={(v) => setIsOverNight(v)}
            />
          </Form.Item>
        )}
        {isOverNight && (
          <Form.Item
            label="Hotel"
            name="hotelId"
            rules={[{ required: true, message: "Select the hotel" }]}
          >
            <Select
              showSearch
              allowClear
              filterOption={(input, option) => option?.label === input}
              options={hotels.map((x) => ({
                value: x.Id,
                label: x.Name,
                key: x.Id,
              }))}
              placeholder="Select the hotel"
            />
          </Form.Item>
        )}
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
              value: x.Id,
              label: x.Name,
              key: x.Id,
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
              value: x.Id,
              label: x.Name,
              key: x.Id,
            }))}
            placeholder="Select the activities"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ExcursionForm;
