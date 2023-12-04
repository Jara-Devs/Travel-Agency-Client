import {
  Form,
  Input,
  Button,
  Modal,
  Space,
  Typography,
  Checkbox,
  message,
} from "antd";
import { FC, useEffect, useState } from "react";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import { UserIdentityForm } from "../../types/auth";

export interface ReserveData {
  userIdentities: UserIdentityForm[];
  name: string;
  identityDocument: string;
  nationality: string;
  creditCard?: string;
}

export interface ReserveFormProps {
  availability: number;
  onOk: (values: ReserveData) => void;
  onCancel: () => void;
  open: boolean;
  isOnline: boolean;
  userIdentity?: UserIdentityForm;
}

const ReserveForm: FC<ReserveFormProps> = ({
  onOk,
  availability,
  open,
  isOnline,
  onCancel,
  userIdentity,
}) => {
  const [form] = Form.useForm<ReserveData>();

  const [includeReserver, setIncludeReserver] = useState(true);

  useEffect(() => {
    const values = form.getFieldsValue();

    if (includeReserver && values.userIdentities) {
      if (values.userIdentities.length + 1 > availability) {
        form.setFieldsValue({
          ...values,
          userIdentities: values.userIdentities.filter(
            (_, idx) => idx !== values.userIdentities.length - 1
          ),
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [includeReserver]);

  useEffect(() => {
    if (open) {
      form.setFieldsValue({
        name: userIdentity?.name,
        identityDocument: userIdentity?.identityDocument,
        nationality: userIdentity?.nationality,
        userIdentities: [],
      });
      setIncludeReserver(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <Modal
      open={open}
      onOk={form.submit}
      width={600}
      onCancel={onCancel}
      title={
        <Typography>
          <Title level={3}>Reserve</Title>
        </Typography>
      }
    >
      <Form
        name="dynamic_form"
        autoComplete="off"
        form={form}
        layout="vertical"
        style={{ marginTop: "20px" }}
        onFinish={(values: ReserveData) => {
          let userIdentities = values.userIdentities ?? [];

          console.log(includeReserver);
          if (includeReserver) {
            userIdentities = userIdentities.concat([
              {
                name: values.name,
                identityDocument: values.identityDocument,
                nationality: values.nationality,
              },
            ]);
          }
          if (userIdentities.length !== 0) {
            onOk({ ...values, userIdentities });
          } else message.error("Select at least one person");
        }}
      >
        <Form.Item label="Reserver">
          <Space style={{ display: "flex" }} align="baseline">
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Introduce the name" }]}
            >
              <Input placeholder="Introduce the name" disabled={isOnline} />
            </Form.Item>
            <Form.Item
              name="identityDocument"
              rules={[
                { required: true, message: "Introduce the identity document" },
              ]}
            >
              <Input placeholder="Identity document" disabled={isOnline} />
            </Form.Item>
            <Form.Item
              name="nationality"
              rules={[{ required: true, message: "Introduce the nationality" }]}
            >
              <Input placeholder="Nationality" disabled={isOnline} />
            </Form.Item>
          </Space>
          <Checkbox
            checked={includeReserver}
            onChange={(e) => setIncludeReserver(e.target.checked)}
          >
            {isOnline ? "Include yourself" : "Include reserver"}
          </Checkbox>
        </Form.Item>

        <Form.List name="userIdentities">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, idx) => (
                <Space key={idx} style={{ display: "flex" }} align="baseline">
                  <Form.Item
                    {...field}
                    name={[field.name, "name"]}
                    rules={[{ required: true, message: "Introduce the name" }]}
                  >
                    <Input placeholder="Introduce the name" />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    name={[field.name, "identityDocument"]}
                    rules={[
                      {
                        required: true,
                        message: "Introduce the identity document",
                      },
                    ]}
                  >
                    <Input placeholder="Identity document" />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    name={[field.name, "nationality"]}
                    rules={[
                      { required: true, message: "Introduce the nationality" },
                    ]}
                  >
                    <Input placeholder="Nationality" />
                  </Form.Item>
                  <Button type="dashed" onClick={() => remove(field.name)}>
                    <DeleteOutlined />
                  </Button>
                </Space>
              ))}
              {(includeReserver ? fields.length + 1 : fields.length) !==
                availability && (
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add
                  </Button>
                </Form.Item>
              )}
            </>
          )}
        </Form.List>

        {isOnline && (
          <Form.Item
            label="Credit Card"
            name="creditCard"
            rules={
              isOnline
                ? [{ required: true, message: "Introduce the credit card" }]
                : []
            }
          >
            <Input placeholder="Introduce the credit card" />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export default ReserveForm;
