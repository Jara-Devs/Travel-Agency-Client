import { FC, useEffect} from "react";
import {UserAgencyFormType} from "../../types/auth";
import { Form, Input, Modal, Typography} from "antd";
import Title from "antd/es/typography/Title";

export interface UserAgencyFormData {
    name: string;
    email: string;
    password: string;
    role: string;
    agencyId: number;
}

export interface UserAgencyFormProps {
    onOk: (form: UserAgencyFormType) => void;
    onCancel: () => void;
    values?: UserAgencyFormData;
    create: boolean;
    open: boolean;
}

const UserAgencyForm: FC<UserAgencyFormProps> = ({
    onCancel,
    values,
    open,
    create,
    onOk,
  }) => {

    const [form] = Form.useForm<UserAgencyFormData>();
    
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
        onFinish={(values: UserAgencyFormData) => {
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
          rules={[{ required: true, 
          message: "Introduce the email ", 
          type: "email"
          }]}
        >
          <Input placeholder="Introduce the email" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Introduce the password" },
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
          },]}
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
      </Form>
    </Modal>
    )
}

export default UserAgencyForm;