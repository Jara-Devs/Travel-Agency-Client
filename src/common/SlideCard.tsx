import { Button, Col, Row } from "antd";
import { ReactNode, FC, useState } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

export interface SlideCardProps {
  size: "4" | "2";
  data: ReactNode[];
}

const SlideCard: FC<SlideCardProps> = ({ data, size }) => {
  const [current, setCurrent] = useState<number>(0);

  const sizeV = size === "4" ? 4 : 2;

  const getSpan = () => {
    if (data.length >= sizeV) {
      return size === "4" ? 5 : 10;
    }

    if (data.length === 1) return 20;
    if (data.length === 2) return 10;
    if (data.length === 3) return 7;
  };
  return (
    <Row style={{ maxWidth: "100%" }} gutter={2} justify="space-between">
      <Col
        span={1}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {current !== 0 && (
          <Button
            style={{ height: "100%" }}
            onClick={() => setCurrent((c) => c - 1)}
          >
            <LeftOutlined />
          </Button>
        )}
      </Col>
      {data.slice(current, current + sizeV).map((d, idx) => (
        <Col key={idx} span={getSpan()}>
          {d}
        </Col>
      ))}
      <Col
        span={1}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {current < data.length - sizeV && (
          <Button
            style={{ height: "100%" }}
            onClick={() => setCurrent((c) => c + 1)}
          >
            <RightOutlined />
          </Button>
        )}
      </Col>
    </Row>
  );
};

export default SlideCard;
