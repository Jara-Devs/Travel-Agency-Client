import { FC, useEffect, useState } from "react";
import { TouristPlace, FlightFormType } from "../../../types/services";
import {
  Form,
  Input,
  Modal,
  Typography,
  message,
  Select,
  Row,
  Col,
  InputNumber,
} from "antd";
import Title from "antd/es/typography/Title";
import { touristPlace } from "../../../api/services";
import { ApiResponse } from "../../../types/api";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

export interface FlightFormData {
  company: string;
  duration: number;
  originId: number;
  destinationId: number;
}

export interface FlightFormProps {
  onOk: (form: FlightFormType) => void;
  onCancel: () => void;
  values?: FlightFormData;
  open: boolean;
}

const FlightForm: FC<FlightFormProps> = ({ onOk, onCancel, values, open }) => {
  const [place, setPlace] = useState<TouristPlace[]>([]);

  const [form] = Form.useForm<FlightFormData>();

  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);

  useEffect(() => {
    if (open) form.resetFields();
    if (values) {
      form.setFieldsValue({ ...values });
      const duration = dayjs.duration(values.duration);
      setHours(duration.hours());
      setMinutes(duration.minutes());
    } else {
      setHours(0);
      setMinutes(0);
    }
  }, [open, form, values]);

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
        onFinish={(values: FlightFormData) => {
          const duration = dayjs.duration({ hours: hours, minutes: minutes });
          onOk({
            company: values.company,
            originId: values.originId,
            destinationId: values.destinationId,
            duration: duration.asMilliseconds(),
          });
        }}
      >
        <Form.Item
          name="company"
          label="Company"
          rules={[{ required: true, message: "Introduce the company" }]}
        >
          <Input placeholder="Introduce the company" />
        </Form.Item>

        <Form.Item
          name="duration"
          label="Duration"
          rules={[{ required: true, message: "Introduce the duration" }]}
        >
          <Row gutter={8}>
            <Col>
              <InputNumber
                value={hours}
                min={0}
                max={23}
                placeholder="Hours"
                onChange={(v) => setHours(v ?? 0)}
              />
            </Col>
            <Col>
              <InputNumber
                value={minutes}
                min={0}
                max={59}
                placeholder="Minutes"
                onChange={(v) => setMinutes(v ?? 0)}
              />
            </Col>
          </Row>
        </Form.Item>

        <Form.Item
          name="originId"
          label="Origin"
          rules={[{ required: true, message: "Select the origin" }]}
        >
          <Select
            allowClear
            filterOption={(input, option) => option?.label === input}
            options={place.map((x) => ({
              value: x.id,
              label: x.name,
              key: x.id,
            }))}
            placeholder="Select the origin"
          />
        </Form.Item>

        <Form.Item
          name="destinationId"
          label="Destination"
          rules={[{ required: true, message: "Select the destination" }]}
        >
          <Select
            allowClear
            filterOption={(input, option) => option?.label === input}
            options={place.map((x) => ({
              value: x.id,
              label: x.name,
              key: x.id,
            }))}
            placeholder="Select the destination"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FlightForm;
