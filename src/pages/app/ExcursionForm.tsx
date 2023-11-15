import { FC, useEffect, useState } from "react";
import {
  ExcursionFormType,
  OverNighExcursionFormType,
} from "../../types/sevice";
import { Form, Input, Modal, Select, Typography } from "antd";
import Title from "antd/es/typography/Title";

export interface ExcursionFormData {
  name: string;
  places: number[];
  activities: number[];
  idHotel?: number;
}
export interface ExcursionFormProps {
  onOk0: (form: ExcursionFormType) => void;
  onOk1: (form: OverNighExcursionFormType) => void;
  onCancel: () => void;
  values?: ExcursionFormData;
  open: boolean;
}

const ExcursionForm: FC<ExcursionFormProps> = ({ onCancel, values, open }) => {
  const [form] = Form.useForm<ExcursionFormData>();

  const [isOverNight, setIsOverNight] = useState<boolean>(false);

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
        onFinish={(values: ExcursionFormData) => {
          //   onOk({
          //     Name: values.name,
          //     Description: values.description,
          //     Address: {
          //       Description: values.address,
          //       Country: values.country,
          //       City: values.city,
          //     },
          //   });
        }}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Introduce the name" }]}
        >
          <Input placeholder="Introduce the name" />
        </Form.Item>
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
              options={[
                { value: 1, label: "a" },
                { value: 2, label: "b" },
              ]}
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
            options={[
              { value: 1, label: "a" },
              { value: 2, label: "b" },
            ]}
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
            options={[
              { value: 1, label: "a" },
              { value: 2, label: "b" },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ExcursionForm;
