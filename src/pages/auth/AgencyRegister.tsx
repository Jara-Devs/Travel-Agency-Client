import {
    MailOutlined,
    UserOutlined,
    LockOutlined,
    EyeInvisibleOutlined,
    HomeOutlined,
    InboxOutlined,
  } from "@ant-design/icons";
  import { Form, Input, Button, Typography, Row, Col, Image, Select } from "antd";
  
  const AgencyRegister = () => {
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
              { required: true, message: "Please introduce the email" },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Introduce the email"
            />
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
              { required: true, message: "Please introduce the password" },
            ]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Introduce the password"
            />
          </Form.Item>
  
          <Form.Item name="confirm" rules={[{ validator: validatePassword }]}>
            <Input
              prefix={<EyeInvisibleOutlined />}
              type="password"
              placeholder="Confirm the password"
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
            rules={[
              { required: true, message: "Please introduce the fax code" },
            ]}
          >
            <Input
              prefix={<InboxOutlined />}
              placeholder="Introduce the fax code"
            />
          </Form.Item>

          <Form.Item>
            Tipo de Cuenta:
          <Select
            defaultValue="lucy"
            style={{ width: 120 }}
            options={[
                { value: 'jack', label: 'Admin' },
                { value: 'lucy', label: 'Manager' },
                { value: 'Yiminghe', label: 'Worker' },
            ]}
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
  