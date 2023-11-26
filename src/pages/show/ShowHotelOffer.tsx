import { Avatar, Card, Col, Image, Modal, Row, Typography } from "antd";
import { FC } from "react";
import Title from "antd/es/typography/Title";
import { getCategory } from "../../common/functions";
import { HotelOffer } from "../../types/offers";

export interface ShowHotelOfferProps {
  open: boolean;
  onOk: () => void;
  hoteloffer: HotelOffer;
}

export interface ShowminiHotelOfferProps {
  hoteloffer: HotelOffer;
}

export const ShowMiniHotelOffer: FC<ShowminiHotelOfferProps> = ({
  hoteloffer,
}) => (
  <Card hoverable>
    <Card.Meta
      avatar={<Avatar size={50} src={hoteloffer.image.url} />}
      title={hoteloffer.name}
      description={hoteloffer.description}
    />
  </Card>
);

const ShowHotelOffer: FC<ShowHotelOfferProps> = ({
  open,
  onOk,
  hoteloffer,
}) => {
  return (
    <Modal
      width={800}
      title={
        <Typography>
          <Title level={2}>{hoteloffer.name}</Title>
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
            <Image src={hoteloffer.hotel.image.url} className="show-image" />
          </Card>
        </Col>
      </Row>
      <Row className="m-5">
        <Col span={24}>
          <Card title="Category" hoverable>
            {getCategory(hoteloffer.hotel.category, { fontSize: "20px" })}
          </Card>
        </Col>
      </Row>
    </Modal>
  );
};

export default ShowHotelOffer;
