import { Avatar, Badge, Card, Col, Image, Modal, Row, Typography } from "antd";
import { FC } from "react";
import { City } from "../../../types/services";
import Title from "antd/es/typography/Title";

export interface ShowCityProps {
  open: boolean;
  onOk: () => void;
  city: City;
}

export interface ShowMiniCityProps {
  city: City;
  ribbon?: string;
}

export const ShowMiniCity: FC<ShowMiniCityProps> = ({ city, ribbon }) => (
  <Badge.Ribbon text={ribbon ?? "City"}>
    <Card hoverable>
      <Card.Meta
        className="show-card"
        avatar={<Avatar size={50} src={city.image.url} />}
        title={city.name}
        description={city.country}
      />
    </Card>
  </Badge.Ribbon>
);

const ShowCity: FC<ShowCityProps> = ({ open, onOk, city }) => {
  return (
    <Modal
      width={800}
      title={
        <Typography>
          <Title level={2}>{city.name}</Title>
        </Typography>
      }
      open={open}
      onOk={onOk}
      onCancel={onOk}
      cancelButtonProps={{ style: { display: "none" } }}
      okText="Cerrar"
    >
      <Row className="m-5">
        <Col span={24}>
          <Card className="center-content" hoverable>
            <Image
              src={city.image.url}
              className="show-image"
              preview={false}
            />
          </Card>
        </Col>
      </Row>
      <Row className="m-5">
        <Col span={24}>
          <Card hoverable>
            <Card.Meta title="Country" description={city.country} />
          </Card>
        </Col>
      </Row>
    </Modal>
  );
};

export default ShowCity;
