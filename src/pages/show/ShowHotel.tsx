import { Alert, Card, Col, Image, Modal, Row, Typography } from "antd";
import { FC } from "react";
import { Hotel } from "../../types/services";
import Title from "antd/es/typography/Title";

export interface ShowHotelProps {
  open: boolean;
  onOk: () => void;
  hotel: Hotel;
}

export interface ShowminiHotelProps {
  hotel: Hotel;
}

export const ShowMiniHotel: FC<ShowminiHotelProps> = ({ hotel }) => (
  <Card hoverable cover={<img alt="example" src={hotel.image.url} />}>
    <Card.Meta title={hotel.name} description={hotel.category} />
  </Card>
);

const ShowHotel: FC<ShowHotelProps> = ({ open, onOk, hotel }) => {
  return (
    <Modal
      width={800}
      title={
        <Typography>
          <Title level={2}>{hotel.name}</Title>
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
            <Image src={hotel.image.url} />
          </Card>
        </Col>
      </Row>
      <Row className="m-5">
        <Col span={24}>
          <Alert type="info" message="Category:" description={hotel.category} />
        </Col>
      </Row>
      <Row className="m-5">
        <Col span={24}>
          <Alert
            type="success"
            message="Address:"
            description={`${hotel.touristPlace.name},  ${hotel.touristPlace.address.country}`}
          />
        </Col>
      </Row>
    </Modal>
  );
};

export default ShowHotel;
