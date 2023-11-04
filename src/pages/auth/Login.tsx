import { Form, Input, Button, Typography, Row, Col, Image } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import logo from "../../assets/logo.jpg";

interface LoginForm {
  user: string;
  password: string;
}

const Login = () => {
  const onFinish = (values: LoginForm) => {
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
          name="user"
          rules={[
            {
              required: true,
              message: "Please introduce your email or user",
              type: "email",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Introduce your email or user"
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
        <Form.Item>
          <div className="center-content">
            <Button htmlType="submit" type="primary" className="auth-btn">
              Login
            </Button>
          </div>
        </Form.Item>
      </Form>

      <div className="center-content">
        <Typography.Paragraph>
          <Typography.Text>Do not have account? </Typography.Text>
          <Typography.Link href="/auth/register/tourist">
            Create Tourist Account.
          </Typography.Link>
          <div className="center-content">
            <Typography.Link href="/auth/register/agency">
              Create Agency Account.
            </Typography.Link>
          </div>
        </Typography.Paragraph>
      </div>
    </div>
  );
};

export default Login;
