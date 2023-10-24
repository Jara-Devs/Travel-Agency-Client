import { Form, Input, Button, Typography, Row, Col, Image } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const Login = () => {
  return (
    <div className="auth-box">
      <Row style={{ width: "100%" }}>
        <Col span={4}>
          <Image
            className="m-1"
            width={"60px"}
            height={"60px"}
            src={"/assets/movie.png"}
          />
        </Col>
        <Col span={16}>
          <div className="center-content mt-5 mb-5">
            <Typography>
              <Typography.Title>Cine Plus</Typography.Title>
            </Typography>
          </div>
        </Col>
        <Col span={4}></Col>
      </Row>

      <Form className="m-5">
        <Form.Item
          name="user"
          rules={[
            { required: true, message: "Please introduce your email or user" },
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
          <Button htmlType="submit" type="primary" className="auth-btn">
            Login
          </Button>
        </Form.Item>
      </Form>

      <div className="center-content">
        <Typography.Paragraph>
          <Typography.Text>Do not have account? </Typography.Text>
          <Typography.Link href="/auth/register">Register.</Typography.Link>
        </Typography.Paragraph>
      </div>
    </div>
  );
};

export default Login;
