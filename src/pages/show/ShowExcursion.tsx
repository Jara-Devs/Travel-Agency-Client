import {
  Avatar,
  Card,
  Col,
  Divider,
  Image,
  List,
  Modal,
  Row,
  Typography,
} from "antd";
import { FC, CSSProperties } from "react";
import { Excursion, OverNighExcursion } from "../../types/services";
import Title from "antd/es/typography/Title";
import { ShowMiniPlace } from "./ShowPlace";
import { ShowMiniTouristActivity } from "./ShowActivity";
import { ShowMiniHotel } from "./ShowHotel";

export interface ShowExcursionProps {
  open: boolean;
  onOk: () => void;
  excursion: Excursion;
}

export interface ShowMiniExcursionProps {
  excursion: Excursion;
  styles?: CSSProperties;
}

export const ShowMiniExcursion: FC<ShowMiniExcursionProps> = ({
  excursion,
}) => (
  <Card hoverable>
    <Card.Meta
      avatar={<Avatar size={50} src={excursion.image.url} />}
      title={excursion.name}
    />
  </Card>
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
          <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={excursion.places}
            renderItem={(item) => (
              <List.Item>
                <ShowMiniPlace place={item} />
              </List.Item>
            )}
          />
        </Col>
      </Row>
      <Row className="m-5">
        <Col span={24}>
          <Title level={4}>Activities</Title>
          <Divider />

          <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={excursion.activities}
            renderItem={(item) => (
              <ShowMiniTouristActivity touristActivity={item} />
            )}
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
