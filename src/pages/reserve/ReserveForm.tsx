import {
  Form,
  Input,
  Button,
  Modal,
  Space,
  Typography,
  Alert,
  Tooltip,
  InputNumber,
} from "antd";
import { Package } from "../../types/packages";
import { FC } from "react";
import { DeleteOutlined, UserOutlined, PlusOutlined } from "@ant-design/icons";
import { ReserveOnlineForm, UserIdentity } from "../../types/reserves";
import Title from "antd/es/typography/Title";

export interface ReserveData {
  userIdentities: UserIdentity[];
  creditCard: number;
}

export interface ReserveFormProps {
  packageOffer: Package;
  onOk: (values: ReserveOnlineForm) => void;
  onCancel: () => void;
  open: boolean;
  isOnline: boolean;
}

const ReserveForm: FC<ReserveFormProps> = ({
  onOk,
  packageOffer,
  open,
  isOnline,
  onCancel,
}) => {
  const [form] = Form.useForm<ReserveData>();

  const info =
    "Please enter the data of the people for whom you want to make a reservation, the data of the person who is making the reservation must be placed in the first field";

  return (
    <Modal
      open={open}
      onOk={form.submit}
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
          onOk({
            userIdentities: values.userIdentities,
            userIdentity: values.userIdentities[0],
            packageId: packageOffer.id,
            creditCard: values.creditCard,
          });
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
                  {key === 0 ? (
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
                  <DeleteOutlined
                    style={{ fontSize: "16px" }}
                    onClick={() => remove(name)}
                  />
                </Space>
              ))}
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
            <InputNumber />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export default ReserveForm;
