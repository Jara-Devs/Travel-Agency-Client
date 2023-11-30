import { FC, useEffect } from "react";
import { FacilityFormType, FacilityType } from "../../../types/services";
import { Form, Input, Modal, Select, Typography } from "antd";
import Title from "antd/es/typography/Title";

export interface FacilityFormData {
  name: string;
  type: FacilityType;
}

export interface FacilityFormProps {
  onOk: (form: FacilityFormType) => void;
  onCancel: () => void;
  values?: FacilityFormData;
  open: boolean;
}

const FacilityForm: FC<FacilityFormProps> = ({
  onOk,
  onCancel,
  values,
  open,
}) => {
  const [form] = Form.useForm<FacilityFormData>();

  useEffect(() => {
    if (open) form.resetFields();
    if (values) {
      form.setFieldsValue({ ...values });
    }
  }, [open, form, values]);

  return (
    <Modal
      open={open}
      title={
        <Typography>
          <Title level={3}>Facility</Title>
        </Typography>
      }
      onOk={form.submit}
      onCancel={onCancel}
    >
      <Form
        layout="vertical"
        style={{ marginTop: "20px" }}
        form={form}
        onFinish={(values: FacilityFormData) => {
          onOk({
            name: values.name,
            type: values.type,
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
          name="type"
          label="Type"
          rules={[{ required: true, message: "Select the type" }]}
        >
          <Select
            placeholder="Select the name"
            options={[
              FacilityType.Hotel,
              FacilityType.Flight,
              FacilityType.Excursion,
            ].map((x) => ({ label: FacilityType[x], key: x, value: x }))}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FacilityForm;
