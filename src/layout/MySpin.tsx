import { Image, Spin, Typography } from "antd";
import { FC } from "react";
import logo from "../assets/logo.jpg";
import Title from "antd/es/typography/Title";

const MySpin: FC<{ loading: boolean; initial?: boolean }> = ({
  loading,
  initial = false,
}) => {
  return (
    <>
      {loading &&
        (initial ? (
          <div className="center-spin" style={{ backgroundColor: "gold" }}>
            <div>
              <div style={{ display: "flex" }}>
                <Image
                  className="layout-logo logo"
                  width={"50px"}
                  height={"50px"}
                  src={logo}
                  preview={false}
                />
                <Typography>
                  <Title
                    style={{ color: "rgb(4, 21, 77)", marginLeft: "10px" }}
                  >
                    Jara Travel
                  </Title>
                </Typography>
              </div>
              <Spin className="center-content mt-5" tip="aaaaa" size="large" />
            </div>
          </div>
        ) : (
          <div className="center-spin">
            <Spin size="large" />
          </div>
        ))}
    </>
  );
};

export default MySpin;
