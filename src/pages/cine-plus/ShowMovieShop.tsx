import { FC } from "react";
import { SeatType } from "../../types/types";
import { Button, Col, Image, Modal, Row, Typography } from "antd";
import Seat from "./Seat";
import { ShoppingCartOutlined } from "@ant-design/icons";

export interface ShowMovieTypeShopProps {
  seats: SeatType[];
  open: boolean;
}

const ShowMovieShop: FC<ShowMovieTypeShopProps> = ({ seats, open }) => {
  return (
    <Modal
      open={open}
      title={
        <Row className="showMovieShop-tittle">
          <Col span={4}>
            <Image width={"60px"} height={"60px"} src={"/assets/movie.png"} />
          </Col>
          <Col span={16}>
            <div className="center-content mb-5">
              <Typography.Title>hola</Typography.Title>
            </div>
          </Col>
          <Col span={4}></Col>
        </Row>
      }
      width={"60vw"}
      footer={
        <Button type="primary" className="showMovieShop-buy">
          <ShoppingCartOutlined />
        </Button>
      }
    >
      <div className="m-5 center-content">
        <Row gutter={[5, 5]}>
          {seats.map((seat) => (
            <Col span={2} key={seat.number}>
              <Seat seat={seat} toolTip="hola" onClick={(n: number) => {}} />
            </Col>
          ))}
        </Row>
      </div>
    </Modal>
  );
};

export default ShowMovieShop;
