import { FC } from "react";
import { Excursion } from "../../../types/services";

export interface ShowMiniExcursionProps {
  place: Excursion;
  ribbon?: string;
}

const ShowMiniOffer: FC<ShowMiniExcursionProps> = ({}) => (
  //   <Badge.Ribbon text={ribbon ?? "Place"}>
  //     <Card hoverable>
  //       <Card.Meta
  //         className="show-card"
  //         avatar={<Avatar size={50} src={place.image.url} />}
  //         title={place.name}
  //         description={place.description}
  //       />
  //     </Card>
  //   </Badge.Ribbon>

  <></>
);

export default ShowMiniOffer;
