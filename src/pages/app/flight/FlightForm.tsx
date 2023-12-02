import { FC, useEffect, useState } from "react";
import { FlightFormType, City } from "../../../types/services";
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
import { city } from "../../../api/services";
import { ApiResponse } from "../../../types/api";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

export interface FlightFormData {
  company: string;
  duration: number;
  originId: string;
  destinationId: string;
}

export interface FlightFormProps {
  onOk: (form: FlightFormType) => void;
  onCancel: () => void;
  values?: FlightFormData;
  open: boolean;
}

const FlightForm: FC<FlightFormProps> = ({ onOk, onCancel, values, open }) => {
  const [cities, setCities] = useState<City[]>([]);

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
    const responsePlace = await city().get({
      select: ["id", "name", "country"],
    });

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
          <Title level={3}>Flight</Title>
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

        <Form.Item name="duration" label="Duration">
          <Row gutter={8}>
            <Col>
              <InputNumber
                value={hours}
                min={0}
                max={23}
                placeholder="Hours"
                onChange={(v) => setHours(v ?? 0)}
              />{" "}
              Hours
            </Col>
            <Col>
              <InputNumber
                value={minutes}
                min={0}
                max={59}
                placeholder="Minutes"
                onChange={(v) => setMinutes(v ?? 0)}
              />{" "}
              Minutes
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
            placeholder="Select the destination"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FlightForm;
