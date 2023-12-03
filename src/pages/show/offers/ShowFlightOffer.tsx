import { Card, Col, Divider, Image, Modal, Row, Typography } from "antd";
import { FC } from "react";
import Title from "antd/es/typography/Title";
import { FlightOfferType } from "../../../types/offers";
import { ShowMiniFlight } from "../services/ShowFlight";
import SlideCard from "../../../common/SlideCard";

export interface ShowFlightOfferProps {
  open: boolean;
  onOk: () => void;
  flightOffer: FlightOfferType;
}

const ShowFlightOffer: FC<ShowFlightOfferProps> = ({
  open,
  onOk,
  flightOffer,
}) => {
  return (
    <Modal
      width={800}
      title={
        <Typography>
          <Title level={2}>{flightOffer.name}</Title>
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
              src={flightOffer.image.url}
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
              description={flightOffer.description}
            />
          </Card>
        </Col>
      </Row>

      <Row className="m-5">
        <Col span={24}>
          <Card hoverable>
            <Card.Meta title={`Price: $ ${flightOffer.price}`} />
            <Divider />
            <Card.Meta title={`Availability: ${flightOffer.availability}`} />
          </Card>
        </Col>
      </Row>

      {flightOffer.facilities.length !== 0 && (
        <Row className="m-5">
          <Col span={24}>
            <Title level={4}>Facilities</Title>
            <Divider />

            <SlideCard
              data={flightOffer.facilities.map((f) => (
                <Card hoverable>
                  <Card.Meta title={f.name} />
                </Card>
              ))}
              size="2"
            />
          </Col>
        </Row>
      )}

      <Row className="m-5">
        <Col span={24}>
          <Title level={4}>Flight</Title>
          <Divider />

          <ShowMiniFlight flight={flightOffer.flight} />
        </Col>
      </Row>
    </Modal>
  );
};

export default ShowFlightOffer;
