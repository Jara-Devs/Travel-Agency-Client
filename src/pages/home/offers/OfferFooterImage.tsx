import { FC } from "react";
import { Button, Typography } from "antd";
import dayjs from "dayjs";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

export interface OfferFooterImageProps {
  price: number;
  startDate: number;
  endDate: number;
}

const OfferFooterImage: FC<OfferFooterImageProps> = ({
  price,
  startDate,
  endDate,
}) => (
  <div>
    <div className="center-content">
      <Typography.Title level={3}>{`$ ${price.toFixed(2)}`}</Typography.Title>
    </div>

    <div style={{ fontSize: "12px" }} className="center-content">{`${dayjs(
      startDate
    ).format("D MMM YYYY")} - ${dayjs(endDate).format("D MMM YYYY")}`}</div>

    <div className="center-content mt-5">
      <Button type="primary">
        <ShoppingCartOutlinedIcon />
      </Button>
    </div>
  </div>
);

export default OfferFooterImage;
