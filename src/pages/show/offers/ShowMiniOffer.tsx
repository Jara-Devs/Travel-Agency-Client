import { Avatar, Badge, Card } from "antd";
import { FC } from "react";
import { Offer, OffertTypeColor } from "../../../types/offers";
import { offerTypeLabel } from "../../../common/offers/functions";

export interface ShowminiOfferProps {
  offer: Offer;
}

const ShowMiniOffer: FC<ShowminiOfferProps> = ({ offer }) => (
  <Badge.Ribbon
    text={offerTypeLabel(offer.type)}
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
