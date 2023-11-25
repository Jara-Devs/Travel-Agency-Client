import { Card, Col, Divider, Modal, Row, Typography } from "antd";
import { FC } from "react";
import Title from "antd/es/typography/Title";
import moment from "moment";
import { FlightOfferType } from "../../types/services";
import { ShowMiniFlight } from "./ShowFlight";

export interface ShowFlightOfferProps {
    open: boolean;
    onOk: () => void;
    flightOffer: FlightOfferType;
}

const ShowFlightOffer: FC<ShowFlightOfferProps> = ({ open, onOk, flightOffer }) => {
    return (
        <Modal
            width={800}
            title={
                <Typography>
                    <Title level={2}>{"Flight Offer"}</Title>
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
                    <Title level={4}>Flight Offer</Title>
                    <Divider />
                    <ShowMiniFlight flight={flightOffer.flight} />
                </Col>
            </Row>

            <Row className="m-5">
                <Col span={24}>
                    <Card hoverable>
                        <Card.Meta title="Description" description={flightOffer.description} />
                    </Card>
                </Col>
            </Row>

            <Row className="m-5">
                <Col span={24}>
                    <Card hoverable>
                        <Card.Meta title="Price" description={flightOffer.price} />
                    </Card>
                </Col>
            </Row>

            <Row className="m-5">
                <Col span={24}>
                    <Card hoverable>
                        <Card.Meta title="Facilities" description={flightOffer.facilities} />
                    </Card>
                </Col>
            </Row>
        </Modal>
    );
};

export default ShowFlightOffer;