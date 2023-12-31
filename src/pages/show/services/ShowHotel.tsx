import {
  Avatar,
  Badge,
  Card,
  Col,
  Divider,
  Image,
  Modal,
  Row,
  Typography,
} from "antd";
import { FC } from "react";
import { Hotel } from "../../../types/services";
import Title from "antd/es/typography/Title";
import { ShowMiniPlace } from "./ShowPlace";
import { HotelCategoryComp } from "../../../common/service/HotelCategory";

export interface ShowHotelProps {
  open: boolean;
  onOk: () => void;
  hotel: Hotel;
}

export interface ShowminiHotelProps {
  hotel: Hotel;
}

export const ShowMiniHotel: FC<ShowminiHotelProps> = ({ hotel }) => (
  <Badge.Ribbon text="hotel" color="green">
    <Card hoverable>
      <Card.Meta
        className="show-card"
        avatar={<Avatar size={50} src={hotel.image.url} />}
        title={hotel.name}
        description={<HotelCategoryComp x={hotel.category} />}
      />
    </Card>
  </Badge.Ribbon>
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
          <Card className="center-content" hoverable>
            <Image
              src={hotel.image.url}
              className="show-image"
              preview={false}
            />
          </Card>
        </Col>
      </Row>
      <Row className="m-5">
        <Col span={24}>
          <Card title="Category" hoverable>
            <HotelCategoryComp
              x={hotel.category}
              styles={{ fontSize: "20px" }}
            />
          </Card>
        </Col>
      </Row>
      <Row className="m-5">
        <Col span={24}>
          <Title level={4}>Place</Title>
          <Divider />

          <ShowMiniPlace place={hotel.touristPlace} />
        </Col>
      </Row>
    </Modal>
  );
};

export default ShowHotel;
