import { LoginOutlined, LogoutOutlined } from "@ant-design/icons";
import { Col, Image, Row } from "antd";
import { FC } from "react";

export interface MyHeaderProps {
  user: string | null;
  home: boolean;
}

const MyHeader: FC<MyHeaderProps> = ({ user, home }) => {
  return (
    <Row justify="space-between">
      <Col>
        <Image width={"40px"} height={"40px"} src={"/assets/movie.png"} />
        <span className="layout-header-title">{home ? "Web" : "Home"}</span>
      </Col>

      <Col>
        {user ? (
          <span>
            {user} <LogoutOutlined />
          </span>
        ) : (
          <span>
            Login <LoginOutlined />
          </span>
        )}
      </Col>
    </Row>
  );
};

export default MyHeader;
