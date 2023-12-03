import {
  Form,
  Input,
  Button,
  Modal,
  Space,
  Typography,
  Alert,
  Tooltip,
  message,
  Row,
  Col,
  Checkbox,
} from "antd";
import { FC, useEffect, useState } from "react";
import { DeleteOutlined, UserOutlined, PlusOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import { UserIdentityForm } from "../../types/auth";

export interface ReserveData {
  userIdentities: UserIdentityForm[];
  creditCard: string;
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
  const [currentUserInReserve, setCurrentUserInReserve] =
    useState<boolean>(isOnline);

  useEffect(() => {
    if (open) {
      form.resetFields();
      setCurrentUserInReserve(isOnline);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const info = isOnline
    ? "Please choose if you will be part of the reserve"
    : "Please enter the data of the people for whom you want to make a reservation, the data of the person who is making the reservation must be placed in the first field";

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
          if (isOnline && currentUserInReserve)
            values.userIdentities = [userIdentity!].concat(
              values.userIdentities ?? []
            );

          console.log(values.userIdentities);
          if (
            values.userIdentities != null &&
            values.userIdentities.length !== 0
          )
            onOk(values);
          else message.error("Select at least one person");
        }}
      >
        <Alert message={info} type="info" style={{ marginBottom: "30px" }} />
        <Form.List name="userIdentities">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                  align="baseline"
                >
                  {key === 0 && !isOnline ? (
                    <Tooltip title="Data of the person who is making the reservation">
                      <UserOutlined
                        style={{ color: "green", fontSize: "16px" }}
                      />
                    </Tooltip>
                  ) : (
                    <UserOutlined style={{ fontSize: "16px" }} />
                  )}

                  <Form.Item
                    {...restField}
                    name={[name, "name"]}
                    rules={[
                      {
                        required: true,
                        message: "Introduce the name",
                      },
                    ]}
                  >
                    <Input placeholder="Name" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "identityDocument"]}
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
                    {...restField}
                    name={[name, "nationality"]}
                    rules={[
                      {
                        required: true,
                        message: "Introduce the nationality",
                      },
                    ]}
                  >
                    <Input placeholder="Identity the nationality" />
                  </Form.Item>

                  <DeleteOutlined
                    style={{ fontSize: "16px" }}
                    onClick={() => remove(name)}
                  />
                </Space>
              ))}
              {(currentUserInReserve ? fields.length + 1 : fields.length) <
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
          <Row gutter={10} style={{ marginBottom: "20px" }}>
            <Col>
              <Checkbox
                checked={currentUserInReserve}
                onChange={(v) => {
                  setCurrentUserInReserve(v.target.checked);
                }}
              />
            </Col>
            <Col>You will be part of the reserve</Col>
          </Row>
        )}
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
