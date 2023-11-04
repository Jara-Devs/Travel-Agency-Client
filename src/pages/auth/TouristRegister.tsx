import {
  MailOutlined,
  UserOutlined,
  EnvironmentOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { Form, Input, Button, Typography, Row, Col, Image } from "antd";
import logo from "../../assets/logo.jpg";

interface TouristRegisterForm {
  email: string;
  name: string;
  country: string;
  password: string;
  confirm: string;
}

const TouristRegister = () => {
  const onFinish = (values: TouristRegisterForm) => {
    console.log(values);
  };

  return (
    <div className="auth-box">
      <Row style={{ width: "100%" }}>
        <Col span={4}>
          <Image className="m-1" width={"60px"} height={"60px"} src={logo} />
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
              message: "Please introduce your email",
              type: "email",
            },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Introduce your email" />
        </Form.Item>
        <Form.Item
          name="name"
          rules={[
            { required: true, message: "Please introduce your user name" },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Introduce your user name"
          />
        </Form.Item>
        <Form.Item
          name="country"
          rules={[{ required: true, message: "Please introduce your country" }]}
        >
          <Input
            prefix={<EnvironmentOutlined />}
            placeholder="Introduce your country"
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

export default TouristRegister;
