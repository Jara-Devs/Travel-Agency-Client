import { FC, useEffect } from "react";
import { UserSystemFormType } from "../../types/auth";
import { Form, Input, Modal, Typography } from "antd";
import Title from "antd/es/typography/Title";

export interface UserSystemFormData {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface UserSystemFormProps {
  onOk: (form: UserSystemFormType) => void;
  onCancel: () => void;
  values?: UserSystemFormData;
  create: boolean;
  open: boolean;
}

const UserForm: FC<UserSystemFormProps> = ({
  onCancel,
  values,
  open,
  create,
  onOk,
}) => {
  const [form] = Form.useForm<UserSystemFormData>();

  useEffect(() => {
    if (open) form.resetFields();
    if (values) form.setFieldsValue({ ...values });
  }, [open, form, values]);

  return (
    <Modal
      open={open}
      title={
        <Typography>
          <Title level={3}>Create User</Title>
        </Typography>
      }
      onOk={form.submit}
      onCancel={onCancel}
    >
      <Form
        layout="vertical"
        style={{ marginTop: "20px" }}
        form={form}
        onFinish={(values: UserSystemFormData) => {
          onOk({
            name: values.name,
            email: values.email,
            password: values.password,
            role: values.role,
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
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: "Introduce the email ",
              type: "email",
            },
          ]}
        >
          <Input placeholder="Introduce the email" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            { required: true, message: "Introduce the password" },
            {
              validator(_, value: string) {
                if (value.length <= 5)
                  return Promise.reject(
                    new Error(
                      "The length of the password no more than 6 characters"
                    )
                  );
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input placeholder="Introduce the password" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserForm;
