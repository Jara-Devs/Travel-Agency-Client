import { Avatar, Badge, Card, Col, Image, Modal, Row, Typography } from "antd";
import { FC } from "react";
import { TouristActivity } from "../../../types/services";
import Title from "antd/es/typography/Title";

export interface ShowTouristActivityProps {
  open: boolean;
  onOk: () => void;
  touristActivity: TouristActivity;
}

export const ShowMiniTouristActivity: FC<{
  touristActivity: TouristActivity;
}> = ({ touristActivity }) => (
  <Badge.Ribbon text="Activity" color="red">
    <Card hoverable>
      <Card.Meta
        className="show-card"
        avatar={<Avatar size={50} src={touristActivity.image.url} />}
        title={touristActivity.name}
        description={touristActivity.description}
      />
    </Card>
  </Badge.Ribbon>
);

const ShowTouristActivity: FC<ShowTouristActivityProps> = ({
  open,
  onOk,
  touristActivity,
}) => {
  return (
    <Modal
      width={800}
      title={
        <Typography>
          <Title level={2}>{touristActivity.name}</Title>
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
              src={touristActivity.image.url}
              className="show-image"
              preview={false}
            />
          </Card>
        </Col>
      </Row>
      <Row className="m-5">
        <Col span={24}>
          <Card hoverable>
            <Card.Meta
              title="Description"
              description={touristActivity.description}
            />
          </Card>
        </Col>
      </Row>
    </Modal>
  );
};

export default ShowTouristActivity;
