import { Alert, Card, Col, Image, Modal, Row, Typography } from "antd";
import { FC } from "react";
import { Hotel, TouristActivity } from "../../types/services";
import Title from "antd/es/typography/Title";
import { touristActivity } from '../../api/services';

export interface ShowTouristActivityProps {
  open: boolean;
  onOk: () => void;
  touristActivity: TouristActivity;
}

export const ShowMiniTouristActivity: FC<{ touristActivity: TouristActivity }> = ({ touristActivity }) => (
  <Card
    hoverable
    cover={
      <img
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
      />
    }
  >
    <Card.Meta title={touristActivity.name} description={touristActivity.description} />
  </Card>
);

const ShowTouristActivity: FC<ShowTouristActivityProps> = ({ open, onOk, touristActivity }) => {
  return (
    <Modal
      width={800}
      title={
        <Typography>
          <Title level={2}>{touristActivity.name}</Title>
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
          <Alert 
            type="info"
            message="Description:"
            description={touristActivity.description}
          />
        </Col>
      </Row>
      
    </Modal>
  );
};

export default ShowTouristActivity;
