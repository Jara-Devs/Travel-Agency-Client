import { Alert, Col, Modal, Row, Typography } from "antd";
import { FC } from "react";
import { Flight } from "../../types/services";
import Title from "antd/es/typography/Title";

export interface ShowFlightProps {
  open: boolean;
  onOk: () => void;
  flight: Flight;
}

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
          <Alert
            type="info"
            message="Category:"
            description={flight.flightCategory}
          />
        </Col>
      </Row>
      <Row className="m-5">
        <Col span={24}>
          <Alert
            type="info"
            message="Info:"
            description={`From ${flight.origin.name} to ${flight.destination.name}, duration: ${flight.duration}`}
          />
        </Col>
      </Row>
    </Modal>
  );
};

export default ShowFlight;
