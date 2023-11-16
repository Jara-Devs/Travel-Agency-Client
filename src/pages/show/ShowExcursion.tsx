import { Card, Col, Image, Modal, Row, Typography } from "antd";
import { FC } from "react";
import { Excursion } from "../../types/services";
import Title from "antd/es/typography/Title";
import { ShowMiniPlace } from "./ShowPlace";

export interface ShowExcursionProps {
  open: boolean;
  onOk: () => void;
  excursion: Excursion;
}

export const ShowMiniExcursion: FC<{ excursion: Excursion }> = ({
  excursion,
}) => (
  <Card
    hoverable
    cover={
      <img
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
      />
    }
  >
    <Card.Meta
      title={excursion.name}
      description={excursion.isOverNight ? "OverNight Excursion" : "Excursion"}
    />
  </Card>
);

const ShowExcursion: FC<ShowExcursionProps> = ({ open, onOk, excursion }) => {
  return (
    <Modal
      width={800}
      title={
        <Typography>
          <Title level={2}>{excursion.name}</Title>
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
          <Card className="center-content">
            <Image src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />
          </Card>
        </Col>
      </Row>
      <Row className="m-5">
        <Col span={24}>
          <Card title="Places">
            {excursion.places.map((p, idx) => (
              <div key={idx}>
                <Card.Grid style={{ width: "50%" }}>
                  <ShowMiniPlace place={p} />
                </Card.Grid>
              </div>
            ))}
          </Card>
        </Col>
      </Row>
      <Row className="m-5">
        <Col span={24}>
          <Card title="Activities">
            {excursion.activities.map((a, idx) => (
              <div key={idx}>
                <Card.Grid style={{ width: "50%" }}>
                  <Card title={a.name}>{a.description}</Card>
                </Card.Grid>
              </div>
            ))}
          </Card>
        </Col>
      </Row>
    </Modal>
  );
};

export default ShowExcursion;
