import { CSSProperties, FC } from "react";
import { HotelCategory } from "../../types/services";
import { Col, Row } from "antd";
import { StarFilled } from "@ant-design/icons";

export const HotelCategoryComp: FC<{
  x: HotelCategory;
  styles?: CSSProperties;
}> = ({ x, styles }) => {
  const renderStars = (n: number) => {
    let stars = [];
    for (let i = 0; i < n; i++) {
      stars.push(i);
    }
    return (
      <Row gutter={1}>
        {stars.map((i) => (
          <Col key={i}>
            <StarFilled style={{ ...styles, color: "gold" }} />
          </Col>
        ))}
      </Row>
    );
  };

  switch (x) {
    case HotelCategory.OneStar:
      return renderStars(1);
    case HotelCategory.TwoStars:
      return renderStars(2);
    case HotelCategory.ThreeStars:
      return renderStars(3);
    case HotelCategory.FourStars:
      return renderStars(4);
    case HotelCategory.FiveStars:
      return renderStars(5);
  }
};
