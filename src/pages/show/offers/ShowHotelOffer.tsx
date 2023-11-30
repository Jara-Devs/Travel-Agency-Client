import {
  Avatar,
  Card,
  Col,
  Divider,
  Image,
  Modal,
  Row,
  Typography,
} from "antd";
import { FC } from "react";
import Title from "antd/es/typography/Title";
import SlideCard from "../../../common/SlideCard";
import { HotelOfferType } from "../../../types/offers";
import { ShowMiniHotel } from "../services/ShowHotel";

export interface ShowHotelOfferProps {
  open: boolean;
  onOk: () => void;
  hoteloffer: HotelOfferType;
}

export interface ShowminiHotelOfferProps {
  hoteloffer: HotelOfferType;
}

export const ShowMiniHotelOffer: FC<ShowminiHotelOfferProps> = ({
  hoteloffer,
}) => (
  <Card hoverable>
    <Card.Meta
      avatar={<Avatar size={50} src={hoteloffer.image.url} />}
      title={hoteloffer.name}
      description={hoteloffer.description}
    />
  </Card>
);

const ShowHotelOffer: FC<ShowHotelOfferProps> = ({
  open,
  onOk,
  hoteloffer,
}) => {
  return (
    <Modal
      width={800}
      title={
        <Typography>
          <Title level={2}>{hoteloffer.name}</Title>
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
            <Image src={hoteloffer.hotel.image.url} className="show-image" />
          </Card>
        </Col>
      </Row>
      <Row className="m-5">
        <Col span={24}>
          <Card hoverable>
            <Card.Meta
              title="Description"
              description={hoteloffer.description}
            />
          </Card>
        </Col>
      </Row>

      <Row className="m-5">
        <Col span={24}>
          <Card hoverable>
            <Card.Meta title={`Price: $ ${hoteloffer.price}`} />
            <Divider />
            <Card.Meta title={`Availability: ${hoteloffer.availability}`} />
          </Card>
        </Col>
      </Row>

      <Row className="m-5">
        <Col span={24}>
          <Title level={4}>Facilities</Title>
          <Divider />

          <SlideCard
            data={hoteloffer.facilities.map((f) => (
              <Card hoverable>
                <Card.Meta title={f.name} />
              </Card>
            ))}
            size="2"
          />
        </Col>
      </Row>
      <Row className="m-5">
        <Col span={24}>
          <Title level={4}>Hotel</Title>
          <Divider />

          <ShowMiniHotel hotel={hoteloffer.hotel} />
        </Col>
      </Row>
    </Modal>
  );
};

export default ShowHotelOffer;
