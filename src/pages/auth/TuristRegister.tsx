import {
  MailOutlined,
  UserOutlined,
  EnvironmentOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { Form, Input, Button, Typography, Row, Col, Image } from "antd";

const TuristRegister = () => {
  const validatePassword = () => {
    
  };

  return (
    <div className="auth-box">
      <Row style={{ width: "100%" }}>
        <Col span={4}>
          <Image
            className="m-1"
            width={"60px"}
            height={"60px"}
            src={"/build/Logo 1.png"}
          />
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

      <Form className="m-5">
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Please introduce your email" },
          ]}
        >
          <Input
            prefix={<MailOutlined />}
            placeholder="Introduce your email"
          />
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
          rules={[
            { required: true, message: "Please introduce your country" },
          ]}
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
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Introduce your password"
          />
        </Form.Item>

        <Form.Item name="confirm" rules={[{ validator: validatePassword }]}>
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

export default TuristRegister;
