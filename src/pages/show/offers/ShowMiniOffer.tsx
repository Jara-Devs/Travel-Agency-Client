import { Avatar, Badge, Card } from "antd";
import { FC } from "react";
import { Offer, OffertTypeColor, OfferType } from "../../../types/offers";

export interface ShowminiOfferProps {
  offer: Offer;
}

const ShowMiniOffer: FC<ShowminiOfferProps> = ({ offer }) => (
  <Badge.Ribbon
    text={OfferType[offer.type]}
    color={OffertTypeColor[offer.type]}
  >
    <Card hoverable>
      <Card.Meta
        className="show-card"
        avatar={<Avatar size={50} src={offer.image.url} />}
        title={offer.name}
        description={offer.description}
      />
    </Card>
  </Badge.Ribbon>
);

export default ShowMiniOffer;
