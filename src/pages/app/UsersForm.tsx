import { FC, useEffect, useState } from "react";
import {AgencyUserFormType} from "../../types/services";
import { Form, Input, Modal, Select, Typography, message } from "antd";
import Title from "antd/es/typography/Title";
import { buildMessage } from "../../common/functions";

export interface AgencyUserFormData {
    name: string;
    email: string;
    password: string;
    role: string;
    agencyId: number;
}

export interface AgencyUserFormProps {
    onOk: (form: AgencyUserFormType) => void;
    onCancel: () => void;
    values?: AgencyUserFormData;
    create: boolean;
    open: boolean;
}

const AgencyUserForm: FC<AgencyUserFormProps> = ({
    onCancel,
    values,
    open,
    create,
    onOk,
    }) => {

    const [form] = Form.useForm<AgencyUserFormData>();
    
    useEffect(() => {
        if (open) form.resetFields();
        if (values) form.setFieldsValue({ ...values });
    }, [open, form, values]);

    return(
     <Modal
      open={open}
      title={
        <Typography>
          <Title level={3}>Create Agency User</Title>
        </Typography>
      }
      onOk={form.submit}
      onCancel={onCancel}
    >
      <Form
        layout="vertical"
        style={{ marginTop: "20px" }}
        form={form}
        onFinish={(values: AgencyUserFormData) => {
            onOk({
                name: values.name,
                email: values.email,
                password: values.password,
                role: values.role,
                agencyId: values.agencyId
                },
            );
          }
        }
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Introduce the name" }]}
        >
          <Input placeholder="Introduce the name" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Introduce the email " }]}
        >
          <Input placeholder="Introduce the email" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Introduce the password" }]}
        >
          <Input placeholder="Introduce the password" />
        </Form.Item>

        <Form.Item
          name="role"
          label="Role"
          rules={[{ required: true, message: "Introduce the role" }]}
        >
          <Input placeholder="Introduce the role" />
        </Form.Item>

        <Form.Item
          name="agencyId"
          label="Agency"
          rules={[{ required: true, message: "Introduce the agency id" }]}
        >
          <Input placeholder="Introduce the agency id" />
        </Form.Item>
      </Form>
    </Modal>
    )
}

export default AgencyUserForm;

