import {
  MailOutlined,
  UserOutlined,
  EnvironmentOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
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
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserProvider";
import { authService } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import FingerprintOutlinedIcon from "@mui/icons-material/FingerprintOutlined";
import MySpin from "../../layout/MySpin";

interface TouristRegisterData {
  email: string;
  name: string;
  password: string;
  confirm: string;
  identityDocument: string;
  nationality: string;
}

const TouristRegister = () => {
  const { login } = useContext(UserContext);
  const { registerTourist } = authService();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = (values: TouristRegisterData) => {
    setLoading(true);
    registerTourist({
      email: values.email,
      name: values.name,
      password: values.password,
      confirm: values.confirm,
      userIdentity: {
        name: values.name,
        nationality: values.nationality,
        identityDocument: values.identityDocument,
      },
    })
      .then((response) => {
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
          name="identityDocument"
          rules={[
            {
              required: true,
              message: "Please introduce your identity document",
            },
          ]}
        >
          <Input
            prefix={<FingerprintOutlinedIcon />}
            placeholder="Introduce your identity document"
          />
        </Form.Item>
        <Form.Item
          name="nationality"
          rules={[
            { required: true, message: "Please introduce your nationality" },
          ]}
        >
          <Input
            prefix={<EnvironmentOutlined />}
            placeholder="Introduce your nationality"
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
