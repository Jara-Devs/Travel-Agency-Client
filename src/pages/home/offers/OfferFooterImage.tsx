import { FC } from "react";
import { Offer } from "../../../types/offers";
import { Typography } from "antd";
import dayjs from "dayjs";

const OfferFooterImage: FC<{ value: Offer }> = ({ value }) => (
  <div>
    <div className="center-content">
      <Typography.Title level={3}>{`$ ${value.price.toFixed(
        2
      )}`}</Typography.Title>
    </div>

    <div style={{ fontSize: "12px" }}>{`${dayjs(value.startDate).format(
      "D MMM YYYY"
    )} / ${dayjs(value.startDate).format("D MMM YYYY")}`}</div>
  </div>
);

export default OfferFooterImage;
