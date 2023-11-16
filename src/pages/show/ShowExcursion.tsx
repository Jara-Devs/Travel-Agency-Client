import { Card, Col, Image, Modal, Row, Typography } from "antd";
import { FC } from "react";
import { Excursion } from "../../types/services";
import Title from "antd/es/typography/Title";

export interface ShowExcursionProps {
  open: boolean;
  onOk: () => void;
  excursion: Excursion;
}

const ShowExcursion: FC<ShowExcursionProps> = ({ open, onOk, excursion }) => {
  return (
    <Modal
      width={800}
      title={
        <Typography>
          <Title level={2}>{excursion.Name}</Title>
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
            {excursion.Places.map((p, idx) => (
              <div key={idx}>
                <Card.Grid style={{ width: "50%" }}>
                  <Card
                    hoverable
                    cover={
                      <img
                        alt="example"
                        src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                      />
                    }
                  >
                    <Card.Meta title={p.Name} description={p.Description} />
                  </Card>
                </Card.Grid>
              </div>
            ))}
          </Card>
        </Col>
      </Row>
      <Row className="m-5">
        <Col span={24}>
          <Card title="Activities">
            {excursion.Activities.map((a, idx) => (
              <div key={idx}>
                <Card.Grid style={{ width: "50%" }}>
                  <Card title={a.Name}>{a.Description}</Card>
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
