import { FC, ReactNode } from "react";
import { Typography } from "antd";
import dayjs from "dayjs";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";

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

      <div
        style={{ fontSize: "12px", alignItems: "center" }}
        className="center-content"
      >
        <div>
          <div className="center-content">
            {dayjs(startDate).format("DD MMM YYYY")}
          </div>
          <div className="center-content">
            {dayjs(startDate).format("HH:mm")}
          </div>
        </div>
        <div>
          <ArrowForwardOutlinedIcon
            style={{ marginLeft: "3px", marginRight: "3px", fontSize: "14px" }}
          />
        </div>
        <div>
          <div className="center-content">
            {dayjs(endDate).format("DD MMM YYYY")}
          </div>

          <div className="center-content">{dayjs(endDate).format("HH:mm")}</div>
        </div>
      </div>

      {reserveBtn}
    </div>
  );
};

export default OfferFooterImage;
