import { Avatar, Badge, Card, Col, Image, Modal, Row, Typography } from "antd";
import { FC } from "react";
import { TouristPlace } from "../../../types/services";
import Title from "antd/es/typography/Title";

export interface ShowPlaceProps {
  open: boolean;
  onOk: () => void;
  place: TouristPlace;
}

export interface ShowMiniPlaceProps {
  place: TouristPlace;
  ribbon?: string;
}

export const ShowMiniPlace: FC<ShowMiniPlaceProps> = ({ place, ribbon }) => (
  <Badge.Ribbon text={ribbon ?? "Place"}>
    <Card hoverable>
      <Card.Meta
        className="show-card"
        avatar={<Avatar size={50} src={place.image.url} />}
        title={place.name}
        description={place.description}
      />
    </Card>
  </Badge.Ribbon>
);

const ShowPlace: FC<ShowPlaceProps> = ({ open, onOk, place }) => {
  return (
    <Modal
      width={800}
      title={
        <Typography>
          <Title level={2}>{place.name}</Title>
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
              src={place.image.url}
              className="show-image"
              preview={false}
            />
          </Card>
        </Col>
      </Row>
      <Row className="m-5">
        <Col span={24}>
          <Card hoverable>
            <Card.Meta title="Description" description={place.description} />
          </Card>
        </Col>
      </Row>
      <Row className="m-5">
        <Col span={24}>
          <Card hoverable>
            <Card.Meta
              title="Address"
              description={`${place.address}, ${place.city.name}, ${place.city.country}`}
            />
          </Card>
        </Col>
      </Row>
    </Modal>
  );
};

export default ShowPlace;
