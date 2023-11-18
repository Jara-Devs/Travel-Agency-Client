import { Alert, Card, Col, Image, Modal, Row, Typography } from "antd";
import { FC } from "react";
import { TouristPlace } from "../../types/services";
import Title from "antd/es/typography/Title";

export interface ShowPlaceProps {
  open: boolean;
  onOk: () => void;
  place: TouristPlace;
}

export interface ShowMiniPlaceProps {
  place: TouristPlace;
}

export const ShowMiniPlace: FC<ShowMiniPlaceProps> = ({ place }) => (
  <Card hoverable cover={<img alt="example" src={place.image.url} />}>
    <Card.Meta title={place.name} description={place.description} />
  </Card>
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
          <Card className="center-content">
            <Image src={place.image.url} />
          </Card>
        </Col>
      </Row>
      <Row className="m-5">
        <Col span={24}>
          <Alert
            type="info"
            message="Description:"
            description={place.description}
          />
        </Col>
      </Row>
      <Row className="m-5">
        <Col span={24}>
          <Alert
            type="success"
            message="Address:"
            description={`${place.address.description}, ${place.address.city}, ${place.address.country}`}
          />
        </Col>
      </Row>
    </Modal>
  );
};

export default ShowPlace;
