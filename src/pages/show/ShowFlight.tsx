import { Alert, Card, Col, Image, Modal, Row, Typography } from "antd";
import { FC } from "react";
import { Flight, Hotel, TouristActivity } from "../../types/services";
import Title from "antd/es/typography/Title";
import {  flight } from '../../api/services';

export interface ShowFlightProps {
  open: boolean;
  onOk: () => void;
  flight: Flight;
}

export const ShowminiFlight: FC<{ flight: Flight }> = ({ flight }) => (
  <Card
    hoverable
    cover={
      <img
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
      />
    }
  >
    <Card.Meta title={flight.company} description={flight.company} />
  </Card>
);

const ShowFlight: FC<ShowFlightProps> = ({ open, onOk, flight }) => {
  return (
    <Modal
      width={800}
      title={
        <Typography>
          <Title level={2}>{flight.company}</Title>
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
            description={flight.category}
          />
        </Col>
      </Row>
      
    </Modal>
  );
};

export default ShowFlight;
