import { FC, ReactNode } from "react";
import { Typography } from "antd";
import dayjs from "dayjs";

export interface OfferFooterImageProps {
  price: number;
  startDate: number;
  endDate: number;
  reserveBtn: ReactNode;
}

const OfferFooterImage: FC<OfferFooterImageProps> = ({
  price,
  startDate,
  endDate,
  reserveBtn,
}) => {
  return (
    <div>
      <div className="center-content">
        <Typography.Title level={3}>{`$ ${price.toFixed(2)}`}</Typography.Title>
      </div>

      <div style={{ fontSize: "12px" }} className="center-content">{`${dayjs(
        startDate
      ).format("D MMM YYYY")} - ${dayjs(endDate).format("D MMM YYYY")}`}</div>

      {reserveBtn}
    </div>
  );
};

export default OfferFooterImage;
