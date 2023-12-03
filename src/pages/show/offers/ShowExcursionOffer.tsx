import { Card, Col, Divider, Image, Modal, Row, Typography } from "antd";
import { FC } from "react";
import Title from "antd/es/typography/Title";
import { ExcursionOfferType } from "../../../types/offers";
import { ShowMiniExcursion } from "../services/ShowExcursion";
import SlideCard from "../../../common/SlideCard";

export interface ShowExcursionOfferProps {
  open: boolean;
  onOk: () => void;
  excursionOffer: ExcursionOfferType;
}

const ShowExcursionOffer: FC<ShowExcursionOfferProps> = ({
  open,
  onOk,
  excursionOffer,
}) => {
  return (
    <Modal
      width={800}
      title={
        <Typography>
          <Title level={2}>{"Excursion Offer"}</Title>
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
              src={excursionOffer.image.url}
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
              description={excursionOffer.description}
            />
          </Card>
        </Col>
      </Row>

      <Row className="m-5">
        <Col span={24}>
          <Card hoverable>
            <Card.Meta title={`Price: $ ${excursionOffer.price}`} />
            <Divider />
            <Card.Meta title={`Availability: ${excursionOffer.availability}`} />
          </Card>
        </Col>
      </Row>

      {excursionOffer.facilities.length !== 0 && (
        <Row className="m-5">
          <Col span={24}>
            <Title level={4}>Facilities</Title>
            <Divider />

            <SlideCard
              data={excursionOffer.facilities.map((f) => (
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
          <Title level={4}>Excursion</Title>
          <Divider />

          <ShowMiniExcursion excursion={excursionOffer.excursion} />
        </Col>
      </Row>
    </Modal>
  );
};

export default ShowExcursionOffer;
