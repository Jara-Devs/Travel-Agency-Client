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
import { Excursion, OverNighExcursion } from "../../../types/services";
import Title from "antd/es/typography/Title";
import { ShowMiniPlace } from "./ShowPlace";
import { ShowMiniTouristActivity } from "./ShowActivity";
import { ShowMiniHotel } from "./ShowHotel";
import SlideCard from "../../../common/SlideCard";

export interface ShowExcursionProps {
  open: boolean;
  onOk: () => void;
  excursion: Excursion;
}

export interface ShowMiniExcursionProps {
  excursion: Excursion;
}

export const ShowMiniExcursion: FC<ShowMiniExcursionProps> = ({
  excursion,
}) => (
  <Badge.Ribbon text= {excursion.isOverNight ? "Over Night Excursion" : "Excursion"}  color="cyan">
    <Card hoverable>
      <Card.Meta
        className="show-card"
        avatar={<Avatar size={50} src={excursion.image.url} />}
        title={excursion.name}
      />
    </Card>
  </Badge.Ribbon>
);

const ShowExcursion: FC<ShowExcursionProps> = ({ open, onOk, excursion }) => {
  return (
    <Modal
      width={800}
      title={
        <Typography>
          <Title level={2}>{excursion.name}</Title>
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
          <Card hoverable className="center-content">
            <Image
              src={excursion.image.url}
              className="show-image"
              preview={false}
            />
          </Card>
        </Col>
      </Row>
      <Row className="m-5">
        <Col span={24}>
          <Title level={4}>Places</Title>
          <Divider />
          <SlideCard
            data={excursion.places.map((p) => (
              <ShowMiniPlace place={p} />
            ))}
            size={"2"}
          />
        </Col>
      </Row>
      <Row className="m-5">
        <Col span={24}>
          <Title level={4}>Activities</Title>
          <Divider />

          <SlideCard
            data={excursion.activities.map((a) => (
              <ShowMiniTouristActivity touristActivity={a} />
            ))}
            size={"2"}
          />
        </Col>
      </Row>
      {excursion.isOverNight && (
        <Row className="m-5">
          <Col span={24}>
            <Title level={4}>Hotel</Title>
            <Divider />

            <ShowMiniHotel hotel={(excursion as OverNighExcursion).hotel} />
          </Col>
        </Row>
      )}
    </Modal>
  );
};

export default ShowExcursion;
