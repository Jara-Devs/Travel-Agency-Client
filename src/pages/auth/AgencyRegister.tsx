import {
  MailOutlined,
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  HomeOutlined,
  InboxOutlined,
} from "@ant-design/icons";
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
import logo from "../../assets/logo.jpg";
import { AgencyRegisterForm, User } from "../../types/auth";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserProvider";
import { authService } from "../../api/auth";
import { ApiResponse } from "../../types/api";
import { useNavigate } from "react-router-dom";
import MySpin from "../../layout/MySpin";

const AgencyRegister = () => {
  const { login } = useContext(UserContext);
  const { registerAgency } = authService();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = (values: AgencyRegisterForm) => {
    setLoading(true);
    registerAgency(values)
      .then((response: ApiResponse<User>) => {
        if (response.ok) {
          login(response.value!);
          navigate("/");
        } else message.error(response.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="auth-box">
      <MySpin loading={loading} />
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
          rules={[{ required: true, message: "Please introduce the name" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Introduce the name" />
        </Form.Item>
        <Form.Item
          name="nameAgency"
          rules={[
            { required: true, message: "Please introduce the name of agency" },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Introduce the user name of agency"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Please introduce your password" },
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
