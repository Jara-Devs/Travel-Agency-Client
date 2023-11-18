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
  mini?: boolean;
}

export const ShowMiniPlace: FC<ShowMiniPlaceProps> = ({
  place,
  mini = false,
}) => (
  <Card
    style={mini ? { width: "100px", height: "100px" } : {}}
    hoverable
    cover={
      <img
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
      />
    }
  >
    {mini ? (
      <Typography.Text style={{ fontSize: "10px" }}>
        {place.name}
      </Typography.Text>
    ) : (
      <Card.Meta
        title={place.name}
        description={mini ? undefined : place.description}
      />
    )}
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
            <Image src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />
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
