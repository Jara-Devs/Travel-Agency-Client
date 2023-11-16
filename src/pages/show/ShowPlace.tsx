import { Alert, Card, Col, Image, Modal, Row, Typography } from "antd";
import { FC } from "react";
import { TouristPlace } from "../../types/services";
import Title from "antd/es/typography/Title";

export interface ShowPlaceProps {
  open: boolean;
  onOk: () => void;
  place: TouristPlace;
}

const ShowPlace: FC<ShowPlaceProps> = ({ open, onOk, place }) => {
  return (
    <Modal
      width={800}
      title={
        <Typography>
          <Title level={2}>{place.Name}</Title>
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
            description={place.Description}
          />
        </Col>
      </Row>
      <Row className="m-5">
        <Col span={24}>
          <Alert
            type="success"
            message="Address:"
            description={`${place.Address.Description}, ${place.Address.City}, ${place.Address.Country}`}
          />
        </Col>
      </Row>
    </Modal>
  );
};

export default ShowPlace;
