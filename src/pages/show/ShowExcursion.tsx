import { Card, Col, Divider, Image, List, Modal, Row, Typography } from "antd";
import { FC, CSSProperties } from "react";
import { Excursion } from "../../types/services";
import Title from "antd/es/typography/Title";
import { ShowMiniPlace } from "./ShowPlace";

export interface ShowExcursionProps {
  open: boolean;
  onOk: () => void;
  excursion: Excursion;
}

export interface ShowMiniExcursionProps {
  excursion: Excursion;
  styles?: CSSProperties;
}

export const ShowMiniExcursion: FC<ShowMiniExcursionProps> = ({
  excursion,
  styles,
}) => (
  <Card
    style={styles}
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
          <Title level={4}>Places</Title>
          <Divider />
          <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={excursion.places}
            renderItem={(item) => (
              <List.Item>
                <ShowMiniPlace place={item} />
              </List.Item>
            )}
          />
        </Col>
      </Row>
      <Row className="m-5">
        <Col span={24}>
          <Title level={4}>Places</Title>
          <Divider />

          <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={excursion.activities}
            renderItem={(item) => (
              <List.Item>
                <Card title={item.name}>{item.description}</Card>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </Modal>
  );
};

export default ShowExcursion;
