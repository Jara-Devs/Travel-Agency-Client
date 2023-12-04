import {
  Form,
  Input,
  Button,
  Typography,
  Row,
  Col,
  Image,
  message,
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import logo from "../../assets/logo.jpg";
import { LoginForm, User } from "../../types/auth";
import { UserContext } from "../../context/UserProvider";
import { useContext, useState } from "react";
import { authService } from "../../api/auth";
import { ApiResponse } from "../../types/api";
import { useNavigate } from "react-router-dom";
import MySpin from "../../layout/MySpin";

const Login = () => {
  const { login } = useContext(UserContext);
  const { login: loginApi } = authService();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = (values: LoginForm) => {
    setLoading(true);
    loginApi(values)
      .then((response: ApiResponse<User>) => {
        if (response.ok) {
          login(response.value!);

          navigate("/");
        } else message.error(response.message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="auth-box">
      <MySpin loading={loading} />
      <Row style={{ width: "100%" }}>
        <Col span={4}>
          <Image
            className="logo m-1"
            width={"60px"}
            height={"60px"}
            src={logo}
            preview={false}
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
          <Input prefix={<UserOutlined />} placeholder="Introduce your email" />
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
            <Button
              htmlType="submit"
              type="primary"
              className="auth-btn"
              disabled={loading}
            >
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
