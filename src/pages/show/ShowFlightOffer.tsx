import { Card, Col, Divider, Image, Modal, Row, Typography } from "antd";
import { FC } from "react";
import Title from "antd/es/typography/Title";
import { FlightOfferType } from "../../types/services";
import { ShowMiniFlight } from "./ShowFlight";
import SlideCard from "../../common/SlideCard";
import { getFlightFacility } from "../../common/functions";

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
          <Title level={2}>{"Flight Offer"}</Title>
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
            <Card.Meta title={`$ ${flightOffer.price}`} />
          </Card>
        </Col>
      </Row>

      <Row className="m-5">
        <Col span={24}>
          <Title level={4}>Facilities</Title>
          <Divider />

          <SlideCard
            data={flightOffer.facilities.map((f) => (
              <Card hoverable>
                <Card.Meta title={getFlightFacility(f)} />
              </Card>
            ))}
            size="2"
          />
        </Col>
      </Row>

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
