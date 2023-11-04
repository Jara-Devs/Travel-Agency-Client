import {
  MailOutlined,
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  HomeOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import { Form, Input, Button, Typography, Row, Col, Image } from "antd";
import logo from "../../assets/logo.jpg";

interface AgencyRegisterForm {
  email: string;
  name: string;
  password: string;
  confirm: string;
  Direction: string;
  fax: string;
}

const AgencyRegister = () => {
  const onFinish = (values: AgencyRegisterForm) => {
    console.log(values);
  };

  return (
    <div className="auth-box">
      <Row style={{ width: "100%" }}>
        <Col span={4}>
          <Image className="logo" width={"60px"} height={"60px"} src={logo} />
        </Col>
        <Col span={16}>
          <div className="center-content mt-5 mb-5">
            <Typography>
              <Typography.Title>Travel Agency</Typography.Title>
            </Typography>
          </div>
        </Col>
        <Col span={4}></Col>
      </Row>

      <Form className="m-5" onFinish={onFinish}>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please introduce the email",
              type: "email",
            },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Introduce the email" />
        </Form.Item>
        <Form.Item
          name="name"
          rules={[
            { required: true, message: "Please introduce the user name" },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Introduce the user name"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Please introduce your password" },
            {
              validator(_, value: string) {
                if (value.length < 5)
                  return Promise.reject(
                    new Error(
                      "The length of the password no more than 5 characters"
                    )
                  );
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Introduce your password"
          />
        </Form.Item>

        <Form.Item
          name="confirm"
          rules={[
            {
              required: true,
              message: "Please confirm your password",
            },
            ({ getFieldValue }) => ({
              validator(_, value: string) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match")
                );
              },
            }),
          ]}
        >
          <Input
            prefix={<EyeInvisibleOutlined />}
            type="password"
            placeholder="Confirm your password"
          />
        </Form.Item>
        <Form.Item
          name="Direction"
          rules={[
            { required: true, message: "Please introduce the direction" },
          ]}
        >
          <Input
            prefix={<HomeOutlined />}
            placeholder="Introduce the direction"
          />
        </Form.Item>
        <Form.Item
          name="fax"
          rules={[{ required: true, message: "Please introduce the fax code" }]}
        >
          <Input
            prefix={<InboxOutlined />}
            placeholder="Introduce the fax code"
          />
        </Form.Item>

        <Form.Item>
          <div className="center-content">
            <Button htmlType="submit" type="primary" className="auth-btn">
              Create Account
            </Button>
          </div>
        </Form.Item>
      </Form>

      <div className="center-content">
        <Typography.Paragraph>
          <Typography.Text>Already have an account? </Typography.Text>
          <Typography.Link href="/auth/login">Login.</Typography.Link>
        </Typography.Paragraph>
      </div>
    </div>
  );
};

export default AgencyRegister;
