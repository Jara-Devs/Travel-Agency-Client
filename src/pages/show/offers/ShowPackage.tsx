import { Card, Col, Divider, Modal, Row, Typography } from "antd";
import Title from "antd/es/typography/Title";
import { FC } from "react";
import { getPackagePrice } from "../../../common/packages/functions";
import SlideCard from "../../../common/SlideCard";
import { Package } from "../../../types/packages";

import ShowMiniOffer from "./ShowMiniOffer";

export interface ShowPackageProps {
  open: boolean;
  onOk: () => void;
  packageOffer: Package;
}

const ShowPackage: FC<ShowPackageProps> = ({ open, onOk, packageOffer }) => {
  return (
    <Modal
      width={800}
      title={
        <Typography>
          <Title level={2}>{packageOffer.name}</Title>
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
          <Card hoverable>
            <Card.Meta
              title="Description"
              description={packageOffer.description}
            />
          </Card>
        </Col>
      </Row>
      <Row className="m-5">
        <Col span={24}>
          <Card hoverable>
            <Card.Meta title={`$ ${getPackagePrice(packageOffer)}`} />
          </Card>
        </Col>
      </Row>
      {packageOffer.hotelOffers.length !== 0 && (
        <Row className="m-5">
          <Col span={24}>
            <Title level={4}>Hotel Offers</Title>
            <Divider />
            <SlideCard
              data={packageOffer.hotelOffers.map((p) => (
                <ShowMiniOffer offer={p} />
              ))}
              size={"2"}
            />
          </Col>
        </Row>
      )}
      {packageOffer.excursionOffers.length !== 0 && (
        <Row className="m-5">
          <Col span={24}>
            <Title level={4}>Excursion Offers</Title>
            <Divider />

            <SlideCard
              data={packageOffer.excursionOffers.map((a) => (
                <ShowMiniOffer offer={a} />
              ))}
              size={"2"}
            />
          </Col>
        </Row>
      )}
      {packageOffer.flightOffers.length !== 0 && (
        <Row className="m-5">
          <Col span={24}>
            <Title level={4}>Flight Offers</Title>
            <Divider />

            <SlideCard
              data={packageOffer.flightOffers.map((a) => (
                <ShowMiniOffer offer={a} />
              ))}
              size={"2"}
            />
          </Col>
        </Row>
      )}
    </Modal>
  );
};

export default ShowPackage;
