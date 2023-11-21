import { Avatar, Card, Col, Image, Modal, Row, Typography } from "antd";
import { FC } from "react";
import { Hotel } from "../../types/services";
import Title from "antd/es/typography/Title";
import { getCategory } from "../../common/functions";
import { ShowMiniPlace } from "./ShowPlace";

export interface ShowHotelProps {
  open: boolean;
  onOk: () => void;
  hotel: Hotel;
}

export interface ShowminiHotelProps {
  hotel: Hotel;
}

export const ShowMiniHotel: FC<ShowminiHotelProps> = ({ hotel }) => (
  <Card hoverable>
    <Card.Meta
      avatar={<Avatar size={50} src={hotel.image.url} />}
      title={hotel.name}
      description={getCategory(hotel.category)}
    />
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
            <Image src={hotel.image.url} className="show-image" />
          </Card>
        </Col>
      </Row>
      <Row className="m-5">
        <Col span={24}>
          <Card title="Category">
            {getCategory(hotel.category, { fontSize: "20px" })}
          </Card>
        </Col>
      </Row>
      <Row className="m-5">
        <Col span={24}>
          <ShowMiniPlace place={hotel.touristPlace} />
        </Col>
      </Row>
    </Modal>
  );
};

export default ShowHotel;
